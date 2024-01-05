from pydantic import BaseModel

class User(BaseModel):
    email: str
    name:str
    password:str

class UserShow(BaseModel):
    name:str
    email:str

    class Config():
        from_attributes = True

class UserLogin(BaseModel):
    email:str
    password:str

    class Config():
        from_attributes = True