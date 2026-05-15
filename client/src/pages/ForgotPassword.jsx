import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, ArrowRight, ShieldAlert, CheckCircle, Pencil } from 'lucide-react';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';

const forgotSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

export default function ForgotPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [resetToken, setResetToken] = useState(''); // For assignment simulation

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(forgotSchema),
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    setError('');
    setSuccess('');
    try {
      const res = await axios.post('/api/auth/forgot-password', data);
      setSuccess(res.data.message);
      if (res.data.resetToken) {
        setResetToken(res.data.resetToken);
      }
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
            <h2 className="text-4xl font-bold tracking-tight mb-2" style={{ fontFamily: "'Architects Daughter', cursive" }}>Forgot Password?</h2>
            <p className="text-lg text-zinc-600">Enter your email and we'll send you a link to reset your password.</p>
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
                className="bg-green-50 border-2 border-green-500 text-green-600 text-lg p-3 sketchy-border mb-6 flex flex-col items-center gap-2 overflow-hidden font-bold"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 shrink-0" strokeWidth={1.5} />
                  <span>{success}</span>
                </div>
                {resetToken && (
                  <div className="mt-4 p-4 border-2 border-dashed border-green-300 rounded-xl bg-white w-full">
                    <p className="text-sm text-zinc-500 mb-2 font-normal">Assignment Simulation Link:</p>
                    <Link 
                      to={`/reset-password/${resetToken}`}
                      className="text-primary hover:underline block break-all text-sm"
                    >
                      /reset-password/{resetToken}
                    </Link>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {!success && (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <Input
                {...register('email')}
                type="email"
                placeholder="Email address"
                icon={Mail}
                error={errors.email}
              />

              <Button type="submit" className="w-full text-xl h-14" isLoading={isLoading}>
                Send Reset Link
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
