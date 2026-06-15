import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Salons from './pages/Salons'
import SalonDetail from './pages/SalonDetail'
import Reviews from './pages/Reviews'
import VisionBoard from './pages/VisionBoard'
import Login from './pages/Login'
import AdminDashboard from './pages/AdminDashboard'
import MyBookings from './pages/MyBookings'
import LiveBeautyAI from './pages/LiveBeautyAI'
import HomeServices from './pages/HomeServices'
import MakeupTutorials from './pages/MakeupTutorials'
import SalonComparison from './pages/SalonComparison'
import BudgetPlanner from './pages/BudgetPlanner'
import OccasionPlanner from './pages/OccasionPlanner'
import Navbar from './components/Navbar'
import AIChat from './components/AIChat'

function Layout() {
  const location = useLocation()
  const hideNav = ['/login', '/admin'].includes(location.pathname)

  return (
    <>
      {!hideNav && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/salons" element={<Salons />} />
        <Route path="/salon/:id" element={<SalonDetail />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/vision-board" element={<VisionBoard />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/live-beauty" element={<LiveBeautyAI />} />
        <Route path="/home-services" element={<HomeServices />} />
        <Route path="/tutorials" element={<MakeupTutorials />} />
        <Route path="/compare" element={<SalonComparison />} />
        <Route path="/budget-planner" element={<BudgetPlanner />} />
        <Route path="/occasion-planner" element={<OccasionPlanner />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
      {!hideNav && <AIChat />}
    </>
  )
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  )
}

export default App