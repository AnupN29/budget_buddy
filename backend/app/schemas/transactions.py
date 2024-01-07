from pydantic import BaseModel
from typing import Optional

class Transaction(BaseModel):
    transaction_id:int
    user_id:int
    date:str
    amount:float
    transaction_type:str
    category: str
    description:Optional[str] = None

class TransactionCreate(BaseModel):
    amount:float
    transaction_type:str
    category: str
    description:Optional[str] = None

    class Config():
        from_attributes = True