import React, { InputHTMLAttributes, forwardRef, useState } from 'react';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  isPassword?: boolean;
  hint?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, leftIcon, isPassword, hint, className, type = 'text', id, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    const resolvedType = isPassword ? (showPassword ? 'text' : 'password') : type;

    return (
      <div className="w-full space-y-1.5 text-left">
        {label && (
          <div className="flex items-center justify-between">
            <label
              htmlFor={inputId}
              className="block text-xs font-semibold uppercase tracking-wider text-purple-200/90"
            >
              {label}
            </label>
            {hint && <span className="text-[11px] text-zinc-400">{hint}</span>}
          </div>
        )}

        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-3.5 flex items-center pointer-events-none text-purple-300/60 transition-colors">
              {leftIcon}
            </div>
          )}

          <input
            id={inputId}
            ref={ref}
            type={resolvedType}
            className={cn(
              'w-full rounded-xl bg-void-900/80 text-sm text-white placeholder:text-zinc-500',
              'border border-purple-500/20 py-3 transition-all duration-200',
              'focus:outline-none focus:border-purple-500 focus:bg-void-850 focus:ring-2 focus:ring-purple-500/20',
              'hover:border-purple-500/40',
              leftIcon ? 'pl-11' : 'pl-4',
              isPassword ? 'pr-11' : 'pr-4',
              error && 'border-rose-500/80 focus:border-rose-500 focus:ring-rose-500/20',
              className
            )}
            {...props}
          />

          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 flex items-center text-zinc-400 hover:text-purple-300 transition-colors focus:outline-none"
              tabIndex={-1}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          )}
        </div>

        {error && (
          <div className="flex items-center gap-1.5 pt-0.5 text-xs text-rose-400 animate-fadeIn">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>{error}</span>
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
