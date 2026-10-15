import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  loginUser,
  clearAuthMessages,
  selectIsAuthenticated,
  selectAuthError,
  selectAuthSuccess
} from '../redux/authSlice';
import { LogIn, Mail, Lock, AlertCircle, CheckCircle2 } from 'lucide-react';

function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [clientErrors, setClientErrors] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const isAuthenticated = useSelector(selectIsAuthenticated);
  const serverError = useSelector(selectAuthError);
  const successMessage = useSelector(selectAuthSuccess);

  // Where to redirect after login (e.g., if redirected from a protected page)
  const from = location.state?.from?.pathname || '/events';

  useEffect(() => {
    // Clear old auth messages on mount
    dispatch(clearAuthMessages());
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      // Redirect logged-in user
      const timer = setTimeout(() => {
        navigate(from, { replace: true });
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, navigate, from]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear field-specific validation error
    if (clientErrors[name]) {
      setClientErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const errors = {};
    if (!formData.email.trim()) {
      errors.email = 'Email address is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please provide a valid email address.';
    }

    if (!formData.password) {
      errors.password = 'Password is required.';
    }

    setClientErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      dispatch(loginUser(formData));
    }
  };

  // Helper to fill demo credentials
  const fillDemoCredentials = () => {
    setFormData({
      email: 'student@example.com',
      password: 'password123'
    });
    setClientErrors({});
  };

  return (
    <div className="auth-page">
      <div className="auth-card card">
        <div className="auth-header">
          <div className="auth-icon-wrapper">
            <LogIn size={26} className="text-primary" />
          </div>
          <h2 className="auth-title">Welcome Back</h2>
          <p className="auth-subtitle">Log in to manage and register for upcoming events</p>
        </div>

        {/* Success message banner */}
        {successMessage && (
          <div className="alert alert-success">
            <CheckCircle2 size={18} />
            <span>{successMessage} Redirecting...</span>
          </div>
        )}

        {/* Error message banner */}
        {serverError && (
          <div className="alert alert-danger">
            <AlertCircle size={18} />
            <span>{serverError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form" noValidate>
          {/* Email input */}
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <div className="input-wrapper">
              <Mail size={18} className="input-icon" />
              <input
                id="email"
                name="email"
                type="email"
                placeholder="name@example.com"
                value={formData.email}
                onChange={handleChange}
                className={clientErrors.email ? 'input-error' : ''}
              />
            </div>
            {clientErrors.email && <span className="error-text">{clientErrors.email}</span>}
          </div>

          {/* Password input */}
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-wrapper">
              <Lock size={18} className="input-icon" />
              <input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className={clientErrors.password ? 'input-error' : ''}
              />
            </div>
            {clientErrors.password && <span className="error-text">{clientErrors.password}</span>}
          </div>

          {/* Submit button */}
          <button type="submit" className="btn btn-primary btn-block">
            Log In
          </button>

          {/* Demo account helper button */}
          <button
            type="button"
            onClick={fillDemoCredentials}
            className="btn btn-outline btn-block demo-btn"
          >
            Fill Demo Student Account
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Don't have an account yet?{' '}
            <Link to="/register" className="auth-link">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
