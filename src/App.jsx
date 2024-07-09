// src/App.js
import axios from 'axios';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import './App.css';
import Login from './Components/Login/Login';
import SignUp from './Components/SignUp/SignUp';
import NavBar from './Components/NavBar/NavBar';
import Libros from './Components/Libros/Libros';
import { checkAuthTokenValidity } from './utils/firebaseAuth';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [libros, setLibros] = useState([]);

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

  const fetchLibros = async () => {
    // Check token validity before fetching
    const isValid = checkAuthTokenValidity();
    if (!isValid) {
      console.log("Token is invalid. Redirecting to login...");
      setIsAuthenticated(false);
      setLibros([]); // Clear the books if the token is invalid
      return;
    }

    try {
      const response = await axios.get('http://localhost:5266/api/Libros');
      setLibros(response.data); // Store the fetched books in state
      console.log("Books fetched successfully:", response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
      setLibros([]); // Clear the books if there's an error
    }
  };

  return (
    <>
      <Router>
        {isAuthenticated ? (
          <>
            <NavBar user={userName} email={email} logout={handleLogout}/>
            <Routes>
              <Route path="/libros" element={<Libros fetchLibros={fetchLibros} libros={libros}/>} />
              {/* <Route path="/" element={<Home />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/projects" element={<Projects />} /> */}
              <Route path="*" element={<Navigate to="/libros" />} />
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
