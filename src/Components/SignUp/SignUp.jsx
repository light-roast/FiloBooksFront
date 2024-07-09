import axios from 'axios'
import styles from './SignUp.module.css'  // Assuming you want to use the same styles
import { useState } from 'react'
import { Link } from 'react-router-dom'

// eslint-disable-next-line react/prop-types
function SignUp({ onLogin, baseMail, baseUserName  }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [error, setError] = useState(null);

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://filobooksapi.azurewebsites.net/api/auth/signup', {
                email,
                password,
                displayName
            });
            if (response.data.token) {
                // Save the token to LocalStorage
                localStorage.setItem('authToken', response.data.token);
                localStorage.setItem('firebaseId', response.data.user.firebaseUserId);
                baseMail(response.data.user.correoElectronico);
                baseUserName(response.data.user.username);
                onLogin(true);
            } else {
                setError('Sign up failed');
            }
        } catch (error) {
            setError('Sign up failed: ' + error.message);
        }
    };

    return (
        <div className={styles.loginContainer}>
            <div className={styles.loginBox}>
                <h2 className={styles.heading}>FiloBooks Sign Up</h2>
                {error && <p className={styles.error}>{error}</p>}
                <form onSubmit={handleSignUp}>
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
                    <div className={styles.inputGroup}>
                        <label className={styles.label} htmlFor="displayName">Display Name:</label>
                        <input
                            className={styles.input}
                            type="text"
                            id="displayName"
                            value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)}
                            required
                        />
                    </div>
                    <button className={styles.button} type="submit">Sign Up</button>
                    <p className={styles.signupLink}>¿Ya tienes una cuenta? <Link to="/login">Inicia sesión</Link>.</p>
                </form>
            </div>
        </div>
    );
}

export default SignUp;