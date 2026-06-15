import { useState, useEffect } from 'react'

const messages = [
  "3 people viewing this salon",
  "2 slots left today!",
  "5 bookings today",
  "Popular this week!",
  "Just booked 10 min ago",
]

export default function LivePulse({ salonId }) {
  const [msg, setMsg] = useState(messages[salonId % messages.length])

  useEffect(() => {
    const interval = setInterval(() => {
      setMsg(messages[Math.floor(Math.random() * messages.length)])
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex items-center gap-2 text-xs text-orange-500 font-semibold">
      <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
      {msg}
    </div>
  )
}