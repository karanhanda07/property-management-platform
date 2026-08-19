import { Route, Routes } from 'react-router-dom'
import DashboardLayout from './layouts/DashboardLayout'
import DashboardPage from './pages/DashboardPage'
import PropertiesPage from './pages/PropertiesPage'
import TenantsPage from './pages/TenantsPage'
import LeasesPage from './pages/LeasesPage'
import MaintenancePage from './pages/MaintenancePage'
import './App.css'

function App() {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/properties" element={<PropertiesPage />} />
        <Route path="/tenants" element={<TenantsPage />} />
        <Route path="/leases" element={<LeasesPage />} />
        <Route path="/maintenance" element={<MaintenancePage />} />
      </Route>
    </Routes>
  )
}

export default App