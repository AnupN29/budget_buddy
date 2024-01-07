from fastapi import FastAPI, Depends,status
from fastapi.middleware.cors import CORSMiddleware

from models.database import engine
from models.database import Base
from routers import user as user_router, transactions as tansaction_router
from schemas.user import UserLogin
from dependencies import get_current_user
Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(user_router.router)
app.include_router(tansaction_router.router)

origins = [
    "http://localhost",           
    "http://localhost:5173",      
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/",status_code=status.HTTP_200_OK)
def read_root():
    return {"message": "Welcome to the Personal Budget Tracker!"}

@app.get("/profile",status_code=status.HTTP_200_OK)
def read_root(current_user: UserLogin = Depends(get_current_user)):
    return {"message": "Welcome to your profile page"}


