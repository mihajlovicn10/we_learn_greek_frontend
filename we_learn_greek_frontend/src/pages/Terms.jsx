import { Link } from 'react-router-dom';
import { PageLayout } from '../components/layout';
import { Card } from '../components/ui';
import { ROUTES } from '../constants/routes';

const Terms = () => {
  return (
    <PageLayout title="Terms and Conditions" narrow>
      <Card padding="lg" className="text-left">
        <section className="mb-8">
          <h2 className="mb-4 font-display text-xl font-semibold text-brand-900">1. Agreement to Terms</h2>
          <p className="text-gray-600">
            By accessing and using We Learn Greek, you agree to be bound by these Terms and Conditions
            and our Privacy Policy.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 font-display text-xl font-semibold text-brand-900">2. User Accounts</h2>
          <p className="mb-4 text-gray-600">
            When you create an account, you must provide accurate and complete information. You are
            responsible for safeguarding your account credentials.
          </p>
          <ul className="list-disc pl-6 text-gray-600">
            <li>Maintaining confidentiality of your password</li>
            <li>Restricting access to your account</li>
            <li>All activities under your account</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 font-display text-xl font-semibold text-brand-900">3. Intellectual Property</h2>
          <p className="text-gray-600">
            The Service and its original content are owned by We Learn Greek and protected by
            applicable intellectual property laws.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 font-display text-xl font-semibold text-brand-900">4. Prohibited Uses</h2>
          <ul className="list-disc pl-6 text-gray-600">
            <li>Violating applicable laws or regulations</li>
            <li>Impersonating other users</li>
            <li>Unauthorized access to systems or data</li>
            <li>Unauthorized commercial use of the Service</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 font-display text-xl font-semibold text-brand-900">5. Limitation of Liability</h2>
          <p className="text-gray-600">
            We Learn Greek shall not be liable for indirect, incidental, or consequential damages
            arising from your use of the Service.
          </p>
        </section>

        <section>
          <h2 className="mb-4 font-display text-xl font-semibold text-brand-900">6. Contact Us</h2>
          <p className="text-gray-600">
            Questions about these Terms?{' '}
            <Link to={ROUTES.contact} className="font-medium text-brand-600 hover:text-brand-700">
              Contact us
            </Link>
            .
          </p>
          <p className="mt-4 text-sm italic text-gray-500">
            Last Updated: {new Date().toLocaleDateString()}
          </p>
        </section>
      </Card>
    </PageLayout>
  );
};

export default Terms;
