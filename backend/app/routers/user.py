from typing_extensions import Annotated
from fastapi import APIRouter, Depends,status,HTTPException
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordRequestForm

from dependencies import get_db, get_current_user
from schemas.user import User as UserSchema, UserLogin as UserLoginSchema
from .utils.user import *
from schemas.jwt_token import Token as TokenSchema

router = APIRouter(
    prefix="/user",
    tags=["User"]
)

@router.post("/register", response_model=UserSchema,status_code=status.HTTP_201_CREATED)
def register_user(user: UserSchema, db: Session = Depends(get_db)):
    if get_user_by_email(db,user.email):
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="User already exits, please try login")
    return register(user,db)

@router.post("/login", response_model=TokenSchema,status_code=status.HTTP_200_OK)
async def login_user(user: UserLoginSchema, db: Session = Depends(get_db)): # UserLoginSchema || Annotated[OAuth2PasswordRequestForm, Depends()]
    user_from_db = get_user_by_email(db, user.email) # user.email || user.username
    if not user_from_db:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid Email")
    if not pwd_cxt.verify(user.password, user_from_db.password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid Password")
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user_from_db.email}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

@router.put("/profile", response_model=UserSchema,status_code=status.HTTP_200_OK)
def update(user: UserSchema,db: Session = Depends(get_db), current_user: UserSchema = Depends(get_current_user)):
    db_user = update_user(db=db, user_id=current_user.id, user = user)
    return db_user

@router.delete("/{user_id}", response_model=dict, status_code=status.HTTP_200_OK)
def delete(user_id: int, db: Session = Depends(get_db), current_user: UserSchema = Depends(get_current_user)):
    if current_user.id != user_id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="You do not have permission to delete this user")

    return delete_user(db=db,current_user=current_user)
    