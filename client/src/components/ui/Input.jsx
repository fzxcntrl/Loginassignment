import React, { forwardRef } from 'react';
import { cn } from '../../lib/utils';
import { motion } from 'framer-motion';

const Input = forwardRef(({ className, type, error, icon: Icon, ...props }, ref) => {
  return (
    <div className="relative w-full">
      {Icon && (
        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400">
          <Icon size={18} strokeWidth={2} />
        </div>
      )}
      <input
        type={type}
        className={cn(
          "flex h-11 w-full rounded-xl border border-zinc-200 bg-white px-3.5 py-2 text-sm text-zinc-900 ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary transition-all disabled:cursor-not-allowed disabled:opacity-50",
          Icon && "pl-11",
          error && "border-red-500 focus-visible:ring-red-500/20 focus-visible:border-red-500",
          className
        )}
        ref={ref}
        {...props}
      />
      {error && (
        <motion.span
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[11px] font-medium text-red-500 mt-1 block absolute -bottom-5 left-1"
        >
          {error.message}
        </motion.span>
      )}
    </div>
  );
});

Input.displayName = "Input";

export { Input };
