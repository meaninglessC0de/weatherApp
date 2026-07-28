from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers.login import login
from .routers.citydetail import citydetail
from .routers.models.cities import cities as all_cities
from .routers.citylist import citylist
from pydantic import BaseModel

app = FastAPI()

origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(login.login_router)
app.include_router(citydetail.router)
app.include_router(citylist.router)

# City List code:


        
    