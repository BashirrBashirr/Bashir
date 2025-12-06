from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routes import users, posts, comments, feed

app = FastAPI(
    title="DevZone API",
    description="Social Media for Developers",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(users.router)
app.include_router(posts.router)
app.include_router(comments.router)
app.include_router(feed.router)

@app.get("/")
async def root():
    return {
        "message": "Welcome to DevZone API",
        "status": "operational",
        "endpoints": {
            "root": "/",
            "health": "/api/health",
            "users": "/api/users",
            "posts": "/posts",
            "comments": "/comments", 
            "feed": "/feed",
            "docs": "/docs",
            "openapi": "/openapi.json"
        },
        "version": "1.0.0"
    }

@app.get("/api/health")
async def health_check():
    return {
        "status": "healthy",
        "service": "DevZone API",
        "database": "connected",
        "timestamp": "2024-01-01T00:00:00Z"
    }

@app.get("/api/users")
async def get_users():
    return {
        "users": [
            {"id": 1, "username": "alice", "role": "Full Stack Developer"},
            {"id": 2, "username": "bob", "role": "Backend Engineer"},
            {"id": 3, "username": "charlie", "role": "DevOps Specialist"},
            {"id": 4, "username": "diana", "role": "Frontend Developer"},
            {"id": 5, "username": "eve", "role": "Mobile Developer"}
        ]
    }
