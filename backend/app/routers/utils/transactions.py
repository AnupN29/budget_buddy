from sqlalchemy.orm import Session
from typing import List
from models.transactions import Transaction
from schemas.transactions import TransactionCreate as TransactionCreateSchema, Transaction as TransactionSchema
from models.transactions import Transaction as TransactionModel

def create_transaction(db: Session, user_id: int, transaction: TransactionCreateSchema):
    db_transaction = TransactionModel(user_id=user_id, 
                                       amount=transaction.amount, 
                                       category=transaction.category, 
                                       description=transaction.description,
                                       transaction_type=transaction.transaction_type)
    db.add(db_transaction)
    db.commit()
    db.refresh(db_transaction)
    return db_transaction


def get_transactions(db: Session, user_id: int) -> List[TransactionSchema]:
    transactions = db.query(TransactionModel).filter(TransactionModel.user_id == user_id).all()
    return transactions


def update_transaction(db: Session, transaction_id: int, user_id: int, transaction: TransactionCreateSchema):
    db_transaction = db.query(TransactionModel).filter_by(transaction_id=transaction_id, user_id=user_id).first()

    if db_transaction:
        db_transaction.amount = transaction.amount
        db_transaction.category = transaction.category
        db_transaction.description = transaction.description
        db_transaction.transaction_type = transaction.transaction_type

        db.commit()

        db.refresh(db_transaction)

        return db_transaction

    return None

def delete_transaction(db: Session, transaction_id: int, user_id: int):
    db_transaction = db.query(TransactionModel).filter_by(transaction_id=transaction_id, user_id=user_id).first()

    if db_transaction:
        db.delete(db_transaction)
        db.commit()

        return db_transaction

    return None