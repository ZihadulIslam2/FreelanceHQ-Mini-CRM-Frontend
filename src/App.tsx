import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
} from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { ThemeProvider, useTheme } from './contexts/ThemeContext'
import { useAuth } from './hooks/useAuth'
import { LoginForm } from './components/auth/LoginForm'
import { SignupForm } from './components/auth/SignupForm'
import { ClientList } from './components/clients/ClientList'
import { ClientForm } from './components/clients/ClientForm'
import { ClientDetails } from './components/clients/ClientDetails'
import { ProjectForm } from './components/projects/ProjectForm'
import { ProjectView } from './components/projects/ProjectView'
import { ProjectList } from './components/projects/ProjectList'
import { RemindersPage } from './components/reminders/RemindersPage'
import Dashboard from './components/dashboard/Dashboard'
import Navbar from './components/common/Navbar'
import Footer from './components/Footer'
import About from './pages/About'
import './App.css'
import './AuthLayout.css'

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loading } = useAuth()

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />
}

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loading } = useAuth()

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  return !isAuthenticated ? <>{children}</> : <Navigate to="/dashboard" />
}

const DashboardLayout = () => {
  const { theme } = useTheme()
  
  return (
    <div className={`min-h-screen transition-colors duration-200 ${
      theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'
    }`}>
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/clients" element={<ClientList />} />
          <Route path="/clients/new" element={<ClientForm />} />
          <Route path="/clients/:id" element={<ClientDetails />} />
          <Route path="/clients/:id/edit" element={<ClientForm />} />
          <Route path="/projects" element={<ProjectList />} />
          <Route path="/clients/:clientId/projects/new" element={<ProjectForm />} />
          <Route path="/clients/:clientId/projects/:projectId" element={<ProjectView />} />
          <Route path="/clients/:clientId/projects/:projectId/edit" element={<ProjectForm />} />
          <Route path="/reminders" element={<RemindersPage />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </div>
  )
}

const AppContent = () => {
  const { theme } = useTheme()
  
  return (
    <Router>
      <div className={`flex flex-col min-h-screen transition-colors duration-200 ${
        theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'
      }`}>
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <div className={`auth-layout-bg transition-colors duration-200 ${
                    theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'
                  }`}>
                    <div className="auth-layout-container">
                      {/* Left Side */}
                      <div className={`auth-layout-left transition-colors duration-200 ${
                        theme === 'dark' ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900'
                      }`}>
                        <h2 className="auth-layout-title">Welcome Back!</h2>
                        <p className="auth-layout-desc">Sign in to access your dashboard, manage clients, projects, and more.</p>
                        <div className="auth-layout-link-row">
                          <span>Don't have an account?</span>
                          <Link to="/signup" className="auth-layout-link">Signup</Link>
                        </div>
                      </div>
                      {/* Right Side */}
                      <div className={`auth-layout-right transition-colors duration-200 ${
                        theme === 'dark' ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900'
                      }`}>
                        <h1 className="auth-layout-title-dark">Login</h1>
                        <LoginForm />
                      </div>
                    </div>
                  </div>
                </PublicRoute>
              }
            />
            <Route
              path="/signup"
              element={
                <PublicRoute>
                  <div className={`auth-layout-bg transition-colors duration-200 ${
                    theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'
                  }`}>
                    <div className="auth-layout-container">
                      {/* Left Side */}
                      <div className={`auth-layout-left transition-colors duration-200 ${
                        theme === 'dark' ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900'
                      }`}>
                        <h2 className="auth-layout-title">Come join us!</h2>
                        <p className="auth-layout-desc">We are so excited to have you here. If you haven't already, create an account to get access to exclusive offers, rewards, and discounts.</p>
                        <div className="auth-layout-link-row">
                          <span>Already have an account?</span>
                          <Link to="/login" className="auth-layout-link">Signin</Link>
                        </div>
                      </div>
                      {/* Right Side */}
                      <div className={`auth-layout-right transition-colors duration-200 ${
                        theme === 'dark' ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900'
                      }`}>
                        <h1 className="auth-layout-title-dark">Signup</h1>
                        <SignupForm />
                      </div>
                    </div>
                  </div>
                </PublicRoute>
              }
            />
            <Route
              path="/*"
              element={
                <PrivateRoute>
                  <DashboardLayout />
                </PrivateRoute>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
