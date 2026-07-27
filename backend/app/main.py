from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers.login import login
from .routers.citydetail import citydetail
from .routers.models.cities import cities as all_cities

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
    return {"health": "okay"}


cities = [
    {
        "id": 1,
        "name": "London",
        "code": "GB",
        "lat": 51.5074,
        "lon": -0.1278,
    }
]



@app.get("/cities")
def get_cities():
    return cities

from pydantic import BaseModel


class City(BaseModel):
    city: str


@app.post("/cities")
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

@app.delete("/cities/{city_id}")
def delete_city(city_id: int):

    global cities

    cities = [
        city for city in cities
        if city["id"] != city_id
    ]

    return {
        "message": "City deleted successfully"
    }
        
    