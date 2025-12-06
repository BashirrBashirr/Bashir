from fastapi import APIRouter

router = APIRouter(prefix="/posts", tags=["posts"])

@router.get("/")
async def get_posts():
    return [
        {
            "id": 1,
            "content": "Just learned about FastAPI! It's amazing!",
            "code_snippet": "from fastapi import FastAPI\n\napp = FastAPI()\n\n@app.get('/')\ndef root():\n    return {'message': 'Hello World'}",
            "language": "python",
            "user_id": 1,
            "created_at": "2024-01-01T10:00:00Z",
            "owner": {"id": 1, "username": "alice", "email": "alice@example.com"}
        },
        {
            "id": 2, 
            "content": "Working on a new React hook for state management",
            "code_snippet": "const useDevState = (initial) => {\n  const [state, setState] = useState(initial);\n  return [state, setState];\n};",
            "language": "javascript",
            "user_id": 2,
            "created_at": "2024-01-01T11:00:00Z",
            "owner": {"id": 2, "username": "bob", "email": "bob@example.com"}
        }
    ]

@router.get("/{post_id}")
async def get_post(post_id: int):
    return {
        "id": post_id,
        "content": f"Post {post_id} content",
        "code_snippet": "print(f'Post {post_id}')",
        "language": "python",
        "user_id": 1,
        "created_at": "2024-01-01T12:00:00Z",
        "owner": {"id": 1, "username": "dev_user", "email": "dev@example.com"}
    }
