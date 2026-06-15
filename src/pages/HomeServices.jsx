import { useState } from 'react'
import { MapPin, Clock, Star, ArrowLeft, Check } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabase'

const homeServices = [
  { id: 1, name: "Bridal Makeup at Home", price: 6000, duration: "3-4 hrs", rating: 4.9, category: "Makeup", emoji: "👰", popular: true, desc: "Professional bridal makeup artist comes to your home" },
  { id: 2, name: "Party Makeup at Home", price: 2000, duration: "1.5 hrs", rating: 4.7, category: "Makeup", emoji: "💄", popular: true, desc: "Get glam for your special occasion at home" },
  { id: 3, name: "Hair Styling at Home", price: 1200, duration: "1 hr", rating: 4.6, category: "Hair", emoji: "💇", popular: false, desc: "Professional hair styling at your doorstep" },
  { id: 4, name: "Full Body Waxing", price: 1500, duration: "1.5 hrs", rating: 4.5, category: "Waxing", emoji: "✨", popular: false, desc: "Complete waxing service at your home" },
  { id: 5, name: "Facial & Cleanup", price: 1000, duration: "1 hr", rating: 4.8, category: "Skin", emoji: "🌟", popular: true, desc: "Professional facial treatment at home" },
  { id: 6, name: "Mehendi at Home", price: 2500, duration: "2 hrs", rating: 4.9, category: "Mehendi", emoji: "🌿", popular: true, desc: "Beautiful mehendi designs for weddings and festivals" },
  { id: 7, name: "Nail Art at Home", price: 800, duration: "45 min", rating: 4.6, category: "Nails", emoji: "💅", popular: false, desc: "Creative nail art designs at your doorstep" },
  { id: 8, name: "Head Massage & Hair Spa", price: 900, duration: "1 hr", rating: 4.7, category: "Hair", emoji: "💆", popular: false, desc: "Relaxing head massage and hair spa at home" },
]

const categories = ["All", "Makeup", "Hair", "Skin", "Waxing", "Nails", "Mehendi"]
const timeSlots = ["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM"]

