import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  
  headers: {
    'Content-Type': 'application/json'
  }
});
console.log(API)

export const sendOtp = (mobile) => {
  return API.post('/api-v3/app/getotp', { mobile });
};

export const verifyOtp = (mobile, otp) => {
  return API.post( '/api-v2/app/verifyotp', { mobile, otp });
};


//  second API...




