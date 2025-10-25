import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import LoginModal from './LoginModal';

// Function to mask email
const maskEmail = (email) => {
  if (!email) return '';
  
  const [username, domain] = email.split('@');
  
  // Mask username - show first 3 letters, then ***
  const maskedUsername = username.length <= 3 
    ? username + '***' 
    : username.substring(0, 3) + '***';
  
  // Mask domain - show first 3 letters, then ***, then .com part
  const [domainName, extension] = domain.split('.');
  const maskedDomain = domainName.length <= 3 
    ? domainName + '***' 
    : domainName.substring(0, 3) + '***';
  
  return `${maskedUsername}@${maskedDomain}.${extension}`;
};

function Navbar() {
  const location = useLocation();
  const { user, logout, loading } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  
  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  const scrollToSection = (sectionId) => {
    if (location.pathname !== '/') {
      window.location.href = `/#${sectionId}`;
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleLogout = async () => {
    console.log('[Navbar] Logout button clicked');
    const result = await logout();
    if (!result.success) {
      console.error('[Navbar] Logout failed:', result.error);
    }
  };

  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="logo">Jumpstarter Vibe</Link>
        <ul className="nav-links">
          <li><Link to="/" className={isActive('/')}>Home</Link></li>
          <li><Link to="/learn-more" className={isActive('/learn-more')}>Learn More</Link></li>
          <li><a href="#features" onClick={(e) => { e.preventDefault(); scrollToSection('features'); }}>Features</a></li>
          <li><a href="#courses" onClick={(e) => { e.preventDefault(); scrollToSection('courses'); }}>Courses</a></li>
          <li><a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>Contact</a></li>
          <li><a href="https://www.jumpstarter.hk/" target="_blank" rel="noopener noreferrer">Jumpstarter HK</a></li>
          
          {/* Auth Button */}
          <li style={{ marginLeft: 'auto' }}>
            {loading ? (
              <span className="auth-button">Loading...</span>
            ) : user ? (
              <div className="user-info">
                <span className="user-email">Hi {maskEmail(user.email)}</span>
                <button className="auth-button" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            ) : (
              <button className="auth-button" onClick={() => setShowLoginModal(true)}>
                Login
              </button>
            )}
          </li>
        </ul>
      </div>
      
      {showLoginModal && (
        <LoginModal 
          onClose={() => setShowLoginModal(false)} 
          onSwitchToSignup={() => console.log('Switch to signup')}
        />
      )}
    </nav>
  );
}

export default Navbar;