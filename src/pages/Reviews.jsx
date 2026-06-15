import { useState } from 'react'
import { Star, ThumbsUp, ThumbsDown, CheckCircle } from 'lucide-react'

const initialReviews = [
  { id: 1, name: "Priya S.", salon: "Luxe Beauty Studio", rating: 5, text: "Absolutely stunning bridal makeup! Everyone at my wedding loved it. The team was so professional.", date: "2 days ago", verified: true, helpful: 24, occasion: "Wedding" },
  { id: 2, name: "Ananya M.", salon: "Aura Beauty Lounge", rating: 5, text: "Best salon in Mumbai! The staff is so professional and welcoming. My skin has never looked better.", date: "1 week ago", verified: true, helpful: 18, occasion: "Party" },
  { id: 3, name: "Ritu K.", salon: "The Glow Lab", rating: 4, text: "Great keratin treatment, my hair feels so smooth. Prices are reasonable too. Will visit again!", date: "2 weeks ago", verified: false, helpful: 12, occasion: "Regular" },
  { id: 4, name: "Sneha P.", salon: "Serenity Spa & Salon", rating: 5, text: "The spa treatment was heavenly! Felt so relaxed after. Booking was easy and staff was lovely.", date: "3 weeks ago", verified: true, helpful: 31, occasion: "Spa Day" },
  { id: 5, name: "Meera T.", salon: "Pink Petal Parlour", rating: 4, text: "Really happy with my nail art. The designs were exactly what I wanted. Will come back soon!", date: "1 month ago", verified: true, helpful: 9, occasion: "Regular" },
]

