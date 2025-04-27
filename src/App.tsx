import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
} from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { ThemeProvider } from './contexts/ThemeContext'
import { useAuth } from './hooks/useAuth'
import { LoginForm } from './components/auth/LoginForm'
import { SignupForm } from './components/auth/SignupForm'
import { ClientList } from './components/clients/ClientList'
import { ClientForm } from './components/clients/ClientForm'
import { ClientDetails } from './components/clients/ClientDetails'
import { ProjectForm } from './components/projects/ProjectForm'
import { ThemeToggle } from './components/common/ThemeToggle'
import { RemindersPage } from './components/reminders/RemindersPage'
import Dashboard from './components/dashboard/Dashboard'
import Navbar from './components/common/Navbar'
import './App.css'

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loading } = useAuth()

  if (loading) {
    return <div>Loading...</div>
  }

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />
}

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loading } = useAuth()

  if (loading) {
    return <div>Loading...</div>
  }

  return !isAuthenticated ? <>{children}</> : <Navigate to="/dashboard" />
}

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-background-primary">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/clients" element={<ClientList />} />
          <Route path="/clients/new" element={<ClientForm />} />
          <Route path="/clients/:id" element={<ClientDetails />} />
          <Route path="/clients/:id/edit" element={<ClientForm />} />
          <Route path="/clients/:clientId/projects/new" element={<ProjectForm />} />
          <Route path="/clients/:clientId/projects/:projectId/edit" element={<ProjectForm />} />
          <Route path="/reminders" element={<RemindersPage />} />
        </Routes>
      </div>
    </div>
  )
}

const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <div className="min-h-screen bg-background-primary flex items-center justify-center">
                    <div className="max-w-md w-full bg-background-secondary p-8 rounded-lg shadow-md">
                      <h1 className="text-2xl font-bold mb-6 text-center text-text-primary">
                        Login
                      </h1>
                      <LoginForm />
                    </div>
                  </div>
                </PublicRoute>
              }
            />
            <Route
              path="/signup"
              element={
                <PublicRoute>
                  <div className="min-h-screen bg-background-primary flex items-center justify-center">
                    <div className="max-w-md w-full bg-background-secondary p-8 rounded-lg shadow-md">
                      <h1 className="text-2xl font-bold mb-6 text-center text-text-primary">
                        Sign Up
                      </h1>
                      <SignupForm />
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
        </Router>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
