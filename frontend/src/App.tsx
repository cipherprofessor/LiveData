import React from 'react';
import './App.css';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>🔄 SkillSwap India</h1>
        <p className="tagline">सीखो और सिखाओ - Learn & Teach, Trade Skills Not Money</p>
      </header>

      <main className="app-main">
        <section className="hero">
          <h2>India's First Peer-to-Peer Skill Exchange Platform</h2>
          <p>Connect with people who teach what you want to learn, and learn what they want to teach.</p>

          <div className="cta-buttons">
            <button className="btn btn-primary">Get Started - It's Free</button>
            <button className="btn btn-secondary">How It Works</button>
          </div>
        </section>

        <section className="features">
          <div className="feature-card">
            <div className="feature-icon">💻</div>
            <h3>Learn Any Skill</h3>
            <p>From coding to cooking, guitar to graphic design - learn from real people.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🎯</div>
            <h3>AI Matching</h3>
            <p>Smart algorithm finds perfect matches based on skills, location, and ratings.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🏆</div>
            <h3>Gamification</h3>
            <p>Earn SkillCoins, unlock badges, and climb leaderboards as you learn and teach.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">💰</div>
            <h3>100% Free</h3>
            <p>No course fees. Trade your knowledge for knowledge you need. Zero rupees spent.</p>
          </div>
        </section>

        <section className="stats">
          <div className="stat">
            <div className="stat-value">10,000+</div>
            <div className="stat-label">Active Users</div>
          </div>
          <div className="stat">
            <div className="stat-value">5,000+</div>
            <div className="stat-label">Skills Swapped</div>
          </div>
          <div className="stat">
            <div className="stat-value">50+</div>
            <div className="stat-label">Cities</div>
          </div>
        </section>

        <section className="transformation-notice">
          <h3>🚧 Platform Under Construction</h3>
          <p>
            SkillSwap India is currently being transformed from LiveData.
            New features including skill matching, swaps, and gamification are coming soon!
          </p>
          <div className="progress-info">
            <strong>Transformation Progress: 60%</strong>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: '60%' }}></div>
            </div>
          </div>
        </section>
      </main>

      <footer className="app-footer">
        <p>&copy; 2025 SkillSwap India. Empowering India's youth through peer-to-peer skill exchange.</p>
        <p>Made with ❤️ in India</p>
      </footer>
    </div>
  );
}

export default App;
