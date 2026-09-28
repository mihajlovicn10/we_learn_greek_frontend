import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { showToast } from '../components/common/Toast';
import { PageLayout } from '../components/layout';
import { Button, Card, FormField } from '../components/ui';
import { contactAPI } from '../services/contact';
import { CONTACT_EMAIL } from '../config';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { t } = useTranslation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!contactAPI.isConfigured) {
      window.location.href = contactAPI.mailtoHref(formData);
      return;
    }

    setIsSubmitting(true);

    try {
      await contactAPI.send(formData);
      showToast.success(t('contact.sent'));
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch {
      showToast.error(t('contact.failed', { email: CONTACT_EMAIL }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageLayout title={t('contact.title')} narrow>
      <Card padding="lg" className="mx-auto max-w-xl">
        <p className="mb-6 text-center text-gray-600">
          {t('contact.intro')}
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <FormField
            label={t('contact.name')}
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            variant="pill-dark"
            placeholder={t('contact.namePlaceholder')}
            required
          />
          <FormField
            label={t('contact.email')}
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            variant="pill-dark"
            placeholder={t('contact.emailPlaceholder')}
            required
          />
          <FormField
            label={t('contact.subject')}
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            variant="pill-dark"
            placeholder={t('contact.subjectPlaceholder')}
            required
          />
          <div>
            <label htmlFor="message" className="mb-2 block text-sm font-medium text-gray-600">
              {t('contact.message')}
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={5}
              placeholder={t('contact.messagePlaceholder')}
              className="w-full rounded-2xl bg-gray-900 px-4 py-3 text-white placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          <Button type="submit" variant="primary" shape="pill" fullWidth disabled={isSubmitting}>
            {isSubmitting
              ? t('contact.sending')
              : contactAPI.isConfigured
                ? t('contact.send')
                : t('contact.sendViaEmail')}
          </Button>
        </form>
      </Card>

      <Card padding="md" className="mx-auto mt-8 max-w-xl text-center">
        <h2 className="mb-4 font-display text-lg font-semibold text-brand-900">
          {t('contact.otherWays')}
        </h2>
        <p className="text-gray-600">
          <strong>{t('contact.emailLabel')}</strong>{' '}
          <a href={`mailto:${CONTACT_EMAIL}`} className="font-medium text-brand-600 hover:text-brand-700">
            {CONTACT_EMAIL}
          </a>
        </p>
      </Card>
    </PageLayout>
  );
};

export default Contact;
