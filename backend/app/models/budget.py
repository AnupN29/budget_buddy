from sqlalchemy import ForeignKey, Integer, String, Float, Date,Boolean
from sqlalchemy.orm import Mapped,mapped_column, relationship
from sqlalchemy.sql import func
from datetime import date


from .database import Base



class Budget(Base):
    __tablename__ = "budgets"

    budget_id:Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    user_id:Mapped[int] = mapped_column(Integer, ForeignKey("users.id"))
    start_date:Mapped[date] = mapped_column(Date)
    end_date:Mapped[date] = mapped_column(Date)
    amount:Mapped[float] = mapped_column(Float)
    category:Mapped[str] = mapped_column(String(30))
    description:Mapped[str] = mapped_column(String(100))
    is_active:Mapped[bool] = mapped_column(Boolean, default=True)

    user:Mapped["User"] = relationship(back_populates="budget")

from .user import User
