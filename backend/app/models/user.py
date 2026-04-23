from sqlalchemy import Column, Integer, String, Boolean, DateTime
from datetime import datetime
from ..database import Base

class User(Base):
    """User model — supports both Clients and Providers."""
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(150), unique=True, index=True, nullable=False)
    password_hash = Column(String(255), nullable=False)
    
    first_name = Column(String(100), nullable=False)
    last_name = Column(String(100), nullable=False)
    
    role = Column(String(20), default="client")  # client, provider, admin
    is_active = Column(Boolean, default=True)
    is_verified = Column(Boolean, default=False)
    
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Provider specific fields (can be moved to a separate table later)
    phone = Column(String(20), nullable=True)
    bio = Column(String(500), nullable=True)
    city = Column(String(100), default="Tiaret")
