import axios from 'axios';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Login from './Components/Login/Login';
import SignUp from './Components/SignUp/SignUp';
import NavBar from './Components/NavBar/NavBar';
import Libros from './Components/Libros/Libros';
import Footer from './Components/Footer/Footer';
import Detalles from './Components/Detalles/Detalles';
import { checkAuthTokenValidity } from './utils/firebaseAuth';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [libros, setLibros] = useState([]);
  const [resenas, setResenas] = useState([]);

  useEffect(() => {
    // Check if user is already authenticated on app load
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      setIsAuthenticated(true);
      // Retrieve username and email from localStorage
      const storedUserName = localStorage.getItem('userName');
      const storedEmail = localStorage.getItem('email');
      setUserName(storedUserName);
      setEmail(storedEmail);
      // Fetch user data or perform necessary actions here if needed
    }
  }, []);

  const baseUserName = (username) => {
    setUserName(username);
    localStorage.setItem('userName', username); // Store in localStorage
  }

  const baseMail = (email) => {
    setEmail(email);
    localStorage.setItem('email', email); // Store in localStorage
  }

  const handleLogin = (isAuth) => {
    setIsAuthenticated(isAuth);
    // Optionally fetch user data or perform necessary actions after login
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userName'); 
    localStorage.removeItem('email'); 
    localStorage.removeItem('firebaseId');
    setIsAuthenticated(false);
    setUserName(""); // Clear username state
    setEmail(""); // Clear email state
    setLibros([]); // Clear any sensitive data upon logout
  }

  const fetchLibros = async () => {
    // Check token validity before fetching
    const isValid = checkAuthTokenValidity();
    if (!isValid) {
      console.log("Token is invalid. Redirecting to login...");
      setIsAuthenticated(false);
      setLibros([]);
      localStorage.removeItem('authToken');
      localStorage.removeItem('userName'); 
      localStorage.removeItem('email'); 
      localStorage.removeItem('firebaseId');
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

  const addResena = async (libroId, reseña) => {
    // Check token validity
    const isValid = checkAuthTokenValidity();
    if (!isValid) {
      console.log("Token is invalid. Redirecting to login...");
      setIsAuthenticated(false);
      setLibros([]);
      localStorage.removeItem('authToken');
      localStorage.removeItem('userName'); 
      localStorage.removeItem('email'); 
      localStorage.removeItem('firebaseId');
      return;
    }
  
    const token = localStorage.getItem('authToken');
    
    if (!token) {
      console.error('No token found. Cannot add review.');
      return;
    }
  
    try {
      // Make POST request to add review
      const response = await axios.post('http://localhost:5266/api/Resenas', reseña, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  
      const newReseña = response.data;

    console.log('Review added successfully:', newReseña);
  } catch (error) {
    console.error('Error adding review:', error);
    // Handle specific error scenarios (network error, server error, etc.)
  }
};

  const fetchResenas = async (libroId) => {
    const isValid = checkAuthTokenValidity();
    if (!isValid) {
      console.log("Token is invalid. Redirecting to login...");
      setIsAuthenticated(false);
      setLibros([]);
      localStorage.removeItem('authToken');
      localStorage.removeItem('userName'); 
      localStorage.removeItem('email'); 
      localStorage.removeItem('firebaseId');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5266/api/Resenas/libro/${libroId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch reseñas');
      }
      const data = await response.json();
      setResenas(data);
    } catch (error) {
      console.error('Error fetching reseñas:', error);
    }
  };

  return (
    <Router>
      {isAuthenticated ? (
        <>
          <NavBar user={userName} email={email} logout={handleLogout} />
          <Routes>
            <Route path="/libros" element={<Libros fetchLibros={fetchLibros} libros={libros} />} />
            <Route path="/detalles/:libroId" element={<Detalles resenas={resenas} fetchResenas={fetchResenas} libros={libros} addResena={addResena} user={userName} email={email}/>} />
            <Route path="*" element={<Navigate to="/libros" />} />
          </Routes>
          <Footer />
        </>
      ) : (
        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} baseUserName={baseUserName} baseMail={baseMail} />} />
          <Route path="/signup" element={<SignUp onLogin={handleLogin} baseUserName={setUserName} baseMail={baseMail} />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;
