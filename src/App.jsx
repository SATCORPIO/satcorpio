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
// Portal modules
import Par450k      from './pages/portals/modules/450kPar'
import Dualcore900  from './pages/portals/modules/dualcore-900'
import Dualcore900V2 from './pages/portals/modules/dualcore-900-v2'
import GenDashV2    from './pages/portals/modules/GenDashV2'
import XOIAudit     from './pages/portals/modules/XOIAudit'
import XOIClient    from './pages/portals/modules/XOIClient'
import AireServ     from './pages/portals/modules/AireServProposal'

// Protected route — redirects to home if not authenticated, wrong role, or missing module
function ProtectedRoute({ element, allowedRole, moduleKey }) {
  const { currentUser, hasModule } = useAuth()
  if (!currentUser) return <Navigate to="/" replace />
  if (allowedRole && currentUser.role !== allowedRole) return <Navigate to="/" replace />
  if (moduleKey && !hasModule(moduleKey)) return <Navigate to="/" replace />
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
      <Route path="/frostheimark" element={<Frostheim />} />
      <Route path="/dysunsrealm" element={<DysunsRealm />} />
      <Route path="/dysunsark" element={<DysunsArk />} />
      <Route path="/namtarsurvey" element={<NamtarSurvey />} />

      {/* Portal routes — role-gated */}
      <Route path="/portal/admin/:userId"    element={<ProtectedRoute element={<AdminPortal />}    allowedRole="admin" />} />
      <Route path="/portal/OP/:userId" element={<ProtectedRoute element={<OperatorPortal />} allowedRole="operator" />} />
      <Route path="/portal/Contact/:userId"   element={<ProtectedRoute element={<ClientPortal />}   allowedRole="client" />} />

      {/* Module routes — user + module-key gated */}
      <Route path="/portal/modules/450kpar"      element={<ProtectedRoute element={<Par450k />}     moduleKey="450kpar" />} />
      <Route path="/portal/modules/dualcore-900" element={<ProtectedRoute element={<Dualcore900 />} moduleKey="dualcore-900" />} />
      <Route path="/portal/modules/dualcore-900-v2" element={<ProtectedRoute element={<Dualcore900V2 />} moduleKey="dualcore-900-v2" />} />
      <Route path="/portal/modules/gendashv2"    element={<ProtectedRoute element={<GenDashV2 />}   moduleKey="gendashv2" />} />
      <Route path="/portal/modules/xoi-audit"    element={<ProtectedRoute element={<XOIAudit />}    moduleKey="xoi-audit" />} />
      <Route path="/portal/modules/xoi-client"   element={<ProtectedRoute element={<XOIClient />}   moduleKey="xoi-client" />} />
      
      {/* Admin-only modules */}
      <Route path="/portal/modules/aire-serv-proposal" element={<ProtectedRoute element={<AireServ />} allowedRole="admin" />} />

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
