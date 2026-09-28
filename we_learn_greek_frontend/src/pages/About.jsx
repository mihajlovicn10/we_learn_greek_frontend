import { Link } from 'react-router-dom';
import { Trans, useTranslation } from 'react-i18next';
import { PageLayout } from '../components/layout';
import { Card } from '../components/ui';
import { ROUTES } from '../constants/routes';
import { CONTACT_EMAIL } from '../config';

const LINK_CLASS = 'font-medium text-brand-600 hover:text-brand-700';
const FEATURES = ['nouns', 'verbs', 'greekDefinitions', 'wordRoots', 'myWords'];

const About = () => {
  const { t } = useTranslation();

  return (
    <PageLayout title={t('about.title')} narrow>
      <Card padding="lg">
        <section className="mb-8 text-center">
          <h2 className="mb-4 font-display text-xl font-semibold text-brand-900">
            {t('about.missionTitle')}
          </h2>
          <p className="leading-relaxed text-gray-600">{t('about.mission')}</p>
        </section>

        <section className="mb-8">
          <h2 className="mb-6 text-center font-display text-xl font-semibold text-brand-900">
            {t('about.featuresTitle')}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {FEATURES.map((key) => (
              <Card key={key} padding="sm" hover className="bg-surface-muted text-center">
                <h3 className="mb-2 font-display text-lg font-semibold text-brand-700">{t(`nav.${key}`)}</h3>
                <p className="text-sm text-gray-600">{t(`about.features.${key}`)}</p>
              </Card>
            ))}
          </div>
        </section>

        <section className="text-center">
          <h2 className="mb-4 font-display text-xl font-semibold text-brand-900">
            {t('about.contactTitle')}
          </h2>
          <p className="text-gray-600">
            <Trans
              i18nKey="about.contactText"
              values={{ email: CONTACT_EMAIL }}
              components={{
                link: <Link to={ROUTES.contact} className={LINK_CLASS} />,
                email: <a href={`mailto:${CONTACT_EMAIL}`} className={LINK_CLASS} />,
              }}
            />
          </p>
        </section>
      </Card>
    </PageLayout>
  );
};

export default About;
