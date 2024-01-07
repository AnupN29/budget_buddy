from pydantic import BaseModel
from typing import Optional
from datetime import date


class Budget(BaseModel):
    budget_id:int
    user_id:int
    start_date:date
    end_date:date
    amount:float
    category: str
    description:Optional[str] = None
    is_active:Optional[bool] = True

class BudgetCreate(BaseModel):
    start_date:date
    end_date:date
    amount:float
    category: str
    description:Optional[str] = None
    is_active:Optional[bool] = True

    class Config():
        from_attributes = True