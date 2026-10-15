import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentUser, selectIsAuthenticated, logoutUser } from '../redux/authSlice';
import { Calendar, User, LogOut, LogIn, UserPlus, BookmarkCheck } from 'lucide-react';

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const currentUser = useSelector(selectCurrentUser);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/login');
  };

  return (
    <header className="navbar-header">
      <div className="container navbar-container">
        {/* Brand / Logo */}
        <Link to="/" className="navbar-brand">
          <span className="brand-icon">🎟️</span>
          <div className="brand-text">
            <span className="brand-title">EventHub</span>
            <span className="brand-subtitle">Discovery & Management</span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="navbar-links">
          <NavLink
            to="/events"
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          >
            <Calendar size={18} />
            <span>Explore Events</span>
          </NavLink>

          {isAuthenticated ? (
            <>
              <NavLink
                to="/my-events"
                className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
              >
                <BookmarkCheck size={18} />
                <span>My Events</span>
              </NavLink>

              <div className="user-profile-badge">
                <div className="user-avatar">
                  <User size={16} />
                </div>
                <span className="user-name">{currentUser?.name || 'User'}</span>
              </div>

              <button onClick={handleLogout} className="btn-logout" title="Log out">
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="btn btn-outline btn-sm">
                <LogIn size={16} />
                <span>Login</span>
              </Link>
              <Link to="/register" className="btn btn-primary btn-sm">
                <UserPlus size={16} />
                <span>Register</span>
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
