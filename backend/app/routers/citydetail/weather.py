import httpx
from app.config import settings

_client = httpx.AsyncClient(timeout=10.0)


async def fetch(lat: float, lon: float, name: str) -> dict:
    r = await _client.get(
        "https://api.openweathermap.org/data/2.5/weather",
        params={"lat": lat, "lon": lon, "appid": settings.weather_api_key, "units": "metric"},
    )
    data = r.json()
    return {"temp": data["main"]["temp"], "desc": data["weather"][0]["description"], "name": name}