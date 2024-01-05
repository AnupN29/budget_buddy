from fastapi.security import OAuth2PasswordBearer
from fastapi import Depends, HTTPException,status
from typing_extensions import Annotated
from sqlalchemy.orm import Session

from models.database import SessionLocal
from routers.utils.user import verify_token

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close() 


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="user/login")
 

async def get_current_user(token: Annotated[str, Depends(oauth2_scheme)], db: Session = Depends(get_db) ):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Invalid credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    return verify_token(token,credentials_exception,db)
    