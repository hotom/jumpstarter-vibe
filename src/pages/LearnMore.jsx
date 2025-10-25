import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SocialShare from '../components/SocialShare';
import { useWeather } from '../hooks/useWeather';

function LearnMore() {
  const weather = useWeather();

  // Update page title with weather emoji
  useEffect(() => {
    const baseTitle = 'How Vibe Coding Can Change the World | Jumpstarter Vibe';
    if (!weather.loading && weather.emoji) {
      document.title = `${weather.emoji} ${baseTitle}`;
    } else {
      document.title = baseTitle;
    }
  }, [weather.emoji, weather.loading]);

  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <section className="hero" style={{ padding: '80px 0' }}>
        <div className="container">
          <div className="hero-content" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <h1 className="hero-title" style={{ fontSize: '3.5rem' }}>How Vibe Coding Can Change the World</h1>
            <p className="hero-subtitle">Transforming the future through innovative, mindful, and passionate programming</p>
            
            <SocialShare 
              title="How Vibe Coding Can Change the World"
              text="Share this vision:"
            />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="content-section">
        <div className="container" style={{ maxWidth: '900px' }}>
          
          <div className="content-block">
            <h2 className="section-title" style={{ textAlign: 'left', fontSize: '2rem' }}>What is Vibe Coding?</h2>
            <div className="content-divider"></div>
            <p className="content-text">
              Vibe Coding is more than just writing code—it's a philosophy, a mindset, and a movement. It's about coding with intention, creativity, and positive energy. When developers embrace the vibe, they don't just solve problems; they create experiences, build communities, and change lives.
            </p>
            <p className="content-text">
              It combines technical excellence with emotional intelligence, sustainable practices with innovative thinking, and individual growth with collective impact.
            </p>
          </div>

          <div className="content-block">
            <h2 className="section-title" style={{ textAlign: 'left', fontSize: '2rem' }}>The Global Impact</h2>
            <div className="content-divider"></div>
            
            <div className="impact-grid">
              
              <div className="impact-item">
                <h3>🌍 Accessibility for All</h3>
                <p>
                  Vibe coding democratizes technology education. By making coding more approachable, creative, and enjoyable, we're opening doors for people from all backgrounds—regardless of age, location, or previous experience. This creates a more diverse and inclusive tech ecosystem.
                </p>
              </div>

              <div className="impact-item">
                <h3>💡 Innovation Through Joy</h3>
                <p>
                  When developers code with positive energy and passion, innovation flourishes. The best solutions come from those who love what they do. Vibe coding cultivates this joy, leading to breakthrough technologies that solve real-world problems in creative ways.
                </p>
              </div>

              <div className="impact-item">
                <h3>🤝 Building Communities</h3>
                <p>
                  Vibe coding emphasizes collaboration over competition. By fostering supportive communities where developers lift each other up, we create a tech culture that's sustainable, ethical, and human-centered. Together, we're stronger.
                </p>
              </div>

              <div className="impact-item">
                <h3>🌱 Sustainable Development</h3>
                <p>
                  Mindful coding means writing efficient, clean code that respects resources. Vibe coders think about the environmental impact of their work, optimize for performance, and build sustainable systems that serve humanity without depleting our planet.
                </p>
              </div>

              <div className="impact-item">
                <h3>🚀 Empowering Change-Makers</h3>
                <p>
                  Every graduate of vibe coding training becomes an agent of change. They carry this philosophy into their workplaces, startups, and communities—creating ripple effects that extend far beyond their own code. They inspire others, mentor newcomers, and lead with empathy.
                </p>
              </div>

              <div className="impact-item">
                <h3>🎯 Purpose-Driven Technology</h3>
                <p>
                  Vibe coding encourages developers to ask "Why?" before "How?" This purpose-driven approach ensures that technology serves humanity's greatest needs—from healthcare and education to climate action and social justice.
                </p>
              </div>

            </div>
          </div>

          <div className="content-block">
            <h2 className="section-title" style={{ textAlign: 'left', fontSize: '2rem' }}>The Ripple Effect</h2>
            <div className="content-divider"></div>
            <p className="content-text">
              When one person learns to code with the right vibe, they don't just change their own life—they start a chain reaction:
            </p>
            <ul style={{ fontSize: '1.1rem', lineHeight: '2.2', color: 'var(--text-dark)', marginLeft: '2rem', marginBottom: '1.5rem' }}>
              <li>They build apps that help thousands</li>
              <li>They mentor others who go on to create their own impact</li>
              <li>They join or start companies that prioritize ethical technology</li>
              <li>They contribute to open source projects that benefit millions</li>
              <li>They inspire the next generation to pursue STEM careers</li>
              <li>They advocate for inclusive and accessible technology</li>
            </ul>
            <p className="content-text">
              This exponential impact is how vibe coding will change the world—one developer, one line of code, one positive interaction at a time.
            </p>
          </div>

          <div className="content-block">
            <h2 className="section-title" style={{ textAlign: 'left', fontSize: '2rem' }}>Join the Movement</h2>
            <div className="content-divider"></div>
            <p className="content-text">
              The future of technology isn't just about what we build—it's about how we build it and why. At Jumpstarter Vibe Coding Training, we're cultivating a generation of developers who code with purpose, passion, and positive energy.
            </p>
            <p style={{ fontSize: '1.2rem', lineHeight: '1.9', color: 'var(--text-dark)', fontWeight: '600', marginBottom: '2rem' }}>
              The world needs more vibe coders. Will you be one of them?
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link to="/#courses" className="btn btn-primary">Explore Our Courses</Link>
              <Link to="/#contact" className="btn btn-secondary">Get in Touch</Link>
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </>
  );
}

export default LearnMore;

