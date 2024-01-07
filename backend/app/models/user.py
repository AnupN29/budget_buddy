from sqlalchemy import String,Integer
from sqlalchemy.orm import Mapped, mapped_column,relationship

from .transactions import Transaction
from .database import Base

class User(Base):
    __tablename__ = 'users'

    id = mapped_column(Integer,primary_key=True, index=True)
    email = mapped_column(String(30))
    name = mapped_column(String(30))
    password = mapped_column(String(100))

    transactions = relationship("Transaction", back_populates="user")
