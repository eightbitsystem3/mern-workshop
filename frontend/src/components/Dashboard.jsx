import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

const emptyForm = { name: '', description: '', price: '', quantity: '' };

const Dashboard = () => {
    const [items, setItems] = useState([]);
    const [form, setForm] = useState(emptyForm);
    const [editId, setEditId] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const fetchItems = async () => {
        try {
            const res = await axios.get('/api/items');
            setItems(res.data);
        } catch {
            navigate('/login');
        }
    };

    useEffect(() => { fetchItems(); }, []);

    const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

    const openAdd = () => { setForm(emptyForm); setEditId(null); setShowModal(true); };

    const openEdit = (item) => {
        setForm({ name: item.name, description: item.description || '', price: item.price, quantity: item.quantity });
        setEditId(item._id);
        setShowModal(true);
    };

    const closeModal = () => { setShowModal(false); setForm(emptyForm); setEditId(null); };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (editId) {
                await axios.put(`/api/items/${editId}`, form);
            } else {
                await axios.post('/api/items', form);
            }
            closeModal();
            fetchItems();
        } catch (err) {
            alert(err.response?.data?.message || 'Error');
        }
        setLoading(false);
    };

    const handleDelete = async (id) => {
        if (!confirm('Delete this item?')) return;
        await axios.delete(`/api/items/${id}`);
        fetchItems();
    };

    const handleLogout = async () => {
        await axios.post('/api/user/logout').catch(() => {});
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-slate-100 p-6 font-sans">
            <div className="max-w-5xl mx-auto">

                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-blue-900">📦 Items Dashboard</h1>
                        <p className="text-sm text-slate-500 mt-1">Manage your items</p>
                    </div>
                    <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition duration-200">
                        🚪 Logout
                    </button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="bg-blue-600 text-white rounded-xl p-4 text-center">
                        <div className="text-2xl font-extrabold">{items.length}</div>
                        <div className="text-xs mt-1 opacity-85">Total Items</div>
                    </div>
                    <div className="bg-emerald-500 text-white rounded-xl p-4 text-center">
                        <div className="text-2xl font-extrabold">₹{items.reduce((s, i) => s + Number(i.price || 0), 0)}</div>
                        <div className="text-xs mt-1 opacity-85">Total Value</div>
                    </div>
                    <div className="bg-violet-500 text-white rounded-xl p-4 text-center">
                        <div className="text-2xl font-extrabold">{items.reduce((s, i) => s + Number(i.quantity || 0), 0)}</div>
                        <div className="text-xs mt-1 opacity-85">Total Qty</div>
                    </div>
                </div>

                {/* Table Card */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden">

                    {/* Table Toolbar */}
                    <div className="flex justify-between items-center px-5 py-4 border-b border-slate-200">
                        <h2 className="text-sm font-bold text-slate-800">All Items</h2>
                        <button onClick={openAdd} className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold px-4 py-2 rounded-lg transition duration-200">
                            + Add New Item
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-blue-900 text-white">
                                <tr>
                                    {['#', 'Name', 'Description', 'Price', 'Qty', 'Actions'].map(h => (
                                        <th key={h} className="px-4 py-3 font-semibold">{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {items.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="text-center py-12 text-slate-400 text-sm">
                                            No items yet. Click "Add New Item" to get started ☝️
                                        </td>
                                    </tr>
                                ) : items.map((item, i) => (
                                    <tr key={item._id} className={`border-t border-slate-100 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50'} hover:bg-blue-50 transition`}>
                                        <td className="px-4 py-3 text-slate-500">{i + 1}</td>
                                        <td className="px-4 py-3 font-semibold text-slate-800">{item.name}</td>
                                        <td className="px-4 py-3 text-slate-500">{item.description || '—'}</td>
                                        <td className="px-4 py-3 text-emerald-600 font-semibold">₹{item.price}</td>
                                        <td className="px-4 py-3">
                                            <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full">
                                                {item.quantity}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex gap-2">
                                                <button onClick={() => openEdit(item)} className="bg-amber-400 hover:bg-amber-500 text-white text-xs font-bold px-3 py-1.5 rounded-md transition">
                                                    ✏️ Edit
                                                </button>
                                                <button onClick={() => handleDelete(item._id)} className="bg-red-500 hover:bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-md transition">
                                                    🗑️ Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4" onClick={closeModal}>
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8" onClick={e => e.stopPropagation()}>

                        {/* Modal Header */}
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-lg font-bold text-blue-900">
                                {editId ? '✏️ Edit Item' : '➕ Add New Item'}
                            </h2>
                            <button onClick={closeModal} className="text-slate-400 hover:text-slate-600 text-xl font-bold leading-none bg-transparent border-none cursor-pointer">
                                ✕
                            </button>
                        </div>

                        {/* Modal Form */}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Item Name *</label>
                                <input name="name" value={form.name} onChange={handleChange} required placeholder="e.g. Apple"
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
                                <input name="description" value={form.description} onChange={handleChange} placeholder="Optional"
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Price (₹) *</label>
                                    <input name="price" value={form.price} onChange={handleChange} required type="number" placeholder="0"
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Quantity</label>
                                    <input name="quantity" value={form.quantity} onChange={handleChange} type="number" placeholder="0"
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                </div>
                            </div>
                            <div className="flex gap-3 pt-2">
                                <button type="submit" disabled={loading}
                                    className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-bold rounded-lg text-sm transition duration-200">
                                    {loading ? 'Saving...' : editId ? '💾 Update Item' : '✅ Add Item'}
                                </button>
                                <button type="button" onClick={closeModal}
                                    className="flex-1 py-2.5 bg-slate-400 hover:bg-slate-500 text-white font-bold rounded-lg text-sm transition duration-200">
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
