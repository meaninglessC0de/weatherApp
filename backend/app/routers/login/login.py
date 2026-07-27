from fastapi import APIRouter, HTTPException, Header, Depends
from .users import users
from ..models.user import User
import secrets
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm

login_router = APIRouter()

sessions = {}

@login_router.post("/signup")
def signup(user: User):
    if user.username in users:
        raise HTTPException(409, "invalid username") 
    users[user.username] = user
    return {'status':True}



@login_router.post("/login")
def login(user: User):
    rec = users.get(user.username)
    if rec is None or rec.password != user.password:
        raise HTTPException(401, "invalid details") 
    tok = secrets.token_urlsafe(24)
    sessions[tok] = user.username
    return {"token": tok, "token_type": "bearer"}

@login_router.post("/logout")
def logout(token: str = Header(None)):
    if not token:
        raise HTTPException(401, "missing token")
    sessions.pop(token, None)
    return {"ok": True}

def current_user(token: str = Header(None)):
    if not token:
        raise HTTPException(401, "missing token")
    username = sessions.get(token)
    if username is None:
        raise HTTPException(401, "invalid token")
    return username



@login_router.get("/current")
def current(username: str = Depends(current_user)):
    return {"username": username}