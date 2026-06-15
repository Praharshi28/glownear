import { useState } from 'react'
import { supabase } from '../supabase'
import { Sparkles, Eye, EyeOff } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const navigate = useNavigate()
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleAuth = async () => {
    setError('')
    setSuccess('')
    setLoading(true)

    if (!email || !password) {
      setError('Please fill all fields!')
      setLoading(false)
      return
    }

    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) setError(error.message)
      else navigate('/')
    } else {
      if (!name) { setError('Please enter your name!'); setLoading(false); return }
      const { data, error } = await supabase.auth.signUp({ email, password })
      if (error) { setError(error.message); setLoading(false); return }
      if (data.user) {
        await supabase.from('profiles').insert({
          id: data.user.id,
          full_name: name,
          phone: phone,
          role: 'user'
        })
        setSuccess('Account created! Please check your email to verify, then login.')
        setIsLogin(true)
      }
    }
    setLoading(false)
  }

  const handleAdminLogin = async () => {
    setError('')
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({
      email: 'praharshimethuku@glownear.com',
      password: '12345678'
    })
    if (error) setError('Admin login failed: ' + error.message)
    else navigate('/admin')
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-md p-8">

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Sparkles className="text-pink-500" size={28} />
            <span className="text-3xl font-bold text-pink-500">GlowNear</span>
          </div>
          <p className="text-gray-500 text-sm">Mumbai's Beauty Marketplace</p>
        </div>

        {/* Tabs */}
        <div className="flex bg-gray-100 rounded-2xl p-1 mb-6">
          <button
            onClick={() => { setIsLogin(true); setError(''); setSuccess('') }}
            className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition ${isLogin ? 'bg-white shadow text-pink-500' : 'text-gray-500'}`}
          >
            Login
          </button>
          <button
            onClick={() => { setIsLogin(false); setError(''); setSuccess('') }}
            className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition ${!isLogin ? 'bg-white shadow text-pink-500' : 'text-gray-500'}`}
          >
            Sign Up
          </button>
        </div>

        {/* Error/Success */}
        {error && <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-xl mb-4">{error}</div>}
        {success && <div className="bg-green-50 text-green-600 text-sm px-4 py-3 rounded-xl mb-4">{success}</div>}

        {/* Form */}
        <div className="space-y-4">
          {!isLogin && (
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-pink-400 transition"
            />
          )}

          {!isLogin && (
            <input
              type="tel"
              placeholder="Phone Number (optional)"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-pink-400 transition"
            />
          )}

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-pink-400 transition"
          />

          <div className="relative">
            <input
              type={showPass ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleAuth()}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-pink-400 transition pr-12"
            />
            <button
              onClick={() => setShowPass(!showPass)}
              className="absolute right-4 top-3.5 text-gray-400"
            >
              {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <button
            onClick={handleAuth}
            disabled={loading}
            className="w-full bg-pink-500 hover:bg-pink-600 text-white py-3.5 rounded-xl font-bold transition disabled:opacity-50"
          >
            {loading ? 'Please wait...' : isLogin ? 'Login' : 'Create Account'}
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-gray-400 text-xs">OR</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* Admin Login */}
        <button
          onClick={handleAdminLogin}
          className="w-full border-2 border-purple-200 text-purple-600 py-3 rounded-xl font-semibold text-sm hover:bg-purple-50 transition"
        >
          👑 Login as Admin (Demo)
        </button>

        <p className="text-center text-xs text-gray-400 mt-4">
          By continuing you agree to our Terms & Privacy Policy
        </p>
      </div>
    </div>
  )
}