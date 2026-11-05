import React from 'react';
import { Check, X } from 'lucide-react';
import { PasswordStrength } from '../../types/auth';
import { cn } from '../../utils/cn';

interface PasswordStrengthMeterProps {
  strength: PasswordStrength;
  showCriteria?: boolean;
}

export const PasswordStrengthMeter: React.FC<PasswordStrengthMeterProps> = ({
  strength,
  showCriteria = true,
}) => {
  return (
    <div className="space-y-2.5 pt-1 text-left">
      {/* Progress Bars */}
      <div className="flex items-center gap-1.5">
        {[1, 2, 3, 4].map((step) => {
          const isActive = strength.score >= step;
          return (
            <div
              key={step}
              className={cn(
                'h-1.5 flex-1 rounded-full transition-all duration-300',
                isActive ? strength.barColor : 'bg-void-700/60'
              )}
            />
          );
        })}
      </div>

      <div className="flex items-center justify-between text-xs">
        <span className="text-zinc-400">Security Level:</span>
        <span className={cn('font-semibold uppercase tracking-wider text-[11px]', strength.color)}>
          {strength.label}
        </span>
      </div>

      {/* Criteria Checklist */}
      {showCriteria && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1">
          {strength.criteria.map((item, index) => (
            <div
              key={index}
              className={cn(
                'flex items-center gap-1.5 text-[11px] transition-colors',
                item.passed ? 'text-purple-300' : 'text-zinc-400'
              )}
            >
              <div
                className={cn(
                  'w-3.5 h-3.5 rounded-full flex items-center justify-center shrink-0 border transition-all',
                  item.passed
                    ? 'border-purple-400 bg-purple-500/20 text-purple-300'
                    : 'border-zinc-700 bg-void-900 text-zinc-600'
                )}
              >
                {item.passed ? (
                  <Check className="w-2.5 h-2.5" strokeWidth={3} />
                ) : (
                  <X className="w-2.5 h-2.5" />
                )}
              </div>
              <span className="truncate">{item.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
