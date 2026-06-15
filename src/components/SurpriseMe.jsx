import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Sparkles } from 'lucide-react'

const surprises = [
  { salon: "Aura Beauty Lounge", area: "Worli", service: "Luxury Bridal Package", price: 15000, emoji: "👑" },
  { salon: "Luxe Beauty Studio", area: "Bandra West", service: "Party Makeup + Hair Styling", price: 2300, emoji: "💄" },
  { salon: "Serenity Spa & Salon", area: "Colaba", service: "Full Body Spa + Facial", price: 5300, emoji: "💆" },
  { salon: "The Glow Lab", area: "Andheri East", service: "Nail Art + Facial", price: 2000, emoji: "💅" },
  { salon: "Pink Petal Parlour", area: "Powai", service: "Bridal Makeup + Spa", price: 10500, emoji: "👰" },
]

export default function SurpriseMe() {
  const navigate = useNavigate()
  const [result, setResult] = useState(null)
  const [spinning, setSpinning] = useState(false)

  const handleSurprise = async () => {
    setSpinning(true)
    setResult(null)
    await new Promise(r => setTimeout(r, 1500))
    const pick = surprises[Math.floor(Math.random() * surprises.length)]
    setResult(pick)
    setSpinning(false)
  }

  return (
    <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl p-8 text-white text-center my-8 max-w-2xl mx-auto">
      <div className="text-5xl mb-3">🎲</div>
      <h2 className="text-2xl font-bold mb-2">Surprise Me!</h2>
      <p className="text-purple-100 mb-6">Let AI pick the perfect salon + service for you instantly!</p>

      <button
        onClick={handleSurprise}
        disabled={spinning}
        className="bg-white text-purple-600 font-bold px-8 py-3 rounded-full hover:bg-purple-50 transition disabled:opacity-70 flex items-center gap-2 mx-auto mb-6"
      >
        {spinning ? (
          <><Sparkles size={18} className="animate-spin" /> Picking your perfect look...</>
        ) : (
          <><Sparkles size={18} /> Surprise Me! 🎲</>
        )}
      </button>

      {result && (
        <div className="bg-white/20 rounded-2xl p-5 text-left">
          <div className="text-4xl text-center mb-3">{result.emoji}</div>
          <p className="font-bold text-xl text-center mb-1">{result.salon}</p>
          <p className="text-purple-100 text-center text-sm mb-4">{result.area}</p>
          <div className="bg-white/20 rounded-xl p-3 mb-4">
            <p className="text-sm font-semibold">Recommended Service</p>
            <p className="text-lg font-bold">{result.service}</p>
            <p className="text-purple-100">₹{result.price.toLocaleString()}</p>
          </div>
          <button
            onClick={() => navigate('/salons')}
            className="w-full bg-white text-purple-600 py-3 rounded-xl font-bold hover:bg-purple-50 transition"
          >
            Book This Now! 🚀
          </button>
        </div>
      )}
    </div>
  )
}