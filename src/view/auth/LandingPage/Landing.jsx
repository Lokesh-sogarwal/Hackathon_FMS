import React from "react";
import "./Landing.css";

export default function Landing() {
  return (
    <div className="landing-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">SmartTransit</div>
        <ul className="nav-links">
          <li><a href="/">Home</a></li>
          <li><a href="/login">Login</a></li>
          {/* <li><a href="/register">Register</a></li> */}
        </ul>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-text">
          <h1>Smart Public Transport Tracking</h1>
          <p>
            Real-time public transport tracking system designed for small
            cities. Stay updated with live bus locations, accurate ETAs, and
            seamless travel experience 🚍✨
          </p>
        </div>
        <div className="hero-image">
          <img
            src="https://c8.alamy.com/comp/2T00HPM/mobile-application-on-smartphone-to-track-bus-routes-on-city-map-cartoon-flat-style-illustration-hand-hold-phone-location-pin-tracking-path-of-2T00HPM.jpg"
            alt="Public Transport Tracking"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2>Why Use Our System?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <img src="https://cdn-icons-png.flaticon.com/512/684/684908.png" alt="GPS" />
            <h3>Live GPS Tracking</h3>
            <p>Track buses and routes in real-time with highly accurate GPS integration.</p>
          </div>
          <div className="feature-card">
            <img src="https://cdn-icons-png.flaticon.com/512/786/786432.png" alt="ETA" />
            <h3>Accurate ETA</h3>
            <p>Get estimated time of arrival so you don’t waste time waiting at bus stops.</p>
          </div>
          <div className="feature-card">
            <img src="https://cdn-icons-png.flaticon.com/512/1239/1239525.png" alt="Coverage" />
            <h3>City Coverage</h3>
            <p>Optimized for small cities with wide coverage of all major routes.</p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <h2>Our Impact in Numbers</h2>
        <div className="stats-grid">
          <div className="stat-card"><h3>120+</h3><p>Buses Tracked Daily</p></div>
          <div className="stat-card"><h3>25,000+</h3><p>Active Daily Users</p></div>
          <div className="stat-card"><h3>30%</h3><p>Reduction in Waiting Time</p></div>
          <div className="stat-card"><h3>15+</h3><p>Small Cities Covered</p></div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team">
        <h2>Meet Our Team</h2>
        <div className="team-grid">
          <div className="team-card">
            <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Team Member" />
            <h3>Rohit Sharma</h3>
            <p>Backend Developer</p>
          </div>
          <div className="team-card">
            <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Team Member" />
            <h3>Anjali Verma</h3>
            <p>Frontend Developer</p>
          </div>
          <div className="team-card">
            <img src="https://randomuser.me/api/portraits/men/56.jpg" alt="Team Member" />
            <h3>Vikas Gupta</h3>
            <p>UI/UX Designer</p>
          </div>
          <div className="team-card">
            <img src="https://randomuser.me/api/portraits/women/68.jpg" alt="Team Member" />
            <h3>Pooja Mehta</h3>
            <p>Project Manager</p>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="reviews">
        <h2 style={{color:'white'}}>What People Say</h2>
        <div className="reviews-grid">
          <div className="review-card">
            <p>"This app has completely changed how I travel. No more long waits at the bus stop!"</p>
            <h4>- Rajesh Kumar</h4>
          </div>
          <div className="review-card">
            <p>"Simple, accurate, and reliable. Perfect for daily commuters like me."</p>
            <h4>- Neha Singh</h4>
          </div>
          <div className="review-card">
            <p>"Our city's transport system finally feels modern. Great job team!"</p>
            <h4>- Amit Patel</h4>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <h2>Start Your Journey Smarter 🚍</h2>
        <p>Experience a reliable, smart, and modern way to travel in your city with our real-time tracking solution.</p>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 SmartTransit | Built for Smarter Cities</p>
      </footer>
    </div>
  );
}
