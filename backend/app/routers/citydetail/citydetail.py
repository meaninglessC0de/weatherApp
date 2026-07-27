from fastapi import APIRouter, HTTPException, Body
from .weather import fetch
from ..models.cities import cities

router = APIRouter()

@router.get("/city/{code}")
async def weather_get(code: str):
    for country in cities:
        if country["code"] == code.upper():
            return await fetch(country["lat"], country["lon"], country["name"])
    raise HTTPException(status_code=404, detail="Country code not chosen.") 
