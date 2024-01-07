from fastapi import APIRouter, Depends,status,HTTPException
from sqlalchemy.orm import Session

from dependencies import get_db,get_current_user
from schemas.transactions import Transaction as TransactionSchema,TransactionCreate as TransactionCreateSchema
from schemas.user import User as UserSchema
from .utils.transactions import *

router = APIRouter(
    prefix="/transactions",
    tags=["Transactions"]
)

@router.post("/", response_model=TransactionSchema,status_code=status.HTTP_201_CREATED)
def create(transaction: TransactionCreateSchema, db: Session = Depends(get_db), current_user: UserSchema = Depends(get_current_user)):
    return create_transaction(db=db, user_id=current_user.id, transaction=transaction)


@router.get("/", response_model=List[TransactionSchema], status_code=status.HTTP_200_OK)
def read(db: Session = Depends(get_db), current_user: UserSchema = Depends(get_current_user)):
    db_transactions = get_transactions(db=db, user_id=current_user.id)
    if not db_transactions:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No transactions found for the current user, Please add transactions to fetch them")
    return db_transactions

@router.put("/{transaction_id}", response_model=TransactionSchema,status_code=status.HTTP_200_OK)
def update(transaction_id: int, transaction: TransactionCreateSchema, db: Session = Depends(get_db), current_user: UserSchema = Depends(get_current_user)):
    db_transaction = update_transaction(db=db, transaction_id=transaction_id, user_id=current_user.id, transaction=transaction)
    if db_transaction is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Transaction not found")
    return db_transaction

@router.delete("/{transaction_id}", response_model=TransactionSchema,status_code=status.HTTP_200_OK)
def delete(transaction_id: int, db: Session = Depends(get_db), current_user: UserSchema = Depends(get_current_user)):
    db_transaction = delete_transaction(db=db, transaction_id=transaction_id, user_id=current_user.id)
    if db_transaction is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Transaction not found")
    return db_transaction