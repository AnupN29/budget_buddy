from fastapi import APIRouter, Depends,status,HTTPException
from sqlalchemy.orm import Session

from dependencies import get_db,get_current_user
from schemas.transactions import Transaction,TransactionCreate
from schemas.user import User
from .utils.user import *

router = APIRouter(
    prefix="/transactions",
    tags=["Transactions"]
)

@router.post("/", response_model=Transaction,status_code=status.HTTP_201_CREATED)
def create_transaction(transaction: TransactionCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return create_transaction(db, user_id=current_user.id, transaction=transaction)


