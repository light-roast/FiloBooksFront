// src/App.js
import axios from 'axios';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import './App.css';
// import Home from './Home';
// import Contact from './Contact';
// import Projects from './Projects';
import Login from './Components/Login/Login';
import SignUp from './Components/SignUp/SignUp';
import NavBar from './Components/NavBar/NavBar';
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

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
  }

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:5266/api/Libros');
      return response.data;
    } catch (error) {
      console.error('Error fetching books:', error);
      return [];
    }
  };

  return (
    <>
      <Router>
        {isAuthenticated ? (
          <>
            <NavBar user={userName} email={email} logout={handleLogout}/>
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
