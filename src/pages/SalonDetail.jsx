import { useState, useEffect } from 'react'
import { Star, MapPin, Clock, Phone, ArrowLeft, Heart } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { supabase } from '../supabase'

const defaultSalon = {
  id: 1,
  name: "Luxe Beauty Studio",
  area: "Bandra West, Mumbai",
  rating: 4.8,
  reviews: 124,
  glow_score: 96,
  phone: "+91 98765 43210",
  timing: "9:00 AM – 9:00 PM",
  tag: "Trending",
  about: "Luxe Beauty Studio is Mumbai's premier destination for bridal makeup, hair styling, and luxury spa treatments.",
  available: true,
}

const servicesBySalon = {
  1: [{ name: "Bridal Makeup", price: 5000, duration: "3 hrs" }, { name: "Party Makeup", price: 1500, duration: "1.5 hrs" }, { name: "Hair Styling", price: 800, duration: "1 hr" }, { name: "Keratin Treatment", price: 3000, duration: "2.5 hrs" }, { name: "Facial", price: 1200, duration: "1 hr" }, { name: "Full Body Spa", price: 4000, duration: "3 hrs" }],
  2: [{ name: "Hydrating Facial", price: 1200, duration: "1 hr" }, { name: "Nail Art", price: 800, duration: "1 hr" }, { name: "Full Body Spa", price: 3500, duration: "2.5 hrs" }, { name: "Eyebrow Threading", price: 200, duration: "20 min" }],
  3: [{ name: "Haircut", price: 500, duration: "45 min" }, { name: "Hair Color", price: 2000, duration: "2 hrs" }, { name: "Keratin Treatment", price: 3500, duration: "3 hrs" }, { name: "Hair Spa", price: 1500, duration: "1.5 hrs" }],
  4: [{ name: "Bridal Makeup", price: 6000, duration: "3 hrs" }, { name: "Full Body Spa", price: 4500, duration: "3 hrs" }, { name: "Nail Art", price: 1000, duration: "1 hr" }, { name: "Party Makeup", price: 2000, duration: "1.5 hrs" }],
  5: [{ name: "Haircut", price: 300, duration: "30 min" }, { name: "Basic Makeup", price: 800, duration: "1 hr" }, { name: "Eyebrow Threading", price: 150, duration: "15 min" }],
  6: [{ name: "Luxury Bridal Package", price: 15000, duration: "6 hrs" }, { name: "Premium Facial", price: 3000, duration: "1.5 hrs" }, { name: "Full Body Spa", price: 6000, duration: "4 hrs" }, { name: "Party Makeup", price: 3000, duration: "2 hrs" }],
  7: [{ name: "Nail Art", price: 600, duration: "45 min" }, { name: "Makeup", price: 1200, duration: "1 hr" }, { name: "Hair Styling", price: 700, duration: "45 min" }],
  8: [{ name: "Relaxation Spa", price: 3500, duration: "2.5 hrs" }, { name: "Facial", price: 1800, duration: "1 hr" }, { name: "Bridal Makeup", price: 7000, duration: "3.5 hrs" }],
  9: [{ name: "Haircut", price: 250, duration: "30 min" }, { name: "Hair Color", price: 1500, duration: "1.5 hrs" }],
}

const reviews = [
  { name: "Priya S.", rating: 5, text: "Absolutely stunning bridal makeup! Everyone at my wedding loved it.", date: "2 days ago", verified: true },
  { name: "Ananya M.", rating: 5, text: "Best salon! The staff is so professional and welcoming.", date: "1 week ago", verified: true },
  { name: "Ritu K.", rating: 4, text: "Great keratin treatment, my hair feels so smooth. Will visit again!", date: "2 weeks ago", verified: false },
]

const beforeAfter = [
  { label: "Bridal Look", before: "😐", after: "👰" },
  { label: "Hair Color", before: "🧑", after: "💁" },
  { label: "Glow Facial", before: "😶", after: "✨" },
]

const occasions = ["Wedding", "Date Night", "Party", "Job Interview", "Festival", "Birthday"]
const timeSlots = ["10:00 AM", "11:00 AM", "12:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM"]

const paymentMethods = [
  { id: 'upi', label: 'UPI', icon: '📱', desc: 'GPay, PhonePe, Paytm' },
  { id: 'card', label: 'Credit/Debit Card', icon: '💳', desc: 'Visa, Mastercard, RuPay' },
  { id: 'netbanking', label: 'Net Banking', icon: '🏦', desc: 'All major banks' },
  { id: 'cash', label: 'Cash on Arrival', icon: '💵', desc: 'Pay at salon' },
]

