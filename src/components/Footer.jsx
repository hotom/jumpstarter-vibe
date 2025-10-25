function Footer() {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h4>Jumpstarter Vibe</h4>
            <p>Empowering the next generation of developers</p>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}>Home</a></li>
              <li><a href="#features" onClick={(e) => { e.preventDefault(); scrollToSection('features'); }}>Features</a></li>
              <li><a href="#courses" onClick={(e) => { e.preventDefault(); scrollToSection('courses'); }}>Courses</a></li>
              <li><a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>Contact</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Connect</h4>
            <ul>
              <li><a href="#">Twitter</a></li>
              <li><a href="#">LinkedIn</a></li>
              <li><a href="#">GitHub</a></li>
              <li><a href="#">Discord</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 Jumpstarter Vibe Coding Training. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

