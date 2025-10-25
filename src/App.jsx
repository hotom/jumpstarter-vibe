import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Home from './pages/Home';
import LearnMore from './pages/LearnMore';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/learn-more" element={<LearnMore />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;