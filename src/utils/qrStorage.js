// src/utils/qrStorage.js

let qrValue = null;

// SET: QR data
export const setQRData = (value) => {
  qrValue = value;
  localStorage.setItem('qrData', value);
};

// GET: QR data
export const getQRData = () => {
  if (qrValue) return qrValue;
  const stored = localStorage.getItem('qrData');
  if (stored) {
    qrValue = stored;
    return stored;
  }
  return null;
};
