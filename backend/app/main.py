from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .database import engine, Base
from .routes import categories_router, platform_router

# Create all tables on startup
Base.metadata.create_all(bind=engine)

app = FastAPI(title="TiaretHub API", version="1.0.0")

# CORS — allow Vite dev server
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount routers
app.include_router(categories_router, prefix="/api")
app.include_router(platform_router, prefix="/api")


@app.get("/api/health")
def health_check():
    return {"status": "ok", "platform": "TiaretHub"}
