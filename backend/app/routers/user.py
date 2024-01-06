from typing_extensions import Annotated
from fastapi import APIRouter, Depends,status,HTTPException
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordRequestForm

from dependencies import get_db
from schemas.user import User as user_schemas,UserShow as user_show_schemas, UserLogin as user_login_schemas
from .utils.user import *
from schemas.jwt_token import Token

router = APIRouter(
    prefix="/user",
    tags=["User"]
)

@router.post("/register", response_model=user_show_schemas,status_code=status.HTTP_201_CREATED)
def register_user(user: user_schemas, db: Session = Depends(get_db)):
    if get_user_by_email(db,user.email):
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="User already exits, please try login")
    return register(user,db)

@router.post("/login", response_model=Token,status_code=status.HTTP_200_OK)
async def login_user(user: user_login_schemas, db: Session = Depends(get_db)):
    user_from_db = get_user_by_email(db, user.email)
    if not user_from_db:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid Email")
    if not pwd_cxt.verify(user.password, user_from_db.password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid Password")
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user_from_db.email}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}