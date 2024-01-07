from sqlalchemy import String,Integer
from sqlalchemy.orm import Mapped, mapped_column,relationship
from typing import List

from .database import Base

class User(Base):
    

    __tablename__ = 'users'

    id:Mapped[int] = mapped_column(Integer,primary_key=True, index=True)
    email:Mapped[str] = mapped_column(String(30))
    name:Mapped[str] = mapped_column(String(30))
    password:Mapped[str] = mapped_column(String(100))

    transactions: Mapped[List["Transaction"]] = relationship(back_populates="user")

from .transactions import Transaction