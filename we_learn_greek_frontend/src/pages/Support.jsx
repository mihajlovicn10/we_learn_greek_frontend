import { Link } from 'react-router-dom';
import { Trans, useTranslation } from 'react-i18next';
import { FaServer, FaBookOpen, FaRocket, FaEnvelope } from 'react-icons/fa';
import { PageLayout } from '../components/layout';
import { Card } from '../components/ui';
import { DonateButton } from '../components/features';
import { FadeIn, StaggerChildren, StaggerItem } from '../components/motion';
import { ROUTES } from '../constants/routes';
import { CONTACT_EMAIL, DONATE_URL } from '../config';

const LINK_CLASS = 'font-medium text-brand-600 hover:text-brand-700';

// Copy lives in support.impact.* in the locale files.
const IMPACT = [
  { key: 'running', icon: FaServer },
  { key: 'content', icon: FaBookOpen },
  { key: 'features', icon: FaRocket },
];

const Support = () => {
  const { t } = useTranslation();

  return (
    <PageLayout title={t('support.title')} subtitle={t('support.subtitle')}>
      <FadeIn>
        <Card padding="lg" className="mx-auto mb-12 max-w-3xl text-center">
          <p className="mb-6 leading-relaxed text-gray-700">{t('support.intro')}</p>
          {DONATE_URL ? (
            <DonateButton label={t('donate.makeDonation')} source="support-page" />
          ) : (
            <p className="text-gray-600">
              <Trans
                i18nKey="support.comingSoon"
                components={{ link: <Link to={ROUTES.contact} className={LINK_CLASS} /> }}
              />
            </p>
          )}
        </Card>
      </FadeIn>

      <h2 className="mb-8 text-center font-display text-2xl font-semibold text-brand-900">
        {t('support.impactTitle')}
      </h2>
      <StaggerChildren className="mb-12 grid gap-6 md:grid-cols-3" stagger={0.1}>
        {IMPACT.map(({ key, icon: Icon }) => (
          <StaggerItem key={key}>
            <Card className="h-full text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand-100 text-brand-600">
                <Icon size={22} aria-hidden="true" />
              </div>
              <h3 className="mb-2 font-display text-lg font-bold text-brand-900">
                {t(`support.impact.${key}.title`)}
              </h3>
              <p className="text-sm text-gray-600">{t(`support.impact.${key}.description`)}</p>
            </Card>
          </StaggerItem>
        ))}
      </StaggerChildren>

      <Card padding="md" className="mx-auto max-w-3xl text-center">
        <h2 className="mb-3 flex items-center justify-center gap-2 font-display text-lg font-semibold text-brand-900">
          <FaEnvelope aria-hidden="true" className="text-brand-600" />
          {t('support.partnersTitle')}
        </h2>
        <p className="text-gray-600">
          <Trans
            i18nKey="support.partnersText"
            values={{ email: CONTACT_EMAIL }}
            components={{ email: <a href={`mailto:${CONTACT_EMAIL}`} className={LINK_CLASS} /> }}
          />
        </p>
      </Card>
    </PageLayout>
  );
};

export default Support;
