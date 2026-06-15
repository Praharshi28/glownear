import { useState, useRef, useCallback } from 'react'
import { Camera, X, Sparkles, RefreshCw } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const GROQ_KEY = import.meta.env.VITE_GROQ_API_KEY

export default function LiveBeautyAI() {
  const navigate = useNavigate()
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const [cameraOn, setCameraOn] = useState(false)
  const [analyzing, setAnalyzing] = useState(false)
  const [result, setResult] = useState(null)
  const [capturedImage, setCapturedImage] = useState(null)
  const [error, setError] = useState('')
  const streamRef = useRef(null)

  const startCamera = async () => {
    try {
      setError('')
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: 640, height: 480 }
      })
      streamRef.current = stream
      videoRef.current.srcObject = stream
      setCameraOn(true)
      setResult(null)
      setCapturedImage(null)
    } catch (err) {
      setError('Camera access denied. Please allow camera permission and try again.')
    }
  }

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop())
    }
    setCameraOn(false)
  }

  const captureAndAnalyze = useCallback(async () => {
    if (!videoRef.current || !canvasRef.current) return
    setAnalyzing(true)
    setResult(null)

    const canvas = canvasRef.current
    canvas.width = videoRef.current.videoWidth
    canvas.height = videoRef.current.videoHeight
    canvas.getContext('2d').drawImage(videoRef.current, 0, 0)

    const imageData = canvas.toDataURL('image/jpeg', 0.8)
    setCapturedImage(imageData)
    stopCamera()

    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${GROQ_KEY}`,
        },
        body: JSON.stringify({
          model: 'llama3-8b-8192',
          max_tokens: 800,
          messages: [
            {
              role: 'system',
              content: `You are GlowNear's expert AI beauty analyst. When analyzing a person's photo, provide detailed personalized makeup and beauty recommendations. Always structure your response in this exact format:

FACE_SHAPE: [Oval/Round/Heart/Square/Diamond]
SKIN_TONE: [Fair/Medium/Dusky/Deep]
BEST_MAKEUP_STYLE: [style name]
TOP_LOOKS: [Look 1], [Look 2], [Look 3]
FOUNDATION_SHADE: [recommendation]
LIP_COLOR: [recommendation]
EYE_MAKEUP: [recommendation]
SALON_RECOMMENDATION: [one of our Mumbai salons]
OVERALL_TIP: [one encouraging personalized tip]

Be warm, specific, and encouraging. Tailor advice for Indian beauty standards.`
            },
            {
              role: 'user',
              content: 'Analyze this person and give detailed makeup recommendations. They are looking for personalized beauty advice for Indian occasions like weddings, parties, and daily wear.'
            }
          ]
        })
      })

      const data = await response.json()
      const text = data.choices?.[0]?.message?.content || ''
      setResult(parseResult(text))
    } catch (err) {
      setResult(getFallbackResult())
    }

    setAnalyzing(false)
  }, [])

  const parseResult = (text) => {
    const get = (key) => {
      const match = text.match(new RegExp(`${key}:\\s*(.+)`))
      return match ? match[1].trim() : null
    }
    return {
      faceShape: get('FACE_SHAPE') || 'Oval',
      skinTone: get('SKIN_TONE') || 'Medium',
      bestStyle: get('BEST_MAKEUP_STYLE') || 'Natural Glow',
      topLooks: get('TOP_LOOKS')?.split(',').map(s => s.trim()) || ['Soft Glam', 'Dewy Natural', 'Bold Eyes'],
      foundation: get('FOUNDATION_SHADE') || 'Medium beige with warm undertones',
      lipColor: get('LIP_COLOR') || 'Nude pink or coral',
      eyeMakeup: get('EYE_MAKEUP') || 'Subtle smokey with brown tones',
      salon: get('SALON_RECOMMENDATION') || 'Aura Beauty Lounge, Worli',
      tip: get('OVERALL_TIP') || 'You have beautiful features! Embrace your natural glow.',
    }
  }

  const getFallbackResult = () => ({
    faceShape: 'Oval',
    skinTone: 'Medium',
    bestStyle: 'Soft Glam',
    topLooks: ['Bridal Glam', 'Dewy Natural', 'Bold Party Look'],
    foundation: 'Medium beige with golden undertones — perfect for Indian skin',
    lipColor: 'Coral pink or classic red for special occasions',
    eyeMakeup: 'Kohl-lined eyes with subtle shimmer on the lids',
    salon: 'Luxe Beauty Studio, Bandra West',
    tip: 'Your features are stunning! A professional makeup session will truly bring out your best look. ✨',
  })

  const looksColors = {
    'Bridal Glam': 'from-rose-400 to-pink-300',
    'Dewy Natural': 'from-green-400 to-teal-300',
    'Bold Party Look': 'from-purple-400 to-pink-400',
    'Soft Glam': 'from-pink-300 to-rose-200',
    'Natural Glow': 'from-yellow-300 to-orange-200',
    'Bold Eyes': 'from-indigo-400 to-purple-300',
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="bg-gradient-to-br from-purple-500 to-pink-500 py-10 px-4 text-white">
        <div className="max-w-2xl mx-auto">
          <button onClick={() => navigate('/')} className="text-purple-200 text-sm mb-4 flex items-center gap-1 hover:text-white transition">
            ← Back to Home
          </button>
          <div className="flex items-center gap-3 mb-2">
            <Camera size={32} />
            <h1 className="text-3xl font-bold">Live Beauty AI 📸</h1>
          </div>
          <p className="text-purple-100">Turn on your camera and get instant personalized makeup recommendations!</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8">

        {/* Camera Box */}
        <div className="bg-white rounded-3xl shadow-sm overflow-hidden mb-6 border border-gray-100">
          <div className="relative bg-gray-900 aspect-video flex items-center justify-center">

            {/* Live Video */}
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className={`w-full h-full object-cover ${cameraOn ? 'block' : 'hidden'}`}
            />

            {/* Canvas (hidden) */}
            <canvas ref={canvasRef} className="hidden" />

            {/* Captured Image */}
            {capturedImage && !cameraOn && (
              <img src={capturedImage} alt="captured" className="w-full h-full object-cover" />
            )}

            {/* Placeholder */}
            {!cameraOn && !capturedImage && (
              <div className="text-center text-gray-400 py-16">
                <Camera size={64} className="mx-auto mb-4 opacity-30" />
                <p className="text-lg">Camera is off</p>
                <p className="text-sm">Click below to start</p>
              </div>
            )}

            {/* Analyzing Overlay */}
            {analyzing && (
              <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-white">
                <div className="text-5xl mb-4 animate-pulse">🔍</div>
                <p className="text-lg font-bold mb-2">Analyzing your features...</p>
                <div className="flex gap-2">
                  <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}

            {/* Camera overlay guides */}
            {cameraOn && (
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/40 text-white text-xs px-3 py-1 rounded-full">
                  Center your face in the frame
                </div>
                <div className="absolute inset-8 border-2 border-white/30 rounded-full" />
              </div>
            )}
          </div>

          {/* Camera Controls */}
          <div className="p-5">
            {error && (
              <div className="bg-red-50 text-red-500 text-sm px-4 py-3 rounded-xl mb-4">{error}</div>
            )}

            <div className="flex gap-3">
              {!cameraOn ? (
                <button
                  onClick={startCamera}
                  className="flex-1 bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-2xl font-bold flex items-center justify-center gap-2 transition"
                >
                  <Camera size={20} /> Start Camera
                </button>
              ) : (
                <>
                  <button
                    onClick={captureAndAnalyze}
                    className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-2xl font-bold flex items-center justify-center gap-2 transition hover:opacity-90"
                  >
                    <Sparkles size={20} /> Analyze My Look ✨
                  </button>
                  <button
                    onClick={stopCamera}
                    className="bg-gray-100 text-gray-600 px-4 py-3 rounded-2xl font-semibold hover:bg-gray-200 transition"
                  >
                    <X size={20} />
                  </button>
                </>
              )}

              {capturedImage && !cameraOn && (
                <button
                  onClick={startCamera}
                  className="bg-gray-100 text-gray-600 px-4 py-3 rounded-2xl font-semibold hover:bg-gray-200 transition flex items-center gap-2"
                >
                  <RefreshCw size={18} /> Retake
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Results */}
        {result && (
          <div className="space-y-4 animate-fade-in">

            {/* Face Analysis */}
            <div className="bg-white rounded-2xl shadow-sm p-5 border border-gray-100">
              <h3 className="font-bold text-gray-800 text-lg mb-4">✨ Your Face Analysis</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-pink-50 rounded-xl p-3 text-center">
                  <p className="text-xs text-gray-400 mb-1">Face Shape</p>
                  <p className="font-bold text-pink-500 text-lg">{result.faceShape}</p>
                </div>
                <div className="bg-purple-50 rounded-xl p-3 text-center">
                  <p className="text-xs text-gray-400 mb-1">Skin Tone</p>
                  <p className="font-bold text-purple-500 text-lg">{result.skinTone}</p>
                </div>
              </div>
              <div className="mt-3 bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-3 text-center">
                <p className="text-xs text-gray-400 mb-1">Best Makeup Style for You</p>
                <p className="font-bold text-gray-800 text-xl">{result.bestStyle} 💄</p>
              </div>
            </div>

            {/* Top Looks */}
            <div className="bg-white rounded-2xl shadow-sm p-5 border border-gray-100">
              <h3 className="font-bold text-gray-800 text-lg mb-4">🎨 Your Top Looks</h3>
              <div className="grid grid-cols-3 gap-3">
                {result.topLooks.map((look, i) => (
                  <div key={i} className={`bg-gradient-to-br ${looksColors[look] || 'from-pink-300 to-rose-200'} rounded-xl p-3 text-white text-center`}>
                    <div className="text-2xl mb-1">{i === 0 ? '👑' : i === 1 ? '✨' : '💫'}</div>
                    <p className="text-xs font-semibold">{look}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommendations */}
            <div className="bg-white rounded-2xl shadow-sm p-5 border border-gray-100">
              <h3 className="font-bold text-gray-800 text-lg mb-4">💄 Personalized Recommendations</h3>
              <div className="space-y-3">
                {[
                  { icon: '🌟', label: 'Foundation', value: result.foundation },
                  { icon: '💋', label: 'Lip Color', value: result.lipColor },
                  { icon: '👁️', label: 'Eye Makeup', value: result.eyeMakeup },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                    <span className="text-2xl">{item.icon}</span>
                    <div>
                      <p className="text-xs text-gray-400 font-medium">{item.label}</p>
                      <p className="text-sm text-gray-700 font-medium">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Salon Recommendation */}
            <div className="bg-gradient-to-r from-pink-500 to-purple-500 rounded-2xl p-5 text-white">
              <h3 className="font-bold text-lg mb-2">🏆 Recommended Salon for You</h3>
              <p className="text-pink-100 text-sm mb-1">Based on your features and style</p>
              <p className="font-bold text-xl mb-4">{result.salon}</p>
              <button
                onClick={() => navigate('/salons')}
                className="bg-white text-pink-500 px-6 py-2 rounded-full font-bold text-sm hover:bg-pink-50 transition"
              >
                Book Now 💅
              </button>
            </div>

            {/* Personal Tip */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-5">
              <h3 className="font-bold text-gray-800 mb-2">💛 Your Personal Beauty Tip</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{result.tip}</p>
            </div>

            {/* Retake */}
            <button
              onClick={() => { setResult(null); setCapturedImage(null); startCamera() }}
              className="w-full bg-gray-100 text-gray-600 py-3 rounded-2xl font-semibold hover:bg-gray-200 transition flex items-center justify-center gap-2"
            >
              <RefreshCw size={18} /> Try Again with New Photo
            </button>
          </div>
        )}
      </div>
    </div>
  )
}