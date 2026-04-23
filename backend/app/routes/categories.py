from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List

from ..database import get_db
from ..models.category import Category
from ..schemas.category import CategoryOut

router = APIRouter(prefix="/categories", tags=["Categories"])


@router.get("/", response_model=List[CategoryOut])
def get_categories(active_only: bool = False, db: Session = Depends(get_db)):
    """Return all service categories. Optional filter for active-only."""
    query = db.query(Category)
    if active_only:
        query = query.filter(Category.is_active == True)
    return query.order_by(Category.display_order).all()


@router.get("/{category_id}", response_model=CategoryOut)
def get_category(category_id: int, db: Session = Depends(get_db)):
    """Return a single category by ID."""
    return db.query(Category).filter(Category.id == category_id).first()
