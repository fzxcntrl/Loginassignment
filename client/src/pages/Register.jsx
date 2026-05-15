import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, ArrowRight, ShieldAlert, Eye, EyeOff, PartyPopper } from 'lucide-react';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export default function Register() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    setError('');
    try {
      const res = await axios.post('/api/auth/register', {
        name: data.name,
        email: data.email,
        password: data.password
      });
      localStorage.setItem('token', res.data.token);
      
      setShowSuccess(true);
      
      setTimeout(() => {
        navigate('/dashboard');
      }, 3000);

    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden text-foreground">
      
      {/* Visible Graph Paper Background */}
      <div className="absolute inset-0 graph-paper pointer-events-none" />
      
      {/* Decorative sketchy drawings */}
      <motion.div 
        initial={{ rotate: 15 }}
        animate={{ rotate: [15, 20, 15] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[10%] right-[10%] hidden lg:block opacity-40 text-zinc-400"
      >
        <svg width="100" height="100" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
           <path d="M10 90 L 50 10 L 90 90 Z" className="sketchy-border" />
        </svg>
      </motion.div>

      <AnimatePresence>
        {showSuccess && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/90 backdrop-blur-sm"
          >
            {/* Paper airplanes / sketchy success particles */}
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ 
                  y: '100vh', 
                  x: `${Math.random() * 100}vw`,
                  rotate: Math.random() * 360
                }}
                animate={{ 
                  y: '-10vh',
                  rotate: Math.random() * 360 + 180
                }}
                transition={{ 
                  duration: Math.random() * 3 + 3, 
                  ease: "linear" 
                }}
                className="absolute text-zinc-400"
              >
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="3 11 22 2 13 21 11 13 3 11" />
                </svg>
              </motion.div>
            ))}
            
            <motion.div 
              initial={{ scale: 0.8, opacity: 0, rotate: 3 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ type: "spring", bounce: 0.6, delay: 0.2 }}
              className="flex flex-col items-center gap-6 sketchy-card p-12 z-10"
            >
              <PartyPopper className="w-20 h-20 text-primary" strokeWidth={1.5} />
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-center px-4" style={{ fontFamily: "'Architects Daughter', cursive" }}>
                Welcome to your new notebook!
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
            <div className="w-16 h-16 sketchy-border bg-blue-50 flex items-center justify-center mb-4 transform rotate-2">
              <span className="text-primary font-bold text-3xl" style={{ fontFamily: "'Architects Daughter', cursive" }}>Hi</span>
            </div>
            <h2 className="text-4xl font-bold tracking-tight mb-2" style={{ fontFamily: "'Architects Daughter', cursive" }}>Create an account</h2>
            <p className="text-lg text-zinc-600">Grab a pencil and sign up.</p>
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

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <Input
              {...register('name')}
              type="text"
              placeholder="Full Name"
              icon={User}
              error={errors.name}
            />
            
            <Input
              {...register('email')}
              type="email"
              placeholder="Email address"
              icon={Mail}
              error={errors.email}
            />
            
            <div className="relative">
              <Input
                {...register('password')}
                type={showPassword ? "text" : "password"}
                placeholder="Create password"
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

            <Input
              {...register('confirmPassword')}
              type={showPassword ? "text" : "password"}
              placeholder="Confirm password"
              icon={Lock}
              error={errors.confirmPassword}
            />

            <div className="pt-4">
              <Button type="submit" className="w-full text-xl h-14" isLoading={isLoading}>
                Create Account
                {!isLoading && <ArrowRight className="ml-2 w-5 h-5" />}
              </Button>
            </div>
          </form>

          <div className="mt-8 text-center text-lg text-zinc-600">
            Already have an account?{' '}
            <Link to="/login" className="text-primary font-bold hover:underline decoration-wavy underline-offset-4">
              Sign in
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
