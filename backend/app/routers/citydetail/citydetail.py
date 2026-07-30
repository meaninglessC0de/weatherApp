from fastapi import APIRouter, HTTPException, Body
from .weather import fetch
from .attractions import fetch_attractions
from ...models.cities import cities
router = APIRouter()

@router.get("/city/{code}")
async def weather_get(code: str):
    for country in cities:
        if country["code"] == code.upper():
            return await fetch(country["lat"], country["lon"], country["name"])
    raise HTTPException(status_code=404, detail="Country code not chosen.") 

@router.get("/city/{code}/activities")
async def get_activities(code: str):
    for country in cities:
        if country["code"] == code.upper():

            weather = await fetch(country["lat"], country["lon"], country["name"])
            condition = weather["desc"].lower()

            if "rain" in condition:
                activities = [
                    "Visit a museum",
                    "Relax at a cafe",
                    "Go shopping"
                ]
            elif "clear" in condition:
                activities = [
                    "Go sightseeing",
                    "Visit a park",
                    "Take a walking tour"
                ]
            elif "cloud" in condition:
                activities = [
                    "Photography walk",
                    "Explore the city",
                    "Visit local markets"
                ]
            else:
                activities = [
                    "Explore indoor attractions"
                ]

            return {"activities": activities}

    raise HTTPException(status_code=404, detail="Country code not chosen.")

@router.get("/city/{code}/attractions")
async def get_attractions(code: str):
    for country in cities:
        if country["code"] == code.upper():
            attractions = await fetch_attractions(
                country["lat"],
                country["lon"],
            )

            return {"attractions": attractions}

    raise HTTPException(
        status_code=404,
        detail="Country code not chosen."
    )