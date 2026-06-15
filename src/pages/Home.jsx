import { Search, Star, MapPin, Sparkles, ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import SurpriseMe from '../components/SurpriseMe'

const categories = [
  { name: 'Haircut', emoji: '✂️' },
  { name: 'Bridal', emoji: '👰' },
  { name: 'Spa', emoji: '💆' },
  { name: 'Makeup', emoji: '💄' },
  { name: 'Nails', emoji: '💅' },
  { name: 'Grooming', emoji: '🪒' },
]

const salons = [
  { id: 6, name: "Aura Beauty Lounge", area: "Worli", rating: 4.9, reviews: 210, price: "₹800", glowScore: 98, tag: "Premium", services: ["Bridal", "Spa", "Facials"], available: true },
  { id: 1, name: "Luxe Beauty Studio", area: "Bandra West", rating: 4.8, reviews: 124, price: "₹500", glowScore: 96, tag: "Trending", services: ["Bridal", "Makeup", "Hair"], available: true },
  { id: 8, name: "Serenity Spa & Salon", area: "Colaba", rating: 4.7, reviews: 145, price: "₹700", glowScore: 94, tag: "Top Rated", services: ["Spa", "Facials", "Bridal"], available: true },
]

const stats = [
  { number: "9+", label: "Top Salons" },
  { number: "500+", label: "Happy Clients" },
  { number: "4.7★", label: "Avg Rating" },
  { number: "48hr", label: "Support" },
]

const features = [
  { icon: "🤖", title: "AI Beauty Assistant", desc: "Get personalized recommendations powered by AI" },
  { icon: "📸", title: "Live Beauty AI", desc: "Camera analysis for custom beauty suggestions" },
  { icon: "⚡", title: "Instant Booking", desc: "Book your appointment in under 60 seconds" },
  { icon: "✨", title: "Glow Score™", desc: "Our unique salon rating system for quality assurance" },
  { icon: "🏠", title: "Home Services", desc: "Professional beauty at your doorstep" },
  { icon: "🎬", title: "Makeup Tutorials", desc: "Step-by-step guides for every occasion" },
  { icon: "💰", title: "Budget Planner", desc: "Plan your beauty routine within your budget" },
  { icon: "📅", title: "Occasion Planner", desc: "Beauty countdown for your special events" },
]

const quickLinks = [
  { href: '/compare', label: '⚖️ Compare Salons', color: 'from-blue-400 to-purple-400' },
  { href: '/budget-planner', label: '💰 Budget Planner', color: 'from-green-400 to-teal-400' },
  { href: '/occasion-planner', label: '📅 Occasion Planner', color: 'from-rose-400 to-pink-400' },
  { href: '/home-services', label: '🏠 Home Services', color: 'from-orange-400 to-yellow-400' },
  { href: '/tutorials', label: '🎬 Tutorials', color: 'from-purple-400 to-pink-400' },
  { href: '/live-beauty', label: '✨ AI Beauty', color: 'from-pink-400 to-rose-400' },
]

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero */}
      <div className="bg-gradient-to-br from-pink-500 via-rose-400 to-pink-600 text-white py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 text-6xl">💄</div>
          <div className="absolute top-20 right-20 text-5xl">✨</div>
          <div className="absolute bottom-10 left-1/4 text-4xl">💅</div>
          <div className="absolute bottom-20 right-10 text-5xl">🌸</div>
        </div>

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-2 text-sm mb-6">
            <Sparkles size={14} /> Mumbai's #1 Beauty Marketplace
          </div>
          <h1 className="text-5xl font-bold mb-4 leading-tight">
            Find Your Perfect <br />
            <span className="text-yellow-200">Glow in Mumbai ✨</span>
          </h1>
          <p className="text-pink-100 text-lg mb-8">
            Book top-rated salons near you — powered by AI
          </p>

          <div className="flex bg-white rounded-full shadow-xl overflow-hidden max-w-xl mx-auto">
            <div className="flex items-center px-4 text-gray-400">
              <MapPin size={18} />
            </div>
            <input
              type="text"
              placeholder="Search salon, service or area..."
              className="flex-1 py-4 text-gray-700 outline-none text-sm"
            />
            <button
              onClick={() => navigate('/salons')}
              className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-4 font-semibold transition"
            >
              <Search size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 py-6 grid grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <div key={i} className="text-center">
              <p className="text-2xl font-bold text-pink-500">{s.number}</p>
              <p className="text-xs text-gray-500">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Links */}
      <div className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">🚀 Explore GlowNear</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {quickLinks.map((link, i) => (
            <button
              key={i}
              onClick={() => navigate(link.href)}
              className={`bg-gradient-to-br ${link.color} text-white rounded-2xl p-5 text-left hover:scale-105 transition-transform shadow-md`}
            >
              <p className="font-bold text-lg">{link.label}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Browse by Service</h2>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => navigate('/salons')}
              className="bg-white rounded-2xl p-4 text-center shadow-sm hover:shadow-md hover:border-pink-300 border border-transparent transition cursor-pointer"
            >
              <div className="text-3xl mb-2">{cat.emoji}</div>
              <div className="text-sm font-medium text-gray-700">{cat.name}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Featured Salons */}
      <div className="max-w-6xl mx-auto px-4 pb-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">⭐ Featured Salons</h2>
          <button
            onClick={() => navigate('/salons')}
            className="text-pink-500 font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all"
          >
            View all <ArrowRight size={16} />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {salons.map((salon) => (
            <div
              key={salon.id}
              onClick={() => navigate(`/salon/${salon.id}`)}
              className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition overflow-hidden border border-gray-100 cursor-pointer group"
            >
              <div className="bg-gradient-to-br from-pink-200 to-rose-100 h-48 flex items-center justify-center relative">
                <span className="text-5xl group-hover:scale-110 transition-transform">💇</span>
                <span className="absolute top-3 left-3 bg-pink-500 text-white text-xs px-3 py-1 rounded-full font-semibold">{salon.tag}</span>
                <span className={`absolute top-3 right-3 text-xs px-3 py-1 rounded-full font-semibold ${salon.available ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500'}`}>
                  {salon.available ? '🟢 Available' : '🔴 Busy'}
                </span>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold text-gray-800 text-lg">{salon.name}</h3>
                  <span className="bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded-full font-bold">✨ {salon.glowScore}</span>
                </div>
                <div className="flex items-center gap-1 text-gray-500 text-sm mb-2">
                  <MapPin size={13} /><span>{salon.area}</span>
                </div>
                <div className="flex items-center gap-1 mb-3">
                  <Star size={14} className="text-yellow-400 fill-yellow-400" />
                  <span className="font-semibold text-sm text-gray-700">{salon.rating}</span>
                  <span className="text-gray-400 text-xs">({salon.reviews} reviews)</span>
                </div>
                <div className="flex flex-wrap gap-1 mb-4">
                  {salon.services.map(s => (
                    <span key={s} className="bg-pink-50 text-pink-600 text-xs px-2 py-1 rounded-full">{s}</span>
                  ))}
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-pink-500 font-semibold text-sm">{salon.price} onwards</span>
                  <button className="bg-pink-500 hover:bg-pink-600 text-white text-sm px-4 py-2 rounded-full transition font-semibold">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Surprise Me */}
      <div className="max-w-6xl mx-auto px-4">
        <SurpriseMe />
      </div>

      {/* Features Section */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-10">Why GlowNear? 💖</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <div key={i} className="bg-white rounded-2xl p-5 text-center shadow-sm hover:shadow-md transition">
                <div className="text-4xl mb-3">{f.icon}</div>
                <h3 className="font-bold text-gray-800 text-sm mb-1">{f.title}</h3>
                <p className="text-gray-500 text-xs">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Vision Board CTA */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl p-10 text-white text-center">
          <div className="text-5xl mb-4">🎨</div>
          <h2 className="text-3xl font-bold mb-3">Discover Your Perfect Look</h2>
          <p className="text-purple-100 mb-6">Use our AI Vision Board to find the beauty style that's made for you</p>
          <button
            onClick={() => navigate('/vision-board')}
            className="bg-white text-pink-500 font-bold px-8 py-3 rounded-full hover:bg-pink-50 transition flex items-center gap-2 mx-auto"
          >
            Try Vision Board <ArrowRight size={18} />
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-10 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="text-pink-500" size={20} />
            <span className="text-xl font-bold text-white">GlowNear</span>
            <span className="text-xs bg-pink-900 text-pink-400 px-2 py-0.5 rounded-full">Mumbai</span>
          </div>
          <p className="text-sm mb-4">Mumbai's AI-powered beauty salon marketplace</p>
          <div className="flex flex-wrap justify-center gap-4 text-sm mb-4">
            <a href="/" className="hover:text-pink-400 transition">Home</a>
            <a href="/salons" className="hover:text-pink-400 transition">Salons</a>
            <a href="/compare" className="hover:text-pink-400 transition">Compare</a>
            <a href="/vision-board" className="hover:text-pink-400 transition">Vision Board</a>
            <a href="/tutorials" className="hover:text-pink-400 transition">Tutorials</a>
            <a href="/home-services" className="hover:text-pink-400 transition">Home Services</a>
            <a href="/budget-planner" className="hover:text-pink-400 transition">Budget Planner</a>
            <a href="/occasion-planner" className="hover:text-pink-400 transition">Occasion Planner</a>
            <a href="/reviews" className="hover:text-pink-400 transition">Reviews</a>
          </div>
          <p className="text-xs text-gray-600">© 2026 GlowNear. Built with ❤️ for Mumbai</p>
        </div>
      </footer>

    </div>
  )
}