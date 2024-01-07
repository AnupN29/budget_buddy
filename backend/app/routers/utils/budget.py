from sqlalchemy.orm import Session
from typing import List
from schemas.budget import BudgetCreate as BudgetCreateSchema, Budget as BudgetSchema
from models.budget import Budget as BudgetModel

def create_budget(db: Session, user_id: int, budget: BudgetCreateSchema):
    db_budget = BudgetModel(user_id=user_id,
                            start_date = budget.start_date,
                            end_date = budget.end_date,
                            amount=budget.amount, 
                            category=budget.category, 
                            description=budget.description,
                            is_active=budget.is_active)
    db.add(db_budget)
    db.commit()
    db.refresh(db_budget)
    return db_budget


def get_budgets(db: Session, user_id: int) -> List[BudgetSchema]:
    budgets = db.query(BudgetModel).filter(BudgetModel.user_id == user_id).all()
    return budgets

def get_budget_by_id(db: Session, budget_id: int, user_id: int):
    db_budget = db.query(BudgetModel).filter_by(budget_id=budget_id, user_id=user_id).first()

    if db_budget:
        return db_budget

    return None    


def update_budget(db: Session, budget_id: int, user_id: int, budget: BudgetCreateSchema):
    db_budget = db.query(BudgetModel).filter_by(budget_id=budget_id, user_id=user_id).first()

    if db_budget:
        db_budget.start_date = budget.start_date
        db_budget.end_date = budget.end_date
        db_budget.amount = budget.amount
        db_budget.category = budget.category
        db_budget.description = budget.description
        db_budget.is_active = budget.is_active

        db.commit()

        db.refresh(db_budget)

        return db_budget

    return None

def delete_budget(db: Session, budget_id: int, user_id: int):
    db_budget = db.query(BudgetModel).filter_by(budget_id=budget_id, user_id=user_id).first()

    if db_budget:
        db.delete(db_budget)
        db.commit()

        return db_budget

    return None