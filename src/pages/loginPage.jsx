import { useState, useEffect } from 'react';
import Logo from "../assets/loginLogo.svg";
import Button from '../components/btn';
import useMessage from '../hooks/useMessage';
import Message from '../components/message';
import { useNavigate } from 'react-router-dom';
import { sendOtp, verifyOtp } from '../services/authService';

function Login() {
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);

  const { message, type, showError, showSuccess, clearMessage } = useMessage();

     const handleLoginSubmit = async (e) => {
    
    e.preventDefault();

    if (!phone || phone.length < 10) {
      showError("Please enter a valid 10-digit phone number.");
      return;
    }

    clearMessage();

    try {
      const res = await sendOtp(phone);  // API Call
      if (res.data.status) {
        setIsOtpSent(true);         // Show OTP input form
        setTimer(30);               // Start resend timer
        setCanResend(false);
        showSuccess(res.data.message);  // Show message from backend
      } else {
        showError(res.data.message || "Something went wrong.");
      }
    } catch (err) {
      console.error(err);
      showError("Failed to send OTP. Please try again.");
    }
  };



  // const handleLoginSubmit = (e) => {
  //   e.preventDefault();

  //   if (!phone || phone.length < 10) {
  //     showError("Please enter a valid 10-digit phone number.");
  //     return;
  //   }

  //   clearMessage();

  //   // ✅ Bypass OTP and go directly to QR scanner
  //   navigate("/scanner");

  // };
  const navigate = useNavigate();
  const handleOtpSubmit = async (e) => {
    e.preventDefault();

    if (otp.length === 0) {
      showError("First enter OTP then submit!");
      return;
    }

    if (otp.length !== 6) {
      showError("Invalid OTP. Please enter a valid 6-digit code.");
      return;
    }

    try {
      const res = await verifyOtp(phone, otp); // API Call

      if (res.data.status) {
        const userData = res.data.data[0];
        console.log(userData)

        localStorage.setItem("userData", JSON.stringify(userData));

        showSuccess(res.data.message || "OTP Verified! 🎉");

        setTimeout(() => navigate("/scanner"), 1000); // 👈 Go to scanner
      } else {
        showError(res.data.message || "Invalid OTP.");
      }
    } catch (err) {
      console.error(err);
      showError("Verification failed. Please try again.");
    }
  };


  useEffect(() => {
    let interval;
    if (isOtpSent && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setCanResend(true);
    }

    return () => clearInterval(interval);
  }, [isOtpSent, timer]);


  return (
    <div className='min-h-screen bg-blue-950 flex justify-center items-center px-4 sm:px-6 lg:px-12'>
      <div className='w-full max-w-3xl bg-white shadow-lg rounded-lg flex flex-col lg:flex-row overflow-hidden p-10'>
        {/* Right Image */}
        <div className='w-full lg:w-1/2 flex items-center justify-center p-6'>
          <img src={Logo} alt="computer" className='w-full max-w-lg sm:max-w-md' />
        </div>

        {/* Left Form */}
        <div className='w-full lg:w-1/2 py-8 px-4 sm:px-8 md:px-10'>
          <h1 className='font-bold text-2xl pb-2 mb-2'>Login</h1>
          <p className='text-gray-500'>Let's login to explore</p>

          {!isOtpSent ? (
            <form onSubmit={handleLoginSubmit} className='pt-8'>
              <div className='mb-4'>
                <label className='block mb-1 text-lg font-medium text-gray-800'>Phone Number</label>
                <div className="flex items-center border rounded-lg focus-within:ring-2 focus-within:ring-blue-400 overflow-hidden">
                  <span className="bg-gray-100 px-3 py-2 text-gray-700 text-sm border-r">+91</span>
                  <input
                    type="tel"
                    placeholder='Enter your number'
                    maxLength={10}
                    value={phone}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, ''); // allow only digits
                      if (val.length <= 10) setPhone(val); // prevent more than 10 digits
                    }}
                    className='w-full px-4 py-2 focus:outline-none placeholder:text-sm'
                  />
                </div>
              </div>


              <Button type="submit" className="bg-green-800 text-white hover:bg-green-900">
                Login
              </Button>

              <Message message={message} type={type} />

              <p className='text-green-800 pt-3 text-sm'>
                By tapping Login, you agree to our Terms and Conditions Policy for refund and cancellation.
              </p>
            </form>
          ) : (
            <form onSubmit={handleOtpSubmit} className='pt-8'>
              <div className='mb-4'>
                <label className='block mb-1 text-lg font-medium text-gray-800'>Enter OTP</label>
                <div className="flex gap-2 ">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <input
                      key={index}
                      type="text"
                      maxLength={1}
                      inputMode="numeric"
                      className="w-10 h-12 text-center border border-gray-300 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-400 text-xl"
                      value={otp[index] || ""}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/, ""); // allow only digits
                        if (!value) return;

                        const newOtp = otp.split("");
                        newOtp[index] = value;
                        const updatedOtp = newOtp.join("");
                        setOtp(updatedOtp);

                        // move focus to next input
                        const next = document.getElementById(`otp-${index + 1}`);
                        if (next) next.focus();
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Backspace") {
                          const newOtp = otp.split("");
                          newOtp[index] = "";
                          setOtp(newOtp.join(""));

                          const prev = document.getElementById(`otp-${index - 1}`);
                          if (prev) prev.focus();
                        }
                      }}
                      id={`otp-${index}`}
                    />
                  ))}
                </div>
              </div>

              <Button type="submit" className="bg-blue-800 text-white hover:bg-blue-900 text-lg px-3 py-2 w-fit">
                Verify OTP
              </Button>

              <Message message={message} type={type} />

              <div className='text-gray-600 pt-3 text-sm block'>
                OTP sent to {phone}{" "}
                {canResend ? (
                  <div className='flex gap-5'>
                    <span
                      className='text-blue-700 cursor-pointer block'
                      onClick={() => {
                        setTimer(5);
                        setCanResend(false);
                        showSuccess("OTP Resent!");
                      }}
                    >
                      Resend OTP
                    </span>

                    <span
                      className='text-green-500 cursor-pointer'
                      onClick={() => {
                        setIsOtpSent(false);    // go back to phone input
                        setOtp('');             // clear OTP input
                        setTimer(30);           // reset timer
                        setCanResend(false);    // reset resend flag
                        clearMessage();         // clear success/error messages
                      }}
                    >
                      Edit Mobile Number
                    </span>
                  </div>
                ) : (
                  <span className='text-blue-900'>Resend in {timer}s</span>
                )}
              </div>

            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
