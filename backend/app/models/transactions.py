from sqlalchemy import ForeignKey, Integer, String, Float, DateTime
from sqlalchemy.orm import mapped_column, relationship
from sqlalchemy.sql import func


from .user import User
from .database import Base



class Transaction(Base):
    __tablename__ = "transactions"

    transaction_id = mapped_column(Integer, primary_key=True, index=True)
    user_id = mapped_column(Integer, ForeignKey("users.id"))
    date = mapped_column(DateTime(timezone=True), server_default=func.now())
    amount = mapped_column(Float)
    transaction_type = mapped_column(String)  # 'expense', 'income', etc.
    category = mapped_column(String)
    description = mapped_column(String)

    user = relationship("User", back_populates="transactions")