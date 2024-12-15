import React from 'react';
import { motion } from 'framer-motion';

interface ErrorMessageProps {
  message: string;
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="mt-2 text-sm text-red-600"
    >
      {message}
    </motion.p>
  );
}