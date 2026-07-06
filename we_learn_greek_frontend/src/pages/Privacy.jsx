import { Link } from 'react-router-dom';
import { PageLayout } from '../components/layout';
import { Card } from '../components/ui';
import { ROUTES } from '../constants/routes';

const Privacy = () => {
  return (
    <PageLayout title="Privacy Policy" narrow>
      <Card padding="lg" className="prose prose-brand max-w-none text-left">
        <section className="mb-8">
          <h2 className="mb-4 text-center font-display text-xl font-semibold text-brand-900">
            Introduction
          </h2>
          <p className="text-center text-gray-600">
            At We Learn Greek, we take your privacy seriously. This Privacy Policy explains how we
            collect, use, disclose, and safeguard your information when you visit our website and
            use our services.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-center font-display text-xl font-semibold text-brand-900">
            Information We Collect
          </h2>
          <h3 className="mb-2 text-center font-semibold text-gray-800">Personal Information</h3>
          <p className="mb-4 text-center text-gray-600">
            We may collect personal information that you voluntarily provide when you register,
            contact us, or participate in discussions.
          </p>
          <ul className="mb-4 list-disc pl-8 text-gray-600">
            <li>Register for an account</li>
            <li>Sign up for our newsletter</li>
            <li>Contact us through our contact form</li>
            <li>Participate in user forums or discussions</li>
          </ul>
          <h3 className="mb-2 text-center font-semibold text-gray-800">Usage Information</h3>
          <ul className="list-disc pl-8 text-gray-600">
            <li>IP address and browser type</li>
            <li>Device information</li>
            <li>Pages visited and time spent</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-center font-display text-xl font-semibold text-brand-900">
            How We Use Your Information
          </h2>
          <ul className="list-disc pl-8 text-gray-600">
            <li>To provide and maintain our service</li>
            <li>To notify you about changes to our service</li>
            <li>To provide customer support</li>
            <li>To improve our service and monitor usage</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-center font-display text-xl font-semibold text-brand-900">
            Your Rights
          </h2>
          <ul className="list-disc pl-8 text-gray-600">
            <li>Access your personal data</li>
            <li>Correct inaccurate personal data</li>
            <li>Request deletion of your personal data</li>
            <li>Object to or restrict processing</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-4 text-center font-display text-xl font-semibold text-brand-900">
            Contact Us
          </h2>
          <p className="text-center text-gray-600">
            Questions about this policy? Email{' '}
            <a href="mailto:privacy@welearngreek.com" className="font-medium text-brand-600 hover:text-brand-700">
              privacy@welearngreek.com
            </a>{' '}
            or visit our{' '}
            <Link to={ROUTES.contact} className="font-medium text-brand-600 hover:text-brand-700">
              Contact page
            </Link>
            .
          </p>
          <p className="mt-4 text-center text-sm italic text-gray-500">
            Last Updated: {new Date().toLocaleDateString()}
          </p>
        </section>
      </Card>
    </PageLayout>
  );
};

export default Privacy;
