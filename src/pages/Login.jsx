import { useEffect, useState } from "react";
// import logo from "../../assets/v2/icons/logo2.png";  // ❌ removed logo
// import axios from "../../axiosInstance/axiosApi.js";
import { useNavigate } from "react-router-dom";
// import useAuth from "../../hooks/useAuth.js";
import { FaUser, FaPhone } from "react-icons/fa";
// import loginImg from "../../assets/loginpage.png";
import toast from "react-hot-toast";
import { MultiplicationSignIcon, SecurityCheckIcon } from "hugeicons-react";
// import { BASE_URL } from "../../constants/index.js";
// import useDebounce from "../../hooks/useDebounce.js";

const Login = () => {
  //   const { setAuth } = useAuth();
  const [firstName, setFirstName] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const navigate = useNavigate();
  const [phoneDisabled, setPhoneDisabled] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(0);
  const [showPhoneOtpLoader, setShowPhoneOtpLoader] = useState(false);
  const [showPhoneOtp, setShowPhoneOtp] = useState(false);
  const [phoneTimer, setPhoneTimer] = useState(0);
  const [otpPhoneNumber, setOtpPhoneNumber] = useState(["", "", "", ""]);
  const [signUpForm, setSignUpForm] = useState(true);
  const [otpVerified, setOtpVerified] = useState(false);

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [emailDisabled, setEmailDisabled] = useState(false);
  const [emailVerified, setEmailVerified] = useState(0); // 0 = pending, 1 = success, 2 = failed
  const [showEmailOtpLoader, setShowEmailOtpLoader] = useState(false);
  const [showEmailOtp, setShowEmailOtp] = useState(false);
  const [emailTimer, setEmailTimer] = useState(0);
  const [otpEmailNumber, setOtpEmailNumber] = useState(["", "", "", ""]);

  useEffect(() => {
    if (phoneVerified === 1 || otpVerified) {
      setPhoneVerified(0);
      setOtpVerified(false);
      setOtpPhoneNumber(["", "", "", ""]);
      setShowPhoneOtp(false);
      setPhoneDisabled(false);
      setPhoneTimer(0);
      setPhoneError("");
    }
  }, [phone]);

  const handleSubmit = async (e) => {
    toast.dismiss();
    e.preventDefault();
    if (!otpVerified) {
      toast.error("Verify Your Number to Continue");
      return;
    }

    const reqBody = {
      firstName,
      phone,
    };
    console.log("Submitting form:", reqBody);

    // 🔒 Backend commented out
    /*
    try {
      const { data } = await axios.post(
        `${BASE_URL}/customer/addCustomer`,
        reqBody
      );
      toast.success(data?.message);
      const { token, refferalCode } = data;
      const id = data?.user?._id;
      const custId = data?.customer?._id;
      const role = data?.user?.role;
      localStorage.setItem("role", role);
      localStorage.setItem("token", token);
      localStorage.setItem("beebuyUserId", id);
      localStorage.setItem("beebuyCustID", custId);
      localStorage.setItem("refferalCode", refferalCode);
      document.cookie = `token=${token}`;
      setAuth(data);
      navigate("/");
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.response?.data?.msg);
    }
    */
  };

  const handleTriggerPhoneDebounce = async () => {
    toast.dismiss();
    if (signUpForm) {
      if (!validatePhoneNumber(phone)) {
        setPhoneError("Please enter a valid 10-digit phone number.");
      } else {
        setPhoneError("");
        setOtpPhoneNumber(["", "", "", ""]);
        console.log("Trigger OTP for signup:", phone);

        // 🔒 Backend commented out
        /*
        try {
          setShowPhoneOtpLoader(true);
          const reqBody = { phone };
          const res = await axios.post(`${BASE_URL}/contact/v3/triggerOtp`, reqBody);
          setShowPhoneOtp(true);
          setPhoneDisabled(true);
          toast.success(`${res.data.message}`);
        } catch (error) {
          setShowPhoneOtp(false);
        } finally {
          setShowPhoneOtpLoader(false);
        }
        */
        setShowPhoneOtp(true); // ✅ Mock behavior
      }
    } else {
      if (!validatePhoneNumber(phone)) {
        setPhoneError("Please enter a valid 10-digit phone number.");
      } else {
        setPhoneError("");
        console.log("Trigger OTP for login:", phone);

        // 🔒 Backend commented out
        /*
        try {
          setShowPhoneOtpLoader(true);
          const reqBody = { phone };
          const res = await axios.post(`${BASE_URL}/auth/triggerPhoneOtp`, reqBody);
          setShowPhoneOtp(true);
          setPhoneDisabled(true);
          setOtpPhoneNumber(["", "", "", ""]);
          toast.success(res.data.message);
        } catch (error) {
          setShowPhoneOtp(false);
          toast.error(error?.response?.data?.message);
          if (error?.response?.data?.message?.includes("not exist")) {
            setSignUpForm(true);
          }
        } finally {
          setShowPhoneOtpLoader(false);
        }
        */
        setShowPhoneOtp(true); // ✅ Mock behavior
      }
    }
  };

  const validatePhoneNumber = (number) => {
    const expr = /^(0|91)?[6-9][0-9]{9}$/;
    return expr.test(number);
  };

  //   const handleTriggerPhone = useDebounce(() => {
  //     handleTriggerPhoneDebounce();
  //   }, 1000);

  const verifyPhoneOtp = async (reqBody) => {
    console.log("Verifying OTP:", reqBody);

    // 🔒 Backend commented out
    /*
    if (signUpForm) {
      try {
        const res = await axios.post(`${BASE_URL}/contact/v3/verifyOtp`, reqBody);
        setOtpVerified(true);
        setPhoneVerified(1);
      } catch (error) {
        setPhoneVerified(2);
      }
    } else {
      try {
        const res = await axios.post(`${BASE_URL}/auth/v2/verifyPhoneOtp`, reqBody);
        setOtpVerified(true);
        setPhoneVerified(1);
        navigate("/");
      } catch (error) {
        setPhoneVerified(2);
      }
    }
    */
    setOtpVerified(true); // ✅ Mock success
    setPhoneVerified(1);
  };

  const handleChangePhoneNumber = (e, index) => {
    handleChangePhone(e, index, otpPhoneNumber, setOtpPhoneNumber, "otpPhone");
  };

  const handleChangePhone = (e, index, otpArray, setOtpArray, idPrefix) => {
    const value = e.target.value;
    const newOtp = [...otpArray];

    if (value.length <= 1) {
      newOtp[index] = value;
      setOtpArray(newOtp);
      if (value && index < otpArray.length - 1) {
        const nextInput = document.getElementById(`${idPrefix}-${index + 1}`);
        if (nextInput) nextInput.focus();
      }
      if (index === otpArray.length - 1 && value !== "") {
        const otp = newOtp.join("");
        verifyPhoneOtp({ phone, otp: Number(otp) });
      }
    }
  };

  const handleKeyDownPhoneNumber = (
    e,
    index,
    otpArray,
    setOtpArray,
    idPrefix
  ) => {
    if (e.key === "Backspace") {
      const newOtp = [...otpArray];
      if (otpArray[index] === "") {
        if (index > 0) {
          newOtp[index - 1] = "";
          setOtpArray(newOtp);
          const prevInput = document.getElementById(`${idPrefix}-${index - 1}`);
          if (prevInput) prevInput.focus();
        }
      } else {
        newOtp[index] = "";
        setOtpArray(newOtp);
      }
      e.preventDefault();
    }
  };

  return (
   <div className="flex w-full justify-center items-center bg-[#F0F2F4] min-h-screen p-4 md:p-10">
  <div className="flex w-full max-w-4xl bg-white shadow-xl rounded-2xl overflow-hidden">
    
    {/* Left Side Image (only on desktop) */}
    <div className="hidden md:flex w-1/2 bg-gradient-to-br from-pink-100 via-white to-purple-100 justify-center items-center">
      <img
        // src={loginImg}
        alt="Login Illustration"
        className="w-3/4 max-h-[400px] object-contain"
      />
    </div>

    {/* Form Section */}
    <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-12">
      <div className="w-full max-w-sm">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
          {signUpForm ? "Create Your Account" : "Welcome Back"}
        </h2>

        <form
          className="space-y-5"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(e);
          }}
          autoComplete="off"
        >
          {/* Email with OTP */}
          <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center text-gray-600">
              <FaUser className="w-5 h-5 text-amber-500" />
            </div>
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              // onChange={handleEmailChange}
              required
              autoComplete="off"
              className="border border-gray-300 rounded-lg w-full py-3 pl-10 pr-24 focus:outline-none focus:border-amber-500 transition"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              {emailVerified === 0 ? (
                <button
                  type="button"
                  // onClick={handleTriggerEmail}
                  disabled={emailDisabled}
                  className="text-amber-500 font-medium px-3 py-1 rounded-md text-sm hover:bg-pink-50"
                >
                  {signUpForm ? "Verify" : "Get OTP"}
                </button>
              ) : emailVerified === 1 ? (
                <SecurityCheckIcon className="text-green-500" />
              ) : emailVerified === 2 ? (
                <MultiplicationSignIcon className="text-red-500" />
              ) : null}
            </div>
          </div>
          {emailError && <p className="text-red-500 text-xs mt-1">{emailError}</p>}

          {/* Phone OTP if required */}
          {showPhoneOtp && (
            <div className="mt-4">
              <p className="text-gray-700 text-sm mb-2">Enter Phone OTP</p>
              <div className="flex justify-center gap-2">
                {otpPhoneNumber.map((data, index) => (
                  <input
                    key={index}
                    type="tel"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={data}
                    onChange={(e) => handleChangePhoneNumber(e, index)}
                    onKeyDown={(e) =>
                      handleKeyDownPhoneNumber(e, index, otpPhoneNumber, setOtpPhoneNumber, "otpPhone")
                    }
                    maxLength={1}
                    className="border rounded-lg w-12 h-12 text-center text-lg font-medium focus:ring-2 focus:ring-amber-500 outline-none"
                  />
                ))}
              </div>
            </div>
          )}

          {/* Name field only in SignUp */}
          {signUpForm && (
            <div className="relative">
              <div className="absolute inset-y-0 left-3 flex items-center text-gray-600">
                <FaUser className="w-5 h-5 text-amber-500" />
              </div>
              <input
                type="text"
                placeholder="Full Name"
                onChange={(e) => setFirstName(e.target.value)}
                required
                autoComplete="off"
                className="border border-gray-300 rounded-lg w-full py-3 pl-10 pr-4 focus:outline-none focus:border-amber-500"
              />
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={signUpForm && !otpVerified}
            className={`
              mt-8 px-10 py-3 rounded-full text-lg font-medium shadow-xl hover:scale-105 transition-transform

              w-full  fduration-200 ${
              !signUpForm || otpVerified
                ? "bg-gradient-to-r from-amber-500 to-yellow-600 text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {signUpForm ? "Sign Up" : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  </div>
</div>

  );
};

export default Login;
