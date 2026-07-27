from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

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


@app.get("/")
def health():
    return {"health": "okay"}


cities = [
    {"id": 1, "city": "Bangalore"},
    {"id": 2, "city": "Mumbai"},
    {"id": 3, "city": "Delhi"},
    {"id": 4, "city": "Chennai"},
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

    cities.append(
        {
            "id": new_id,
            "city": new_city.city,
        }
    )

    return {
        "message": "City added successfully"
    }

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
        
    