// src/hooks/useMessage.js
import { useState } from 'react';

export default function useMessage() {
  const [message, setMessage] = useState('');
  const [type, setType] = useState(''); // 'error' | 'success'

  const showError = (msg) => {
    setMessage(msg);
    setType('error');
  };

  const showSuccess = (msg) => {
    setMessage(msg);
    setType('success');
  };

  const clearMessage = () => {
    setMessage('');
    setType('');
  };

  return { message, type, showError, showSuccess, clearMessage };
}
