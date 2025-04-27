import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { useAuth } from './hooks/useAuth'
import { LoginForm } from './components/auth/LoginForm'
import { SignupForm } from './components/auth/SignupForm'
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

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <div className="max-w-md mx-auto py-12 px-4">
            <Routes>
              <Route
                path="/login"
                element={
                  <PublicRoute>
                    <div className="bg-white p-8 rounded-lg shadow-md">
                      <h1 className="text-2xl font-bold mb-6 text-center">
                        Login
                      </h1>
                      <LoginForm />
                    </div>
                  </PublicRoute>
                }
              />
              <Route
                path="/signup"
                element={
                  <PublicRoute>
                    <div className="bg-white p-8 rounded-lg shadow-md">
                      <h1 className="text-2xl font-bold mb-6 text-center">
                        Sign Up
                      </h1>
                      <SignupForm />
                    </div>
                  </PublicRoute>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <div>Dashboard (Protected Route)</div>
                  </PrivateRoute>
                }
              />
              <Route path="/" element={<Navigate to="/login" />} />
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
