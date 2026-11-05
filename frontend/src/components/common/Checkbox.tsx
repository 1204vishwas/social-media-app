import React, { InputHTMLAttributes, forwardRef } from 'react';
import { Check } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: React.ReactNode;
  error?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, error, checked, onChange, className, id, ...props }, ref) => {
    const inputId = id || (typeof label === 'string' ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="flex flex-col text-left">
        <label htmlFor={inputId} className="inline-flex items-start gap-2.5 cursor-pointer group">
          <div className="relative flex items-center justify-center mt-0.5">
            <input
              id={inputId}
              ref={ref}
              type="checkbox"
              checked={checked}
              onChange={onChange}
              className="sr-only peer"
              {...props}
            />
            <div
              className={cn(
                'w-4 h-4 rounded-md border border-purple-500/30 bg-void-900/90 transition-all duration-200',
                'peer-focus:ring-2 peer-focus:ring-purple-500/30 group-hover:border-purple-400',
                'peer-checked:bg-purple-600 peer-checked:border-purple-500 peer-checked:shadow-[0_0_10px_rgba(168,85,247,0.5)]',
                error && 'border-rose-500/80',
                className
              )}
            >
              <Check
                className={cn(
                  'w-3 h-3 text-white transition-transform duration-150',
                  checked ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
                )}
                strokeWidth={3}
              />
            </div>
          </div>
          {label && (
            <span className="text-xs text-zinc-300 group-hover:text-purple-200 select-none leading-relaxed">
              {label}
            </span>
          )}
        </label>
        {error && <span className="text-[11px] text-rose-400 mt-1 pl-6">{error}</span>}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';
