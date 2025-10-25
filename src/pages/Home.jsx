import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SocialShare from '../components/SocialShare';
import DogCarousel from '../components/DogCarousel';
import { useWeather } from '../hooks/useWeather';
import { submitContactForm } from '../services/contactService';

function Home() {
  const weather = useWeather();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [submitStatus, setSubmitStatus] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  // Log state changes for debugging
  useEffect(() => {
    console.log('[Home] Form data updated:', formData);
  }, [formData]);
  
  useEffect(() => {
    console.log('[Home] Submit status updated:', submitStatus);
  }, [submitStatus]);
  
  useEffect(() => {
    console.log('[Home] Error message updated:', errorMessage);
  }, [errorMessage]);

  // Update page title with weather emoji
  useEffect(() => {
    const baseTitle = 'Jumpstarter Vibe Coding Training';
    if (!weather.loading && weather.emoji) {
      document.title = `${weather.emoji} ${baseTitle}`;
    } else {
      document.title = baseTitle;
    }
  }, [weather.emoji, weather.loading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('[Home] Form submission started');
    console.log('[Home] Current form data:', formData);
    
    setSubmitStatus('sending');
    
    // Submit form data to Supabase
    console.log('[Home] Calling submitContactForm service');
    const response = await submitContactForm(formData);
    
    console.log('[Home] Received response from submitContactForm:', response);
    
    if (response.success) {
      console.log('[Home] Form submission successful');
      setSubmitStatus('sent');
      setFormData({ name: '', email: '', message: '' });
    } else {
      console.log('[Home] Form submission failed:', response.error);
      setSubmitStatus('error');
      // Store the error message for display
      if (response.error === 'duplicate') {
        setErrorMessage(response.message);
      } else {
        setErrorMessage('Please try again or contact us directly.');
      }
      // Keep the form data so user can try again
      console.error('[Home] Form submission error:', response.error);
    }
  };

  const handleChange = (e) => {
    console.log(`[Home] Form field changed: ${e.target.name} = ${e.target.value}`);
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <section className="hero" id="home">
        <div className="container">
          <div className="hero-content">
            {!weather.loading && weather.temperature && (
              <div style={{ 
                fontSize: '1rem', 
                marginBottom: '1rem', 
                opacity: 0.9,
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <span style={{ fontSize: '1.5rem' }}>{weather.emoji}</span>
                <span>Hong Kong: {weather.description} • {weather.temperature}°C</span>
              </div>
            )}
            <h1 className="hero-title">Jumpstarter Vibe Coding Training</h1>
            <p className="hero-subtitle">Transform your coding skills from zero to hero with our immersive, hands-on training programs</p>
            <div className="hero-buttons">
              <Link to="/learn-more" className="btn btn-secondary">Learn More</Link>
            </div>
            
            <SocialShare 
              title="Jumpstarter Vibe Coding Training - Transform Your Coding Skills"
              text="Share this page:"
            />
          </div>
          <div className="hero-image">
            <DogCarousel />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features" id="features">
        <div className="container">
          <h2 className="section-title">Why Choose Us?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">💻</div>
              <h3>Hands-On Learning</h3>
              <p>Build real-world projects from day one with our practical, project-based curriculum</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🚀</div>
              <h3>Fast-Track Career</h3>
              <p>Accelerate your journey to becoming a professional developer in months, not years</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">👥</div>
              <h3>Expert Mentors</h3>
              <p>Learn from industry veterans with years of real-world development experience</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Modern Stack</h3>
              <p>Master the latest technologies and frameworks used by top tech companies</p>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="courses" id="courses">
        <div className="container">
          <h2 className="section-title">Popular Courses</h2>
          <div className="courses-grid">
            <div className="course-card">
              <div className="course-badge">Beginner</div>
              <h3>Web Development Fundamentals</h3>
              <p>HTML, CSS, JavaScript basics</p>
              <ul className="course-highlights">
                <li>12 weeks intensive</li>
                <li>5 real projects</li>
                <li>Certificate included</li>
              </ul>
              <button className="btn btn-course">Enroll Now</button>
            </div>
            <div className="course-card featured">
              <div className="course-badge">Most Popular</div>
              <h3>Full-Stack Developer</h3>
              <p>React, Node.js, MongoDB</p>
              <ul className="course-highlights">
                <li>24 weeks intensive</li>
                <li>10+ real projects</li>
                <li>Job guarantee</li>
              </ul>
              <button className="btn btn-course">Enroll Now</button>
            </div>
            <div className="course-card">
              <div className="course-badge">Advanced</div>
              <h3>DevOps & Cloud</h3>
              <p>Docker, Kubernetes, AWS</p>
              <ul className="course-highlights">
                <li>16 weeks intensive</li>
                <li>Cloud certification</li>
                <li>Career support</li>
              </ul>
              <button className="btn btn-course">Enroll Now</button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact" id="contact">
        <div className="container">
          <h2 className="section-title">Ready to Start Your Journey?</h2>
          <p className="contact-subtitle">Join thousands of students who have transformed their careers</p>
          <form className="contact-form" onSubmit={handleSubmit}>
            <input 
              type="text" 
              name="name"
              placeholder="Your Name" 
              className="form-input" 
              value={formData.name}
              onChange={handleChange}
              required 
            />
            <input 
              type="email" 
              name="email"
              placeholder="Your Email" 
              className="form-input" 
              value={formData.email}
              onChange={handleChange}
              required 
            />
            <textarea 
              name="message"
              placeholder="Tell us about your goals..." 
              className="form-textarea" 
              rows="4" 
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={submitStatus === 'sending'}
              onClick={() => console.log('[Home] Send Message button clicked')}
            >
              {submitStatus === 'sending' ? 'Sending...' : submitStatus === 'sent' ? 'Message Sent!' : submitStatus === 'error' ? 'Error - Try Again' : 'Send Message'}
            </button>
            
            {/* Modal Overlay for Success/Error Messages */}
            {(submitStatus === 'sent' || submitStatus === 'error') && (
              <div className="modal-overlay" onClick={() => console.log('[Home] Modal overlay clicked')}>
                <div className="modal-content">
                  {submitStatus === 'sent' ? (
                    <>
                      <div className="success-icon">✓</div>
                      <h3>Your information has been submitted!</h3>
                      <p>Thank you for reaching out. We'll get back to you soon.</p>
                      <button 
                        className="btn btn-primary" 
                        onClick={() => {
                          console.log('[Home] Close button clicked in success modal');
                          setSubmitStatus('');
                        }}
                        style={{ marginTop: '20px' }}
                      >
                        Close
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="error-icon">
                        {errorMessage.includes('already submitted') ? 'ⓘ' : '⚠'}
                      </div>
                      <h3>{errorMessage.includes('already submitted') ? 'Already Submitted' : 'Submission failed'}</h3>
                      <p>{errorMessage}</p>
                      <button 
                        className="btn btn-primary" 
                        onClick={() => {
                          console.log('[Home] Try Again/OK button clicked in error modal');
                          setSubmitStatus('');
                        }}
                        style={{ marginTop: '20px' }}
                      >
                        {errorMessage.includes('already submitted') ? 'OK' : 'Try Again'}
                      </button>
                    </>
                  )}
                </div>
              </div>
            )}
          </form>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Home;

