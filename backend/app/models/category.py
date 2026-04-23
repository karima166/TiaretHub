from sqlalchemy import Column, Integer, String, Boolean
from ..database import Base


class Category(Base):
    """Service categories displayed on homepage and browse page."""
    __tablename__ = "categories"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False, unique=True)
    icon = Column(String(10), nullable=False, default="🔧")
    color = Column(String(20), nullable=False, default="#1a1a2e")
    image_url = Column(String(500), nullable=True)
    is_active = Column(Boolean, default=True)
    display_order = Column(Integer, default=0)
