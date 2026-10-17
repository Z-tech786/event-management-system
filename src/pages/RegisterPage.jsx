import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  registerUser,
  clearAuthMessages,
  selectIsAuthenticated,
  selectAuthError,
  selectAuthSuccess
} from '../redux/authSlice';
import { UserPlus, User, Mail, Lock, AlertCircle, CheckCircle2 } from 'lucide-react';

function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [clientErrors, setClientErrors] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isAuthenticated = useSelector(selectIsAuthenticated);
  const serverError = useSelector(selectAuthError);
  const successMessage = useSelector(selectAuthSuccess);

  useEffect(() => {
    dispatch(clearAuthMessages());
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      const timer = setTimeout(() => {
        navigate('/events', { replace: true });
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (clientErrors[name]) {
      setClientErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = 'Full name is required.';
    } else if (formData.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters long.';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email address is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please provide a valid email address.';
    }

    if (!formData.password) {
      errors.password = 'Password is required.';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters.';
    }

    if (formData.confirmPassword !== formData.password) {
      errors.confirmPassword = 'Passwords do not match.';
    }

    setClientErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      dispatch(
        registerUser({
          name: formData.name,
          email: formData.email,
          password: formData.password
        })
      );
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card card">
        <div className="auth-header">
          <div className="auth-icon-wrapper">
            <UserPlus size={26} className="text-primary" />
          </div>
          <h2 className="auth-title">Create Account</h2>
          <p className="auth-subtitle">Join EventHub to explore, bookmark, and register for events</p>
        </div>

        {/* Success message banner */}
        {successMessage && (
          <div className="alert alert-success">
            <CheckCircle2 size={18} />
            <span>{successMessage} Redirecting to events...</span>
          </div>
        )}

        {/* Server error banner */}
        {serverError && (
          <div className="alert alert-danger">
            <AlertCircle size={18} />
            <span>{serverError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form" noValidate>
          {/* Full Name */}
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <div className="input-wrapper">
              <User size={18} className="input-icon" />
              <input
                id="name"
                name="name"
                type="text"
                placeholder="e.g. Alex Johnson"
                value={formData.name}
                onChange={handleChange}
                className={clientErrors.name ? 'input-error' : ''}
              />
            </div>
            {clientErrors.name && <span className="error-text">{clientErrors.name}</span>}
          </div>

}

export default RegisterPage;
