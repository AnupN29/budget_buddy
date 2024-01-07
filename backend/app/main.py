from fastapi import FastAPI, Depends,status
from fastapi.middleware.cors import CORSMiddleware

from models.database import engine
from models.database import Base
from routers import user as user_router, transactions as tansaction_router, budget as budget_router
Base.metadata.create_all(bind=engine)

app = FastAPI()


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


app.include_router(user_router.router)
app.include_router(tansaction_router.router)
app.include_router(budget_router.router)


# @app.get("/",status_code=status.HTTP_200_OK)
# def read_root():
#     return {"message": "Welcome to the Personal Budget Tracker!"}

