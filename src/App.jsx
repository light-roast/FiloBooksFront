// src/App.js
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
// import Home from './Home';
// import Contact from './Contact';
// import Projects from './Projects';
import Login from './Components/Login/Login';
import SignUp from './Components/SignUp/SignUp';
// import NavBar from './NavBar';
// import Footer from './Footer';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");

  const baseUserName = (username) => {
    setUserName(username);
  }

  const baseMail = (email) => {
    setEmail(email);
  }

  const handleLogin = (isAuth) => {
    setIsAuthenticated(isAuth);
  };

  return (
    <>
      <Router>
        {isAuthenticated ? (
          <>
            {/* <NavBar /> */}
            <Routes>
              {/* <Route path="/" element={<Home />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/projects" element={<Projects />} /> */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
            {/* <Footer /> */}
          </>
        ) : (
          <Routes>
            <Route path="/login" element={<Login onLogin={handleLogin} baseUserName={baseUserName} baseMail={baseMail} />} />
            <Route path="/signup" element={<SignUp onLogin={handleLogin} baseUserName={setUserName} baseMail={setEmail} />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        )}
      </Router>
    </>
  );
}

export default App;
