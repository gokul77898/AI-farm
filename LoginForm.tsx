import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, ArrowRight, Loader } from 'lucide-react';
import { LoginMethod } from './types';
import MethodToggle from './MethodToggle';
import OTPVerification from './OTPVerification';
import { validateIdentifier } from '../../utils/validation';

interface LoginFormProps {
  loginMethod: LoginMethod;
  onMethodChange: (method: LoginMethod) => void;
  onLogin: (identifier: string, method: LoginMethod) => Promise<boolean>;
  isLoading: boolean;
}

export default function LoginForm({ loginMethod, onMethodChange, onLogin, isLoading }: LoginFormProps) {
  const [identifier, setIdentifier] = useState('');
  const [error, setError] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  const handleIdentifierChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIdentifier(e.target.value);
    setError('');
  };

  const handleSubmit = async () => {
    const validationError = validateIdentifier(identifier, loginMethod);
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const success = await onLogin(identifier, loginMethod);
      if (success) {
        setOtpSent(true);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  return (
    <div className="space-y-6">
      <AnimatePresence mode="wait">
        {!otpSent ? (
          <motion.div
            key="login-form"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            <MethodToggle method={loginMethod} onChange={onMethodChange} />

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {loginMethod === 'phone' ? 'Phone Number' : 'Email Address'}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  {loginMethod === 'phone' ? (
                    <Phone className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Mail className="h-5 w-5 text-gray-400" />
                  )}
                </div>
                <input
                  type={loginMethod === 'phone' ? 'tel' : 'email'}
                  placeholder={loginMethod === 'phone' ? '+91 1234567890' : 'you@example.com'}
                  value={identifier}
                  onChange={handleIdentifierChange}
                  onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                  className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                    error ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
              </div>
              {error && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-2 text-sm text-red-600"
                >
                  {error}
                </motion.p>
              )}

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={handleSubmit}
                disabled={isLoading}
                className="mt-4 w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <Loader className="h-5 w-5 animate-spin" />
                ) : (
                  <>
                    Get OTP
                    <ArrowRight className="h-5 w-5" />
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="otp-form"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <OTPVerification
              identifier={identifier}
              onBack={() => setOtpSent(false)}
              onVerified={(otp) => onLogin(identifier, loginMethod)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}