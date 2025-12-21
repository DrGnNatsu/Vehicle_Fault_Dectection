from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from uuid import UUID

from database.session import get_db
from models.rule import Rule
from models.user import User
from api.v1.dependencies import require_admin
from schemas.rule import RuleResponse, RuleCreateRequest, RuleUpdateRequest

router = APIRouter(prefix="/rules", tags=["rules"])


def _rule_to_response(rule: Rule) -> RuleResponse:
    """Convert Rule model to RuleResponse"""
    return RuleResponse(
        id=rule.id,
        name=rule.name,
        dsl_content=rule.dsl_content,
        is_active=rule.is_active,
        created_by_id=rule.created_by_id,
        created_at=rule.created_at.isoformat() if rule.created_at else "",
        updated_at=rule.updated_at.isoformat() if rule.updated_at else ""
    )


@router.get("", response_model=List[RuleResponse])
async def get_rules(
    db: Session = Depends(get_db),
    current_user: User = Depends(require_admin)
):
    """
    Get all rules.
    Admin only.
    """
    rules = db.query(Rule).all()
    return [_rule_to_response(rule) for rule in rules]


@router.get("/{rule_id}", response_model=RuleResponse)
async def get_rule(
    rule_id: UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_admin)
):
    """
    Get a specific rule by ID.
    Admin only.
    """
    rule = db.query(Rule).filter(Rule.id == rule_id).first()
    if not rule:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Rule not found")
    
    return _rule_to_response(rule)


@router.post("", response_model=RuleResponse, status_code=status.HTTP_201_CREATED)
async def create_rule(
    request: RuleCreateRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_admin)
):
    """
    Create a new rule (DSL).
    Admin only.
    """
    rule = Rule(
        name=request.name,
        dsl_content=request.dsl_content,
        created_by_id=current_user.id
    )
    
    db.add(rule)
    db.commit()
    db.refresh(rule)
    
    return _rule_to_response(rule)


@router.put("/{rule_id}", response_model=RuleResponse)
async def update_rule(
    rule_id: UUID,
    request: RuleUpdateRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_admin)
):
    """
    Update an existing rule.
    Admin only.
    """
    rule = db.query(Rule).filter(Rule.id == rule_id).first()
    if not rule:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Rule not found")
    
    if request.name is not None:
        rule.name = request.name
    if request.dsl_content is not None:
        rule.dsl_content = request.dsl_content
    if request.is_active is not None:
        rule.is_active = request.is_active
    
    db.commit()
    db.refresh(rule)
    
    return _rule_to_response(rule)


@router.delete("/{rule_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_rule(
    rule_id: UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_admin)
):
    """
    Delete a rule.
    Admin only.
    """
    rule = db.query(Rule).filter(Rule.id == rule_id).first()
    if not rule:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Rule not found")
    
    db.delete(rule)
    db.commit()
    
    return None
