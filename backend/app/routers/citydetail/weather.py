import httpx
from datetime import datetime
from app.config import settings

_client = httpx.AsyncClient(timeout=10.0)


async def fetch(lat: float, lon: float, name: str) -> dict:
    r = await _client.get(
        "https://api.openweathermap.org/data/2.5/weather",
        params={"lat": lat, "lon": lon, "appid": settings.weather_api_key, "units": "metric"},
    )
    data = r.json()
    f = await _client.get(
        "https://api.openweathermap.org/data/2.5/forecast",
        params={"lat": lat, "lon": lon, "appid": settings.weather_api_key, "units": "metric"},
    )
    arr = []
    for day in f.json()["list"][::10]:
        d = datetime.strptime(day["dt_txt"], "%Y-%m-%d %H:%M:%S")
        suffix = None 
        hmap = {1: "st", 2: "nd", 3: "rd"}
        if 11 <= d.day <= 13:
            suffix = "th"
        else: 
            mod = d.day % 10
            suffix = hmap.get(mod,"th")
        arr.append({
            "time": f"{d.day}{suffix} {d:%B}", # convert to date.
            "temp": day["main"]["temp"],
            "desc": day["weather"][0]["description"],
            "icon": day["weather"][0]["icon"],
            "pop": round(day["pop"] * 100),
        })
    return {
    "temp": data["main"]["temp"],
    "desc": data["weather"][0]["description"],
    "name": name,
    "lat": lat,
    "lon": lon,
    "forecast": arr,
    }