export default function Reviews() {
  const [reviews, setReviews] = useState(initialReviews)
  const [showForm, setShowForm] = useState(false)
  const [newReview, setNewReview] = useState({ name: '', salon: '', rating: 5, text: '', occasion: '' })
  const [submitted, setSubmitted] = useState(false)
  const [helpful, setHelpful] = useState({})

  const salons = ["Luxe Beauty Studio", "Aura Beauty Lounge", "The Glow Lab", "Serenity Spa & Salon", "Pink Petal Parlour", "Bliss Salon", "Studio Nine", "Glamour Garden", "The Beauty Barn"]
  const occasions = ["Wedding", "Party", "Date Night", "Festival", "Regular", "Spa Day"]

  const handleSubmit = () => {
    if (!newReview.name || !newReview.salon || !newReview.text) {
      alert('Please fill all fields!')
      return
    }
    const review = {
      id: reviews.length + 1,
      ...newReview,
      date: 'Just now',
      verified: false,
      helpful: 0,
    }
    setReviews(prev => [review, ...prev])
    setSubmitted(true)
    setShowForm(false)
    setNewReview({ name: '', salon: '', rating: 5, text: '', occasion: '' })
  }

  const toggleHelpful = (id) => {
    setHelpful(prev => ({ ...prev, [id]: !prev[id] }))
    setReviews(prev => prev.map(r =>
      r.id === id ? { ...r, helpful: helpful[id] ? r.helpful - 1 : r.helpful + 1 } : r
    ))
  }

  const avgRating = (reviews.reduce((a, b) => a + b.rating, 0) / reviews.length).toFixed(1)

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="bg-gradient-to-r from-pink-500 to-rose-400 py-10 px-4 text-white text-center">
        <h1 className="text-3xl font-bold mb-2">Customer Reviews ⭐</h1>
        <p className="text-pink-100 mb-4">Real experiences from real customers</p>
        <div className="flex justify-center items-center gap-3">
          <span className="text-5xl font-bold">{avgRating}</span>
          <div>
            <div className="flex gap-1">
              {[1,2,3,4,5].map(s => (
                <Star key={s} size={20} className={s <= Math.round(avgRating) ? 'fill-yellow-300 text-yellow-300' : 'text-white/40'} />
              ))}
            </div>
            <p className="text-pink-100 text-sm">{reviews.length} reviews</p>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8">

        {/* Success message */}
        {submitted && (
          <div className="bg-green-50 border border-green-200 rounded-2xl p-4 mb-6 flex items-center gap-3">
            <CheckCircle className="text-green-500" size={20} />
            <p className="text-green-700 font-medium">Your review has been submitted! Thank you 🙏</p>
          </div>
        )}

        {/* Write Review Button */}
        <button
          onClick={() => setShowForm(!showForm)}
          className="w-full bg-pink-500 hover:bg-pink-600 text-white py-4 rounded-2xl font-bold text-lg mb-6 transition shadow-md"
        >
          ✍️ Write a Review
        </button>

        {/* Review Form */}
        {showForm && (
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-6 border border-pink-100">
            <h3 className="font-bold text-gray-800 text-lg mb-4">Share Your Experience</h3>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                value={newReview.name}
                onChange={e => setNewReview(p => ({ ...p, name: e.target.value }))}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-pink-400 text-sm"
              />

              <select
                value={newReview.salon}
                onChange={e => setNewReview(p => ({ ...p, salon: e.target.value }))}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-pink-400 text-sm text-gray-700"
              >
                <option value="">Select Salon</option>
                {salons.map(s => <option key={s}>{s}</option>)}
              </select>

              <select
                value={newReview.occasion}
                onChange={e => setNewReview(p => ({ ...p, occasion: e.target.value }))}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-pink-400 text-sm text-gray-700"
              >
                <option value="">Select Occasion (optional)</option>
                {occasions.map(o => <option key={o}>{o}</option>)}
              </select>

              {/* Star Rating */}
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Your Rating</p>
                <div className="flex gap-2">
                  {[1,2,3,4,5].map(s => (
                    <button key={s} onClick={() => setNewReview(p => ({ ...p, rating: s }))}>
                      <Star size={28} className={s <= newReview.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'} />
                    </button>
                  ))}
                </div>
              </div>

              <textarea
                placeholder="Share your experience..."
                value={newReview.text}
                onChange={e => setNewReview(p => ({ ...p, text: e.target.value }))}
                rows={4}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-pink-400 text-sm resize-none"
              />

              <button
                onClick={handleSubmit}
                className="w-full bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-xl font-bold transition"
              >
                Submit Review ✅
              </button>
            </div>
          </div>
        )}

        {/* Reviews List */}
        <div className="space-y-4">
          {reviews.map(review => (
            <div key={review.id} className="bg-white rounded-2xl shadow-sm p-5 border border-gray-100">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-9 h-9 bg-pink-100 rounded-full flex items-center justify-center text-pink-500 font-bold text-sm">
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-800 text-sm">{review.name}</span>
                        {review.verified && (
                          <span className="bg-green-100 text-green-600 text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
                            <CheckCircle size={10} /> Verified
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-400">{review.salon} • {review.date}</p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-0.5">
                  {[1,2,3,4,5].map(s => (
                    <Star key={s} size={13} className={s <= review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'} />
                  ))}
                </div>
              </div>

              {review.occasion && (
                <span className="inline-block bg-pink-50 text-pink-600 text-xs px-2 py-1 rounded-full mb-2">
                  {review.occasion}
                </span>
              )}

              <p className="text-gray-600 text-sm leading-relaxed mb-3">{review.text}</p>

              <div className="flex items-center gap-4 pt-2 border-t border-gray-100">
                <span className="text-xs text-gray-400">Helpful?</span>
                <button
                  onClick={() => toggleHelpful(review.id)}
                  className={`flex items-center gap-1 text-xs px-3 py-1 rounded-full border transition ${helpful[review.id] ? 'bg-pink-50 border-pink-300 text-pink-600' : 'border-gray-200 text-gray-500 hover:border-pink-300'}`}
                >
                  <ThumbsUp size={12} /> {review.helpful}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}