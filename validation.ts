import { LoginMethod } from '../components/auth/types';

export function validateIdentifier(identifier: string, method: LoginMethod): string | null {
  if (!identifier) {
    return `Please enter your ${method === 'phone' ? 'phone number' : 'email address'}`;
  }

  if (method === 'phone') {
    // Basic phone validation for Indian numbers
    const phoneRegex = /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/;
    if (!phoneRegex.test(identifier)) {
      return 'Please enter a valid Indian phone number';
    }
  } else {
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(identifier)) {
      return 'Please enter a valid email address';
    }
  }

  return null;
}