from sqlalchemy.orm import Session
from uuid import UUID
from typing import List, Optional
from models.police_source_assignment import PoliceSourceAssignment
from models.user import User
from models.sources import Source
from schemas.assignment import AssignmentResponse, SourceAssignmentInfo


class AssignmentService:
    """Service for managing police-source assignments"""

    @staticmethod
    def assign_sources_to_police(
        db: Session,
        police_id: UUID,
        source_ids: List[UUID]
    ) -> AssignmentResponse:
        """
        Assign sources to a police user.
        Deletes old assignments and inserts new ones.
        
        Args:
            db: Database session
            police_id: ID of the police user
            source_ids: List of source IDs to assign
            
        Returns:
            AssignmentResponse with assignment details
            
        Raises:
            ValueError: If police user doesn't exist or is not a police user
            ValueError: If any source doesn't exist
        """
        # Validate police user exists and has police role
        police_user = db.query(User).filter(User.id == police_id).first()
        if not police_user:
            raise ValueError(f"Police user with ID {police_id} not found")
        
        if police_user.role.lower() != "police":
            raise ValueError(f"User with ID {police_id} is not a police user")
        
        # Validate all sources exist
        sources = db.query(Source).filter(Source.id.in_(source_ids)).all()
        if len(sources) != len(source_ids):
            found_ids = {str(s.id) for s in sources}
            requested_ids = {str(sid) for sid in source_ids}
            missing_ids = requested_ids - found_ids
            raise ValueError(f"Sources not found: {', '.join(missing_ids)}")
        
        # Delete old assignments for this police user
        db.query(PoliceSourceAssignment).filter(
            PoliceSourceAssignment.user_id == police_id
        ).delete()
        
        # Insert new assignments
        new_assignments = [
            PoliceSourceAssignment(
                user_id=police_id,
                source_id=source_id
            )
            for source_id in source_ids
        ]
        db.add_all(new_assignments)
        db.commit()
        
        return AssignmentResponse(
            police_id=police_id,
            assigned_source_ids=source_ids,
            message=f"Successfully assigned {len(source_ids)} source(s) to police user"
        )

    @staticmethod
    def get_police_assignments(
        db: Session,
        police_id: UUID
    ) -> List[SourceAssignmentInfo]:
        """
        Get all sources assigned to a police user.
        
        Args:
            db: Database session
            police_id: ID of the police user
            
        Returns:
            List of SourceAssignmentInfo
        """
        assignments = db.query(PoliceSourceAssignment, Source).join(
            Source,
            PoliceSourceAssignment.source_id == Source.id
        ).filter(
            PoliceSourceAssignment.user_id == police_id
        ).all()
        
        return [
            SourceAssignmentInfo(
                source_id=source.id,
                source_name=source.name,
                source_type=source.source_type,
                is_active=source.is_active
            )
            for _, source in assignments
        ]

    @staticmethod
    def get_assigned_source_ids(
        db: Session,
        police_id: UUID
    ) -> List[UUID]:
        """
        Get list of source IDs assigned to a police user.
        Used for filtering sources in dashboard.
        
        Args:
            db: Database session
            police_id: ID of the police user
            
        Returns:
            List of source UUIDs
        """
        assignments = db.query(PoliceSourceAssignment).filter(
            PoliceSourceAssignment.user_id == police_id
        ).all()
        
        return [assignment.source_id for assignment in assignments]

    @staticmethod
    def get_all_assignments(
        db: Session
    ) -> dict:
        """
        Get all assignments grouped by police user.
        Useful for admin dashboard.
        
        Args:
            db: Database session
            
        Returns:
            Dictionary mapping police_id to list of source assignments
        """
        # Get all police users
        police_users = db.query(User).filter(
            User.role.ilike("police")
        ).all()
        
        result = {}
        for police in police_users:
            assignments = AssignmentService.get_police_assignments(db, police.id)
            result[str(police.id)] = {
                "police_id": str(police.id),
                "police_name": police.full_name,
                "police_email": police.email,
                "assigned_sources": [a.model_dump() for a in assignments]
            }
        
        return result
