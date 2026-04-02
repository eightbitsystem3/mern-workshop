import { useState, useEffect } from 'react';
import api from '../utils/api';
import { useNavigate } from 'react-router';

const emptyForm = { name: '', description: '', price: '', quantity: '' };

const Dashboard = () => {
    const [items, setItems] = useState([]);
    const [form, setForm] = useState(emptyForm);
    const [editId, setEditId] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // ✅ SAFE FETCH
    const fetchItems = async () => {
        try {
            const res = await api.get('/api/items');

            console.log("API Response:", res.data); // debug

            // ✅ Handle all possible formats
            const data = Array.isArray(res.data)
                ? res.data
                : Array.isArray(res.data?.items)
                ? res.data.items
                : [];

            setItems(data);

        } catch (err) {
            navigate('/login');
        }
    };

    useEffect(() => { fetchItems(); }, []);

    const handleChange = (e) =>
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

    const openAdd = () => {
        setForm(emptyForm);
        setEditId(null);
        setShowModal(true);
    };

    const openEdit = (item) => {
        setForm({
            name: item.name,
            description: item.description || '',
            price: item.price,
            quantity: item.quantity
        });
        setEditId(item._id);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setForm(emptyForm);
        setEditId(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (editId) {
                await api.put(`/api/items/${editId}`, form);
            } else {
                await api.post('/api/items', form);
            }

            closeModal();
            fetchItems();

        } catch (err) {
            alert(err.response?.data?.message || 'Error');
        }

        setLoading(false);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this item?')) return;
        await api.delete(`/api/items/${id}`);
        fetchItems();
    };

    const handleLogout = async () => {
        await api.post('/api/user/logout').catch(() => {});
        navigate('/login');
    };

    // ✅ SAFE ARRAY
    const safeItems = Array.isArray(items) ? items : [];

    // ✅ SAFE CALCULATIONS
    const totalValue = safeItems.reduce((s, i) => s + Number(i.price || 0), 0);
    const totalQty = safeItems.reduce((s, i) => s + Number(i.quantity || 0), 0);

    return (
        <div className="min-h-screen bg-slate-100 p-6 font-sans">
            <div className="max-w-5xl mx-auto">

                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-blue-900">📦 Items Dashboard</h1>
                        <p className="text-sm text-slate-500 mt-1">Manage your items</p>
                    </div>
                    <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-lg">
                        🚪 Logout
                    </button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="bg-blue-600 text-white p-4 text-center rounded-xl">
                        <div className="text-2xl font-bold">{safeItems.length}</div>
                        <div>Total Items</div>
                    </div>
                    <div className="bg-emerald-500 text-white p-4 text-center rounded-xl">
                        <div className="text-2xl font-bold">₹{totalValue}</div>
                        <div>Total Value</div>
                    </div>
                    <div className="bg-violet-500 text-white p-4 text-center rounded-xl">
                        <div className="text-2xl font-bold">{totalQty}</div>
                        <div>Total Qty</div>
                    </div>
                </div>

                {/* Table */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    <div className="flex justify-between p-4 border-b">
                        <h2 className="font-bold">All Items</h2>
                        <button onClick={openAdd} className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                            + Add Item
                        </button>
                    </div>

                    <table className="w-full text-sm">
                        <thead className="bg-blue-900 text-white">
                            <tr>
                                {['#', 'Name', 'Description', 'Price', 'Qty', 'Actions'].map(h => (
                                    <th key={h} className="p-3">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {safeItems.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="text-center p-6">
                                        No items yet
                                    </td>
                                </tr>
                            ) : safeItems.map((item, i) => (
                                <tr key={item._id} className="border-t">
                                    <td className="p-3">{i + 1}</td>
                                    <td className="p-3">{item.name}</td>
                                    <td className="p-3">{item.description || '-'}</td>
                                    <td className="p-3">₹{item.price}</td>
                                    <td className="p-3">{item.quantity}</td>
                                    <td className="p-3 flex gap-2">
                                        <button onClick={() => openEdit(item)}>Edit</button>
                                        <button onClick={() => handleDelete(item._id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex justify-center items-center" onClick={closeModal}>
                    <div className="bg-white p-6 rounded-xl" onClick={e => e.stopPropagation()}>
                        <form onSubmit={handleSubmit} className="space-y-3">
                            <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required />
                            <input name="description" value={form.description} onChange={handleChange} placeholder="Description" />
                            <input name="price" value={form.price} onChange={handleChange} type="number" required />
                            <input name="quantity" value={form.quantity} onChange={handleChange} type="number" />

                            <button type="submit" disabled={loading}>
                                {loading ? 'Saving...' : 'Save'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;