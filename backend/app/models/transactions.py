from sqlalchemy import ForeignKey, Integer, String, Float, DateTime
from sqlalchemy.orm import Mapped,mapped_column, relationship
from sqlalchemy.sql import func
from datetime import datetime


from .database import Base



class Transaction(Base):
    __tablename__ = "transactions"

    transaction_id:Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    user_id:Mapped[int] = mapped_column(Integer, ForeignKey("users.id"))
    date:Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    amount:Mapped[float] = mapped_column(Float)
    transaction_type:Mapped[str] = mapped_column(String(30))  # 'expense', 'income', etc.
    category:Mapped[str] = mapped_column(String(30))
    description:Mapped[str] = mapped_column(String(100))

    user:Mapped["User"] = relationship(back_populates="transactions")

from .user import User
