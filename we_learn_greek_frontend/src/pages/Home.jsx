import { Link } from 'react-router-dom';
import { FaBook, FaPenNib, FaCheck, FaLanguage, FaGlobe, FaSearch, FaUserGraduate } from 'react-icons/fa';
import { ROUTES } from '../constants/routes';
import { PageHero } from '../components/features';
import { Section } from '../components/layout';
import { Button, Card } from '../components/ui';
import { FadeIn, StaggerChildren, StaggerItem } from '../components/motion';
import { useHeroVideo } from '../hooks/useHeroVideo';

const HERO_HEADLINES = [
  'Master Greek grammar with ease!',
  'Learn Greek verbs and nouns!',
  'Explore Greek vocabulary!',
];

const features = [
  {
    icon: FaBook,
    title: 'Dictionary',
    description:
      'A personalized vocabulary builder where students can add Greek words with pronunciation and translations.',
    to: ROUTES.dictionary,
  },
  {
    icon: FaPenNib,
    title: 'Declinator',
    description:
      'Helps students master Greek grammar by exploring noun forms, cases, and variations.',
    to: ROUTES.declinator,
  },
  {
    icon: FaCheck,
    title: 'Conjugator',
    description:
      'Enables learners to study Greek verbs by providing all possible verb forms and tenses.',
    to: ROUTES.verbSearch,
  },
  {
    icon: FaLanguage,
    title: 'Greek to Greek Glossary',
    description:
      'Provides Greek word definitions entirely in Greek, reinforcing immersion and comprehension.',
    to: ROUTES.greekToGreek,
  },
  {
    icon: FaGlobe,
    title: 'Transparent Greek Words',
    description:
      'Highlights Greek words in various languages, helping learners appreciate Greek linguistic influence.',
    to: ROUTES.transparentLanguageSelect,
  },
];

const steps = [
  {
    icon: FaSearch,
    title: 'Explore',
    description: 'Browse verbs, nouns, and transparent words — or build your personal dictionary.',
  },
  {
    icon: FaUserGraduate,
    title: 'Practice',
    description: 'Study conjugations, declensions, and hear native pronunciation with text-to-speech.',
  },
  {
    icon: FaBook,
    title: 'Retain',
    description: 'Save words to your account and revisit them anytime as your vocabulary grows.',
  },
];

const Home = () => {
  const video = useHeroVideo('background');

  return (
    <div className="min-h-screen">
      <PageHero video={video} headlines={HERO_HEADLINES} />

      <Section variant="gradient" contained={false}>
        <div className="page-container">
          <FadeIn>
            <h2 className="mb-12 text-center font-display text-3xl font-bold text-white sm:text-4xl">
              About Us
            </h2>
          </FadeIn>
          <StaggerChildren className="grid gap-8 md:grid-cols-2" stagger={0.12}>
            <StaggerItem>
              <Card className="bg-white/10 text-white shadow-none backdrop-blur-sm transition-all duration-300 hover:bg-white/15">
                <p className="leading-relaxed text-white/95">
                  We Learn Greek was born from a simple idea — to make learning Greek approachable,
                  inspiring, and highly engaging. Instead of following the traditional classroom model,
                  we provide a non-formal, self-paced learning environment with structured declensions,
                  verb conjugations, and a personal dictionary.
                </p>
              </Card>
            </StaggerItem>
            <StaggerItem>
              <Card className="bg-white/10 text-white shadow-none backdrop-blur-sm transition-all duration-300 hover:bg-white/15">
                <p className="leading-relaxed text-white/95">
                  Greek is not just a language — it is the origin of science, philosophy, and global
                  vocabulary. Through Transparent Words, you will uncover how countless modern words
                  trace their roots back to Greek across English, French, German, Spanish, and more.
                </p>
              </Card>
            </StaggerItem>
          </StaggerChildren>
        </div>
      </Section>

      <Section variant="muted">
        <FadeIn>
          <h2 className="mb-12 text-center font-display text-3xl font-semibold text-brand-900">
            How It Works
          </h2>
        </FadeIn>
        <StaggerChildren className="grid gap-8 md:grid-cols-3" stagger={0.12}>
          {steps.map(({ icon: Icon, title, description }, index) => (
            <StaggerItem key={title}>
              <Card hover className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand-100 text-brand-600 transition-colors duration-300">
                  <Icon size={22} />
                </div>
                <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-brand-600">
                  Step {index + 1}
                </p>
                <h3 className="mb-2 font-display text-xl font-bold text-brand-900">{title}</h3>
                <p className="text-sm text-gray-600">{description}</p>
              </Card>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </Section>

      <Section variant="default">
        <FadeIn>
          <h2 className="mb-12 text-center font-display text-3xl font-semibold text-brand-900">
            What We Are Offering
          </h2>
        </FadeIn>
        <StaggerChildren className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
          {features.map(({ icon: Icon, title, description, to }) => (
            <StaggerItem key={title}>
              <Link to={to} className="group block h-full">
                <Card hover className="flex h-full flex-col items-center text-center">
                  <div className="mb-4 rounded-full bg-brand-50 p-4 text-brand-600 transition-all duration-300 group-hover:scale-105 group-hover:bg-brand-100">
                    <Icon size={36} />
                  </div>
                  <h3 className="mb-2 font-display text-xl font-bold text-brand-900 transition-colors duration-300 group-hover:text-brand-700">
                    {title}
                  </h3>
                  <p className="text-sm text-gray-600">{description}</p>
                </Card>
              </Link>
            </StaggerItem>
          ))}
        </StaggerChildren>

        <FadeIn delay={0.2} className="mt-16 text-center">
          <Link to={ROUTES.login}>
            <Button variant="primary" size="large" shape="pill">
              Get Started — Login
            </Button>
          </Link>
        </FadeIn>
      </Section>
    </div>
  );
};

export default Home;
