import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import ErrorBoundary from './components/common/ErrorBoundary'
import Toast from './components/common/Toast'

// Conjugator pages
import VerbList from './pages/VerbList'
import VerbSearch from './pages/VerbSearch'

// Dictionary pages
import AddWord from './pages/AddWord'
import WordDictionary from './pages/WordDictionary'

// Greek to Greek pages
import GreekToGreekList from './pages/GreekToGreekList'
import GreekToGreek from './pages/GreekToGreekSearch'

// Transparent Words pages
import TransparentLanguageSelect from './pages/TransparentLanguageSelect'
import TransparentWords from './pages/TransparentWords'

// New pages
import About from './pages/About'
import Contact from './pages/Contact'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import WordSearch from './pages/WordSearch'
import WordList from './pages/WordList'
import SavedWords from './pages/SavedWords'
  
function App() {
  console.log('App is rendering');

  return (
    <ErrorBoundary>
      <Router>
        <AuthProvider>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/dictionary" element={<WordDictionary />} />
                <Route path="/dictionary/words" element={<SavedWords />} />
                <Route path="/conjugator/verbs" element={<VerbList />} />
                <Route path="/declinator" element={<WordSearch />} />
                <Route path="/declinator/nouns" element={<WordList />} />
                <Route path="/greek-to-greek" element={<GreekToGreek />} />
                <Route path="/transparent-words/:language" element={<TransparentWords />} />
                <Route path="/transparent-language-select" element={<TransparentLanguageSelect />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/verb-search" element={<VerbSearch />} />
              </Routes>
            </main>
            <Footer />
            <Toast />
          </div>
        </AuthProvider>
      </Router>
    </ErrorBoundary>
  )
}

export default App