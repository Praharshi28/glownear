import { useState } from 'react'
import { Search, Star, MapPin, SlidersHorizontal, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const allSalons = [
  { id: 1, name: "Luxe Beauty Studio", area: "Bandra West", rating: 4.8, reviews: 124, price: 500, glowScore: 96, tag: "Trending", services: ["Bridal", "Makeup", "Hair"], available: true },
  { id: 2, name: "The Glow Lab", area: "Andheri East", rating: 4.6, reviews: 89, price: 300, glowScore: 91, tag: "Top Rated", services: ["Spa", "Facials", "Nails"], available: true },
  { id: 3, name: "Bliss Salon", area: "Juhu", rating: 4.5, reviews: 67, price: 400, glowScore: 88, tag: "Popular", services: ["Haircut", "Color", "Keratin"], available: false },
  { id: 4, name: "Pink Petal Parlour", area: "Powai", rating: 4.7, reviews: 102, price: 600, glowScore: 93, tag: "Trending", services: ["Bridal", "Spa", "Nails"], available: true },
  { id: 5, name: "Studio Nine", area: "Malad West", rating: 4.3, reviews: 55, price: 250, glowScore: 82, tag: "Budget Pick", services: ["Haircut", "Makeup"], available: true },
  { id: 6, name: "Aura Beauty Lounge", area: "Worli", rating: 4.9, reviews: 210, price: 800, glowScore: 98, tag: "Premium", services: ["Bridal", "Spa", "Facials"], available: true },
  { id: 7, name: "Glamour Garden", area: "Borivali", rating: 4.4, reviews: 78, price: 350, glowScore: 85, tag: "Popular", services: ["Nails", "Makeup", "Hair"], available: false },
  { id: 8, name: "Serenity Spa & Salon", area: "Colaba", rating: 4.7, reviews: 145, price: 700, glowScore: 94, tag: "Top Rated", services: ["Spa", "Facials", "Bridal"], available: true },
  { id: 9, name: "The Beauty Barn", area: "Thane", rating: 4.2, reviews: 43, price: 200, glowScore: 79, tag: "Budget Pick", services: ["Haircut", "Color"], available: true },
]

const serviceOptions = ["All", "Bridal", "Makeup", "Hair", "Spa", "Facials", "Nails", "Haircut", "Color"]
const priceOptions = ["All", "Under ₹300", "₹300–₹600", "Above ₹600"]
const sortOptions = ["Popularity", "Rating", "Price: Low to High", "Price: High to Low", "Glow Score"]

export default function Salons() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [selectedService, setSelectedService] = useState('All')
  const [selectedPrice, setSelectedPrice] = useState('All')
  const [selectedSort, setSelectedSort] = useState('Popularity')
  const [showFilters, setShowFilters] = useState(false)

  const filtered = allSalons
    .filter(s => {
      const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.area.toLowerCase().includes(search.toLowerCase())
      const matchService = selectedService === 'All' || s.services.includes(selectedService)
      const matchPrice =
        selectedPrice === 'All' ? true :
        selectedPrice === 'Under ₹300' ? s.price < 300 :
        selectedPrice === '₹300–₹600' ? s.price >= 300 && s.price <= 600 :
        s.price > 600
      return matchSearch && matchService && matchPrice
    })
    .sort((a, b) => {
      if (selectedSort === 'Rating') return b.rating - a.rating
      if (selectedSort === 'Price: Low to High') return a.price - b.price
      if (selectedSort === 'Price: High to Low') return b.price - a.price
      if (selectedSort === 'Glow Score') return b.glowScore - a.glowScore
      return b.reviews - a.reviews
    })

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="bg-gradient-to-r from-pink-500 to-rose-400 py-10 px-4 text-white text-center">
        <h1 className="text-3xl font-bold mb-2">Mumbai Salons 💇</h1>
        <p className="text-pink-100 mb-6">Find and book the best salons near you</p>

        <div className="flex bg-white rounded-full overflow-hidden max-w-lg mx-auto shadow-lg">
          <div className="flex items-center px-4 text-gray-400">
            <Search size={18} />
          </div>
          <input
            type="text"
            placeholder="Search by name or area..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="flex-1 py-3 text-gray-700 outline-none text-sm"
          />
          {search && (
            <button onClick={() => setSearch('')} className="px-4 text-gray-400 hover:text-gray-600">
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">

        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-500 text-sm">{filtered.length} salons found</p>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-full text-sm font-medium hover:border-pink-400 transition"
          >
            <SlidersHorizontal size={16} />
            Filters
          </button>
        </div>

        {showFilters && (
          <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

              <div>
                <p className="font-semibold text-gray-700 mb-3">Service</p>
                <div className="flex flex-wrap gap-2">
                  {serviceOptions.map(s => (
                    <button
                      key={s}
                      onClick={() => setSelectedService(s)}
                      className={`px-3 py-1 rounded-full text-sm border transition ${selectedService === s ? 'bg-pink-500 text-white border-pink-500' : 'border-gray-200 text-gray-600 hover:border-pink-300'}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="font-semibold text-gray-700 mb-3">Price Range</p>
                <div className="flex flex-wrap gap-2">
                  {priceOptions.map(p => (
                    <button
                      key={p}
                      onClick={() => setSelectedPrice(p)}
                      className={`px-3 py-1 rounded-full text-sm border transition ${selectedPrice === p ? 'bg-pink-500 text-white border-pink-500' : 'border-gray-200 text-gray-600 hover:border-pink-300'}`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="font-semibold text-gray-700 mb-3">Sort By</p>
                <div className="flex flex-wrap gap-2">
                  {sortOptions.map(s => (
                    <button
                      key={s}
                      onClick={() => setSelectedSort(s)}
                      className={`px-3 py-1 rounded-full text-sm border transition ${selectedSort === s ? 'bg-pink-500 text-white border-pink-500' : 'border-gray-200 text-gray-600 hover:border-pink-300'}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <div className="text-5xl mb-4">🔍</div>
            <p className="text-lg font-medium">No salons found</p>
            <p className="text-sm">Try a different search or filter</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filtered.map(salon => (
              <div
                key={salon.id}
                onClick={() => navigate(`/salon/${salon.id}`)}
                className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition overflow-hidden border border-gray-100 cursor-pointer"
              >
                <div className="bg-gradient-to-br from-pink-200 to-rose-100 h-44 flex items-center justify-center relative">
                  <span className="text-5xl">💇</span>
                  <span className="absolute top-3 left-3 bg-pink-500 text-white text-xs px-3 py-1 rounded-full font-semibold">
                    {salon.tag}
                  </span>
                  <span className={`absolute top-3 right-3 text-xs px-3 py-1 rounded-full font-semibold ${salon.available ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500'}`}>
                    {salon.available ? '🟢 Available' : '🔴 Busy'}
                  </span>
                </div>

                <div className="p-4">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-gray-800 text-lg leading-tight">{salon.name}</h3>
                    <span className="bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded-full font-bold whitespace-nowrap ml-2">
                      ✨ {salon.glowScore}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 text-gray-500 text-sm mb-2">
                    <MapPin size={13} />
                    <span>{salon.area}</span>
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
                    <span className="text-pink-500 font-semibold text-sm">₹{salon.price} onwards</span>
                    <button
                      onClick={e => { e.stopPropagation(); navigate(`/salon/${salon.id}`) }}
                      className="bg-pink-500 hover:bg-pink-600 text-white text-sm px-4 py-2 rounded-full transition font-semibold"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}