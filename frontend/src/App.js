import React, { useState, useEffect } from 'react';

function App() {
  const [backendStatus, setBackendStatus] = useState('checking...');
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [feed, setFeed] = useState([]);

  useEffect(() => {
    // Check backend health
    fetch('http://localhost:8000/api/health')
      .then(response => response.json())
      .then(data => setBackendStatus(data.status))
      .catch(() => setBackendStatus('unreachable'));

    // Fetch users
    fetch('http://localhost:8000/api/users')
      .then(response => response.json())
      .then(data => setUsers(data.users || []))
      .catch(() => setUsers([]));

    // Fetch posts
    fetch('http://localhost:8000/posts')
      .then(response => response.json())
      .then(data => setPosts(data || []))
      .catch(() => setPosts([]));

    // Fetch feed
    fetch('http://localhost:8000/feed')
      .then(response => response.json())
      .then(data => setFeed(data.feed || []))
      .catch(() => setFeed([]));
  }, []);

  const containerStyle = {
    fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
    backgroundColor: '#0f172a',
    minHeight: '100vh',
    color: 'white',
    padding: '2rem'
  };

  const headerStyle = {
    textAlign: 'center',
    marginBottom: '3rem'
  };

  const titleStyle = {
    fontSize: '3rem',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: '1rem'
  };

  const cardStyle = {
    backgroundColor: '#1e293b',
    borderRadius: '0.75rem',
    padding: '2rem',
    marginBottom: '2rem',
    border: '1px solid #334155'
  };

  const statusColor = backendStatus === 'healthy' ? '#10b981' : '#ef4444';

  return (
    <div style={containerStyle}>
      <header style={headerStyle}>
        <h1 style={titleStyle}>DevZone</h1>
        <p style={{ color: '#94a3b8', fontSize: '1.2rem' }}>
          Social Media for Developers
        </p>
        <div style={{ 
          display: 'inline-block',
          marginTop: '1rem',
          padding: '0.5rem 1rem',
          backgroundColor: statusColor,
          borderRadius: '0.5rem',
          fontWeight: 'bold'
        }}>
          Backend: {backendStatus}
        </div>
      </header>

      <div style={cardStyle}>
        <h2>📊 System Status</h2>
        <p>Backend API: <span style={{ color: statusColor, fontWeight: 'bold' }}>{backendStatus}</span></p>
        <p>Frontend: <span style={{ color: '#10b981', fontWeight: 'bold' }}>Running</span></p>
        <p>Database: <span style={{ color: '#10b981', fontWeight: 'bold' }}>Connected</span></p>
        
        <div style={{ marginTop: '1.5rem' }}>
          <a href="http://localhost:8000/docs" style={{
            backgroundColor: '#3b82f6',
            color: 'white',
            padding: '0.75rem 1.5rem',
            borderRadius: '0.5rem',
            textDecoration: 'none',
            display: 'inline-block',
            marginRight: '1rem',
            fontWeight: 'bold'
          }}>
            📚 API Documentation
          </a>
          <a href="http://localhost:8000" style={{
            backgroundColor: '#8b5cf6',
            color: 'white',
            padding: '0.75rem 1.5rem',
            borderRadius: '0.5rem',
            textDecoration: 'none',
            display: 'inline-block',
            fontWeight: 'bold'
          }}>
            ⚡ Backend API
          </a>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        <div style={cardStyle}>
          <h2>👥 Developer Community ({users.length})</h2>
          <div style={{ marginTop: '1rem' }}>
            {users.map(user => (
              <div key={user.id} style={{
                backgroundColor: '#0f172a',
                padding: '1rem',
                borderRadius: '0.5rem',
                marginBottom: '0.5rem',
                border: '1px solid #334155'
              }}>
                <div style={{ fontWeight: 'bold' }}>{user.username}</div>
                <div style={{ color: '#64748b', fontSize: '0.9rem' }}>{user.role}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={cardStyle}>
          <h2>💻 Recent Posts ({posts.length})</h2>
          <div style={{ marginTop: '1rem' }}>
            {posts.map(post => (
              <div key={post.id} style={{
                backgroundColor: '#0f172a',
                padding: '1rem',
                borderRadius: '0.5rem',
                marginBottom: '0.5rem',
                border: '1px solid #334155'
              }}>
                <div style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>{post.content.substring(0, 50)}...</div>
                <div style={{ color: '#64748b', fontSize: '0.9rem' }}>
                  <span style={{ backgroundColor: '#334155', padding: '0.2rem 0.5rem', borderRadius: '0.25rem' }}>
                    {post.language}
                  </span>
                  <span style={{ marginLeft: '0.5rem' }}>by {post.owner?.username || 'Anonymous'}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={cardStyle}>
        <h2>🚀 Developer Feed ({feed.length})</h2>
        <div style={{ marginTop: '1rem' }}>
          {feed.map(item => (
            <div key={item.id} style={{
              backgroundColor: '#0f172a',
              padding: '1.5rem',
              borderRadius: '0.75rem',
              marginBottom: '1rem',
              border: '1px solid #334155'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: '#334155',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '1rem',
                  fontSize: '1.5rem'
                }}>
                  {item.user?.avatar || '👨‍💻'}
                </div>
                <div>
                  <div style={{ fontWeight: 'bold' }}>{item.user?.username}</div>
                  <div style={{ color: '#64748b', fontSize: '0.9rem' }}>{item.created_at}</div>
                </div>
              </div>
              <p style={{ marginBottom: '1rem' }}>{item.content}</p>
              {item.code_snippet && (
                <pre style={{
                  backgroundColor: '#1a1a1a',
                  padding: '1rem',
                  borderRadius: '0.5rem',
                  overflowX: 'auto',
                  fontSize: '0.9rem',
                  marginBottom: '1rem'
                }}>
                  <code>{item.code_snippet}</code>
                </pre>
              )}
              <div style={{ display: 'flex', gap: '1rem', color: '#64748b' }}>
                <span>❤️ {item.likes || 0}</span>
                <span>💬 {item.comments || 0}</span>
                <span style={{ marginLeft: 'auto' }}>{item.language}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <footer style={{ 
        textAlign: 'center', 
        color: '#64748b',
        marginTop: '3rem',
        paddingTop: '2rem',
        borderTop: '1px solid #334155'
      }}>
        <p>DevZone v1.0.0 • Built with FastAPI & React</p>
        <p style={{ marginTop: '0.5rem', fontSize: '0.9rem' }}>
          Backend: http://localhost:8000 • Frontend: http://localhost:3000
        </p>
      </footer>
    </div>
  );
}

export default App;
