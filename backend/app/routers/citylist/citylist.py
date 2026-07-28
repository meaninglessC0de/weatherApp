from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from ...models.cities import cities as all_cities
from ...models.chosen import chosen

router = APIRouter()


@router.get("/cities/all")
def get_all_cities():
    return all_cities


@router.get("/cities/{user}")
def get_cities(user: str):
    return chosen.setdefault(user, [])


class InCity(BaseModel):
    code: str


@router.post("/cities/{user}")
def add_city(user: str, new_city: InCity):

    selected_city = next(
        (
            city for city in all_cities
            if city["code"].upper() == new_city.code.upper()
        ),
        None,
    )

    if selected_city is None:
        raise HTTPException(status_code=404, detail="City not found")

    user_cities = chosen.setdefault(user, [])

    if any(city["code"] == selected_city["code"] for city in user_cities):
        return {"message": "City already added"}

    user_cities.append(
        {
            "name": selected_city["name"],
            "code": selected_city["code"],
            "lat": selected_city["lat"],
            "lon": selected_city["lon"],
        }
    )

    return {"message": "City added successfully"}


@router.delete("/cities/{user}/{code}")
def delete_city(user: str, code: str):

    user_cities = chosen.setdefault(user, [])

    user_cities[:] = [
        city for city in user_cities
        if city["code"] != code
    ]

    return {
        "message": "City deleted successfully"
    }
