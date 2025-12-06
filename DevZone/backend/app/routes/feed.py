from fastapi import APIRouter

router = APIRouter(prefix="/feed", tags=["feed"])

@router.get("/")
async def get_feed():
    return {
        "feed": [
            {
                "id": 1,
                "content": "Just deployed my first Docker container! 🐳",
                "code_snippet": "docker run -d -p 8000:8000 my-app",
                "language": "bash",
                "user": {"id": 1, "username": "alice", "avatar": "👩‍💻"},
                "likes": 24,
                "comments": 5,
                "created_at": "2024-01-01T09:00:00Z"
            },
            {
                "id": 2,
                "content": "Learning TypeScript generics today. So powerful!",
                "code_snippet": "function identity<T>(arg: T): T {\n  return arg;\n}",
                "language": "typescript",
                "user": {"id": 2, "username": "bob", "avatar": "👨‍💻"},
                "likes": 18,
                "comments": 3,
                "created_at": "2024-01-01T08:30:00Z"
            },
            {
                "id": 3,
                "content": "Built a real-time chat with WebSockets and FastAPI",
                "code_snippet": "from fastapi import WebSocket\n\n@app.websocket('/ws')\nasync def websocket_endpoint(websocket: WebSocket):\n    await websocket.accept()\n    while True:\n        data = await websocket.receive_text()\n        await websocket.send_text(f'Message: {data}')",
                "language": "python",
                "user": {"id": 3, "username": "charlie", "avatar": "🧑‍💻"},
                "likes": 42,
                "comments": 12,
                "created_at": "2024-01-01T07:45:00Z"
            }
        ],
        "total": 3,
        "page": 1,
        "has_more": False
    }
