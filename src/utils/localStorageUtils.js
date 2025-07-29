// src/utils/localStorageUtils.js

export const setQRData = (data) => {
  localStorage.setItem("qrData", data);
};

export const getQRData = () => {
  return localStorage.getItem("qrData");
};

export const removeQRData = () => {
  localStorage.removeItem("qrData");
};
