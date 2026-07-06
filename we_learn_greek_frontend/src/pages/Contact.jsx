import { useState } from 'react';
import { showToast } from '../components/common/Toast';
import { PageLayout } from '../components/layout';
import { Button, Card, FormField } from '../components/ui';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      showToast.success('Message sent successfully!');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch {
      showToast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageLayout title="Contact Us" narrow>
      <Card padding="lg" className="mx-auto max-w-xl">
        <p className="mb-6 text-center text-gray-600">
          Have questions, suggestions, or feedback? We&apos;d love to hear from you! Fill out the
          form below and we&apos;ll get back to you as soon as possible.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <FormField
            label="Name"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            variant="pill-dark"
            placeholder="Your name"
            required
          />
          <FormField
            label="Email"
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            variant="pill-dark"
            placeholder="Your email address"
            required
          />
          <FormField
            label="Subject"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            variant="pill-dark"
            placeholder="Subject of your message"
            required
          />
          <div>
            <label htmlFor="message" className="mb-2 block text-sm font-medium text-gray-600">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={5}
              placeholder="Your message"
              className="w-full rounded-2xl bg-gray-900 px-4 py-3 text-white placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          <Button type="submit" variant="primary" shape="pill" fullWidth disabled={isSubmitting}>
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </Button>
        </form>
      </Card>

      <Card padding="md" className="mx-auto mt-8 max-w-xl text-center">
        <h2 className="mb-4 font-display text-lg font-semibold text-brand-900">
          Other Ways to Reach Us
        </h2>
        <p className="mb-2 text-gray-600">
          <strong>Email:</strong>{' '}
          <a href="mailto:contact@welearngreek.com" className="font-medium text-brand-600 hover:text-brand-700">
            contact@welearngreek.com
          </a>
        </p>
        <p className="text-gray-600">
          <strong>Follow us:</strong>{' '}
          <span className="text-brand-600">Twitter · Facebook · Instagram</span>
        </p>
      </Card>
    </PageLayout>
  );
};

export default Contact;
