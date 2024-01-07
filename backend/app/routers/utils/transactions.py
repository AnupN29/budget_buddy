from sqlalchemy.orm import Session
from models.transactions import Transaction
from schemas.transactions import TransactionCreate

def create_transaction(db: Session, user_id: int, transaction: TransactionCreate):
    db_transaction = Transaction(user_id=user_id, amount=transaction.amount, category=transaction.category, description=transaction.description,
                                 transaction_type=transaction.transaction_type)
    db.add(db_transaction)
    db.commit()
    db.refresh(db_transaction)
    return db_transaction
