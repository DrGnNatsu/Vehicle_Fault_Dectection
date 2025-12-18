from fastapi import status
from app.exception.base_exception import AppException

# Case: Auth Failed
class AuthFailedException(AppException):
    status_code = status.HTTP_401_UNAUTHORIZED
    detail = "Incorrect email or password"


# Case: Permission Denied
class PermissionDeniedException(AppException):
    status_code = status.HTTP_403_FORBIDDEN
    detail = "You do not have permission to access this resource"

# Case: Token Expired
class TokenExpiredException(AppException):
    status_code = status.HTTP_401_UNAUTHORIZED
    detail = "Your session has expired. Please login again."
