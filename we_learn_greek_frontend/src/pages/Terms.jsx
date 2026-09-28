import { Link } from 'react-router-dom';
import { Trans, useTranslation } from 'react-i18next';
import { PageLayout } from '../components/layout';
import { Card } from '../components/ui';
import { ROUTES } from '../constants/routes';

// Update whenever the terms text changes (both locale files).
const LAST_UPDATED = '2026-09-28';

const H2_CLASS = 'mb-4 font-display text-xl font-semibold text-brand-900';

const Terms = () => {
  const { t, i18n } = useTranslation();
  const list = (key) => t(key, { returnObjects: true });
  const lastUpdated = new Date(LAST_UPDATED).toLocaleDateString(i18n.resolvedLanguage, {
    dateStyle: 'long',
  });

  return (
    <PageLayout title={t('terms.title')} narrow>
      <Card padding="lg" className="text-left">
        <section className="mb-8">
          <h2 className={H2_CLASS}>{t('terms.agreementTitle')}</h2>
          <p className="text-gray-600">{t('terms.agreement')}</p>
        </section>

        <section className="mb-8">
          <h2 className={H2_CLASS}>{t('terms.accountsTitle')}</h2>
          <p className="mb-4 text-gray-600">{t('terms.accounts')}</p>
          <ul className="list-disc pl-6 text-gray-600">
            {list('terms.accountsList').map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="mb-8">
          <h2 className={H2_CLASS}>{t('terms.ipTitle')}</h2>
          <p className="text-gray-600">{t('terms.ip')}</p>
        </section>

        <section className="mb-8">
          <h2 className={H2_CLASS}>{t('terms.prohibitedTitle')}</h2>
          <ul className="list-disc pl-6 text-gray-600">
            {list('terms.prohibited').map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="mb-8">
          <h2 className={H2_CLASS}>{t('terms.liabilityTitle')}</h2>
          <p className="text-gray-600">{t('terms.liability')}</p>
        </section>

        <section>
          <h2 className={H2_CLASS}>{t('terms.contactTitle')}</h2>
          <p className="text-gray-600">
            <Trans
              i18nKey="terms.contact"
              components={{
                link: <Link to={ROUTES.contact} className="font-medium text-brand-600 hover:text-brand-700" />,
              }}
            />
          </p>
          <p className="mt-4 text-sm italic text-gray-500">
            {t('common.lastUpdated', { date: lastUpdated })}
          </p>
        </section>
      </Card>
    </PageLayout>
  );
};

export default Terms;
