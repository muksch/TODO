import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogoutContext';
import { useAuthContext } from '../hooks/useAuthContext';

const Header = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  };

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Check&nbsp;It</h1>
        </Link>
        <nav>
          <div className="main-links">
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/support">Support Us</Link>
            <Link to="/about">About</Link>
          </div>
          <div className="user-links">
            {user && (
              <div>
                <span>{user.email}</span>
                <button onClick={handleClick}>Log out</button>
              </div>
            )}
            {!user && (
              <div>
                <Link to="/login">Login</Link>
                <Link to="/signup">Signup</Link>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
