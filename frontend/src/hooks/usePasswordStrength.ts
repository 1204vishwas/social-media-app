import { useMemo } from 'react';
import { PasswordStrength } from '../types/auth';

/**
 * Calculates password strength with real-time criteria checking
 */
export function usePasswordStrength(password: string): PasswordStrength {
  return useMemo(() => {
    const hasMinLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password);

    const criteria = [
      { label: 'At least 8 characters', passed: hasMinLength },
      { label: 'Uppercase & lowercase letters', passed: hasUpperCase && hasLowerCase },
      { label: 'At least one number (0-9)', passed: hasNumber },
      { label: 'Special symbol (!@#$%^&*)', passed: hasSpecialChar },
    ];

    const passedCount = criteria.filter((c) => c.passed).length;

    if (!password) {
      return {
        score: 0,
        label: 'Too Weak',
        color: 'text-zinc-500',
        barColor: 'bg-zinc-700',
        criteria,
      };
    }

    if (passedCount <= 1) {
      return {
        score: 1,
        label: 'Weak',
        color: 'text-rose-400',
        barColor: 'bg-rose-500',
        criteria,
      };
    }

    if (passedCount === 2) {
      return {
        score: 2,
        label: 'Medium',
        color: 'text-amber-400',
        barColor: 'bg-amber-400',
        criteria,
      };
    }

    if (passedCount === 3) {
      return {
        score: 3,
        label: 'Strong',
        color: 'text-purple-400',
        barColor: 'bg-purple-500',
        criteria,
      };
    }

    return {
      score: 4,
      label: 'Ultra Secure',
      color: 'text-emerald-400',
      barColor: 'bg-gradient-to-r from-purple-500 to-cyan-400',
      criteria,
    };
  }, [password]);
}
