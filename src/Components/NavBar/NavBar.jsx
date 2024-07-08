import { Link } from 'react-router-dom';
import styles from './NavBar.module.css'; 

// eslint-disable-next-line react/prop-types
const NavBar = ({ user, email, logout }) => {
  return (
    <nav className={styles.nav}>
      <h1><Link to="/">FiloBooks</Link></h1>
      <p>{user} ({email})</p>
      <button onClick={logout}>Logout</button>
    </nav>
  );
};

export default NavBar;
