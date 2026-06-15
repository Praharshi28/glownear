import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IndianRupee, Sparkles } from 'lucide-react'

const services = [
  { name: "Haircut", price: 400, duration: "45 min", category: "Hair", emoji: "✂️" },
  { name: "Facial", price: 1200, duration: "1 hr", category: "Skin", emoji: "🌟" },
  { name: "Nail Art", price: 800, duration: "45 min", category: "Nails", emoji: "💅" },
  { name: "Eyebrow Threading", price: 150, duration: "15 min", category: "Brows", emoji: "👁️" },
  { name: "Full Body Waxing", price: 1500, duration: "1.5 hr", category: "Waxing", emoji: "✨" },
  { name: "Hair Color", price: 2000, duration: "2 hrs", category: "Hair", emoji: "🎨" },
  { name: "Party Makeup", price: 1500, duration: "1.5 hr", category: "Makeup", emoji: "💄" },
  { name: "Bridal Makeup", price: 5000, duration: "3 hrs", category: "Makeup", emoji: "👰" },
  { name: "Keratin Treatment", price: 3000, duration: "2.5 hrs", category: "Hair", emoji: "💇" },
  { name: "Full Body Spa", price: 4000, duration: "3 hrs", category: "Spa", emoji: "💆" },
  { name: "Mehendi", price: 2500, duration: "2 hrs", category: "Mehendi", emoji: "🌿" },
  { name: "Blowout", price: 600, duration: "45 min", category: "Hair", emoji: "💨" },
]

const occasions = [
  { name: "Wedding", emoji: "💍", recommended: ["Bridal Makeup", "Mehendi", "Full Body Spa", "Nail Art", "Keratin Treatment"] },
  { name: "Party", emoji: "🎉", recommended: ["Party Makeup", "Hair Color", "Nail Art", "Blowout"] },
  { name: "Date Night", emoji: "🌹", recommended: ["Party Makeup", "Blowout", "Nail Art", "Eyebrow Threading"] },
  { name: "Festival", emoji: "🪔", recommended: ["Party Makeup", "Mehendi", "Nail Art", "Eyebrow Threading"] },
  { name: "Job Interview", emoji: "💼", recommended: ["Facial", "Eyebrow Threading", "Haircut", "Blowout"] },
  { name: "Regular Grooming", emoji: "✨", recommended: ["Haircut", "Facial", "Eyebrow Threading", "Nail Art"] },
]

