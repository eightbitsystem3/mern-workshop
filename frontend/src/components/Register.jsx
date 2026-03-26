import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

const Register = () => {
    const [formData, setFormData] = useState({ fullname: '', email: '', mobile: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/user/register', formData);
            alert('Registration successful!');
            navigate('/login');
        } catch (err) {
            alert(err.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200 px-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-10">

                <div className="text-center mb-8">
                    <div className="text-5xl mb-3">👤</div>
                    <h2 className="text-2xl font-bold text-blue-900">Create Account</h2>
                    <p className="text-sm text-slate-500 mt-1">Fill in the details below</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
                        <input
                            type="text" name="fullname" onChange={handleChange} required
                            placeholder="John Doe"
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
                        <input
                            type="email" name="email" onChange={handleChange} required
                            placeholder="you@example.com"
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Mobile</label>
                        <input
                            type="text" name="mobile" onChange={handleChange} required
                            placeholder="9876543210"
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
                        Register →
                    </button>
                </form>

                <p className="text-center text-sm text-slate-500 mt-6">
                    Already have an account?{' '}
                    <span onClick={() => navigate('/login')} className="text-blue-600 font-semibold cursor-pointer hover:underline">
                        Login
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Register;
