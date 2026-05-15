import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, ArrowRight, ShieldAlert, CheckCircle } from 'lucide-react';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';

const forgotSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

export default function ForgotPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [resetToken, setResetToken] = useState('');

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
    <div className="min-h-screen bg-zinc-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-zinc-900 tracking-tight">Forgot Password</h1>
          <p className="text-zinc-500 mt-2">No worries, we'll send you reset instructions</p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm">
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 border border-red-100 text-red-600 text-sm p-4 rounded-xl mb-6 flex items-center gap-3"
              >
                <ShieldAlert size={18} />
                {error}
              </motion.div>
            )}
            {success && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-green-50 border border-green-100 text-green-600 text-sm p-5 rounded-2xl mb-6 space-y-4"
              >
                <div className="flex items-center gap-3 font-bold">
                  <CheckCircle size={20} />
                  {success}
                </div>
                {resetToken && (
                  <div className="p-3 bg-white border border-green-200 rounded-xl">
                    <p className="text-[10px] text-zinc-400 uppercase font-bold mb-1">Dev Simulation Link:</p>
                    <Link to={`/reset-password/${resetToken}`} className="text-indigo-600 hover:underline break-all text-xs">
                      /reset-password/{resetToken}
                    </Link>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {!success && (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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

              <Button type="submit" className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-lg shadow-indigo-100 mt-2" isLoading={isLoading}>
                Send Reset Link
                {!isLoading && <ArrowRight className="ml-2 w-4 h-4" />}
              </Button>
            </form>
          )}

          <div className="mt-8 text-center text-sm text-zinc-500">
            Back to{' '}
            <Link to="/login" className="text-indigo-600 font-bold hover:text-indigo-700">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
