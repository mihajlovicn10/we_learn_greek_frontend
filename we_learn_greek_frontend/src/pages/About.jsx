import React from 'react';
import { Link } from 'react-router-dom';
import { PageLayout } from '../components/layout';
import { Card } from '../components/ui';
import { ROUTES } from '../constants/routes';

const features = [
  {
    title: 'Dictionary',
    description: 'Comprehensive Greek-English dictionary with example sentences and usage notes.',
  },
  {
    title: 'Verb Conjugations',
    description: 'Complete verb conjugation tables for all tenses and moods.',
  },
  {
    title: 'Greek to Greek',
    description: 'Native Greek definitions to enhance your understanding.',
  },
  {
    title: 'Transparent Words',
    description: 'Discover words that are similar across different languages.',
  },
];

const About = () => {
  return (
    <PageLayout title="About We Learn Greek" narrow>
      <Card padding="lg">
        <section className="mb-8 text-center">
          <h2 className="mb-4 font-display text-xl font-semibold text-brand-900">Our Mission</h2>
          <p className="leading-relaxed text-gray-600">
            We Learn Greek is dedicated to making Modern Greek language learning accessible,
            engaging, and effective for learners worldwide. Our platform combines comprehensive
            learning tools with an intuitive interface to help you master the Greek language.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-6 text-center font-display text-xl font-semibold text-brand-900">
            Features
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {features.map((feature) => (
              <Card
                key={feature.title}
                padding="sm"
                hover
                className="bg-surface-muted text-center"
              >
                <h3 className="mb-2 font-display text-lg font-semibold text-brand-700">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </Card>
            ))}
          </div>
        </section>

        <section className="text-center">
          <h2 className="mb-4 font-display text-xl font-semibold text-brand-900">Contact Us</h2>
          <p className="text-gray-600">
            Have questions or suggestions? We&apos;d love to hear from you! Visit our{' '}
            <Link to={ROUTES.contact} className="font-medium text-brand-600 hover:text-brand-700">
              Contact page
            </Link>{' '}
            or email us at{' '}
            <a
              href="mailto:contact@welearngreek.com"
              className="font-medium text-brand-600 hover:text-brand-700"
            >
              contact@welearngreek.com
            </a>
          </p>
        </section>
      </Card>
    </PageLayout>
  );
};

export default About;
