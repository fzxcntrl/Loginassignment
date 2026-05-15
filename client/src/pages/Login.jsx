import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, ArrowRight, ShieldAlert, Eye, EyeOff, CheckSquare, Square, Pencil } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

export default function Login() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    setError('');
    try {
      const res = await axios.post('/api/auth/login', data);
      localStorage.setItem('token', res.data.token);
      
      setShowSuccess(true);
      triggerConfetti();
      
      setTimeout(() => {
        navigate('/dashboard');
      }, 2500);

    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
      setIsLoading(false);
    }
  };

  const triggerConfetti = () => {
    // Pencil sketch colors: grays, blacks, maybe a dash of yellow/red for emphasis
    const colors = ['#1a1a1a', '#4a4a4a', '#8a8a8a', '#ffcf54', '#ff5a5f'];
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: colors,
      disableForReducedMotion: true
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden text-foreground">
      
      {/* Visible Graph Paper Background */}
      <div className="absolute inset-0 graph-paper pointer-events-none" />
      
      {/* Decorative sketchy drawings */}
      <motion.div 
        initial={{ rotate: -10 }}
        animate={{ rotate: [-10, -5, -10] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[15%] left-[10%] hidden lg:block opacity-50"
      >
        <svg width="120" height="120" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="sketchy-border rounded-full p-4">
           <path d="M20 50 Q 50 10 80 50 T 20 50" />
           <path d="M40 30 L 60 70" />
        </svg>
      </motion.div>

      <AnimatePresence>
        {showSuccess && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.8, rotate: -5 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", bounce: 0.6 }}
              className="flex flex-col items-center gap-6 sketchy-card p-12"
            >
              <Pencil className="w-20 h-20 text-primary" strokeWidth={1.5} />
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight" style={{ fontFamily: "'Architects Daughter', cursive" }}>
                Successfully Logged In!
              </h2>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="w-full max-w-md mx-auto p-4 sm:p-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="sketchy-card p-8 sm:p-10"
        >
          <div className="mb-8 flex flex-col items-center text-center">
            <div className="w-16 h-16 sketchy-border bg-yellow-100 flex items-center justify-center mb-4 transform -rotate-3">
              <span className="text-primary font-bold text-3xl" style={{ fontFamily: "'Architects Daughter', cursive" }}>Hi</span>
            </div>
            <h2 className="text-4xl font-bold tracking-tight mb-2" style={{ fontFamily: "'Architects Daughter', cursive" }}>Welcome back</h2>
            <p className="text-lg text-zinc-600">Jot down your details to sign in.</p>
          </div>

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-red-50 border-2 border-red-500 text-red-600 text-lg p-3 sketchy-border mb-6 flex items-center gap-2 overflow-hidden font-bold"
              >
                <ShieldAlert className="w-5 h-5 shrink-0" strokeWidth={1.5} />
                <span>{error}</span>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="mb-4">
              <Input
                {...register('email')}
                type="email"
                placeholder="Email address"
                icon={Mail}
                error={errors.email}
              />
            </div>
            
            <div className="relative mb-2">
              <Input
                {...register('password')}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                icon={Lock}
                error={errors.password}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-zinc-500 hover:text-primary transition-colors"
                tabIndex="-1"
              >
                {showPassword ? <EyeOff size={20} strokeWidth={1.5} /> : <Eye size={20} strokeWidth={1.5} />}
              </button>
            </div>

            <div className="flex items-center justify-between pt-1 pb-4">
              <label 
                className="flex items-center gap-2 cursor-pointer group"
                onClick={() => setRememberMe(!rememberMe)}
              >
                <div className="text-zinc-600 group-hover:text-primary transition-colors">
                  {rememberMe ? <CheckSquare size={20} strokeWidth={1.5} /> : <Square size={20} strokeWidth={1.5} />}
                </div>
                <span className="text-lg text-zinc-600 group-hover:text-primary transition-colors select-none">Remember me</span>
              </label>
              
              <a href="#" className="text-lg font-bold text-primary hover:underline decoration-wavy underline-offset-4">
                Forgot password?
              </a>
            </div>

            <Button type="submit" className="w-full text-xl h-14" isLoading={isLoading}>
              Sign In
              {!isLoading && <ArrowRight className="ml-2 w-5 h-5" />}
            </Button>
          </form>

          <div className="mt-8 text-center text-lg text-zinc-600">
            Don't have an account?{' '}
            <Link to="/register" className="text-primary font-bold hover:underline decoration-wavy underline-offset-4">
              Sketch one up
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
