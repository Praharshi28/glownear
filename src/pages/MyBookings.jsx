import { useState, useEffect } from 'react'
import { supabase } from '../supabase'
import { useNavigate } from 'react-router-dom'
import { Calendar, Clock, MapPin, CreditCard, ArrowLeft } from 'lucide-react'

export default function MyBookings() {
  const navigate = useNavigate()
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  useEffect(() => {
    checkUser()
  }, [])

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { navigate('/login'); return }
    setUser(user)
    const { data } = await supabase.from('bookings').select('*').eq('user_id', user.id).order('created_at', { ascending: false })
    setBookings(data || [])
    setLoading(false)
  }

  const totalSpent = bookings.reduce((a, b) => a + (b.service_price || 0), 0)

  return (
    <div className="min-h-screen bg-gray-50">

      <div className="bg-gradient-to-r from-pink-500 to-rose-400 text-white py-10 px-4">
        <div className="max-w-3xl mx-auto">
          <button onClick={() => navigate('/')} className="flex items-center gap-2 text-pink-100 mb-4 hover:text-white transition text-sm">
            <ArrowLeft size={16} /> Back to Home
          </button>
          <h1 className="text-3xl font-bold mb-1">My Bookings 📅</h1>
          <p className="text-pink-100">Track all your salon appointments</p>
          {bookings.length > 0 && (
            <div className="flex gap-6 mt-4">
              <div className="bg-white/20 rounded-2xl px-4 py-2 text-center">
                <p className="text-xl font-bold">{bookings.length}</p>
                <p className="text-pink-100 text-xs">Total Bookings</p>
              </div>
              <div className="bg-white/20 rounded-2xl px-4 py-2 text-center">
                <p className="text-xl font-bold">₹{totalSpent.toLocaleString()}</p>
                <p className="text-pink-100 text-xs">Total Spent</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8">
        {loading ? (
          <div className="text-center py-20 text-gray-400">Loading your bookings...</div>
        ) : bookings.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📅</div>
            <h3 className="text-xl font-bold text-gray-700 mb-2">No bookings yet!</h3>
            <p className="text-gray-400 mb-6">Book your first salon appointment today</p>
            <button onClick={() => navigate('/salons')} className="bg-pink-500 text-white px-8 py-3 rounded-full font-bold hover:bg-pink-600 transition">
              Browse Salons
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map(booking => (
              <div key={booking.id} className="bg-white rounded-2xl shadow-sm p-5 border border-gray-100">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-bold text-gray-800 text-lg">{booking.salon_name}</h3>
                    <p className="text-pink-500 font-semibold">{booking.service_name}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-pink-500">₹{booking.service_price}</p>
                    <span className={`text-xs px-2 py-1 rounded-full font-semibold ${
                      booking.status === 'confirmed' ? 'bg-green-100 text-green-600' :
                      booking.status === 'cancelled' ? 'bg-red-100 text-red-500' :
                      'bg-yellow-100 text-yellow-600'
                    }`}>
                      {booking.status === 'confirmed' ? '✅ Confirmed' : booking.status}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <Calendar size={14} className="text-pink-400" />
                    {booking.booking_date}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={14} className="text-pink-400" />
                    {booking.booking_time}
                  </div>
                  {booking.occasion && (
                    <div className="flex items-center gap-2">
                      <span className="text-pink-400">🎉</span>
                      {booking.occasion}
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <CreditCard size={14} className="text-pink-400" />
                    {booking.payment_method || 'Payment Pending'}
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