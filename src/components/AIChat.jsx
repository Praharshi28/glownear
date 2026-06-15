import { useState, useRef } from 'react'
import { X, Send, Upload, Sparkles } from 'lucide-react'

const GROQ_KEY = import.meta.env.VITE_GROQ_API_KEY
const QUICK_PROMPTS = [
  "Best bridal salon in Mumbai?",
  "Suggest makeup for a date night 💄",
  "Budget salon under ₹500?",
  "What's good for dry skin?",
]

const RESPONSES = {
  "bridal": "For bridal looks in Mumbai, I recommend **Aura Beauty Lounge** in Worli (Glow Score 98) or **Luxe Beauty Studio** in Bandra (Glow Score 96)! They specialize in stunning bridal makeup. Book at least 2 weeks in advance! 👰✨",
  "budget": "For budget-friendly options under ₹500, check out **Studio Nine** in Malad West (₹250 onwards) or **The Beauty Barn** in Thane (₹200 onwards). Great quality at affordable prices! 💸💄",
  "dry skin": "For dry skin, I recommend a **Hydrating Facial** or **Full Body Spa** treatment. **Serenity Spa & Salon** in Colaba (Glow Score 94) offers excellent skin treatments! Also drink plenty of water and use a good moisturizer daily. 💧✨",
  "date": "For a date night look, try **The Glow Lab** in Andheri (Glow Score 91) for a gorgeous glam look! Go for dewy skin, subtle smokey eyes, and a bold lip. You'll look stunning! 💄❤️",
  "spa": "Mumbai's best spas: **Aura Beauty Lounge** (Worli), **Serenity Spa** (Colaba), and **Pink Petal Parlour** (Powai). A relaxing spa day starts from ₹700! 💆‍♀️✨",
  "hair": "For hair treatments, **Luxe Beauty Studio** in Bandra offers Keratin (₹3000) and Hair Styling (₹800). **Bliss Salon** in Juhu is also great for color and keratin! 💇‍♀️✨",
  "makeup": "Mumbai's top makeup artists are at **Luxe Beauty Studio** (Bandra) and **Aura Beauty Lounge** (Worli). Party makeup starts from ₹1500, bridal from ₹5000! 💄👄",
  "default": "Great question! GlowNear has 9 amazing salons across Mumbai. From Bandra to Colaba, we've got you covered for all beauty needs — haircuts, bridal, spa, makeup and more! Which area are you in? 🌸✨"
}

function getResponse(text) {
  const lower = text.toLowerCase()
  if (lower.includes('bridal') || lower.includes('wedding')) return RESPONSES.bridal
  if (lower.includes('budget') || lower.includes('cheap') || lower.includes('₹500') || lower.includes('500')) return RESPONSES.budget
  if (lower.includes('dry skin') || lower.includes('skin')) return RESPONSES['dry skin']
  if (lower.includes('date') || lower.includes('night')) return RESPONSES.date
  if (lower.includes('spa') || lower.includes('relax')) return RESPONSES.spa
  if (lower.includes('hair')) return RESPONSES.hair
  if (lower.includes('makeup') || lower.includes('make up')) return RESPONSES.makeup
  return RESPONSES.default
}

export default function AIChat() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Namaste! 🌸 I'm your GlowNear AI beauty assistant! Ask me anything about salons, makeup recommendations, or beauty tips for Mumbai! मैं हिंदी में भी बात कर सकती हूँ! 💄"
    }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [image, setImage] = useState(null)
  const fileRef = useRef()
  const bottomRef = useRef()

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return
    setImage(URL.createObjectURL(file))
  }

  const sendMessage = async (text) => {
    const userText = text || input.trim()
    if (!userText && !image) return

    const displayMsg = image ? '📸 Analyzing your photo...' : userText
    setMessages(prev => [...prev, { role: 'user', content: displayMsg }])
    setInput('')
    setLoading(true)

    await new Promise(r => setTimeout(r, 1000))

    let reply
    if (image) {
      reply = "You have beautiful features! 😍 Based on your look, I recommend a **Soft Glam** or **Dewy Natural** makeup style. Visit **Aura Beauty Lounge** in Worli or **Luxe Beauty Studio** in Bandra for expert makeovers. A party makeup session starts at ₹1500! 💄✨"
      setImage(null)
    } else {
      reply = getResponse(userText)
    }

    setMessages(prev => [...prev, { role: 'assistant', content: reply }])
    setLoading(false)
    setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 100)
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 bg-pink-500 hover:bg-pink-600 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-2xl z-50 transition"
      >
        <Sparkles size={28} />
      </button>

      {open && (
        <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-white rounded-3xl shadow-2xl z-50 flex flex-col overflow-hidden border border-pink-100">

          <div className="bg-gradient-to-r from-pink-500 to-rose-400 p-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="bg-white rounded-full p-1.5">
                <Sparkles size={18} className="text-pink-500" />
              </div>
              <div>
                <p className="text-white font-bold text-sm">GlowNear AI ✨</p>
                <p className="text-pink-100 text-xs">Beauty Assistant • EN / हिंदी</p>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="text-white hover:text-pink-200 transition">
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-pink-500 text-white rounded-br-sm'
                    : 'bg-white text-gray-700 shadow-sm rounded-bl-sm'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-white rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
                  <div className="flex gap-1 items-center">
                    <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {messages.length <= 1 && (
            <div className="px-3 py-2 flex gap-2 overflow-x-auto bg-white border-t border-gray-100">
              {QUICK_PROMPTS.map((p, i) => (
                <button
                  key={i}
                  onClick={() => sendMessage(p)}
                  className="whitespace-nowrap text-xs bg-pink-50 text-pink-600 px-3 py-1.5 rounded-full border border-pink-200 hover:bg-pink-100 transition"
                >
                  {p}
                </button>
              ))}
            </div>
          )}

          {image && (
            <div className="px-4 py-2 bg-white border-t border-gray-100">
              <div className="relative inline-block">
                <img src={image} alt="upload" className="h-16 w-16 rounded-xl object-cover" />
                <button
                  onClick={() => setImage(null)}
                  className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                >✕</button>
              </div>
            </div>
          )}

          <div className="p-3 bg-white border-t border-gray-100 flex gap-2 items-center">
            <button onClick={() => fileRef.current.click()} className="text-pink-400 hover:text-pink-600 transition p-2 rounded-full hover:bg-pink-50">
              <Upload size={20} />
            </button>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage()}
              placeholder="Ask in English or हिंदी..."
              className="flex-1 text-sm outline-none text-gray-700 placeholder-gray-400"
            />
            <button onClick={() => sendMessage()} disabled={loading} className="bg-pink-500 hover:bg-pink-600 text-white rounded-full p-2 transition disabled:opacity-50">
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
    </>
  )
}