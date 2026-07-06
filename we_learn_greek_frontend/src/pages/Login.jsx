import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthLayout } from '../components/layout';
import { Alert, Button, FormField } from '../components/ui';
import { authAPI } from '../services/auth';
import { useAuth } from '../context/AuthContext';
import { ROUTES } from '../constants/routes';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const from = location.state?.from?.pathname || ROUTES.home;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await authAPI.login({
        email: formData.email,
        password: formData.password,
      });

      if (!data.access) {
        setError('Invalid login response from server.');
        return;
      }

      const userData = data.user ?? {
        email: formData.email,
        first_name: data.first_name ?? '',
        last_name: data.last_name ?? '',
      };

      login(userData, { access: data.access, refresh: data.refresh });
      navigate(from, { replace: true });
    } catch (err) {
      setError(
        err.response?.data?.detail ||
          'Login failed. Please check your credentials and try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Login to Your Account"
      footer={
        <p className="mt-6 text-center text-sm text-gray-600">
          Don&apos;t have an account?{' '}
          <Link
            to={ROUTES.register}
            className="font-medium text-brand-600 hover:text-brand-700"
          >
            Register here
          </Link>
        </p>
      }
    >
      {error && (
        <Alert variant="error" className="mb-4 text-center">
          {error}
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <FormField
          label="Email"
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          variant="pill-dark"
          placeholder="Enter your email"
          required
          autoComplete="email"
        />

        <FormField
          label="Password"
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          variant="pill-dark"
          placeholder="Enter your password"
          required
          autoComplete="current-password"
        />

        <Button type="submit" variant="primary" shape="pill" fullWidth disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </Button>
      </form>
    </AuthLayout>
  );
};

export default Login;
