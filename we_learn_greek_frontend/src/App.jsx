import { Suspense, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
  useParams,
} from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { m } from 'framer-motion';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import PageLoader from './components/layout/PageLoader';
import ScrollManager from './components/layout/ScrollManager';
import BackToTop from './components/layout/BackToTop';
import ErrorBoundary from './components/common/ErrorBoundary';
import Toast from './components/common/Toast';
import { MotionProvider } from './components/motion';
import { queryClient } from './lib/queryClient';
import { LEGACY_REDIRECTS, ROUTES } from './constants/routes';
import { pages, preloadMainPagesWhenIdle } from './routes/pages';

// Home is the landing page, so it ships in the main bundle; everything else loads on demand.
import Home from './pages/Home';

const {
  Login,
  Register,
  Nouns,
  Verbs,
  GreekDefinitions,
  WordRoots,
  WordRootsLanguage,
  MyWords,
  About,
  Contact,
  Privacy,
  Terms,
  Support,
  NotFound,
} = pages;

/** Old per-language URL (/transparent-words/:language) → /word-roots/:language. */
function LegacyWordRootsRedirect() {
  const { language } = useParams();
  return <Navigate to={ROUTES.wordRootsLanguage(language)} replace />;
}

function AppRoutes() {
  const location = useLocation();

  return (
    <Suspense fallback={<PageLoader />}>
      {/* Keyed by pathname: each new page fades in; search/filter changes (?q=) don't re-animate. */}
      <m.div
        key={location.pathname}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <Routes location={location}>
          <Route path={ROUTES.home} element={<Home />} />

          <Route path={ROUTES.nouns} element={<Nouns />} />
          <Route path={ROUTES.verbs} element={<Verbs />} />
          <Route path={ROUTES.greekToGreek} element={<GreekDefinitions />} />
          <Route path={ROUTES.wordRoots} element={<WordRoots />} />
          <Route path={ROUTES.wordRootsLanguage(':language')} element={<WordRootsLanguage />} />
          <Route
            path={ROUTES.myWords}
            element={
              <ProtectedRoute>
                <MyWords />
              </ProtectedRoute>
            }
          />

          <Route path={ROUTES.login} element={<Login />} />
          <Route path={ROUTES.register} element={<Register />} />
          <Route path={ROUTES.about} element={<About />} />
          <Route path={ROUTES.contact} element={<Contact />} />
          <Route path={ROUTES.privacy} element={<Privacy />} />
          <Route path={ROUTES.terms} element={<Terms />} />
          <Route path={ROUTES.support} element={<Support />} />

          {Object.entries(LEGACY_REDIRECTS).map(([from, to]) => (
            <Route key={from} path={from} element={<Navigate to={to} replace />} />
          ))}
          <Route path="/transparent-words/:language" element={<LegacyWordRootsRedirect />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </m.div>
    </Suspense>
  );
}

function App() {
  useEffect(() => {
    preloadMainPagesWhenIdle();
  }, []);

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <MotionProvider>
          <Router>
            <AuthProvider>
              <ScrollManager />
              <div className="flex min-h-screen flex-col">
                <Navbar />
                <main className="flex-grow overflow-x-hidden">
                  <AppRoutes />
                </main>
                <Footer />
                <BackToTop />
                <Toast />
              </div>
            </AuthProvider>
          </Router>
        </MotionProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
