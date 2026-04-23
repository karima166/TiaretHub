"""
Seed script — populates the database with initial categories and platform content.
Run: python -m app.seed
"""
from .database import SessionLocal, engine, Base
from .models.category import Category
from .models.platform import PlatformContent


def seed():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()

    # ── Categories ──
    if db.query(Category).count() == 0:
        categories = [
            Category(name="Plumbing",     icon="🔧", color="#1a1a2e", image_url="https://images.unsplash.com/photo-1585704032915-c3400305e979?w=400&q=80", is_active=True, display_order=1),
            Category(name="Electrical",   icon="⚡", color="#1971c2", image_url="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80", is_active=True, display_order=2),
            Category(name="Painting",     icon="🎨", color="#2f9e44", image_url="https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?w=400&q=80", is_active=True, display_order=3),
            Category(name="Carpentry",    icon="🪚", color="#7048e8", image_url="https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&q=80", is_active=True, display_order=4),
            Category(name="AC & HVAC",    icon="❄️", color="#0ca678", image_url="https://images.unsplash.com/photo-1631545806609-e1cf7b07e5e9?w=400&q=80", is_active=True, display_order=5),
            Category(name="Cleaning",     icon="🧹", color="#e64980", image_url="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&q=80", is_active=True, display_order=6),
            Category(name="Gardening",    icon="🌿", color="#f76707", image_url="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&q=80", is_active=True, display_order=7),
            Category(name="Construction", icon="🏗️", color="#1a1a2e", image_url="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&q=80", is_active=True, display_order=8),
        ]
        db.add_all(categories)
        print(f"✅ Seeded {len(categories)} categories")

    # ── Platform Content ──
    if db.query(PlatformContent).count() == 0:
        content = [
            PlatformContent(key="hero_title",    value="Find Skilled Service Providers\nAcross Tiaret Wilaya", content_type="text"),
            PlatformContent(key="hero_subtitle", value="Browse trusted plumbers, electricians, painters and more across Tiaret wilaya. View their profiles and contact them directly — no fees, no hassle.", content_type="text"),
            PlatformContent(key="hero_badge",    value="📍 Tiaret's Local Services Platform", content_type="text"),
            PlatformContent(key="cta_title",     value="Are You a Skilled Service Provider in Tiaret?", content_type="text"),
            PlatformContent(key="cta_subtitle",  value="Create your free profile, upload your CV, and start getting contacted by clients across Tiaret wilaya today.", content_type="text"),
            PlatformContent(key="stat_providers", value="85+", content_type="text"),
            PlatformContent(key="stat_services",  value="8", content_type="text"),
        ]
        db.add_all(content)
        print(f"✅ Seeded {len(content)} platform content entries")

    db.commit()
    db.close()
    print("🎉 Database seeding complete!")


if __name__ == "__main__":
    seed()
