import { BrowserRouter, Routes, Route } from 'react-router-dom'
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

export default function App() {
  return (
    <BrowserRouter>
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
        <Route path="*" element={<MainPage />} />
      </Routes>
    </BrowserRouter>
  )
}
