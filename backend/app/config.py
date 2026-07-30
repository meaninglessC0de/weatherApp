from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    weather_api_key: str
    opentripmap_api_key: str
    model_config = {"env_file": ".env"}
    
settings = Settings()