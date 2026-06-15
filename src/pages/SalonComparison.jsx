import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Check, X, Star, MapPin } from 'lucide-react'

const allSalons = [
  { id: 1, name: "Luxe Beauty Studio", area: "Bandra West", rating: 4.8, reviews: 124, price: 500, glowScore: 96, tag: "Trending", services: ["Bridal", "Makeup", "Hair"], available: true, timing: "9AM-9PM" },
  { id: 2, name: "The Glow Lab", area: "Andheri East", rating: 4.6, reviews: 89, price: 300, glowScore: 91, tag: "Top Rated", services: ["Spa", "Facials", "Nails"], available: true, timing: "10AM-8PM" },
  { id: 3, name: "Bliss Salon", area: "Juhu", rating: 4.5, reviews: 67, price: 400, glowScore: 88, tag: "Popular", services: ["Haircut", "Color", "Keratin"], available: false, timing: "9AM-8PM" },
  { id: 4, name: "Pink Petal Parlour", area: "Powai", rating: 4.7, reviews: 102, price: 600, glowScore: 93, tag: "Trending", services: ["Bridal", "Spa", "Nails"], available: true, timing: "9AM-9PM" },
  { id: 5, name: "Studio Nine", area: "Malad West", rating: 4.3, reviews: 55, price: 250, glowScore: 82, tag: "Budget Pick", services: ["Haircut", "Makeup"], available: true, timing: "10AM-7PM" },
  { id: 6, name: "Aura Beauty Lounge", area: "Worli", rating: 4.9, reviews: 210, price: 800, glowScore: 98, tag: "Premium", services: ["Bridal", "Spa", "Facials"], available: true, timing: "9AM-10PM" },
  { id: 7, name: "Glamour Garden", area: "Borivali", rating: 4.4, reviews: 78, price: 350, glowScore: 85, tag: "Popular", services: ["Nails", "Makeup", "Hair"], available: false, timing: "10AM-8PM" },
  { id: 8, name: "Serenity Spa & Salon", area: "Colaba", rating: 4.7, reviews: 145, price: 700, glowScore: 94, tag: "Top Rated", services: ["Spa", "Facials", "Bridal"], available: true, timing: "9AM-9PM" },
  { id: 9, name: "The Beauty Barn", area: "Thane", rating: 4.2, reviews: 43, price: 200, glowScore: 79, tag: "Budget Pick", services: ["Haircut", "Color"], available: true, timing: "10AM-7PM" },
]

