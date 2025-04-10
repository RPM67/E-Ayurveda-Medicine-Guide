import { Link } from 'react-router-dom';  // Remove useNavigate
import './LoginButton.css';

const LoginButton = ({ user, onLogout, isLoginPage, isAdmin }) => {
  // Remove navigate hook and handleLogout function
  // Just use onLogout directly

  if (isLoginPage) {
    return (
      <div className="login-button-container">
        <Link to="/" className="home-btn">
          Home
        </Link>
      </div>
    );
  }

  return (
    <div className="login-button-container">
      {user ? (
        <div className="user-info">
          <span>{user.username}</span>
          <button onClick={onLogout} className="logout-btn">
            Logout
          </button>
        </div>
      ) : isAdmin ? (
        <div className="user-info">
          <span>Admin</span>
          <button onClick={onLogout} className="logout-btn">
            Logout
          </button>
        </div>
      ) : (
        <Link to="/login" className="login-btn">
          Login
        </Link>
      )}
    </div>
  );
};

export default LoginButton;