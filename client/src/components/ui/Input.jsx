import React, { forwardRef } from 'react';
import { cn } from '../../lib/utils';
import { motion } from 'framer-motion';

const Input = forwardRef(({ className, type, error, icon: Icon, ...props }, ref) => {
  return (
    <div className="relative w-full">
      {Icon && (
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500">
          <Icon size={20} strokeWidth={1.5} />
        </div>
      )}
      <input
        type={type}
        className={cn(
          "flex h-12 w-full sketchy-border-alt bg-transparent px-3 py-2 text-lg text-foreground placeholder:text-zinc-400 focus-visible:outline-none focus-visible:bg-white transition-all duration-300",
          Icon && "pl-11",
          error && "border-red-500 text-red-600",
          className
        )}
        ref={ref}
        {...props}
      />
      {error && (
        <motion.span
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-red-500 mt-1 block absolute -bottom-6 left-1 font-bold"
        >
          {error.message}
        </motion.span>
      )}
    </div>
  );
});

Input.displayName = "Input";

export { Input };
