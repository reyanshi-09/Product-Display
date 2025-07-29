// src/components/Message.jsx
export default function Message({ message, type }) {
  if (!message) return null;

  const baseClass = 'text-sm mt-2';
  const colorClass = type === 'error' ? 'text-red-600' : 'text-green-600';

  return <p className={`${baseClass} ${colorClass}`}>{message}</p>;
}
