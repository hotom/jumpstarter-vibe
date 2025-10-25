import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

function LoginModal({ onClose, onSwitchToSignup }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const { loginWithEmail, signupWithEmail, authError, setAuthError } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('[LoginModal] Form submitted', { email, isLogin });
    
    if (isLogin) {
      const result = await loginWithEmail(email, password);
      if (result.success) {
        console.log('[LoginModal] Login successful');
        onClose();
      }
    } else {
      const result = await signupWithEmail(email, password);
      if (result.success) {
        console.log('[LoginModal] Signup successful');
        // Close modal or show confirmation message
        onClose();
      }
    }
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    setAuthError(null);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        
        {authError && (
          <div className="auth-error-modal">
            <span className="error-message">{authError}</span>
            <button 
              className="close-error" 
              onClick={() => setAuthError(null)}
              aria-label="Close error"
            >
              ×
            </button>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="form-input"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="form-input"
            />
          </div>
          
          <button type="submit" className="btn btn-primary auth-submit-button">
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>
        
        <div className="auth-switch">
          <p>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button onClick={switchMode} className="switch-button">
              {isLogin ? 'Sign Up' : 'Login'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginModal;