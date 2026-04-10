import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import MainPage from './pages/MainPage'
import Anu from './pages/Anu'
import Kyrax from './pages/Kyrax'
import Pulse from './pages/Pulse'
import KiraStudios from './pages/KiraStudios'
import Namtar from './pages/Namtar'
import NamtarArk from './pages/NamtarArk'
import Frostheim from './pages/Frostheim'
import DysunsRealm from './pages/DysunsRealm'
import DysunsArk from './pages/DysunsArk'
import NamtarSurvey from './pages/NamtarSurvey'
import AdminPortal from './pages/portals/AdminPortal'
import OperatorPortal from './pages/portals/OperatorPortal'
import ClientPortal from './pages/portals/ClientPortal'

// Protected route — redirects to home if not authenticated or wrong role
function ProtectedRoute({ element, allowedRole }) {
  const { currentUser } = useAuth()
  if (!currentUser) return <Navigate to="/" replace />
  if (allowedRole && currentUser.role !== allowedRole) return <Navigate to="/" replace />
  return element
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/anu" element={<Anu />} />
      <Route path="/kyrax" element={<Kyrax />} />
      <Route path="/pulse" element={<Pulse />} />
      <Route path="/kirastudios" element={<KiraStudios />} />
      <Route path="/namtar" element={<Namtar />} />
      <Route path="/namtarark" element={<NamtarArk />} />
      <Route path="/frostheim" element={<Frostheim />} />
      <Route path="/dysunsrealm" element={<DysunsRealm />} />
      <Route path="/dysunsark" element={<DysunsArk />} />
      <Route path="/namtarsurvey" element={<NamtarSurvey />} />

      {/* Portal routes — role-gated */}
      <Route path="/portal/admin"    element={<ProtectedRoute element={<AdminPortal />}    allowedRole="admin" />} />
      <Route path="/portal/operator" element={<ProtectedRoute element={<OperatorPortal />} allowedRole="operator" />} />
      <Route path="/portal/client"   element={<ProtectedRoute element={<ClientPortal />}   allowedRole="client" />} />

      <Route path="*" element={<MainPage />} />
    </Routes>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  )
}
