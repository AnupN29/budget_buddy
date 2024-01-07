from fastapi import APIRouter, Depends,status,HTTPException
from sqlalchemy.orm import Session

from dependencies import get_db,get_current_user
from schemas.budget import Budget as BudgetSchema,BudgetCreate as BudgetCreateSchema
from schemas.user import User as UserSchema
from .utils.budget import *

router = APIRouter(
    prefix="/bugets",
    tags=["Budgets"]
)

@router.post("/", response_model=BudgetSchema,status_code=status.HTTP_201_CREATED)
def create(budget: BudgetCreateSchema, db: Session = Depends(get_db), current_user: UserSchema = Depends(get_current_user)):
    return create_budget(db=db, user_id=current_user.id, budget=budget)


@router.get("/", response_model=List[BudgetSchema], status_code=status.HTTP_200_OK)
def read(db: Session = Depends(get_db), current_user: UserSchema = Depends(get_current_user)):
    db_budgets = get_budgets(db=db, user_id=current_user.id)
    if not db_budgets:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No budgets found for the current user, Please add budgets to fetch them")
    return db_budgets

@router.get("/{budget_id}", response_model=BudgetSchema, status_code=status.HTTP_200_OK)
def read(budget_id: int, db: Session = Depends(get_db), current_user: UserSchema = Depends(get_current_user)):
    db_budget = get_budget_by_id(db=db, budget_id=budget_id,user_id=current_user.id)
    if not db_budget:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No budgets found for the current user, Please add budgets to fetch them")
    return db_budget

@router.put("/{budget_id}", response_model=BudgetSchema,status_code=status.HTTP_200_OK)
def update(budget_id: int, budget: BudgetCreateSchema, db: Session = Depends(get_db), current_user: UserSchema = Depends(get_current_user)):
    db_budget = update_budget(db=db, budget_id=budget_id, user_id=current_user.id, budget=budget)
    if db_budget is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Budgets not found")
    return db_budget

@router.delete("/{budget_id}", response_model=BudgetSchema,status_code=status.HTTP_200_OK)
def delete(budget_id: int, db: Session = Depends(get_db), current_user: UserSchema = Depends(get_current_user)):
    db_budget = delete_budget(db=db, budget_id=budget_id, user_id=current_user.id)
    if db_budget is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Budgets not found")
    return db_budget