from starlette import status

from app.exception.base_exception import AppException


class UserNotFoundException(AppException):
    status_code = status.HTTP_404_NOT_FOUND
    detail = "User not found in the system"
