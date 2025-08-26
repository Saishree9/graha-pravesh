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
  const [refferCode, setRefferCode] = useState(null);
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
    <div className="flex w-full justify-center items-center p-5 md:p-[70px] bg-[#F0F2F4] h-screen">
      <div className="h-full md:w-1/2 flex bg-[#ffff] rounded-md">
        {/* Image Section */}
        {/* <div className="hidden lg:flex w-1/2 justify-center items-center border-r border-gray-200">
          <img
            src={loginImg}
            alt="Signup illustration"
            className="w-3/4 h-3/4 object-contain"
          />
        </div> */}

        <div className="w-full flex items-center justify-center p-8">
          <div className="max-w-sm w-full">
            {/* ❌ Logo removed here */}
            <h2 className="md:text-3xl text-xl font-semibold text-gray-800 mb-6 text-left">
              {signUpForm ? "Sign Up" : "Sign In"}
            </h2>

            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(e);
              }}
              autoComplete="off"
            >
              <>
                <div className="relative space-y-2">
                  <div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-3 flex items-center text-gray-600">
                        {/* You can swap the icon if you like */}
                        <FaUser className="w-5 h-5 text-[#D05278]" />
                      </div>
                      <input
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => {
                          const input = e.target.value;
                          // Reset all states related to email verification
                          if (
                            emailVerified !== 0 ||
                            otpVerified ||
                            showEmailOtp ||
                            emailDisabled
                          ) {
                            setEmailVerified(0);
                            setOtpVerified(false);
                            setOtpEmailNumber(["", "", "", ""]);
                            setShowEmailOtp(false);
                            setEmailTimer(0);
                            setEmailError("");
                            setEmailDisabled(false);
                          }
                          setEmail(input);
                          setEmailError("");
                        }}
                        className="border border-gray-300 rounded-md w-full py-3 pl-10 pr-20 focus:outline-none focus:border-pPink"
                        required
                        autoComplete="off"
                      />
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                        {emailVerified === 0 ? (
                          <button
                            type="button"
                            onClick={() => handleTriggerEmail()}
                            disabled={emailDisabled}
                            className="text-[#D53936] font-semibold px-3 py-1 rounded-md text-sm"
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
                    {emailError && (
                      <p className="text-red-500 text-xs mt-1">{emailError}</p>
                    )}
                  </div>

                  {(phoneVerified === 0 || phoneVerified === 2) &&
                    showPhoneOtp && (
                      <div>
                        {showPhoneOtp && (
                          <div>
                            {phoneTimer > 0 ? (
                              <p className="text-sm text-gray-500">
                                Resend OTP after{" "}
                                <span style={{ color: "red" }}>
                                  {phoneTimer}
                                </span>
                              </p>
                            ) : (
                              <div className="w-full flex justify-end items-center my-2">
                                <button
                                  type="button"
                                  onClick={() => handleTriggerPhoneDebounce()}
                                  className="bg-[#D05278] text-white px-3 py-1 rounded-md text-sm"
                                >
                                  Resend
                                </button>
                              </div>
                            )}

                            <div className="w-full flex flex-col justify-center items-center mt-2">
                              <p className="text-gray-800">Enter Phone OTP</p>
                              <div>
                                {/* {otpPhoneNumber.map((data, index) => (
                                    <input
                                      key={index}
                                      type="tel"
                                      inputMode="numeric"
                                      pattern="[0-9]*"
                                      id={`otpPhone-${index}`}
                                      value={data}
                                      onChange={(e) => {
                                        const value = e.target.value;
                                        if (/^\d?$/.test(value)) {
                                          handleChangePhoneNumber(e, index);
                                        }
                                      }}
                                      onKeyDown={(e) =>
                                        handleKeyDownPhoneNumber(
                                          e,
                                          index,
                                          otpPhoneNumber,
                                          setOtpPhoneNumber,
                                          "otpPhone"
                                        )
                                      }
                                      className="border rounded-lg w-10 h-10 py-2 px-3 text-sm bg-transparent text-center text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#5356FB] m-1"
                                      maxLength={1}
                                      autoComplete="one-time-code"
                                    />
                                  ))} */}
                                {otpPhoneNumber.map((data, index) => (
                                  <input
                                    key={index}
                                    type="tel"
                                    inputMode="numeric"
                                    pattern="[0-9]*"
                                    id={`otpPhone-${index}`}
                                    value={data}
                                    onChange={(e) => {
                                      const value = e.target.value;
                                      if (/^\d?$/.test(value)) {
                                        handleChangePhoneNumber(e, index);
                                      }
                                    }}
                                    onKeyDown={(e) =>
                                      handleKeyDownPhoneNumber(
                                        e,
                                        index,
                                        otpPhoneNumber,
                                        setOtpPhoneNumber,
                                        "otpPhone"
                                      )
                                    }
                                    onPaste={(e) => {
                                      e.preventDefault();
                                      const pasted = e.clipboardData
                                        .getData("text")
                                        .replace(/\D/g, "");
                                      if (!pasted) return;
                                      const newOtp = [...otpPhoneNumber];
                                      pasted.split("").forEach((char, i) => {
                                        if (i < newOtp.length) {
                                          newOtp[i] = char;
                                        }
                                      });
                                      setOtpPhoneNumber(newOtp);

                                      if (
                                        pasted.length >= otpPhoneNumber.length
                                      ) {
                                        verifyPhoneOtp({
                                          phone,
                                          otp: Number(newOtp.join("")),
                                        });
                                      }

                                      const nextIndex =
                                        pasted.length < otpPhoneNumber.length
                                          ? pasted.length
                                          : otpPhoneNumber.length - 1;
                                      const nextInput = document.getElementById(
                                        `otpPhone-${nextIndex}`
                                      );
                                      if (nextInput) nextInput.focus();
                                    }}
                                    className="border rounded-lg w-10 h-10 py-2 px-3 text-sm bg-transparent text-center text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#5356FB] m-1"
                                    maxLength={1}
                                    autoComplete="one-time-code"
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                  {showPhoneOtpLoader && (
                    <p className="text-gray-500 mt-2">Loading...</p>
                  )}
                </div>
              </>

              {signUpForm && (
                <>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-3 flex items-center text-gray-600">
                      <FaUser className="w-5 h-5 text-[#D05278]" />
                    </div>
                    <input
                      type="text"
                      placeholder="Full Name"
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                      autoComplete="off"
                      className="border border-gray-300 rounded-md w-full py-3 pl-10 pr-4 focus:outline-none focus:border-pPink"
                    />
                  </div>

                  {/* <div className="relative">
                    <input
                      className="border border-gray-300 rounded-md w-full py-3 pl-5 pr-20 focus:outline-none focus:border-pPink"
                      type="text"
                      placeholder="Enter Referral code"
                      value={refferCode}
                      required
                      onChange={(e) => {
                        const input = e.target.value
                          .toUpperCase()
                          .replace(/[^A-Z0-9]/g, "");
                        setRefferCode(input);
                      }}
                      autoComplete="off"
                    />
                  </div> */}

                  <button
                    type="submit"
                    disabled={!otpVerified}
                    className={`w-full py-3 rounded-full font-semibold transition duration-200
    ${
      otpVerified
        ? "bg-[#D05278] text-white hover:bg-[#b43f65]"
        : "bg-gray-300 text-gray-500 cursor-not-allowed"
    }`}
                  >
                    Submit
                  </button>
                </>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
