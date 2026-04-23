from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    DATABASE_URL: str = "postgresql://postgres:123@localhost:5432/TiaretHub"
    APP_NAME: str = "TiaretHub API"
    DEBUG: bool = True

    class Config:
        env_file = ".env"
        extra = "ignore"


settings = Settings()
