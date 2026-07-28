from pydantic import BaseModel

class City(BaseModel):
    name: str
    code: str
    lat: float
    lon: float 

