import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  FaBookmark,
  FaBookOpen,
  FaGlobeEurope,
  FaLanguage,
  FaPenNib,
  FaSearch,
  FaTable,
  FaUserGraduate,
} from 'react-icons/fa';
import { ROUTES } from '../constants/routes';
import { DonateButton, PageHero } from '../components/features';
import { Section } from '../components/layout';
import { Card } from '../components/ui';
import { FadeIn, StaggerChildren, StaggerItem } from '../components/motion';
import { useHeroVideo } from '../hooks/useHeroVideo';
import { usePageTitle } from '../hooks/usePageTitle';
import { useAuth } from '../context/AuthContext';
import { prefetchOn } from '../routes/pages';

// Copy lives in the locale files (home.steps.*, home.tools.*); these hold icons and links.
const STEPS = [
  { key: 'lookUp', icon: FaSearch, links: [{ labelKey: 'nav.nouns', to: ROUTES.nouns }, { labelKey: 'nav.verbs', to: ROUTES.verbs }] },
  { key: 'understand', icon: FaTable },
  { key: 'save', icon: FaBookmark, links: [{ labelKey: 'nav.myWords', to: ROUTES.myWords }] },
];

const TOOLS = [
  { key: 'nouns', icon: FaPenNib, to: ROUTES.nouns },
  { key: 'verbs', icon: FaUserGraduate, to: ROUTES.verbs },
  { key: 'greekDefinitions', icon: FaLanguage, to: ROUTES.greekToGreek },
  { key: 'wordRoots', icon: FaGlobeEurope, to: ROUTES.wordRoots },
  { key: 'myWords', icon: FaBookOpen, to: ROUTES.myWords },
];

const HeroLink = ({ to, primary, children }) => (
  <Link
    to={to}
    {...prefetchOn(to)}
    className={`inline-flex items-center justify-center rounded-full px-6 py-3 text-lg font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-900 ${
      primary ? 'bg-white text-brand-900 hover:bg-brand-50' : 'text-white ring-2 ring-white/60 hover:bg-white/10'
    }`}
  >
    {children}
  </Link>
);

const Home = () => {
  const video = useHeroVideo('background');
  const { isAuthenticated } = useAuth();
  const { t } = useTranslation();
  usePageTitle(t('home.pageTitle'));

  return (
    <div className="min-h-screen">
      <PageHero
        video={video}
        title={t('home.heroTitle')}
        subtitle={t('home.heroSubtitle')}
      >
        <HeroLink to={ROUTES.verbs} primary>
          {t('home.startWithVerbs')}
        </HeroLink>
        {isAuthenticated ? (
          <HeroLink to={ROUTES.myWords}>{t('home.openMyWords')}</HeroLink>
        ) : (
          <HeroLink to={ROUTES.register}>{t('nav.signUp')}</HeroLink>
        )}
      </PageHero>

      <Section variant="default">
        <FadeIn>
          <p className="mb-2 text-center text-sm font-semibold uppercase tracking-wide text-brand-600">
            {t('home.startHere')}
          </p>
          <h2 className="mb-12 text-center font-display text-3xl font-semibold text-brand-900">
            {t('home.howToUse')}
          </h2>
        </FadeIn>
        <StaggerChildren className="grid gap-6 md:grid-cols-3" stagger={0.12}>
          {STEPS.map(({ key, icon: Icon, links }, index) => (
            <StaggerItem key={key}>
              <Card className="h-full">
                <div className="mb-4 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-600 font-semibold text-white">
                    {index + 1}
                  </span>
                  <Icon className="text-brand-600" size={20} aria-hidden="true" />
                </div>
                <h3 className="mb-2 font-display text-xl font-bold text-brand-900">
                  {t(`home.steps.${key}.title`)}
                </h3>
                <p className="text-sm text-gray-600">{t(`home.steps.${key}.description`)}</p>
                {links && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {links.map((link) => (
                      <Link
                        key={link.to}
                        to={link.to}
                        {...prefetchOn(link.to)}
                        className="rounded-full bg-brand-50 px-3 py-1 text-sm font-medium text-brand-700 hover:bg-brand-100"
                      >
                        {t(link.labelKey)} →
                      </Link>
                    ))}
                  </div>
                )}
              </Card>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </Section>

      <Section variant="muted">
        <FadeIn>
          <h2 className="mb-12 text-center font-display text-3xl font-semibold text-brand-900">
            {t('home.everything')}
          </h2>
        </FadeIn>
        <StaggerChildren className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
          {TOOLS.map(({ key, icon: Icon, to }) => (
            <StaggerItem key={key}>
              <Link to={to} className="group block h-full" {...prefetchOn(to)}>
                <Card hover className="flex h-full flex-col items-start">
                  <div className="mb-4 rounded-full bg-brand-50 p-3 text-brand-600 transition-colors group-hover:bg-brand-100">
                    <Icon size={26} aria-hidden="true" />
                  </div>
                  <h3 className="mb-1 font-display text-xl font-bold text-brand-900">{t(`nav.${key}`)}</h3>
                  <p className="text-sm text-gray-600">{t(`home.tools.${key}`)}</p>
                  <span className="mt-4 text-sm font-semibold text-brand-600 group-hover:text-brand-700">
                    {t('home.open', { tool: t(`nav.${key}`) })}
                  </span>
                </Card>
              </Link>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </Section>

      <Section variant="default">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <h2 className="mb-6 font-display text-3xl font-semibold text-brand-900">{t('home.whyTitle')}</h2>
          <p className="mb-4 leading-relaxed text-gray-700">
            {t('home.whyP1')}
          </p>
          <p className="leading-relaxed text-gray-700">
            {t('home.whyP2')}{' '}
            <Link to={ROUTES.about} className="font-medium text-brand-600 hover:text-brand-700">
              {t('home.readStory')}
            </Link>
          </p>
        </FadeIn>
      </Section>

      <Section variant="gradient" contained={false}>
        <FadeIn className="page-container mx-auto max-w-3xl text-center">
          <h2 className="mb-4 font-display text-3xl font-bold text-white sm:text-4xl">
            {t('home.supportTitle')}
          </h2>
          <p className="mb-8 text-lg leading-relaxed text-white/90">
            {t('home.supportText')}
          </p>
          <DonateButton label={t('donate.supportProject')} source="home" />
        </FadeIn>
      </Section>
    </div>
  );
};

export default Home;
