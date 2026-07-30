import httpx
from app.config import settings

_client = httpx.AsyncClient(timeout=10.0)

async def fetch_attractions(lat: float, lon: float) -> list:
    r = await _client.get(
        "https://api.opentripmap.com/0.1/en/places/radius",
        params={
            "radius": 15000,
            "lon": lon,
            "lat": lat,
            "kinds": "museums,architecture,historic,cultural,natural",
            "limit": 5,
            "apikey": settings.opentripmap_api_key,
            "format": "json"
        },
    )

    data = r.json()

    attractions = []

    for place in data:
        name = place.get("name", "").strip()

        if name:
            attractions.append({
                "name": name
        })

    return attractions