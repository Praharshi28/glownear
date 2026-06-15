import { useState, useEffect } from 'react'
import { supabase } from '../supabase'
import { Star } from 'lucide-react'

export default function LoyaltyPoints() {
  const [points, setPoints] = useState(0)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchPoints = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      setUser(user)
      const { data } = await supabase.from('bookings').select('service_price').eq('user_id', user.id)
      const totalSpent = data?.reduce((a, b) => a + (b.service_price || 0), 0) || 0
      setPoints(Math.floor(totalSpent / 10))
    }
    fetchPoints()
  }, [])

  if (!user) return null

  const level = points >= 1000 ? 'Gold' : points >= 500 ? 'Silver' : 'Bronze'
  const levelColor = level === 'Gold' ? 'text-yellow-500' : level === 'Silver' ? 'text-gray-400' : 'text-orange-500'
  const nextLevel = level === 'Bronze' ? 500 : level === 'Silver' ? 1000 : 2000
  const progress = Math.min((points / nextLevel) * 100, 100)

  return (
    <div className="bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl p-4 text-white mx-4 my-3">
      <div className="flex justify-between items-start mb-3">
        <div>
          <div className="flex items-center gap-2">
            <Star size={16} className="fill-white" />
            <span className="font-bold">GlowPoints</span>
          </div>
          <p className={`text-2xl font-bold mt-1`}>{points} pts</p>
        </div>
        <div className="bg-white/20 rounded-full px-3 py-1">
          <span className="font-bold text-sm">{level} Member</span>
        </div>
      </div>
      <div className="bg-white/30 rounded-full h-2 mb-2">
        <div className="bg-white rounded-full h-2 transition-all" style={{ width: `${progress}%` }} />
      </div>
      <p className="text-yellow-100 text-xs">{nextLevel - points} points to {level === 'Bronze' ? 'Silver' : level === 'Silver' ? 'Gold' : 'Platinum'}</p>
      <p className="text-yellow-100 text-xs mt-1">Every ₹10 spent = 1 GlowPoint ✨</p>
    </div>
  )
}