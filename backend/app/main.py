from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers.login import login
from .routers.citydetail import citydetail

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

@app.get("/")
def health():
    return {"health":"okay"}