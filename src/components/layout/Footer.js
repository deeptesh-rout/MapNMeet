import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer>
      <div className="footer-content">
        <div className="footer-logo">
          <i className="fas fa-map-marker-alt"></i>
          <span>EventMappr</span>
        </div>
        <div className="footer-links">
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms of Use</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/community">Community Forum</Link>
          <Link to="/gallery">
            <i className="fas fa-camera" style={{ marginRight: '6px', color: '#38BDF8' }}></i> Gallery
          </Link>
          <Link to="/weather">
            <i className="fas fa-calendar-alt" style={{ marginRight: '6px', color: '#f1c40f' }}></i> Weather Planner
          </Link>
        </div>
        <div className="social-links">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-github"></i></a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><svg class="size-6" xmlns="http://www.w3.org/2000/svg" width="1.4em" height="1.4em" viewBox="0 0 24 24"><path fill="currentColor" d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4zm9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3"></path></svg></a>
        </div>
      </div>
      <div className="copyright">
        <p>&copy; {new Date().getFullYear()} EventMappr. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer; 