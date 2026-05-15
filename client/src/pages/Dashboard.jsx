import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { LogOut, Home } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { motion } from 'framer-motion';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const res = await axios.get('/api/auth/me', {
          headers: { 'x-auth-token': token }
        });
        setUser(res.data.user);
      } catch (err) {
        localStorage.removeItem('token');
        navigate('/login');
      }
    };

    fetchUser();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin sketchy-border" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center relative overflow-hidden text-foreground">
      {/* Background paper grid */}
      <div className="absolute inset-0 graph-paper pointer-events-none" />

      {/* Decorative sketchy drawings */}
      <motion.div 
        initial={{ rotate: 10 }}
        animate={{ rotate: [10, 15, 10] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[10%] right-[10%] hidden md:block opacity-50 text-zinc-400"
      >
        <svg width="150" height="150" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
           <rect x="20" y="20" width="60" height="60" className="sketchy-border" />
           <path d="M20 20 L 80 80" />
           <path d="M80 20 L 20 80" />
        </svg>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="sketchy-card p-12 z-10 flex flex-col items-center text-center max-w-md w-full mx-4"
      >
        <div className="w-24 h-24 bg-yellow-100 sketchy-border flex items-center justify-center text-5xl font-bold text-primary mb-6 transform rotate-3">
          {user.name.charAt(0)}
        </div>
        <h1 className="text-5xl font-bold mb-3 tracking-tight" style={{ fontFamily: "'Architects Daughter', cursive" }}>Welcome, {user.name.split(' ')[0]}!</h1>
        <p className="text-xl text-zinc-600 mb-8 leading-relaxed">
          You made it! Feel free to doodle around.
        </p>
        
        <Button onClick={handleLogout} variant="outline" className="w-full text-xl group">
          <LogOut className="w-5 h-5 mr-3 text-zinc-500 group-hover:text-primary transition-colors" strokeWidth={1.5} /> 
          Sign out safely
        </Button>
      </motion.div>
    </div>
  );
}
