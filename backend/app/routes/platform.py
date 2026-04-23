from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List, Dict, Any

from ..database import get_db
from ..models.platform import PlatformContent
from ..models.category import Category
from ..models.user import User
from ..schemas.platform import PlatformContentOut

router = APIRouter(prefix="/platform", tags=["Platform"])


@router.get("/content")
def get_platform_content(db: Session = Depends(get_db)) -> Dict[str, str]:
    """Return dynamic platform content as a flat key-value dictionary."""
    content = db.query(PlatformContent).all()
    return {item.key: item.value for item in content}


@router.get("/stats")
def get_platform_stats(db: Session = Depends(get_db)) -> Dict[str, Any]:
    """Return computed platform statistics for homepage."""
    total_categories = db.query(Category).filter(Category.is_active == True).count()
    
    # Real count of providers from the users table
    total_providers = db.query(User).filter(
        User.role == "provider", 
        User.is_active == True
    ).count()

    return {
        "total_providers": str(total_providers),
        "total_categories": str(total_categories),
        "platform_name": "TiaretHub",
    }
