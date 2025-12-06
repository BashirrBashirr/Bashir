import React, { useState } from 'react';
import { FaHeart, FaComment, FaShare, FaBookmark, FaGithub } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-typescript';
import { formatDistanceToNow } from 'date-fns';

const Post = ({ post }) => {
    const [liked, setLiked] = useState(false);
    const [bookmarked, setBookmarked] = useState(false);

    const handleLike = () => {
        setLiked(!liked);
        // API call to like/unlike
    };

    const handleBookmark = () => {
        setBookmarked(!bookmarked);
        // API call to bookmark
    };

    React.useEffect(() => {
        Prism.highlightAll();
    }, [post.code_snippet]);

    return (
        <div className="post-card">
            <div className="post-header">
                <img 
                    src={post.owner.avatar_url || '/default-avatar.png'} 
                    alt={post.owner.username}
                    className="avatar"
                />
                <div className="post-user-info">
                    <h4>{post.owner.full_name || post.owner.username}</h4>
                    <p className="post-meta">
                        @{post.owner.username} · {formatDistanceToNow(new Date(post.created_at))} ago
                    </p>
                </div>
                {post.owner.github_url && (
                    <a 
                        href={post.owner.github_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="github-link"
                    >
                        <FaGithub />
                    </a>
                )}
            </div>
            
            <div className="post-content">
                <ReactMarkdown>{post.content}</ReactMarkdown>
                
                {post.code_snippet && (
                    <div className="code-snippet">
                        <div className="code-header">
                            <span>{post.language || 'Code'}</span>
                        </div>
                        <pre>
                            <code className={`language-${post.language || 'javascript'}`}>
                                {post.code_snippet}
                            </code>
                        </pre>
                    </div>
                )}
            </div>
            
            <div className="post-actions">
                <button 
                    className={`action-btn ${liked ? 'liked' : ''}`}
                    onClick={handleLike}
                >
                    <FaHeart /> {post.likes || 0}
                </button>
                <button className="action-btn">
                    <FaComment /> {post.comments_count || 0}
                </button>
                <button className="action-btn">
                    <FaShare /> Share
                </button>
                <button 
                    className={`action-btn bookmark-btn ${bookmarked ? 'bookmarked' : ''}`}
                    onClick={handleBookmark}
                >
                    <FaBookmark />
                </button>
            </div>
        </div>
    );
};

export default Post;
