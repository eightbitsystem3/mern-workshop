import { useState } from 'react';
import api from '../utils/api';
import { useNavigate } from 'react-router';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('/api/user/login', formData);
            alert(res.data.message);
            navigate('/dashboard');
        } catch (err) {
            alert(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200 px-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-10">

                <div className="text-center mb-8">
                    <div className="text-5xl mb-3">🔐</div>
                    <h2 className="text-2xl font-bold text-blue-900">Welcome Back</h2>
                    <p className="text-sm text-slate-500 mt-1">Login to your account</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
                        <input
                            type="email" name="email" onChange={handleChange} required
                            placeholder="you@example.com"
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
                        <input
                            type="password" name="password" onChange={handleChange} required
                            placeholder="••••••••"
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-sm transition duration-200"
                    >
                        Login →
                    </button>
                </form>

                <p className="text-center text-sm text-slate-500 mt-6">
                    Don't have an account?{' '}
                    <span onClick={() => navigate('/register')} className="text-blue-600 font-semibold cursor-pointer hover:underline">
                        Register
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Login;
