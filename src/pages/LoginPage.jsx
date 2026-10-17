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


}

export default LoginPage;
