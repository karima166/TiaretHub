from pydantic import BaseModel


class PlatformContentOut(BaseModel):
    id: int
    key: str
    value: str
    content_type: str

    class Config:
        from_attributes = True
