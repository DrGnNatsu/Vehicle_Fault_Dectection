from enum import Enum

class Role(str, Enum):
    admin = "admin"
    police = "police"
    user = "user"
