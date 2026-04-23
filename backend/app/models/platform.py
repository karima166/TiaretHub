from sqlalchemy import Column, Integer, String, Text
from ..database import Base


class PlatformContent(Base):
    """Dynamic platform content — hero text, stats, etc."""
    __tablename__ = "platform_content"

    id = Column(Integer, primary_key=True, index=True)
    key = Column(String(100), nullable=False, unique=True)
    value = Column(Text, nullable=False)
    content_type = Column(String(50), default="text")  # text, number, json
