from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from ..models.cities import cities as all_cities

router = APIRouter()

cities = [
    {
        "id": 1,
        "name": "London",
        "code": "GB",
        "lat": 51.5074,
        "lon": -0.1278,
    }
]


@router.get("/cities")
def get_cities():
    return cities

class City(BaseModel):
    city: str


@router.post("/cities")
def add_city(new_city: City):

    new_id = len(cities) + 1

    selected_city = next(
        (
            city for city in all_cities
            if city["name"].lower() == new_city.city.lower()
        ),
        None,
    )

    if selected_city is None:
        return {"message": "City not found"}

    cities.append(
        {
            "id": new_id,
            "name": selected_city["name"],
            "code": selected_city["code"],
            "lat": selected_city["lat"],
            "lon": selected_city["lon"],
        }
    )

    return {"message": "City added successfully"}

@router.delete("/cities/{city_id}")
def delete_city(city_id: int):

    global cities

    cities = [
        city for city in cities
        if city["id"] != city_id
    ]

    return {
        "message": "City deleted successfully"
    }