export default function SalonComparison() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState([])

  const toggleSalon = (salon) => {
    if (selected.find(s => s.id === salon.id)) {
      setSelected(selected.filter(s => s.id !== salon.id))
    } else if (selected.length < 3) {
      setSelected([...selected, salon])
    }
  }

  const metrics = [
    { label: 'Glow Score™', key: 'glowScore', format: v => `${v}/100`, best: 'highest' },
    { label: 'Rating', key: 'rating', format: v => `${v} ⭐`, best: 'highest' },
    { label: 'Reviews', key: 'reviews', format: v => `${v}`, best: 'highest' },
    { label: 'Starting Price', key: 'price', format: v => `₹${v}`, best: 'lowest' },
    { label: 'Available Now', key: 'available', format: v => v ? '🟢 Yes' : '🔴 No', best: 'true' },
    { label: 'Timing', key: 'timing', format: v => v, best: 'none' },
    { label: 'Tag', key: 'tag', format: v => v, best: 'none' },
  ]

  const getBest = (metric) => {
    if (metric.best === 'none' || selected.length < 2) return null
    if (metric.best === 'highest') return Math.max(...selected.map(s => s[metric.key]))
    if (metric.best === 'lowest') return Math.min(...selected.map(s => s[metric.key]))
    if (metric.best === 'true') return true
    return null
  }

  const isBest = (salon, metric) => {
    const best = getBest(metric)
    if (best === null) return false
    if (metric.best === 'true') return salon[metric.key] === true
    return salon[metric.key] === best
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-500 to-purple-500 py-10 px-4 text-white">
        <div className="max-w-5xl mx-auto">
          <button onClick={() => navigate('/')} className="text-blue-200 text-sm mb-4 flex items-center gap-1 hover:text-white">← Back</button>
          <h1 className="text-3xl font-bold mb-2">⚖️ Compare Salons</h1>
          <p className="text-blue-100">Select up to 3 salons to compare side by side</p>
          <p className="text-blue-200 text-sm mt-2">{selected.length}/3 salons selected</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">

        {/* Salon Selector */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
          {allSalons.map(salon => {
            const isSelected = selected.find(s => s.id === salon.id)
            return (
              <button
                key={salon.id}
                onClick={() => toggleSalon(salon)}
                disabled={!isSelected && selected.length >= 3}
                className={`p-3 rounded-2xl border-2 text-left transition ${isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white hover:border-blue-300'} disabled:opacity-40`}
              >
                <div className="flex justify-between items-start mb-1">
                  <p className="font-semibold text-gray-800 text-sm">{salon.name}</p>
                  {isSelected && <Check size={16} className="text-blue-500" />}
                </div>
                <p className="text-gray-400 text-xs flex items-center gap-1"><MapPin size={10} />{salon.area}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-yellow-500">⭐ {salon.rating}</span>
                  <span className="text-xs text-purple-500">✨ {salon.glowScore}</span>
                  <span className="text-xs text-pink-500">₹{salon.price}+</span>
                </div>
              </button>
            )
          })}
        </div>

        {/* Comparison Table */}
        {selected.length >= 2 && (
          <div className="bg-white rounded-3xl shadow-sm overflow-hidden border border-gray-100">
            <div className="grid" style={{ gridTemplateColumns: `200px repeat(${selected.length}, 1fr)` }}>

              {/* Header */}
              <div className="bg-gray-50 p-4 border-b border-gray-100">
                <p className="text-sm font-bold text-gray-500">Comparison</p>
              </div>
              {selected.map(salon => (
                <div key={salon.id} className="bg-gradient-to-b from-blue-50 to-white p-4 border-b border-gray-100 text-center relative">
                  <button onClick={() => toggleSalon(salon)} className="absolute top-2 right-2 text-gray-300 hover:text-gray-500">
                    <X size={14} />
                  </button>
                  <div className="text-3xl mb-2">💇</div>
                  <p className="font-bold text-gray-800 text-sm">{salon.name}</p>
                  <p className="text-gray-400 text-xs">{salon.area}</p>
                </div>
              ))}

              {/* Metrics */}
              {metrics.map((metric, i) => (
                <>
                  <div key={`label-${i}`} className={`p-4 border-b border-gray-100 flex items-center ${i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                    <p className="text-sm font-medium text-gray-600">{metric.label}</p>
                  </div>
                  {selected.map(salon => (
                    <div key={`${salon.id}-${i}`} className={`p-4 border-b border-gray-100 text-center ${i % 2 === 0 ? 'bg-gray-50' : 'bg-white'} ${isBest(salon, metric) ? 'bg-green-50' : ''}`}>
                      <p className={`text-sm font-semibold ${isBest(salon, metric) ? 'text-green-600' : 'text-gray-700'}`}>
                        {metric.format(salon[metric.key])}
                      </p>
                      {isBest(salon, metric) && <p className="text-xs text-green-500 mt-0.5">✅ Best</p>}
                    </div>
                  ))}
                </>
              ))}

              {/* Services */}
              <div className="p-4 border-b border-gray-100 bg-gray-50">
                <p className="text-sm font-medium text-gray-600">Services</p>
              </div>
              {selected.map(salon => (
                <div key={`services-${salon.id}`} className="p-4 border-b border-gray-100 bg-gray-50">
                  <div className="flex flex-wrap gap-1 justify-center">
                    {salon.services.map(s => (
                      <span key={s} className="bg-pink-50 text-pink-600 text-xs px-2 py-0.5 rounded-full">{s}</span>
                    ))}
                  </div>
                </div>
              ))}

              {/* Book Buttons */}
              <div className="p-4 bg-white" />
              {selected.map(salon => (
                <div key={`book-${salon.id}`} className="p-4 bg-white text-center">
                  <button
                    onClick={() => navigate(`/salon/${salon.id}`)}
                    className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-full text-sm font-bold transition"
                  >
                    Book Now
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {selected.length < 2 && (
          <div className="text-center py-16 text-gray-400">
            <div className="text-5xl mb-4">⚖️</div>
            <p className="text-lg font-medium">Select at least 2 salons to compare</p>
            <p className="text-sm">Choose up to 3 salons from above</p>
          </div>
        )}
      </div>
    </div>
  )
}