export default function HomeServices() {
  const navigate = useNavigate()
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedService, setSelectedService] = useState(null)
  const [showBooking, setShowBooking] = useState(false)
  const [confirmed, setConfirmed] = useState(false)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [loading, setLoading] = useState(false)

  const filtered = selectedCategory === 'All'
    ? homeServices
    : homeServices.filter(s => s.category === selectedCategory)

  const handleBook = async () => {
    if (!name || !phone || !address || !date || !time) {
      alert('Please fill all details!')
      return
    }
    setLoading(true)
    const { data: { user } } = await supabase.auth.getUser()
    await supabase.from('bookings').insert({
      user_id: user?.id,
      salon_name: 'Home Service',
      service_name: selectedService.name,
      service_price: selectedService.price,
      booking_date: date,
      booking_time: time,
      customer_name: name,
      customer_phone: phone,
      payment_method: 'cash',
      payment_status: 'pending',
      status: 'confirmed',
    })
    setLoading(false)
    setConfirmed(true)
    setShowBooking(false)
  }

  if (confirmed) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl shadow-lg p-10 max-w-md w-full text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Home Service Booked!</h2>
          <p className="text-gray-500 mb-6">Our beauty expert will come to your home.</p>
          <div className="bg-pink-50 rounded-2xl p-4 text-left mb-6 space-y-2">
            <p className="text-sm text-gray-600"><span className="font-semibold">Service:</span> {selectedService?.name}</p>
            <p className="text-sm text-gray-600"><span className="font-semibold">Date:</span> {date} at {time}</p>
            <p className="text-sm text-gray-600"><span className="font-semibold">Address:</span> {address}</p>
            <p className="text-sm font-bold text-pink-500"><span className="font-semibold">Total:</span> ₹{selectedService?.price}</p>
          </div>
          <button onClick={() => navigate('/my-bookings')} className="w-full bg-pink-500 text-white py-3 rounded-full font-bold hover:bg-pink-600 transition">
            View My Bookings
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="bg-gradient-to-br from-green-400 to-teal-400 py-12 px-4 text-white">
        <div className="max-w-4xl mx-auto">
          <button onClick={() => navigate('/')} className="text-green-100 text-sm mb-4 flex items-center gap-1 hover:text-white">
            ← Back
          </button>
          <div className="text-5xl mb-3">🏠</div>
          <h1 className="text-3xl font-bold mb-2">Home Beauty Services</h1>
          <p className="text-green-100">Professional beauty services at your doorstep in Mumbai</p>
          <div className="flex items-center gap-2 mt-3 bg-white/20 rounded-full px-4 py-2 w-fit text-sm">
            <MapPin size={14} /> Mumbai • 60 min delivery
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
          {categories.map(cat => (
            <button key={cat} onClick={() => setSelectedCategory(cat)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-semibold border transition ${selectedCategory === cat ? 'bg-teal-500 text-white border-teal-500' : 'border-gray-200 text-gray-600 bg-white hover:border-teal-300'}`}>
              {cat}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map(service => (
            <div key={service.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-4xl">{service.emoji}</span>
                  <div>
                    <h3 className="font-bold text-gray-800">{service.name}</h3>
                    <p className="text-gray-400 text-xs">{service.duration}</p>
                  </div>
                </div>
                {service.popular && (
                  <span className="bg-orange-100 text-orange-500 text-xs px-2 py-1 rounded-full font-semibold">🔥 Popular</span>
                )}
              </div>
              <p className="text-gray-500 text-sm mb-4">{service.desc}</p>
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-pink-500 font-bold text-lg">₹{service.price}</span>
                  <div className="flex items-center gap-1 mt-0.5">
                    <Star size={12} className="text-yellow-400 fill-yellow-400" />
                    <span className="text-xs text-gray-500">{service.rating}</span>
                  </div>
                </div>
                <button
                  onClick={() => { setSelectedService(service); setShowBooking(true) }}
                  className="bg-teal-500 hover:bg-teal-600 text-white px-5 py-2 rounded-full font-semibold text-sm transition"
                >
                  Book at Home 🏠
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Booking Modal */}
      {showBooking && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end md:items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-xl font-bold">Book at Home 🏠</h2>
              <button onClick={() => setShowBooking(false)} className="text-gray-400 text-2xl">✕</button>
            </div>

            <div className="bg-teal-50 rounded-xl p-3 mb-5">
              <p className="font-semibold text-teal-700">{selectedService?.name}</p>
              <p className="text-teal-500 font-bold">₹{selectedService?.price} • {selectedService?.duration}</p>
            </div>

            <div className="space-y-3 mb-5">
              <input type="text" placeholder="Your Name" value={name} onChange={e => setName(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-teal-400" />
              <input type="tel" placeholder="Phone Number" value={phone} onChange={e => setPhone(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-teal-400" />
              <textarea placeholder="Full Address (Building, Street, Area, Mumbai)" value={address} onChange={e => setAddress(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-teal-400 resize-none" rows={3} />
              <input type="date" value={date} onChange={e => setDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-teal-400" />
              <div className="grid grid-cols-3 gap-2">
                {timeSlots.map(t => (
                  <button key={t} onClick={() => setTime(t)}
                    className={`py-2 rounded-xl text-xs border font-medium transition ${time === t ? 'bg-teal-500 text-white border-teal-500' : 'border-gray-200 text-gray-600 hover:border-teal-300'}`}>
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-yellow-50 rounded-xl p-3 mb-5 text-xs text-yellow-700 flex items-start gap-2">
              <span>💡</span>
              <span>Payment will be collected by our beauty expert at your home. Cash/UPI accepted.</span>
            </div>

            <button onClick={handleBook} disabled={loading}
              className="w-full bg-teal-500 hover:bg-teal-600 text-white py-4 rounded-2xl font-bold text-lg transition disabled:opacity-50">
              {loading ? 'Booking...' : 'Confirm Home Booking 🏠'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}