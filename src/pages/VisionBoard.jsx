import { useState } from 'react'
import { Sparkles, ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const vibes = [
  {
    id: 1,
    name: "Bridal Glam",
    emoji: "👰",
    desc: "Timeless, elegant, and stunning for your big day",
    color: "from-rose-400 to-pink-300",
    services: ["Bridal Makeup", "Hair Styling", "Facial", "Nail Art"],
    salons: ["Luxe Beauty Studio", "Aura Beauty Lounge", "Serenity Spa & Salon"],
    tips: ["Book 2 weeks in advance", "Do a trial session first", "Bring reference photos"],
    mood: ["✨", "💍", "🌸", "💎", "👑"]
  },
  {
    id: 2,
    name: "Party Queen",
    emoji: "🎉",
    desc: "Bold, glamorous, and ready to turn heads",
    color: "from-purple-400 to-pink-400",
    services: ["Party Makeup", "Hair Styling", "Nail Art", "Lashes"],
    salons: ["Pink Petal Parlour", "Glamour Garden", "The Glow Lab"],
    tips: ["Go bold with eyes or lips", "Try glitter or shimmer", "Book same day possible"],
    mood: ["💄", "🎊", "💅", "🔥", "⭐"]
  },
  {
    id: 3,
    name: "Natural Glow",
    emoji: "🌿",
    desc: "Fresh, dewy, and effortlessly beautiful",
    color: "from-green-400 to-teal-300",
    services: ["Hydrating Facial", "Natural Makeup", "Eyebrow Threading", "Glow Treatment"],
    salons: ["The Glow Lab", "Serenity Spa & Salon", "Bliss Salon"],
    tips: ["Focus on skincare first", "Less is more", "Use light coverage products"],
    mood: ["🌿", "💧", "☀️", "🍃", "✨"]
  },
  {
    id: 4,
    name: "Bold & Fierce",
    emoji: "🔥",
    desc: "Dramatic, edgy, and unapologetically you",
    color: "from-red-400 to-orange-400",
    services: ["Dramatic Makeup", "Bold Hair Color", "Nail Art", "Contouring"],
    salons: ["Aura Beauty Lounge", "Luxe Beauty Studio", "Pink Petal Parlour"],
    tips: ["Try a bold lip color", "Experiment with liner", "Own your look with confidence"],
    mood: ["🔥", "💋", "👄", "⚡", "🖤"]
  },
  {
    id: 5,
    name: "Date Night",
    emoji: "💕",
    desc: "Romantic, soft, and irresistibly charming",
    color: "from-pink-400 to-red-300",
    services: ["Soft Glam Makeup", "Blowout", "Nail Art", "Fragrance"],
    salons: ["Luxe Beauty Studio", "The Glow Lab", "Pink Petal Parlour"],
    tips: ["Go for a subtle smokey eye", "Wear your confidence", "Dewy skin is always romantic"],
    mood: ["💕", "🌹", "✨", "💫", "🥂"]
  },
  {
    id: 6,
    name: "Festival Vibes",
    emoji: "🎆",
    desc: "Vibrant, colorful, and celebration-ready",
    color: "from-yellow-400 to-orange-300",
    services: ["Traditional Makeup", "Mehendi", "Hair Braiding", "Colorful Nail Art"],
    salons: ["Serenity Spa & Salon", "Glamour Garden", "Bliss Salon"],
    tips: ["Try traditional Indian looks", "Embrace bold colors", "Add accessories for extra glam"],
    mood: ["🎆", "🪔", "🌺", "💛", "🎊"]
  },
]

export default function VisionBoard() {
  const [selected, setSelected] = useState(null)
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="bg-gradient-to-br from-purple-500 to-pink-500 py-12 px-4 text-white text-center">
        <div className="text-4xl mb-3">🎨</div>
        <h1 className="text-3xl font-bold mb-2">My Look Vision Board</h1>
        <p className="text-purple-100">Pick your vibe and we'll build your perfect beauty plan</p>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10">

        {!selected ? (
          <>
            <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">✨ What's your vibe today?</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {vibes.map(vibe => (
                <button
                  key={vibe.id}
                  onClick={() => setSelected(vibe)}
                  className={`bg-gradient-to-br ${vibe.color} rounded-2xl p-6 text-white text-left hover:scale-105 transition-transform shadow-md`}
                >
                  <div className="text-4xl mb-3">{vibe.emoji}</div>
                  <h3 className="font-bold text-lg mb-1">{vibe.name}</h3>
                  <p className="text-white/80 text-xs">{vibe.desc}</p>
                </button>
              ))}
            </div>
          </>
        ) : (
          <div>
            {/* Back button */}
            <button
              onClick={() => setSelected(null)}
              className="mb-6 text-pink-500 font-semibold flex items-center gap-2 hover:gap-3 transition-all"
            >
              ← Choose different vibe
            </button>

            {/* Vibe Header */}
            <div className={`bg-gradient-to-br ${selected.color} rounded-3xl p-8 text-white text-center mb-6`}>
              <div className="text-6xl mb-3">{selected.emoji}</div>
              <h2 className="text-3xl font-bold mb-2">{selected.name}</h2>
              <p className="text-white/80">{selected.desc}</p>
              {/* Mood Board */}
              <div className="flex justify-center gap-3 mt-4 text-3xl">
                {selected.mood.map((m, i) => (
                  <span key={i} className="animate-bounce" style={{ animationDelay: `${i * 100}ms` }}>{m}</span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">

              {/* Recommended Services */}
              <div className="bg-white rounded-2xl p-5 shadow-sm">
                <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                  💆 Recommended Services
                </h3>
                <div className="space-y-2">
                  {selected.services.map((s, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="w-2 h-2 bg-pink-400 rounded-full"></span>
                      {s}
                    </div>
                  ))}
                </div>
              </div>

              {/* Top Salons */}
              <div className="bg-white rounded-2xl p-5 shadow-sm">
                <h3 className="font-bold text-gray-800 mb-4">🏆 Best Salons for This Look</h3>
                <div className="space-y-2">
                  {selected.salons.map((s, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="text-yellow-400">⭐</span>
                      {s}
                    </div>
                  ))}
                </div>
              </div>

              {/* Beauty Tips */}
              <div className="bg-white rounded-2xl p-5 shadow-sm">
                <h3 className="font-bold text-gray-800 mb-4">💡 Beauty Tips</h3>
                <div className="space-y-2">
                  {selected.tips.map((t, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="text-pink-400 mt-0.5">✓</span>
                      {t}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA */}
            <button
              onClick={() => navigate('/salons')}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 hover:opacity-90 transition shadow-lg"
            >
              Book This Look Now <ArrowRight size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}