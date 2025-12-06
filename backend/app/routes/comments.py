from fastapi import APIRouter

router = APIRouter(prefix="/comments", tags=["comments"])

@router.get("/")
async def get_comments():
    return [
        {
            "id": 1,
            "content": "Great post! Thanks for sharing.",
            "user_id": 2,
            "post_id": 1,
            "created_at": "2024-01-01T10:15:00Z",
            "owner": {"id": 2, "username": "bob", "email": "bob@example.com"}
        },
        {
            "id": 2,
            "content": "This helped me solve my issue!",
            "user_id": 3,
            "post_id": 1,
            "created_at": "2024-01-01T10:30:00Z",
            "owner": {"id": 3, "username": "charlie", "email": "charlie@example.com"}
        }
    ]

@router.get("/{comment_id}")
async def get_comment(comment_id: int):
    return {
        "id": comment_id,
        "content": f"Comment {comment_id} content",
        "user_id": 1,
        "post_id": 1,
        "created_at": "2024-01-01T12:00:00Z",
        "owner": {"id": 1, "username": "dev_user", "email": "dev@example.com"}
    }
