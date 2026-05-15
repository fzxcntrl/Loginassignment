import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, ArrowRight, ShieldAlert, Eye, EyeOff } from 'lucide-react';
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
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex w-12 h-12 bg-indigo-600 rounded-xl items-center justify-center text-white font-bold text-2xl shadow-lg shadow-indigo-100 mb-4">
            T
          </div>
          <h1 className="text-3xl font-bold text-zinc-900 tracking-tight">Create Account</h1>
          <p className="text-zinc-500 mt-2">Join TaskFlow to manage your work</p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm">
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-red-50 border border-red-100 text-red-600 text-sm p-4 rounded-xl mb-6 flex items-center gap-3"
              >
                <ShieldAlert size={18} />
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-1">
              <label className="text-sm font-semibold text-zinc-700 ml-1">Full Name</label>
              <Input
                {...register('name')}
                type="text"
                placeholder="John Doe"
                icon={User}
                error={errors.name}
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-semibold text-zinc-700 ml-1">Email Address</label>
              <Input
                {...register('email')}
                type="email"
                placeholder="name@example.com"
                icon={Mail}
                error={errors.email}
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-semibold text-zinc-700 ml-1">Password</label>
              <div className="relative">
                <Input
                  {...register('password')}
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  icon={Lock}
                  error={errors.password}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-semibold text-zinc-700 ml-1">Confirm Password</label>
              <Input
                {...register('confirmPassword')}
                type={showPassword ? "text" : "password"}
                placeholder="Confirm your password"
                icon={Lock}
                error={errors.confirmPassword}
              />
            </div>

            <Button type="submit" className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-lg shadow-indigo-100 mt-4" isLoading={isLoading}>
              Create Account
              {!isLoading && <ArrowRight className="ml-2 w-4 h-4" />}
            </Button>
          </form>

          <div className="mt-8 text-center text-sm text-zinc-500">
            Already have an account?{' '}
            <Link to="/login" className="text-indigo-600 font-bold hover:text-indigo-700">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
