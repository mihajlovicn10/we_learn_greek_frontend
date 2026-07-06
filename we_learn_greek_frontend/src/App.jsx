import { lazy, Suspense } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import PageLoader from './components/layout/PageLoader';
import ErrorBoundary from './components/common/ErrorBoundary';
import Toast from './components/common/Toast';
import { queryClient } from './lib/queryClient';
import { ROUTES } from './constants/routes';

import Home from './pages/Home';

const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const VerbList = lazy(() => import('./pages/VerbList'));
const VerbSearch = lazy(() => import('./pages/VerbSearch'));
const WordDictionary = lazy(() => import('./pages/WordDictionary'));
const GreekToGreekList = lazy(() => import('./pages/GreekToGreekList'));
const TransparentLanguageSelect = lazy(() => import('./pages/TransparentLanguageSelect'));
const TransparentWords = lazy(() => import('./pages/TransparentWords'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Terms = lazy(() => import('./pages/Terms'));
const WordSearch = lazy(() => import('./pages/WordSearch'));
const WordList = lazy(() => import('./pages/WordList'));
const SavedWords = lazy(() => import('./pages/SavedWords'));

function AppRoutes() {
  const location = useLocation();

  return (
    <Suspense fallback={<PageLoader />}>
      <Routes location={location}>
            <Route path={ROUTES.home} element={<Home />} />

            <Route
              path={ROUTES.dictionary}
              element={
                <ProtectedRoute>
                  <WordDictionary />
                </ProtectedRoute>
              }
            />
            <Route
              path={ROUTES.savedWords}
              element={
                <ProtectedRoute>
                  <SavedWords />
                </ProtectedRoute>
              }
            />

            <Route path={ROUTES.verbSearch} element={<VerbSearch />} />
            <Route path={ROUTES.conjugatorVerbs} element={<VerbList />} />
            <Route path={ROUTES.declinator} element={<WordSearch />} />
            <Route path={ROUTES.declinatorNouns} element={<WordList />} />
            <Route path={ROUTES.greekToGreek} element={<GreekToGreekList />} />

            <Route path="/transparent-words/:language" element={<TransparentWords />} />
            <Route
              path={ROUTES.transparentLanguageSelect}
              element={<TransparentLanguageSelect />}
            />

            <Route path={ROUTES.login} element={<Login />} />
            <Route path={ROUTES.register} element={<Register />} />
            <Route path={ROUTES.about} element={<About />} />
            <Route path={ROUTES.contact} element={<Contact />} />
            <Route path={ROUTES.privacy} element={<Privacy />} />
            <Route path={ROUTES.terms} element={<Terms />} />

            <Route path="/conjugator" element={<Navigate to={ROUTES.verbSearch} replace />} />
            <Route
              path="/greek-to-greek-dictionary"
              element={<Navigate to={ROUTES.greekToGreek} replace />}
            />
            <Route
              path="/transparent-greek-words"
              element={<Navigate to={ROUTES.transparentLanguageSelect} replace />}
            />
            <Route path="/noun-search" element={<Navigate to={ROUTES.declinator} replace />} />
          </Routes>
    </Suspense>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <Router>
          <AuthProvider>
            <div className="flex min-h-screen flex-col">
              <Navbar />
              <main className="flex-grow overflow-x-hidden">
                <AppRoutes />
              </main>
              <Footer />
              <Toast />
            </div>
          </AuthProvider>
        </Router>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
