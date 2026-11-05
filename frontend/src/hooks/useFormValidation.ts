import { useState } from 'react';
import { FormErrors, LoginFormData, SignupFormData } from '../types/auth';

export function useFormValidation() {
  const [errors, setErrors] = useState<FormErrors>({});

  const validateLogin = (data: LoginFormData): boolean => {
    const newErrors: FormErrors = {};

    if (!data.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
      newErrors.email = 'Please provide a valid email format';
    }

    if (!data.password) {
      newErrors.password = 'Password is required';
    } else if (data.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateSignup = (data: SignupFormData): boolean => {
    const newErrors: FormErrors = {};

    if (!data.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (data.fullName.trim().length < 2) {
      newErrors.fullName = 'Name should be at least 2 characters';
    }

    if (!data.username.trim()) {
      newErrors.username = 'Username handle is required';
    } else if (!/^[a-zA-Z0-9_]{3,20}$/.test(data.username.trim())) {
      newErrors.username = 'Handle must be 3-20 characters (letters, numbers, underscores only)';
    }

    if (!data.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
      newErrors.email = 'Please provide a valid email address';
    }

    if (!data.password) {
      newErrors.password = 'Password is required';
    } else if (data.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    }

    if (data.confirmPassword !== data.password) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!data.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the Terms of Service & Privacy Policy';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const clearError = (field: string) => {
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const copy = { ...prev };
      delete copy[field];
      return copy;
    });
  };

  const clearAllErrors = () => {
    setErrors({});
  };

  return {
    errors,
    setErrors,
    validateLogin,
    validateSignup,
    clearError,
    clearAllErrors,
  };
}
