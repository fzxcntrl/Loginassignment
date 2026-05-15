import React, { forwardRef } from 'react';
import { cn } from '../../lib/utils';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const Button = forwardRef(({ className, variant = 'default', size = 'default', isLoading, children, ...props }, ref) => {
  return (
    <motion.button
      whileHover={{ scale: 1.02, rotate: Math.random() * 2 - 1 }}
      whileTap={{ scale: 0.95 }}
      ref={ref}
      disabled={isLoading || props.disabled}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap text-lg font-bold transition-all focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 sketchy-border",
        {
          'bg-primary text-primary-foreground hover:bg-zinc-800 shadow-[3px_3px_0px_rgba(26,26,26,0.3)]': variant === 'default',
          'bg-transparent hover:bg-zinc-100 text-foreground': variant === 'outline',
          'border-transparent bg-transparent hover:bg-zinc-100 text-foreground': variant === 'ghost',
          'h-12 px-6 py-2': size === 'default',
          'h-10 px-4': size === 'sm',
          'h-14 px-8 text-xl': size === 'lg',
        },
        className
      )}
      {...props}
    >
      {isLoading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
      {children}
    </motion.button>
  );
});

Button.displayName = "Button";

export { Button };
