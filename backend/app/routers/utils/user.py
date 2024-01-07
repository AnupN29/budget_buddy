from sqlalchemy.orm import Session
from passlib.context import CryptContext
from jose import JWTError, jwt
from datetime import datetime, timedelta
from typing import Union

from models.user import User as UserModel
from schemas.user import User as UserSchema
from schemas.jwt_token import TokenData

pwd_cxt = CryptContext(schemes=["bcrypt"], deprecated = "auto")


def get_user_by_email(db, email):
    return db.query(UserModel).filter(UserModel.email == email).first()

def register(user, db):
    hashed_password = pwd_cxt.hash(user.password)
    new_user = UserModel(email=user.email, name = user.name,  password=hashed_password)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

def update_user(db : Session, user_id:int, user: UserSchema):
    db_user = db.query(UserModel).filter_by(id=user_id).first()

    if db_user:
        db_user.email = user.email
        db_user.name = user.name
        hashed_password = pwd_cxt.hash(user.password)
        db_user.password = hashed_password

        db.commit()

        return db_user

    return None

def delete_user(db: Session, current_user: UserSchema):
    db_user = db.query(UserModel).filter_by(id=current_user.id).first()

    if db_user:
        db.delete(db_user)
        db.commit()

        return {"message": "User deleted successfully"}
    

# DONT USE THE SAME SECRET_KEY. Use this command to generate a new key : openssl rand -hex 32
SECRET_KEY = "720ab7455c23d91914ab9b94239f8b32cff46617e16994bb3ac3cf28fdb48293" 
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

def create_access_token(data: dict, expires_delta: Union[timedelta, None] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def verify_token(token,credentials_exception,db):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
        token_data = TokenData(email=email)
    except JWTError:
        raise credentials_exception
    user = get_user_by_email(db, email=token_data.email)
    if user is None:
        raise credentials_exception
    return user
