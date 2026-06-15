import { useState } from 'react'
import { Play, Clock, Star, ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const tutorials = [
  {
    id: 1, category: "Bridal", title: "Complete Bridal Makeup Tutorial", duration: "45 min", level: "Pro",
    emoji: "👰", color: "from-rose-400 to-pink-300", rating: 4.9, views: "125K",
    steps: ["Prep & Prime your skin", "Apply full coverage foundation", "Contour & highlight", "Smokey eye with gold shimmer", "Apply false lashes", "Bold red lip", "Setting spray for longevity"],
    products: ["HD Foundation", "Contour Kit", "Gold Eyeshadow Palette", "Lash Glue", "Red Lipstick", "Setting Spray"],
    tip: "Start makeup 3-4 hours before the ceremony for a perfect finish!"
  },
  {
    id: 2, category: "Party", title: "Glam Party Night Look", duration: "25 min", level: "Intermediate",
    emoji: "🎉", color: "from-purple-400 to-pink-400", rating: 4.8, views: "89K",
    steps: ["Light moisturizer base", "Dewy foundation", "Bronze contour", "Smokey eye with liner", "Highlight on cheekbones", "Nude glossy lip"],
    products: ["Dewy Foundation", "Bronzer", "Black Kohl", "Highlighter", "Nude Gloss"],
    tip: "Less is more for party looks — focus on one feature!"
  },
  {
    id: 3, category: "Daily", title: "5-Minute No Makeup Look", duration: "5 min", level: "Beginner",
    emoji: "☀️", color: "from-yellow-400 to-orange-300", rating: 4.7, views: "210K",
    steps: ["Tinted moisturizer", "Concealer under eyes", "Brow gel", "Mascara", "Tinted lip balm"],
    products: ["Tinted Moisturizer", "Concealer", "Brow Gel", "Mascara", "Lip Balm"],
    tip: "Perfect for college and office — looks natural but polished!"
  },
  {
    id: 4, category: "Festival", title: "Diwali Festival Glam Look", duration: "30 min", level: "Intermediate",
    emoji: "🪔", color: "from-yellow-500 to-orange-400", rating: 4.9, views: "156K",
    steps: ["Golden shimmer base", "Full coverage foundation", "Dramatic eye with kajal", "Gold eyeshadow", "Bindi application", "Bold lip in deep red or maroon"],
    products: ["Shimmer Primer", "Full Coverage Foundation", "Kajal", "Gold Palette", "Deep Red Lipstick"],
    tip: "Traditional gold and red tones work best for Indian festivals!"
  },
  {
    id: 5, category: "Wedding Guest", title: "Perfect Wedding Guest Makeup", duration: "20 min", level: "Beginner",
    emoji: "💒", color: "from-pink-400 to-rose-300", rating: 4.6, views: "73K",
    steps: ["SPF moisturizer", "Medium coverage foundation", "Soft blush", "Neutral eyeshadow", "Winged liner", "Pink or peach lip"],
    products: ["SPF Moisturizer", "Foundation", "Blush", "Neutral Palette", "Liner Pen", "Pink Lipstick"],
    tip: "Avoid white — go for pastels or jewel tones as a wedding guest!"
  },
  {
    id: 6, category: "Office", title: "Professional Office Look", duration: "10 min", level: "Beginner",
    emoji: "💼", color: "from-blue-400 to-teal-300", rating: 4.5, views: "94K",
    steps: ["Light BB cream", "Concealer on spots", "Defined brows", "Neutral eyeshadow", "Mascara", "Nude or coral lip"],
    products: ["BB Cream", "Concealer", "Brow Pencil", "Neutral Shadow", "Mascara", "Nude Lipstick"],
    tip: "Keep it minimal and polished — avoid heavy glitter for office!"
  },
  {
    id: 7, category: "Date Night", title: "Romantic Date Night Look", duration: "20 min", level: "Intermediate",
    emoji: "🌹", color: "from-red-400 to-pink-300", rating: 4.8, views: "118K",
    steps: ["Glowing primer", "Dewy foundation", "Soft contour", "Subtle smokey eye", "Highlight inner corners", "Bold red or berry lip"],
    products: ["Glow Primer", "Dewy Foundation", "Contour Stick", "Brown Eyeshadow", "Highlighter", "Berry Lipstick"],
    tip: "Dewy skin and a bold lip is the ultimate date night combo!"
  },
  {
    id: 8, category: "Sangeet", title: "Sangeet Night Glam Look", duration: "35 min", level: "Pro",
    emoji: "💃", color: "from-purple-500 to-pink-400", rating: 4.9, views: "67K",
    steps: ["Full glam base", "Color corrector", "Heavy coverage foundation", "Cut crease eye look", "Bold kajal", "Glitter highlight", "Deep lip color"],
    products: ["Color Corrector", "Heavy Foundation", "Colorful Eyeshadow", "Glitter", "Setting Powder", "Deep Lipstick"],
    tip: "Go all out for Sangeet — this is your night to shine! 💫"
  },
]

const categories = ["All", "Bridal", "Party", "Daily", "Festival", "Wedding Guest", "Office", "Date Night", "Sangeet"]

export default function MakeupTutorials() {
  const navigate = useNavigate()
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedTutorial, setSelectedTutorial] = useState(null)

  const filtered = selectedCategory === 'All' ? tutorials : tutorials.filter(t => t.category === selectedCategory)

  if (selectedTutorial) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className={`bg-gradient-to-br ${selectedTutorial.color} py-10 px-4 text-white`}>
          <div className="max-w-3xl mx-auto">
            <button onClick={() => setSelectedTutorial(null)} className="text-white/80 text-sm mb-4 flex items-center gap-1 hover:text-white">
              ← Back to Tutorials
            </button>
            <div className="text-5xl mb-3">{selectedTutorial.emoji}</div>
            <h1 className="text-2xl font-bold mb-2">{selectedTutorial.title}</h1>
            <div className="flex items-center gap-4 text-sm text-white/80">
              <span className="flex items-center gap-1"><Clock size={14} /> {selectedTutorial.duration}</span>
              <span className="flex items-center gap-1"><Star size={14} /> {selectedTutorial.rating}</span>
              <span>👁️ {selectedTutorial.views} views</span>
              <span className="bg-white/20 px-2 py-0.5 rounded-full">{selectedTutorial.level}</span>
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">

          {/* Video Placeholder */}
          <div className={`bg-gradient-to-br ${selectedTutorial.color} rounded-3xl aspect-video flex flex-col items-center justify-center text-white shadow-lg`}>
            <div className="text-7xl mb-4">{selectedTutorial.emoji}</div>
            <div className="bg-white/20 rounded-full p-4 mb-3 cursor-pointer hover:bg-white/30 transition">
              <Play size={32} className="fill-white text-white" />
            </div>
            <p className="font-semibold">Watch Tutorial</p>
            <p className="text-white/70 text-sm">{selectedTutorial.duration} • {selectedTutorial.level}</p>
          </div>

          {/* Steps */}
          <div className="bg-white rounded-2xl shadow-sm p-5">
            <h3 className="font-bold text-gray-800 text-lg mb-4">📋 Step by Step Guide</h3>
            <div className="space-y-3">
              {selectedTutorial.steps.map((step, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-7 h-7 bg-pink-500 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                    {i + 1}
                  </div>
                  <p className="text-gray-700 text-sm pt-1">{step}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Products */}
          <div className="bg-white rounded-2xl shadow-sm p-5">
            <h3 className="font-bold text-gray-800 text-lg mb-4">🛍️ Products You'll Need</h3>
            <div className="flex flex-wrap gap-2">
              {selectedTutorial.products.map((p, i) => (
                <span key={i} className="bg-pink-50 text-pink-600 text-sm px-3 py-1.5 rounded-full border border-pink-100">
                  {p}
                </span>
              ))}
            </div>
          </div>

          {/* Pro Tip */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-5">
            <h3 className="font-bold text-gray-800 mb-2">💡 Pro Tip</h3>
            <p className="text-gray-600 text-sm">{selectedTutorial.tip}</p>
          </div>

          {/* Book a Salon */}
          <div className={`bg-gradient-to-r ${selectedTutorial.color} rounded-2xl p-5 text-white text-center`}>
            <h3 className="font-bold text-lg mb-2">Want a Professional to Do This? 💄</h3>
            <p className="text-white/80 text-sm mb-4">Book a salon or home service and get this look done professionally!</p>
            <div className="flex gap-3 justify-center">
              <button onClick={() => navigate('/salons')} className="bg-white text-pink-500 px-5 py-2 rounded-full font-bold text-sm hover:bg-pink-50 transition">
                Book Salon
              </button>
              <button onClick={() => navigate('/home-services')} className="bg-white/20 text-white px-5 py-2 rounded-full font-bold text-sm hover:bg-white/30 transition">
                Home Service
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-br from-purple-500 to-pink-500 py-12 px-4 text-white">
        <div className="max-w-4xl mx-auto">
          <button onClick={() => navigate('/')} className="text-purple-200 text-sm mb-4 flex items-center gap-1 hover:text-white">← Back</button>
          <div className="text-5xl mb-3">🎬</div>
          <h1 className="text-3xl font-bold mb-2">Makeup Tutorials</h1>
          <p className="text-purple-100">Step-by-step guides for every occasion</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">

        {/* Category Filter */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
          {categories.map(cat => (
            <button key={cat} onClick={() => setSelectedCategory(cat)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-semibold border transition ${selectedCategory === cat ? 'bg-purple-500 text-white border-purple-500' : 'border-gray-200 text-gray-600 bg-white hover:border-purple-300'}`}>
              {cat}
            </button>
          ))}
        </div>

        {/* Tutorial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filtered.map(tutorial => (
            <div key={tutorial.id} onClick={() => setSelectedTutorial(tutorial)}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition cursor-pointer">
              <div className={`bg-gradient-to-br ${tutorial.color} h-36 flex items-center justify-center relative`}>
                <span className="text-6xl">{tutorial.emoji}</span>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition bg-black/20">
                  <div className="bg-white rounded-full p-3">
                    <Play size={20} className="text-gray-700 fill-gray-700" />
                  </div>
                </div>
                <span className="absolute top-3 right-3 bg-white/20 text-white text-xs px-2 py-1 rounded-full">{tutorial.level}</span>
                <span className="absolute bottom-3 left-3 bg-black/30 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                  <Clock size={10} /> {tutorial.duration}
                </span>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold text-gray-800">{tutorial.title}</h3>
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-400">
                  <span className="flex items-center gap-1"><Star size={11} className="text-yellow-400 fill-yellow-400" /> {tutorial.rating}</span>
                  <span>👁️ {tutorial.views} views</span>
                  <span className="bg-purple-50 text-purple-600 px-2 py-0.5 rounded-full">{tutorial.category}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}