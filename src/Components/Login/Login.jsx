import axios from 'axios'
import styles from './Login.module.css'
import { useState } from 'react'
import { Link } from 'react-router-dom'
// eslint-disable-next-line react/prop-types
function Login({ onLogin, baseMail, baseUserName }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const apiLocal = "http://localhost:5266/";
  const apiAzure = "https://filobooksapi.azurewebsites.net/";
  
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post(`${apiAzure}api/auth/login`, {
            email,
            password
          });
          if (response.data.token) {
            // Save the token to LocalStorage
            localStorage.setItem('authToken', response.data.token);
            localStorage.setItem('firebaseId', response.data.localId);
            
            baseMail(response.data.email);
            baseUserName(response.data.displayName);
            onLogin(true);
          } else {
            setError('Login failed');
          }
        } catch (error) {
            if (error.code == "ERR_BAD_REQUEST") 
            {
                setError("Falló el login: Usuario no registrado o email o contraseña incorrectos.")
            } else {
                setError('Login failed: ' + error.message);
            }
          
        }
      };
  
    return (
      <div className={styles.loginContainer}>
        <div className={styles.loginBox}>
          <h2 className={styles.heading}>FiloBooks Login</h2>
          {error && <p className={styles.error}>{error}</p>}
          <form onSubmit={handleLogin}>
            <div className={styles.inputGroup}>
              <label className={styles.label} htmlFor="email">Email:</label>
              <input
                className={styles.input}
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.label} htmlFor="password">Password:</label>
              <input
                className={styles.input}
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button className={styles.button} type="submit">Login</button>
            <p className={styles.signupLink}>¿No tienes una cuenta? <Link to="/signup">Regístrate</Link>.</p>
          </form>
        </div>
      </div>
    );
}

export default Login;
