import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Lock, ArrowRight } from 'lucide-react';
import PeacockLogo from '../components/PeacockLogo';

export default function Register({ onRegister }) {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onRegister(name, email, password);
      setLoading(false);
      navigate('/');
    } catch (err) {
      setLoading(false);
      alert('Registration error: ' + err.message);
    }
  };

  return (
    <div className="pt-32 pb-24 px-6 max-w-md mx-auto">
      <div className="bg-white p-8 md:p-10 rounded-2xl border border-stone-200 shadow-xl space-y-6">
        
        <div className="text-center space-y-2">
          <PeacockLogo className="w-10 h-10 mx-auto" showText={false} />
          <h1 className="font-serif text-3xl text-zinc-900 font-bold uppercase tracking-wider">Create Account</h1>
          <p className="text-xs text-stone-500 font-sans">Join ShopSphere Privé for exclusive couture access.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-[10px] uppercase tracking-widest text-stone-600 font-bold block mb-1">Full Name</label>
            <div className="relative">
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jane Doe"
                className="w-full bg-stone-50 border border-stone-300 rounded-full px-4 py-3 pl-10 text-xs text-zinc-900 focus:outline-none focus:border-[#b89628]"
              />
              <User className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div>
            <label className="text-[10px] uppercase tracking-widest text-stone-600 font-bold block mb-1">Email Address</label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="customer@domain.com"
                className="w-full bg-stone-50 border border-stone-300 rounded-full px-4 py-3 pl-10 text-xs text-zinc-900 focus:outline-none focus:border-[#b89628]"
              />
              <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div>
            <label className="text-[10px] uppercase tracking-widest text-stone-600 font-bold block mb-1">Password</label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-stone-50 border border-stone-300 rounded-full px-4 py-3 pl-10 text-xs text-zinc-900 focus:outline-none focus:border-[#b89628]"
              />
              <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-full bg-zinc-900 hover:bg-[#b89628] text-white hover:text-black font-sans font-bold text-xs tracking-[0.25em] uppercase transition-colors shadow-lg flex items-center justify-center gap-2 mt-4"
          >
            {loading ? 'Creating Account...' : 'Register Account'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center pt-4 border-t border-stone-100 text-xs text-stone-500">
          Already have an account?{' '}
          <Link to="/login" className="text-[#b89628] font-bold hover:underline">
            Sign In Here
          </Link>
        </div>

      </div>
    </div>
  );
}