export default function SalonDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [salon, setSalon] = useState(null)
  const [liked, setLiked] = useState(false)
  const [activeTab, setActiveTab] = useState('services')
  const [selectedService, setSelectedService] = useState(null)
  const [selectedOccasion, setSelectedOccasion] = useState(null)
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState(null)
  const [selectedPayment, setSelectedPayment] = useState(null)
  const [showBooking, setShowBooking] = useState(false)
  const [showPayment, setShowPayment] = useState(false)
  const [confirmed, setConfirmed] = useState(false)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const [upiId, setUpiId] = useState('')
  const [cardNo, setCardNo] = useState('')

  useEffect(() => {
    fetchSalon()
  }, [id])

  const fetchSalon = async () => {
    const { data } = await supabase.from('salons').select('*').eq('id', id).single()
    setSalon(data || { ...defaultSalon, id: parseInt(id) })
  }

  const services = servicesBySalon[parseInt(id)] || servicesBySalon[1]

  const handleBookingNext = () => {
    if (!selectedService || !selectedDate || !selectedTime || !name || !phone) {
      alert('Please fill all details!')
      return
    }
    setShowPayment(true)
  }

  const handleConfirm = async () => {
    if (!selectedPayment) {
      alert('Please select a payment method!')
      return
    }
    setLoading(true)

    const { data: { user } } = await supabase.auth.getUser()

    const bookingData = {
      salon_name: salon?.name,
      service_name: selectedService?.name,
      service_price: selectedService?.price,
      occasion: selectedOccasion,
      booking_date: selectedDate,
      booking_time: selectedTime,
      customer_name: name,
      customer_phone: phone,
      payment_method: selectedPayment,
      payment_status: selectedPayment === 'cash' ? 'pending' : 'paid',
      status: 'confirmed',
    }

    if (user) bookingData.user_id = user.id

    await supabase.from('bookings').insert(bookingData)
    setLoading(false)
    setConfirmed(true)
    setShowBooking(false)
    setShowPayment(false)
  }

  if (confirmed) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl shadow-lg p-10 max-w-md w-full text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Booking Confirmed!</h2>
          <p className="text-gray-500 mb-6">Your appointment has been booked successfully.</p>
          <div className="bg-pink-50 rounded-2xl p-4 text-left mb-6 space-y-2">
            <p className="text-sm text-gray-600"><span className="font-semibold">Salon:</span> {salon?.name}</p>
            <p className="text-sm text-gray-600"><span className="font-semibold">Service:</span> {selectedService?.name}</p>
            <p className="text-sm text-gray-600"><span className="font-semibold">Date:</span> {selectedDate}</p>
            <p className="text-sm text-gray-600"><span className="font-semibold">Time:</span> {selectedTime}</p>
            <p className="text-sm text-gray-600"><span className="font-semibold">Name:</span> {name}</p>
            <p className="text-sm text-gray-600"><span className="font-semibold">Payment:</span> {paymentMethods.find(p => p.id === selectedPayment)?.label}</p>
            <p className="text-sm font-bold text-pink-500"><span className="font-semibold">Total:</span> ₹{selectedService?.price}</p>
          </div>
          <div className="space-y-3">
            <button onClick={() => navigate('/my-bookings')} className="w-full bg-pink-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-pink-600 transition">
              View My Bookings
            </button>
            <button onClick={() => navigate('/')} className="w-full bg-gray-100 text-gray-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-200 transition">
              Back to Home
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">

      <div className="bg-gradient-to-br from-pink-400 to-rose-300 h-56 relative flex items-center justify-center">
        <span className="text-8xl">💇</span>
        <button onClick={() => navigate(-1)} className="absolute top-4 left-4 bg-white rounded-full p-2 shadow hover:shadow-md transition">
          <ArrowLeft size={20} className="text-gray-700" />
        </button>
        <button onClick={() => setLiked(!liked)} className="absolute top-4 right-4 bg-white rounded-full p-2 shadow hover:shadow-md transition">
          <Heart size={20} className={liked ? 'fill-pink-500 text-pink-500' : 'text-gray-400'} />
        </button>
        <span className="absolute bottom-3 left-4 bg-pink-500 text-white text-xs px-3 py-1 rounded-full font-semibold">{salon?.tag}</span>
        <span className="absolute bottom-3 right-4 bg-purple-100 text-purple-700 text-xs px-3 py-1 rounded-full font-bold">✨ Glow Score {salon?.glow_score}</span>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-6">

        <div className="bg-white rounded-2xl p-5 shadow-sm mb-4">
          <div className="flex justify-between items-start mb-2">
            <h1 className="text-2xl font-bold text-gray-800">{salon?.name}</h1>
            <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1 rounded-full">
              <Star size={14} className="text-yellow-400 fill-yellow-400" />
              <span className="font-bold text-sm">{salon?.rating}</span>
              <span className="text-gray-400 text-xs">({salon?.reviews})</span>
            </div>
          </div>
          <div className="flex items-center gap-1 text-gray-500 text-sm mb-1"><MapPin size={14} /> {salon?.area}</div>
          <div className="flex items-center gap-1 text-gray-500 text-sm mb-1"><Clock size={14} /> {salon?.timing}</div>
          <div className="flex items-center gap-1 text-gray-500 text-sm mb-4"><Phone size={14} /> {salon?.phone}</div>
          <p className="text-gray-600 text-sm leading-relaxed">{salon?.about}</p>
        </div>

        <div className="flex gap-2 mb-4 bg-white rounded-2xl p-2 shadow-sm">
          {['services', 'before-after', 'reviews'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 rounded-xl text-sm font-semibold capitalize transition ${activeTab === tab ? 'bg-pink-500 text-white' : 'text-gray-500 hover:text-pink-500'}`}>
              {tab === 'before-after' ? 'Before & After' : tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {activeTab === 'services' && (
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-4">
            {services.map((service, i) => (
              <div key={i} onClick={() => { setSelectedService(service); setShowBooking(true) }}
                className="flex justify-between items-center p-4 cursor-pointer hover:bg-pink-50 transition border-b last:border-0">
                <div>
                  <p className="font-semibold text-gray-800">{service.name}</p>
                  <p className="text-xs text-gray-400">{service.duration}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-pink-500 font-bold">₹{service.price}</span>
                  <button className="bg-pink-500 text-white text-xs px-3 py-1 rounded-full">Book</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'before-after' && (
          <div className="grid grid-cols-1 gap-4 mb-4">
            {beforeAfter.map((item, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-sm p-5">
                <p className="font-semibold text-gray-700 mb-4 text-center">{item.label}</p>
                <div className="flex gap-4">
                  <div className="flex-1 bg-gray-100 rounded-xl h-32 flex flex-col items-center justify-center">
                    <span className="text-5xl">{item.before}</span>
                    <span className="text-xs text-gray-400 mt-2">Before</span>
                  </div>
                  <div className="flex items-center text-pink-400 font-bold text-xl">→</div>
                  <div className="flex-1 bg-pink-50 rounded-xl h-32 flex flex-col items-center justify-center">
                    <span className="text-5xl">{item.after}</span>
                    <span className="text-xs text-pink-400 mt-2">After</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="space-y-4 mb-4">
            {reviews.map((review, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-sm p-5">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-800">{review.name}</span>
                      {review.verified && <span className="bg-green-100 text-green-600 text-xs px-2 py-0.5 rounded-full">✓ Verified</span>}
                    </div>
                    <span className="text-xs text-gray-400">{review.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(review.rating)].map((_, j) => <Star key={j} size={12} className="text-yellow-400 fill-yellow-400" />)}
                  </div>
                </div>
                <p className="text-gray-600 text-sm">{review.text}</p>
              </div>
            ))}
          </div>
        )}

        <button onClick={() => setShowBooking(true)} className="w-full bg-pink-500 hover:bg-pink-600 text-white py-4 rounded-2xl font-bold text-lg transition shadow-lg">
          Book Appointment 💅
        </button>
      </div>

      {/* Booking Modal */}
      {showBooking && !showPayment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end md:items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">Book Appointment</h2>
              <button onClick={() => setShowBooking(false)} className="text-gray-400 hover:text-gray-600 text-2xl">✕</button>
            </div>

            <div className="mb-5">
              <p className="font-semibold text-gray-700 mb-3">Select Service</p>
              <div className="grid grid-cols-2 gap-2">
                {services.map((s, i) => (
                  <button key={i} onClick={() => setSelectedService(s)}
                    className={`p-3 rounded-xl border text-left transition ${selectedService?.name === s.name ? 'border-pink-500 bg-pink-50' : 'border-gray-200 hover:border-pink-300'}`}>
                    <p className="font-medium text-sm text-gray-800">{s.name}</p>
                    <p className="text-pink-500 text-sm font-bold">₹{s.price}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-5">
              <p className="font-semibold text-gray-700 mb-3">Occasion <span className="text-gray-400 font-normal text-xs">(optional)</span></p>
              <div className="flex flex-wrap gap-2">
                {occasions.map(o => (
                  <button key={o} onClick={() => setSelectedOccasion(o)}
                    className={`px-3 py-1.5 rounded-full text-sm border transition ${selectedOccasion === o ? 'bg-pink-500 text-white border-pink-500' : 'border-gray-200 text-gray-600 hover:border-pink-300'}`}>
                    {o}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-5">
              <p className="font-semibold text-gray-700 mb-3">Select Date</p>
              <input type="date" value={selectedDate} onChange={e => setSelectedDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-700 outline-none focus:border-pink-400 transition" />
            </div>

            <div className="mb-5">
              <p className="font-semibold text-gray-700 mb-3">Select Time</p>
              <div className="grid grid-cols-4 gap-2">
                {timeSlots.map(t => (
                  <button key={t} onClick={() => setSelectedTime(t)}
                    className={`py-2 rounded-xl text-xs border font-medium transition ${selectedTime === t ? 'bg-pink-500 text-white border-pink-500' : 'border-gray-200 text-gray-600 hover:border-pink-300'}`}>
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-5 space-y-3">
              <p className="font-semibold text-gray-700">Your Details</p>
              <input type="text" placeholder="Your Name" value={name} onChange={e => setName(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-700 outline-none focus:border-pink-400 transition" />
              <input type="tel" placeholder="Phone Number" value={phone} onChange={e => setPhone(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-700 outline-none focus:border-pink-400 transition" />
            </div>

            {selectedService && (
              <div className="bg-pink-50 rounded-xl p-4 mb-5">
                <p className="font-semibold text-gray-700 mb-1">Summary</p>
                <p className="text-sm text-gray-600">{selectedService.name} • {selectedService.duration}</p>
                <p className="text-pink-500 font-bold mt-1">Total: ₹{selectedService.price}</p>
              </div>
            )}

            <button onClick={handleBookingNext} className="w-full bg-pink-500 hover:bg-pink-600 text-white py-4 rounded-2xl font-bold text-lg transition">
              Proceed to Payment 💳
            </button>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {showPayment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end md:items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-between items-center mb-6">
              <button onClick={() => setShowPayment(false)} className="text-pink-500 font-semibold text-sm">← Back</button>
              <h2 className="text-xl font-bold text-gray-800">Payment</h2>
              <button onClick={() => { setShowPayment(false); setShowBooking(false) }} className="text-gray-400 text-2xl">✕</button>
            </div>

            {/* Order Summary */}
            <div className="bg-pink-50 rounded-2xl p-4 mb-6">
              <h3 className="font-bold text-gray-800 mb-3">Order Summary</h3>
              <div className="space-y-1 text-sm text-gray-600">
                <div className="flex justify-between"><span>{salon?.name}</span></div>
                <div className="flex justify-between"><span>{selectedService?.name}</span><span>₹{selectedService?.price}</span></div>
                {selectedOccasion && <div className="flex justify-between"><span>Occasion</span><span>{selectedOccasion}</span></div>}
                <div className="flex justify-between"><span>Date & Time</span><span>{selectedDate} {selectedTime}</span></div>
                <div className="border-t border-pink-200 mt-2 pt-2 flex justify-between font-bold text-pink-500">
                  <span>Total</span><span>₹{selectedService?.price}</span>
                </div>
              </div>
            </div>

            {/* Payment Methods */}
            <p className="font-semibold text-gray-700 mb-3">Select Payment Method</p>
            <div className="space-y-3 mb-6">
              {paymentMethods.map(method => (
                <button key={method.id} onClick={() => setSelectedPayment(method.id)}
                  className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition ${selectedPayment === method.id ? 'border-pink-500 bg-pink-50' : 'border-gray-200 hover:border-pink-300'}`}>
                  <span className="text-2xl">{method.icon}</span>
                  <div className="text-left">
                    <p className="font-semibold text-gray-800 text-sm">{method.label}</p>
                    <p className="text-gray-400 text-xs">{method.desc}</p>
                  </div>
                  {selectedPayment === method.id && <span className="ml-auto text-pink-500 font-bold">✓</span>}
                </button>
              ))}
            </div>

            {/* UPI Input */}
            {selectedPayment === 'upi' && (
              <div className="mb-5">
                <input type="text" placeholder="Enter UPI ID (e.g. name@gpay)" value={upiId} onChange={e => setUpiId(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-pink-400" />
              </div>
            )}

            {/* Card Input */}
            {selectedPayment === 'card' && (
              <div className="mb-5 space-y-3">
                <input type="text" placeholder="Card Number" value={cardNo} onChange={e => setCardNo(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-pink-400" />
                <div className="grid grid-cols-2 gap-3">
                  <input type="text" placeholder="MM/YY" className="border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-pink-400" />
                  <input type="text" placeholder="CVV" className="border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-pink-400" />
                </div>
              </div>
            )}

            <button onClick={handleConfirm} disabled={loading}
              className="w-full bg-pink-500 hover:bg-pink-600 text-white py-4 rounded-2xl font-bold text-lg transition disabled:opacity-50">
              {loading ? 'Processing...' : selectedPayment === 'cash' ? 'Confirm Booking 📅' : `Pay ₹${selectedService?.price} 💳`}
            </button>

            <p className="text-center text-xs text-gray-400 mt-3">🔒 100% Secure Payment</p>
          </div>
        </div>
      )}
    </div>
  )
}