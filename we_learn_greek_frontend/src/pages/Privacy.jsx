import { Link } from 'react-router-dom';
import { Trans, useTranslation } from 'react-i18next';
import { PageLayout } from '../components/layout';
import { Card } from '../components/ui';
import { ROUTES } from '../constants/routes';
import { CONTACT_EMAIL } from '../config';

// Update whenever the policy text changes (both locale files).
const LAST_UPDATED = '2026-09-28';

const LINK_CLASS = 'font-medium text-brand-600 hover:text-brand-700';
const H2_CLASS = 'mb-4 text-center font-display text-xl font-semibold text-brand-900';
const H3_CLASS = 'mb-2 text-center font-semibold text-gray-800';

const Privacy = () => {
  const { t, i18n } = useTranslation();
  const list = (key) => t(key, { returnObjects: true });
  const lastUpdated = new Date(LAST_UPDATED).toLocaleDateString(i18n.resolvedLanguage, {
    dateStyle: 'long',
  });

  return (
    <PageLayout title={t('privacy.title')} narrow>
      <Card padding="lg" className="max-w-none text-left">
        <section className="mb-8">
          <h2 className={H2_CLASS}>{t('privacy.introTitle')}</h2>
          <p className="text-center text-gray-600">{t('privacy.intro')}</p>
        </section>

        <section className="mb-8">
          <h2 className={H2_CLASS}>{t('privacy.collectTitle')}</h2>
          <h3 className={H3_CLASS}>{t('privacy.personalTitle')}</h3>
          <p className="mb-4 text-center text-gray-600">{t('privacy.personalIntro')}</p>
          <ul className="mb-4 list-disc pl-8 text-gray-600">
            {list('privacy.personal').map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <h3 className={H3_CLASS}>{t('privacy.usageTitle')}</h3>
          <ul className="list-disc pl-8 text-gray-600">
            {list('privacy.usage').map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="mt-4 text-center text-gray-600">{t('privacy.analytics')}</p>
        </section>

        <section className="mb-8">
          <h2 className={H2_CLASS}>{t('privacy.useTitle')}</h2>
          <ul className="list-disc pl-8 text-gray-600">
            {list('privacy.use').map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="mb-8">
          <h2 className={H2_CLASS}>{t('privacy.rightsTitle')}</h2>
          <ul className="list-disc pl-8 text-gray-600">
            {list('privacy.rights').map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className={H2_CLASS}>{t('privacy.contactTitle')}</h2>
          <p className="text-center text-gray-600">
            <Trans
              i18nKey="privacy.contact"
              values={{ email: CONTACT_EMAIL }}
              components={{
                email: <a href={`mailto:${CONTACT_EMAIL}`} className={LINK_CLASS} />,
                link: <Link to={ROUTES.contact} className={LINK_CLASS} />,
              }}
            />
          </p>
          <p className="mt-4 text-center text-sm italic text-gray-500">
            {t('common.lastUpdated', { date: lastUpdated })}
          </p>
        </section>
      </Card>
    </PageLayout>
  );
};

export default Privacy;
