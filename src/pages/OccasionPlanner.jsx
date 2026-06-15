import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Calendar, Check } from 'lucide-react'

const occasionPlans = {
  Wedding: [
    { day: -30, label: "1 Month Before", services: ["Deep Conditioning Hair Treatment", "Brightening Facial"], tip: "Start your skin prep early for a natural bridal glow! 🌸" },
    { day: -14, label: "2 Weeks Before", services: ["Full Body Waxing", "Eyebrow Shaping"], tip: "Perfect time for waxing so skin recovers fully before the big day!" },
    { day: -7, label: "1 Week Before", services: ["Bridal Trial Makeup", "Hair Trial"], tip: "Trial run is essential — bring reference photos! 📸" },
    { day: -3, label: "3 Days Before", services: ["Mehendi Application", "Nail Art"], tip: "Mehendi color deepens over 24-48 hours — do it now! 🌿" },
    { day: -1, label: "Day Before", services: ["Relaxing Spa", "Blowout", "Skin Hydration Facial"], tip: "Relax and pamper yourself — tomorrow is your day! 💆" },
    { day: 0, label: "Wedding Day", services: ["Bridal Makeup", "Bridal Hair Styling", "Final Touch-ups"], tip: "Wake up early, eat well, stay hydrated, and GLOW! 👰✨" },
  ],
  Party: [
    { day: -3, label: "3 Days Before", services: ["Facial Cleanup"], tip: "Give your skin time to recover for a fresh party look!" },
    { day: -1, label: "Day Before", services: ["Full Body Waxing", "Nail Art"], tip: "Wax a day before so redness fades by party time!" },
    { day: 0, label: "Party Day", services: ["Party Makeup", "Hair Styling", "Blowout"], tip: "Book morning slot — takes 2-3 hours for full glam! 💄" },
  ],
  Festival: [
    { day: -2, label: "2 Days Before", services: ["Eyebrow Threading", "Facial"], tip: "Fresh face for the festival celebrations!" },
    { day: -1, label: "Day Before", services: ["Mehendi", "Nail Art"], tip: "Traditional mehendi designs look best after 24 hours! 🪔" },
    { day: 0, label: "Festival Day", services: ["Traditional Makeup", "Hair Styling"], tip: "Embrace vibrant colors — go bold for festivals! 🌺" },
  ],
  'Date Night': [
    { day: 0, label: "Date Day", services: ["Facial", "Blowout", "Subtle Makeup", "Nail Touch-up"], tip: "Keep it natural and glowing — confidence is your best look! 💕" },
  ],
}

