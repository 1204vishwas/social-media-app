import React, { ButtonHTMLAttributes } from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'google';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  disabled,
  ...props
}) => {
  const baseStyles =
    'relative inline-flex items-center justify-center font-medium transition-all duration-200 select-none rounded-xl active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none focus:outline-none';

  const sizeStyles = {
    sm: 'text-xs px-3.5 py-2 gap-1.5',
    md: 'text-sm px-5 py-3 gap-2',
    lg: 'text-base px-6 py-3.5 gap-2.5 font-semibold',
  };

  const variantStyles = {
    primary:
      'bg-gradient-to-r from-purple-600 via-purple-500 to-indigo-600 text-white shadow-lg shadow-purple-900/30 hover:shadow-purple-600/40 hover:brightness-110 border border-purple-400/30',
    secondary:
      'bg-void-800 text-purple-100 hover:bg-void-750 border border-purple-500/20 hover:border-purple-500/40 shadow-sm',
    outline:
      'bg-transparent text-purple-200 border border-purple-500/30 hover:bg-purple-950/30 hover:border-purple-400/60',
    ghost:
      'bg-transparent text-purple-300 hover:text-white hover:bg-purple-900/20',
    google:
      'bg-void-850 hover:bg-void-800 text-slate-100 border border-zinc-700/80 hover:border-purple-500/50 shadow-md hover:shadow-purple-950/50 transition-all',
  };

  return (
    <button
      className={cn(
        baseStyles,
        sizeStyles[size],
        variantStyles[variant],
        fullWidth && 'w-full',
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin text-current" />
      ) : (
        <>
          {leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>}
          <span>{children}</span>
          {rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
        </>
      )}
    </button>
  );
};
