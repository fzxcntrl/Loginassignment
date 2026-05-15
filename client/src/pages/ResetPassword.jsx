import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, ArrowRight, ShieldAlert, CheckCircle, Eye, EyeOff } from 'lucide-react';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';

const resetSchema = z.object({
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(resetSchema),
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    setError('');
    try {
      await axios.post(`/api/auth/reset-password/${token}`, { password: data.password });
      setSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden text-foreground">
      <div className="absolute inset-0 graph-paper pointer-events-none" />
      
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
            <h2 className="text-4xl font-bold tracking-tight mb-2" style={{ fontFamily: "'Architects Daughter', cursive" }}>Reset Password</h2>
            <p className="text-lg text-zinc-600">Enter your new password below.</p>
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
            {success && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-green-50 border-2 border-green-500 text-green-600 text-lg p-3 sketchy-border mb-6 flex items-center gap-2 overflow-hidden font-bold"
              >
                <CheckCircle className="w-5 h-5 shrink-0" strokeWidth={1.5} />
                <span>Password reset successful! Redirecting to login...</span>
              </motion.div>
            )}
          </AnimatePresence>

          {!success && (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="relative">
                <Input
                  {...register('password')}
                  type={showPassword ? "text" : "password"}
                  placeholder="New password"
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
                placeholder="Confirm new password"
                icon={Lock}
                error={errors.confirmPassword}
              />

              <Button type="submit" className="w-full text-xl h-14" isLoading={isLoading}>
                Reset Password
                {!isLoading && <ArrowRight className="ml-2 w-5 h-5" />}
              </Button>
            </form>
          )}

          <div className="mt-8 text-center text-lg text-zinc-600">
            Back to{' '}
            <Link to="/login" className="text-primary font-bold hover:underline decoration-wavy underline-offset-4">
              Sign In
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
