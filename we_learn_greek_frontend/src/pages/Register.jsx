import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Trans, useTranslation } from 'react-i18next';
import { AuthLayout } from '../components/layout';
import { Alert, Button, FormField } from '../components/ui';
import { authAPI } from '../services/auth';
import { ROUTES } from '../constants/routes';
import { getErrorMessage } from '../services/apiHelpers';
import { useAuth } from '../context/AuthContext';
import { showToast } from '../components/common/Toast';

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
  const location = useLocation();
  // Where the user was headed before auth (e.g. My Words with a word to save).
  const from = location.state?.from;
  const { login } = useAuth();
  const { t } = useTranslation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.password2) {
      setError(t('auth.passwordsMismatch'));
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
    } catch (err) {
      // Show the first field error the API returned ({field: [messages]}), else a general message.
      const data = err.response?.data;
      const fieldError = ['email', 'password', 'first_name', 'last_name']
        .map((field) => data?.[field]?.[0])
        .find(Boolean);
      setError(
        err.response?.status === 400 && fieldError
          ? fieldError
          : getErrorMessage(err, t('auth.registerFailed'))
      );
      setLoading(false);
      return;
    }

    // Account exists now; sign straight in. If that fails, the login page takes over.
    try {
      const data = await authAPI.login({ email: formData.email, password: formData.password });
      if (!data.access) throw new Error('Invalid login response');
      login(
        data.user ?? {
          email: formData.email,
          first_name: formData.first_name,
          last_name: formData.last_name,
        },
        { access: data.access, refresh: data.refresh }
      );
      showToast.success(t('auth.welcome', { name: formData.first_name }));
      navigate(from || ROUTES.myWords, { replace: true, state: from?.state });
    } catch {
      navigate(ROUTES.login, { state: { registered: true, email: formData.email, from } });
    }
  };

  return (
    <AuthLayout
      title={t('auth.registerTitle')}
      footer={
        <p className="mt-6 text-center text-sm text-gray-600">
          <Trans
            i18nKey="auth.haveAccount"
            components={{
              link: (
                <Link
                  to={ROUTES.login}
                  state={from ? { from } : undefined}
                  className="font-medium text-brand-600 hover:text-brand-700"
                />
              ),
            }}
          />
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
          label={t('auth.firstName')}
          type="text"
          id="first_name"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          variant="pill-dark"
          placeholder={t('auth.firstNamePlaceholder')}
          required
          autoComplete="given-name"
        />

        <FormField
          label={t('auth.lastName')}
          type="text"
          id="last_name"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          variant="pill-dark"
          placeholder={t('auth.lastNamePlaceholder')}
          required
          autoComplete="family-name"
        />

        <FormField
          label={t('auth.email')}
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          variant="pill-dark"
          placeholder={t('auth.registerEmailPlaceholder')}
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
          placeholder={t('auth.passwordCreatePlaceholder')}
          required
          autoComplete="new-password"
        />

        <FormField
          label={t('auth.confirmPassword')}
          type="password"
          id="password2"
          name="password2"
          value={formData.password2}
          onChange={handleChange}
          variant="pill-dark"
          placeholder={t('auth.confirmPasswordPlaceholder')}
          required
          autoComplete="new-password"
        />

        <Button type="submit" variant="primary" shape="pill" fullWidth disabled={loading}>
          {loading ? t('auth.registering') : t('auth.register')}
        </Button>
      </form>
    </AuthLayout>
  );
};

export default Register;
