from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List, Dict, Any

from ..database import get_db
from ..models.platform import PlatformContent
from ..models.category import Category
from ..schemas.platform import PlatformContentOut

router = APIRouter(prefix="/platform", tags=["Platform"])


@router.get("/content", response_model=List[PlatformContentOut])
def get_platform_content(db: Session = Depends(get_db)):
    """Return all dynamic platform content (hero text, stats, etc.)."""
    return db.query(PlatformContent).all()


@router.get("/stats")
def get_platform_stats(db: Session = Depends(get_db)) -> Dict[str, Any]:
    """Return computed platform statistics for homepage."""
    total_categories = db.query(Category).filter(Category.is_active == True).count()
    total_providers = sum(
        c.providers_count
        for c in db.query(Category).filter(Category.is_active == True).all()
    )
    return {
        "total_providers": total_providers,
        "total_categories": total_categories,
        "platform_name": "TiaretHub",
    }
