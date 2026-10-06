import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Trans, useTranslation } from 'react-i18next';
import { AuthLayout } from '../components/layout';
import { Alert, Button, FormField } from '../components/ui';
import { authAPI } from '../services/auth';
import { useAuth } from '../context/AuthContext';
import { ROUTES } from '../constants/routes';
import { getErrorMessage } from '../services/apiHelpers';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const justRegistered = Boolean(location.state?.registered);
  const [formData, setFormData] = useState({
    email: location.state?.email ?? '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { t } = useTranslation();
  // Return to the page that sent the user here, including its state (e.g. a word to save).
  const from = location.state?.from || ROUTES.home;

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
        setError(t('auth.invalidResponse'));
        return;
      }

      const userData = data.user ?? {
        email: formData.email,
        first_name: data.first_name ?? '',
        last_name: data.last_name ?? '',
      };

      login(userData, { access: data.access, refresh: data.refresh });
      navigate(from, { replace: true, state: from.state });
    } catch (err) {
      // 401 is always "wrong email or password" to the user (the API says it in English as {error}).
      setError(
        err.response?.status === 401 ? t('auth.loginFailed') : getErrorMessage(err, t('auth.loginFailed'))
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title={t('auth.loginTitle')}
      footer={
        <p className="mt-6 text-center text-sm text-gray-600">
          <Trans
            i18nKey="auth.noAccount"
            components={{
              link: (
                <Link
                  to={ROUTES.register}
                  state={location.state?.from ? { from: location.state.from } : undefined}
                  className="font-medium text-brand-600 hover:text-brand-700"
                />
              ),
            }}
          />
        </p>
      }
    >
      {justRegistered && !error && (
        <Alert variant="success" className="mb-4 text-center">
          {t('auth.accountCreated')}
        </Alert>
      )}

      {error && (
        <Alert variant="error" className="mb-4 text-center">
          {error}
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <FormField
          label={t('auth.email')}
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          variant="pill-dark"
          placeholder={t('auth.emailPlaceholder')}
          required
          autoComplete="email"
        />

        <FormField
          label={t('auth.password')}
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          variant="pill-dark"
          placeholder={t('auth.passwordPlaceholder')}
          required
          autoComplete="current-password"
        />

        <Button type="submit" variant="primary" shape="pill" fullWidth disabled={loading}>
          {loading ? t('auth.loggingIn') : t('auth.logIn')}
        </Button>
      </form>
    </AuthLayout>
  );
};

export default Login;
