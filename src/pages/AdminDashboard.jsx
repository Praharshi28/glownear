import { useState, useEffect } from 'react'
import { supabase } from '../supabase'
import { useNavigate } from 'react-router-dom'
import { LogOut, Edit3, Check, X, Plus, Trash2 } from 'lucide-react'

const emptyForm = {
  name: '', area: '', rating: 4.5, reviews: 0, price: 500,
  glow_score: 85, tag: 'New', services: '', available: true,
  about: '', phone: '', timing: '9:00 AM – 9:00 PM'
}

export default function AdminDashboard() {
  const navigate = useNavigate()
  const [salons, setSalons] = useState([])
  const [bookings, setBookings] = useState([])
  const [activeTab, setActiveTab] = useState('salons')
  const [editing, setEditing] = useState(null)
  const [editData, setEditData] = useState({})
  const [showAddForm, setShowAddForm] = useState(false)
  const [newSalon, setNewSalon] = useState(emptyForm)
  const [loading, setLoading] = useState(false)

  useEffect(() => { fetchAll() }, [])

  const fetchAll = async () => {
    const { data: s } = await supabase.from('salons').select('*').order('id')
    const { data: b } = await supabase.from('bookings').select('*').order('created_at', { ascending: false })
    setSalons(s || [])
    setBookings(b || [])
  }

  const startEdit = (salon) => {
    setEditing(salon.id)
    setEditData({ ...salon, services: salon.services?.join(', ') })
  }

  const saveEdit = async () => {
    await supabase.from('salons').update({
      name: editData.name,
      area: editData.area,
      phone: editData.phone,
      timing: editData.timing,
      available: editData.available,
      tag: editData.tag,
      about: editData.about,
      price: parseInt(editData.price),
      rating: parseFloat(editData.rating),
      glow_score: parseInt(editData.glow_score),
      services: editData.services?.split(',').map(s => s.trim()),
    }).eq('id', editing)
    setEditing(null)
    fetchAll()
  }

  const addSalon = async () => {
    if (!newSalon.name || !newSalon.area) { alert('Name and area required!'); return }
    setLoading(true)
    const maxId = Math.max(...salons.map(s => s.id), 0)
    await supabase.from('salons').insert({
      ...newSalon,
      id: maxId + 1,
      services: newSalon.services.split(',').map(s => s.trim()),
      rating: parseFloat(newSalon.rating),
      price: parseInt(newSalon.price),
      glow_score: parseInt(newSalon.glow_score),
    })
    setNewSalon(emptyForm)
    setShowAddForm(false)
    setLoading(false)
    fetchAll()
  }

  const deleteSalon = async (id) => {
    if (!confirm('Delete this salon?')) return
    await supabase.from('salons').delete().eq('id', id)
    fetchAll()
  }

  const toggleAvailability = async (salon) => {
    await supabase.from('salons').update({ available: !salon.available }).eq('id', salon.id)
    fetchAll()
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/')
  }

  const totalRevenue = bookings.reduce((a, b) => a + (b.service_price || 0), 0)

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-6 py-5">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">👑 Admin Dashboard</h1>
            <p className="text-purple-100 text-sm">GlowNear Mumbai — Full Control Panel</p>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-full text-sm font-semibold transition">
            <LogOut size={16} /> Logout
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-6xl mx-auto px-4 py-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Salons', value: salons.length, color: 'text-pink-500', bg: 'bg-pink-50' },
          { label: 'Available Now', value: salons.filter(s => s.available).length, color: 'text-green-500', bg: 'bg-green-50' },
          { label: 'Total Bookings', value: bookings.length, color: 'text-purple-500', bg: 'bg-purple-50' },
          { label: 'Total Revenue', value: `₹${totalRevenue.toLocaleString()}`, color: 'text-blue-500', bg: 'bg-blue-50' },
        ].map((stat, i) => (
          <div key={i} className={`${stat.bg} rounded-2xl p-4 text-center`}>
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
            <p className="text-gray-500 text-xs mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="max-w-6xl mx-auto px-4 mb-6">
        <div className="flex gap-2 bg-white rounded-2xl p-1.5 shadow-sm w-fit">
          {['salons', 'bookings'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-xl text-sm font-semibold capitalize transition ${activeTab === tab ? 'bg-pink-500 text-white' : 'text-gray-500 hover:text-pink-500'}`}>
              {tab === 'salons' ? '🏪 Salons' : '📅 Bookings'}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 pb-12">

        {/* Salons Tab */}
        {activeTab === 'salons' && (
          <div>
            {/* Add Salon Button */}
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="flex items-center gap-2 bg-pink-500 hover:bg-pink-600 text-white px-5 py-3 rounded-2xl font-bold mb-6 transition"
            >
              <Plus size={18} /> Add New Salon
            </button>

            {/* Add Salon Form */}
            {showAddForm && (
              <div className="bg-white rounded-2xl shadow-sm p-6 mb-6 border border-pink-100">
                <h3 className="font-bold text-gray-800 text-lg mb-4">➕ Add New Salon</h3>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <input value={newSalon.name} onChange={e => setNewSalon(p => ({ ...p, name: e.target.value }))} placeholder="Salon Name *" className="border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-pink-400" />
                  <input value={newSalon.area} onChange={e => setNewSalon(p => ({ ...p, area: e.target.value }))} placeholder="Area (e.g. Bandra West) *" className="border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-pink-400" />
                  <input value={newSalon.phone} onChange={e => setNewSalon(p => ({ ...p, phone: e.target.value }))} placeholder="Phone Number" className="border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-pink-400" />
                  <input value={newSalon.timing} onChange={e => setNewSalon(p => ({ ...p, timing: e.target.value }))} placeholder="Timing (e.g. 9AM-9PM)" className="border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-pink-400" />
                  <input type="number" value={newSalon.price} onChange={e => setNewSalon(p => ({ ...p, price: e.target.value }))} placeholder="Starting Price (₹)" className="border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-pink-400" />
                  <input type="number" value={newSalon.glow_score} onChange={e => setNewSalon(p => ({ ...p, glow_score: e.target.value }))} placeholder="Glow Score (1-100)" className="border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-pink-400" />
                  <input value={newSalon.services} onChange={e => setNewSalon(p => ({ ...p, services: e.target.value }))} placeholder="Services (comma separated)" className="border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-pink-400" />
                  <select value={newSalon.tag} onChange={e => setNewSalon(p => ({ ...p, tag: e.target.value }))} className="border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-pink-400">
                    {['New', 'Trending', 'Top Rated', 'Popular', 'Premium', 'Budget Pick'].map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <textarea value={newSalon.about} onChange={e => setNewSalon(p => ({ ...p, about: e.target.value }))} placeholder="About the salon..." className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-pink-400 resize-none mb-3" rows={2} />
                <div className="flex gap-3">
                  <button onClick={addSalon} disabled={loading} className="flex items-center gap-2 bg-green-500 text-white px-5 py-2 rounded-xl font-bold hover:bg-green-600 transition disabled:opacity-50">
                    <Check size={16} /> {loading ? 'Adding...' : 'Add Salon'}
                  </button>
                  <button onClick={() => setShowAddForm(false)} className="flex items-center gap-2 bg-gray-100 text-gray-600 px-5 py-2 rounded-xl font-bold hover:bg-gray-200 transition">
                    <X size={16} /> Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Salons List */}
            <div className="space-y-4">
              {salons.map(salon => (
                <div key={salon.id} className="bg-white rounded-2xl shadow-sm p-5 border border-gray-100">
                  {editing === salon.id ? (
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <input value={editData.name} onChange={e => setEditData(p => ({ ...p, name: e.target.value }))} placeholder="Name" className="border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-pink-400" />
                        <input value={editData.area} onChange={e => setEditData(p => ({ ...p, area: e.target.value }))} placeholder="Area" className="border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-pink-400" />
                        <input value={editData.phone} onChange={e => setEditData(p => ({ ...p, phone: e.target.value }))} placeholder="Phone" className="border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-pink-400" />
                        <input value={editData.timing} onChange={e => setEditData(p => ({ ...p, timing: e.target.value }))} placeholder="Timing" className="border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-pink-400" />
                        <input type="number" value={editData.price} onChange={e => setEditData(p => ({ ...p, price: e.target.value }))} placeholder="Price" className="border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-pink-400" />
                        <input type="number" value={editData.glow_score} onChange={e => setEditData(p => ({ ...p, glow_score: e.target.value }))} placeholder="Glow Score" className="border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-pink-400" />
                        <input value={editData.services} onChange={e => setEditData(p => ({ ...p, services: e.target.value }))} placeholder="Services (comma separated)" className="border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-pink-400" />
                        <select value={editData.tag} onChange={e => setEditData(p => ({ ...p, tag: e.target.value }))} className="border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-pink-400">
                          {['Trending', 'Top Rated', 'Popular', 'Premium', 'Budget Pick', 'New'].map(t => <option key={t}>{t}</option>)}
                        </select>
                        <select value={editData.available} onChange={e => setEditData(p => ({ ...p, available: e.target.value === 'true' }))} className="border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-pink-400">
                          <option value="true">🟢 Available</option>
                          <option value="false">🔴 Busy</option>
                        </select>
                      </div>
                      <textarea value={editData.about} onChange={e => setEditData(p => ({ ...p, about: e.target.value }))} className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-pink-400 resize-none" rows={2} />
                      <div className="flex gap-2">
                        <button onClick={saveEdit} className="flex items-center gap-1 bg-green-500 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-green-600 transition">
                          <Check size={16} /> Save Changes
                        </button>
                        <button onClick={() => setEditing(null)} className="flex items-center gap-1 bg-gray-100 text-gray-600 px-4 py-2 rounded-xl text-sm font-semibold hover:bg-gray-200 transition">
                          <X size={16} /> Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-bold text-gray-800 text-lg">{salon.name}</h3>
                          <span className="bg-purple-100 text-purple-700 text-xs px-2 py-0.5 rounded-full">✨ {salon.glow_score}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${salon.available ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-500'}`}>
                            {salon.available ? '🟢 Available' : '🔴 Busy'}
                          </span>
                        </div>
                        <p className="text-gray-500 text-sm">{salon.area} • ₹{salon.price} onwards • {salon.timing}</p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {salon.services?.map(s => (
                            <span key={s} className="bg-pink-50 text-pink-600 text-xs px-2 py-0.5 rounded-full">{s}</span>
                          ))}
                        </div>
                      </div>
                      <div className="flex gap-2 flex-shrink-0">
                        <button onClick={() => toggleAvailability(salon)} className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${salon.available ? 'bg-red-50 text-red-500 hover:bg-red-100' : 'bg-green-50 text-green-600 hover:bg-green-100'}`}>
                          {salon.available ? 'Mark Busy' : 'Mark Available'}
                        </button>
                        <button onClick={() => startEdit(salon)} className="flex items-center gap-1 bg-pink-50 text-pink-500 px-3 py-1.5 rounded-xl text-xs font-semibold hover:bg-pink-100 transition">
                          <Edit3 size={13} /> Edit
                        </button>
                        <button onClick={() => deleteSalon(salon.id)} className="flex items-center gap-1 bg-red-50 text-red-500 px-3 py-1.5 rounded-xl text-xs font-semibold hover:bg-red-100 transition">
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bookings Tab */}
        {activeTab === 'bookings' && (
          <div className="space-y-4">
            {bookings.length === 0 ? (
              <div className="text-center py-20 text-gray-400">
                <div className="text-5xl mb-4">📅</div>
                <p>No bookings yet</p>
              </div>
            ) : bookings.map(booking => (
              <div key={booking.id} className="bg-white rounded-2xl shadow-sm p-5 border border-gray-100">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-gray-800">{booking.customer_name}</h3>
                    <p className="text-gray-500 text-sm">{booking.salon_name} • {booking.service_name}</p>
                    <p className="text-gray-400 text-xs mt-1">{booking.booking_date} at {booking.booking_time}</p>
                    <p className="text-gray-400 text-xs">Payment: {booking.payment_method} • {booking.payment_status}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-pink-500 font-bold text-lg">₹{booking.service_price}</p>
                    <span className="bg-green-100 text-green-600 text-xs px-2 py-0.5 rounded-full">{booking.status}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}