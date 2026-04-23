from pydantic import BaseModel
from typing import Optional


class CategoryOut(BaseModel):
    id: int
    name: str
    icon: str
    color: str
    image_url: Optional[str] = None
    providers_count: Optional[int] = 0
    is_active: bool
    display_order: int

    class Config:
        from_attributes = True


class CategoryCreate(BaseModel):
    name: str
    icon: str = "🔧"
    color: str = "#1a1a2e"
    image_url: Optional[str] = None
    providers_count: int = 0
    is_active: bool = True
    display_order: int = 0
