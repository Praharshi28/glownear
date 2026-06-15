import { useState } from 'react'
import { Info } from 'lucide-react'

export default function GlowScorePopup({ score, rating, reviews, available, tag }) {
  const [show, setShow] = useState(false)

  const reasons = [
    { label: 'Customer Rating', value: `${rating}/5.0 ⭐`, score: Math.round((rating / 5) * 30) },
    { label: 'Total Reviews', value: `${reviews} verified ✅`, score: Math.min(25, Math.round((reviews / 200) * 25)) },
    { label: 'Availability', value: available ? 'Open Now 🟢' : 'Currently Busy 🔴', score: available ? 20 : 10 },
    { label: 'Popularity Tag', value: tag, score: tag === 'Premium' ? 25 : tag === 'Top Rated' ? 22 : tag === 'Trending' ? 20 : 15 },
  ]

  return (
    <div className="relative inline-block">
      <div
        className="bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded-full font-bold cursor-pointer flex items-center gap-1 hover:bg-purple-200 transition"
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        onClick={() => setShow(!show)}
      >
        ✨ {score}
        <Info size={10} />
      </div>

      {show && (
        <div className="absolute right-0 top-8 bg-white rounded-2xl shadow-xl border border-purple-100 p-4 w-64 z-50">
          <p className="font-bold text-gray-800 mb-1">Glow Score™ Explained</p>
          <p className="text-xs text-gray-400 mb-3">Why this salon scored {score}/100</p>
          <div className="space-y-2">
            {reasons.map((r, i) => (
              <div key={i} className="flex justify-between items-center">
                <div>
                  <p className="text-xs font-medium text-gray-700">{r.label}</p>
                  <p className="text-xs text-gray-400">{r.value}</p>
                </div>
                <span className="bg-purple-100 text-purple-600 text-xs px-2 py-0.5 rounded-full font-bold">+{r.score}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-100 mt-3 pt-2 flex justify-between items-center">
            <span className="text-xs font-bold text-gray-700">Total Glow Score</span>
            <span className="text-purple-600 font-bold">{score}/100</span>
          </div>
        </div>
      )}
    </div>
  )
}