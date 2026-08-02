from pydantic import BaseModel, EmailStr

class SignupInput(BaseModel):
    name: str
    email: EmailStr
    password: str