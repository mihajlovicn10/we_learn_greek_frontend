import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthLayout } from '../components/layout';
import { Alert, Button, FormField } from '../components/ui';
import { authAPI } from '../services/auth';
import { ROUTES } from '../constants/routes';

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    first_name: '',
    last_name: '',
    password: '',
    password2: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.password2) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      await authAPI.register({
        email: formData.email,
        password: formData.password,
        first_name: formData.first_name,
        last_name: formData.last_name,
      });

      navigate(ROUTES.login);
    } catch (err) {
      setError(
        err.response?.data?.detail ||
          err.response?.data?.email?.[0] ||
          err.response?.data?.first_name?.[0] ||
          err.response?.data?.last_name?.[0] ||
          err.response?.data?.password?.[0] ||
          'Registration failed. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Create an Account"
      footer={
        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link
            to={ROUTES.login}
            className="font-medium text-brand-600 hover:text-brand-700"
          >
            Login here
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
          label="First name"
          type="text"
          id="first_name"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          variant="pill-dark"
          placeholder="Enter your first name"
          required
          autoComplete="given-name"
        />

        <FormField
          label="Last name"
          type="text"
          id="last_name"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          variant="pill-dark"
          placeholder="Enter your last name"
          required
          autoComplete="family-name"
        />

        <FormField
          label="Email"
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          variant="pill-dark"
          placeholder="Enter your email address"
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
          placeholder="Create a password"
          required
          autoComplete="new-password"
        />

        <FormField
          label="Confirm password"
          type="password"
          id="password2"
          name="password2"
          value={formData.password2}
          onChange={handleChange}
          variant="pill-dark"
          placeholder="Confirm your password"
          required
          autoComplete="new-password"
        />

        <Button type="submit" variant="primary" shape="pill" fullWidth disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </Button>
      </form>
    </AuthLayout>
  );
};

export default Register;
