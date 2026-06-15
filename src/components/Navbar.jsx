import { useState, useEffect, useRef } from 'react'
import { Sparkles, User, LogOut, Menu, X } from 'lucide-react'
import { supabase } from '../supabase'
import { useNavigate } from 'react-router-dom'

const links = [
  { href: '/', label: 'Home' },
  { href: '/salons', label: 'Salons' },
  { href: '/compare', label: '⚖️ Compare' },
  { href: '/vision-board', label: '🎨 Vision' },
  { href: '/tutorials', label: '🎬 Tutorials' },
  { href: '/home-services', label: '🏠 Home Service' },
  { href: '/budget-planner', label: '💰 Budget' },
  { href: '/occasion-planner', label: '📅 Planner' },
  { href: '/live-beauty', label: '✨ AI Beauty' },
  { href: '/reviews', label: 'Reviews' },
]

export default function Navbar() {
  const [user, setUser] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => setUser(user))
    supabase.auth.onAuthStateChange((_event, session) => setUser(session?.user ?? null))
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setUser(null)
    navigate('/')
  }

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
          <Sparkles className="text-pink-500" size={24} />
          <span className="text-2xl font-bold text-pink-500">GlowNear</span>
          <span className="text-xs bg-pink-100 text-pink-600 px-2 py-0.5 rounded-full">Mumbai</span>
        </div>

        {/* Desktop Links */}
        <div className="hidden lg:flex gap-4 text-sm font-medium text-gray-600 overflow-x-auto">
          {links.map(link => (
            <a key={link.href} href={link.href} className="hover:text-pink-500 transition whitespace-nowrap">
              {link.label}
            </a>
          ))}
          {user && <a href="/my-bookings" className="hover:text-pink-500 transition whitespace-nowrap">My Bookings</a>}
        </div>

        <div className="flex items-center gap-2">
          {user ? (
            <button onClick={handleLogout} className="flex items-center gap-1 bg-gray-100 text-gray-600 px-3 py-2 rounded-full text-sm font-semibold hover:bg-gray-200 transition">
              <LogOut size={15} /> Logout
            </button>
          ) : (
            <button onClick={() => navigate('/login')} className="flex items-center gap-1 bg-pink-500 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-pink-600 transition">
              <User size={15} /> Login
            </button>
          )}

          {/* Mobile Menu */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden p-2 text-gray-600">
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 px-4 py-4 grid grid-cols-2 gap-2">
          {links.map(link => (
            <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}
              className="text-sm text-gray-600 hover:text-pink-500 py-2 px-3 rounded-xl hover:bg-pink-50 transition">
              {link.label}
            </a>
          ))}
          {user && (
            <a href="/my-bookings" onClick={() => setMenuOpen(false)}
              className="text-sm text-gray-600 hover:text-pink-500 py-2 px-3 rounded-xl hover:bg-pink-50 transition">
              My Bookings
            </a>
          )}
        </div>
      )}
    </nav>
  )
}