export default function OccasionPlanner() {
  const navigate = useNavigate()
  const [occasion, setOccasion] = useState('')
  const [eventDate, setEventDate] = useState('')
  const [plan, setPlan] = useState(null)
  const [checkedItems, setCheckedItems] = useState({})

  const generatePlan = () => {
    if (!occasion || !eventDate) { alert('Please select occasion and date!'); return }
    const steps = occasionPlans[occasion] || occasionPlans['Party']
    const event = new Date(eventDate)

    const planWithDates = steps.map(step => {
      const stepDate = new Date(event)
      stepDate.setDate(event.getDate() + step.day)
      const today = new Date()
      const isPast = stepDate < today
      const isToday = stepDate.toDateString() === today.toDateString()
      return {
        ...step,
        date: stepDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }),
        isPast,
        isToday,
      }
    })
    setPlan(planWithDates)
  }

  const toggleCheck = (key) => {
    setCheckedItems(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const daysUntil = eventDate ? Math.ceil((new Date(eventDate) - new Date()) / (1000 * 60 * 60 * 24)) : null

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-br from-rose-500 to-pink-400 py-12 px-4 text-white">
        <div className="max-w-2xl mx-auto">
          <button onClick={() => navigate('/')} className="text-rose-200 text-sm mb-4 flex items-center gap-1">← Back</button>
          <div className="text-5xl mb-3">📅</div>
          <h1 className="text-3xl font-bold mb-2">Occasion Beauty Planner</h1>
          <p className="text-rose-100">Enter your event date and we'll build your complete beauty countdown!</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8">

        <div className="bg-white rounded-2xl shadow-sm p-6 mb-5">
          <h3 className="font-bold text-gray-800 mb-4">🎉 What's the occasion?</h3>
          <div className="grid grid-cols-2 gap-3 mb-5">
            {Object.keys(occasionPlans).map(occ => (
              <button key={occ} onClick={() => setOccasion(occ)}
                className={`p-3 rounded-2xl border-2 text-center transition ${occasion === occ ? 'border-rose-500 bg-rose-50' : 'border-gray-200 hover:border-rose-300'}`}>
                <div className="text-2xl mb-1">
                  {occ === 'Wedding' ? '💍' : occ === 'Party' ? '🎉' : occ === 'Festival' ? '🪔' : '🌹'}
                </div>
                <p className="text-sm font-semibold text-gray-700">{occ}</p>
              </button>
            ))}
          </div>

          <h3 className="font-bold text-gray-800 mb-3">📅 Event Date</h3>
          <input type="date" value={eventDate} onChange={e => setEventDate(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-700 outline-none focus:border-rose-400" />

          {daysUntil !== null && daysUntil > 0 && (
            <div className="mt-3 bg-rose-50 rounded-xl p-3 text-center">
              <p className="text-rose-500 font-bold text-lg">{daysUntil} days</p>
              <p className="text-rose-400 text-sm">until your {occasion}!</p>
            </div>
          )}
        </div>

        <button onClick={generatePlan}
          className="w-full bg-gradient-to-r from-rose-500 to-pink-400 text-white py-4 rounded-2xl font-bold text-lg mb-6 hover:opacity-90 transition flex items-center justify-center gap-2">
          <Calendar size={20} /> Build My Beauty Timeline
        </button>

        {/* Timeline */}
        {plan && (
          <div className="space-y-4">
            <h3 className="font-bold text-gray-800 text-xl">🗓️ Your Beauty Countdown</h3>
            {plan.map((step, i) => (
              <div key={i} className={`bg-white rounded-2xl shadow-sm p-5 border-l-4 ${step.isToday ? 'border-rose-500' : step.isPast ? 'border-gray-300 opacity-60' : 'border-pink-300'}`}>
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-xs px-2 py-1 rounded-full font-bold ${step.isToday ? 'bg-rose-500 text-white' : step.isPast ? 'bg-gray-200 text-gray-500' : 'bg-pink-100 text-pink-600'}`}>
                        {step.isToday ? '📍 TODAY' : step.isPast ? '✅ Done' : `📅 ${step.label}`}
                      </span>
                    </div>
                    <p className="text-gray-500 text-sm">{step.date}</p>
                  </div>
                  {step.day === 0 && <span className="text-2xl">🎊</span>}
                </div>

                <div className="space-y-2 mb-3">
                  {step.services.map((service, j) => {
                    const key = `${i}-${j}`
                    return (
                      <div key={j} onClick={() => toggleCheck(key)}
                        className={`flex items-center gap-2 p-2 rounded-xl cursor-pointer transition ${checkedItems[key] ? 'bg-green-50' : 'bg-gray-50 hover:bg-pink-50'}`}>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${checkedItems[key] ? 'bg-green-500 border-green-500' : 'border-gray-300'}`}>
                          {checkedItems[key] && <Check size={12} className="text-white" />}
                        </div>
                        <span className={`text-sm ${checkedItems[key] ? 'line-through text-gray-400' : 'text-gray-700'}`}>{service}</span>
                      </div>
                    )
                  })}
                </div>

                <div className="bg-yellow-50 rounded-xl p-3">
                  <p className="text-xs text-yellow-700">💡 {step.tip}</p>
                </div>
              </div>
            ))}

            <button onClick={() => navigate('/salons')}
              className="w-full bg-pink-500 hover:bg-pink-600 text-white py-4 rounded-2xl font-bold text-lg transition">
              Book These Services 💅
            </button>
          </div>
        )}
      </div>
    </div>
  )
}