export default function BudgetPlanner() {
  const navigate = useNavigate()
  const [budget, setBudget] = useState('')
  const [occasion, setOccasion] = useState(null)
  const [plan, setPlan] = useState(null)

  const generatePlan = () => {
    if (!budget || !occasion) { alert('Please enter budget and select occasion!'); return }

    const budgetNum = parseInt(budget)
    const occ = occasions.find(o => o.name === occasion)
    const recommended = services.filter(s => occ.recommended.includes(s.name))
    const sorted = recommended.sort((a, b) => b.price - a.price)

    let remaining = budgetNum
    const selected = []
    const skipped = []

    for (const service of sorted) {
      if (remaining >= service.price) {
        selected.push(service)
        remaining -= service.price
      } else {
        skipped.push(service)
      }
    }

    const totalSpent = budgetNum - remaining
    const savings = remaining

    setPlan({ selected, skipped, totalSpent, savings, remaining, budgetNum })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-br from-green-500 to-teal-400 py-12 px-4 text-white">
        <div className="max-w-2xl mx-auto">
          <button onClick={() => navigate('/')} className="text-green-100 text-sm mb-4 flex items-center gap-1">← Back</button>
          <div className="text-5xl mb-3">💰</div>
          <h1 className="text-3xl font-bold mb-2">Beauty Budget Planner</h1>
          <p className="text-green-100">Tell us your budget and occasion — we'll plan the perfect beauty schedule!</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8">

        {/* Budget Input */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-5">
          <h3 className="font-bold text-gray-800 mb-4">💸 What's your beauty budget?</h3>
          <div className="relative">
            <span className="absolute left-4 top-3.5 text-gray-400 font-bold">₹</span>
            <input
              type="number"
              placeholder="e.g. 5000"
              value={budget}
              onChange={e => setBudget(e.target.value)}
              className="w-full border border-gray-200 rounded-xl pl-8 pr-4 py-3 text-gray-700 outline-none focus:border-green-400 text-lg font-bold"
            />
          </div>
          <div className="flex gap-2 mt-3">
            {['1000', '2500', '5000', '10000', '20000'].map(b => (
              <button key={b} onClick={() => setBudget(b)}
                className={`px-3 py-1 rounded-full text-sm border transition ${budget === b ? 'bg-green-500 text-white border-green-500' : 'border-gray-200 text-gray-600 hover:border-green-300'}`}>
                ₹{b}
              </button>
            ))}
          </div>
        </div>

        {/* Occasion Selector */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-5">
          <h3 className="font-bold text-gray-800 mb-4">🎉 What's the occasion?</h3>
          <div className="grid grid-cols-3 gap-3">
            {occasions.map(occ => (
              <button key={occ.name} onClick={() => setOccasion(occ.name)}
                className={`p-3 rounded-2xl border-2 text-center transition ${occasion === occ.name ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-green-300'}`}>
                <div className="text-3xl mb-1">{occ.emoji}</div>
                <p className="text-xs font-semibold text-gray-700">{occ.name}</p>
              </button>
            ))}
          </div>
        </div>

        <button onClick={generatePlan}
          className="w-full bg-gradient-to-r from-green-500 to-teal-400 text-white py-4 rounded-2xl font-bold text-lg mb-6 hover:opacity-90 transition flex items-center justify-center gap-2">
          <Sparkles size={20} /> Generate My Beauty Plan
        </button>

        {/* Results */}
        {plan && (
          <div className="space-y-4">

            {/* Summary */}
            <div className="bg-gradient-to-r from-green-500 to-teal-400 rounded-2xl p-5 text-white">
              <h3 className="font-bold text-lg mb-3">✅ Your Beauty Plan</h3>
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="bg-white/20 rounded-xl p-3">
                  <p className="text-xl font-bold">₹{plan.totalSpent.toLocaleString()}</p>
                  <p className="text-green-100 text-xs">Total Spent</p>
                </div>
                <div className="bg-white/20 rounded-xl p-3">
                  <p className="text-xl font-bold">{plan.selected.length}</p>
                  <p className="text-green-100 text-xs">Services</p>
                </div>
                <div className="bg-white/20 rounded-xl p-3">
                  <p className="text-xl font-bold">₹{plan.remaining.toLocaleString()}</p>
                  <p className="text-green-100 text-xs">Savings Left</p>
                </div>
              </div>
            </div>

            {/* Selected Services */}
            <div className="bg-white rounded-2xl shadow-sm p-5">
              <h3 className="font-bold text-gray-800 mb-4">💄 Services in Your Plan</h3>
              <div className="space-y-3">
                {plan.selected.map((s, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-green-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{s.emoji}</span>
                      <div>
                        <p className="font-semibold text-gray-800 text-sm">{s.name}</p>
                        <p className="text-gray-400 text-xs">{s.duration}</p>
                      </div>
                    </div>
                    <span className="text-green-600 font-bold">₹{s.price}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Skipped Services */}
            {plan.skipped.length > 0 && (
              <div className="bg-white rounded-2xl shadow-sm p-5">
                <h3 className="font-bold text-gray-800 mb-4">⚠️ Over Budget (Not Included)</h3>
                <div className="space-y-2">
                  {plan.skipped.map((s, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-red-50 rounded-xl opacity-60">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{s.emoji}</span>
                        <p className="font-semibold text-gray-600 text-sm">{s.name}</p>
                      </div>
                      <span className="text-red-400 font-bold">₹{s.price}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-400 mt-2">💡 Tip: Increase budget by ₹{plan.skipped[0]?.price} to add {plan.skipped[0]?.name}!</p>
              </div>
            )}

            <button onClick={() => navigate('/salons')}
              className="w-full bg-pink-500 hover:bg-pink-600 text-white py-4 rounded-2xl font-bold text-lg transition">
              Book These Services Now 💅
            </button>
          </div>
        )}
      </div>
    </div>
  )
}