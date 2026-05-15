import React, { forwardRef } from 'react';
import { cn } from '../../lib/utils';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const Button = forwardRef(({ className, variant = 'default', size = 'default', isLoading, children, ...props }, ref) => {
  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      ref={ref}
      disabled={isLoading || props.disabled}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 disabled:pointer-events-none disabled:opacity-50",
        {
          'bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm': variant === 'default',
          'border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-900': variant === 'outline',
          'bg-transparent hover:bg-zinc-100 text-zinc-600': variant === 'ghost',
          'h-11 px-6 py-2': size === 'default',
          'h-9 px-4': size === 'sm',
          'h-12 px-8 text-base': size === 'lg',
        },
        className
      )}
      {...props}
    >
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </motion.button>
  );
});

Button.displayName = "Button";

export { Button };
