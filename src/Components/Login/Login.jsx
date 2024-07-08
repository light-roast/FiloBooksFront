import axios from 'axios'
import styles from './Login.module.css'
import { useState } from 'react'
import { Link } from 'react-router-dom'
// eslint-disable-next-line react/prop-types
function Login({ onLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
  
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post('http://localhost:5266/api/auth/login', {
            email,
            password
          });
          if (response.data.token) {
            // Save the token to LocalStorage
            localStorage.setItem('authToken', response.data.token);
            onLogin(true);
          } else {
            setError('Login failed');
          }
        } catch (error) {
          setError('Login failed: ' + error.message);
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
            <p className={styles.signupLink}>¿No tienes un cuenta? <Link to="/signup">Regístrate</Link>.</p>
          </form>
        </div>
      </div>
    );
}

export default Login;