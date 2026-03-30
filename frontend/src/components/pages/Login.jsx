import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { HiOutlineMail } from "react-icons/hi";
import { IoLockClosedOutline } from "react-icons/io5";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { LuPackage } from "react-icons/lu";

const API_BASE =
  "http://localhost/Inventory_Management/InventoryMGT/backend/login_registration.php";

const inputShell =
  "flex w-full items-center gap-3 rounded-xl border border-transparent bg-[#F3F4FF] px-4 py-3 text-sm text-gray-900 outline-none transition focus-within:border-indigo-200 focus-within:ring-2 focus-within:ring-indigo-100";

const labelClass = "mb-2 block text-[11px] font-semibold uppercase tracking-wide text-gray-600";

const primaryBtn =
  "w-full rounded-xl bg-[#3B5BDB] py-3.5 text-center text-sm font-semibold text-white shadow-sm transition hover:bg-[#2F4AC4] active:scale-[0.99]";

const googleBtn =
  "flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white py-3 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50";

const plainInput =
  "w-full rounded-xl border border-transparent bg-[#F3F4FF] px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-indigo-200 focus:ring-2 focus:ring-indigo-100";

function SocialDivider({ children }) {
  return (
    <div className="relative my-6">
      <div className="absolute inset-0 flex items-center" aria-hidden>
        <div className="w-full border-t border-gray-200" />
      </div>
      <div className="relative flex justify-center text-xs font-semibold uppercase tracking-widest text-gray-400">
        <span className="bg-white px-3">{children}</span>
      </div>
    </div>
  );
}

const Login = () => {
  const navigate = useNavigate();
  const [currState, setCurrState] = useState("Login");
  const [showPassword, setShowPassword] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    try {
      let res;

      if (currState === "Sign Up") {
        res = await axios.post(API_BASE, {
          action: "register",
          userName: formData.get("fname"),
          orgName: formData.get("orgname"),
          userEmail: formData.get("usernameoremail"),
          password: formData.get("password"),
        });

        if (res.data.status === "success") {
          alert("Registration successful");
          setCurrState("Login");
        }
      } else {
        res = await axios.post(
          API_BASE,
          {
            action: "login",
            userEmail: formData.get("usernameoremail"),
            password: formData.get("password"),
          },
          {
            withCredentials: true, // IMPORTANT
          },
        );

        if (res.data.status === "success") {
          localStorage.setItem("user", JSON.stringify(res.data.user));
          localStorage.setItem("isLoggedIn", "true"); // ADD THIS
          navigate("/dashboard");
        }
      }

      if (res.data.status !== "success") {
        throw new Error(res.data.message);
      }
    } catch (err) {
      alert(err.response?.data?.message || err.message || "Something went wrong");
      localStorage.removeItem("user");
      localStorage.removeItem("isLoggedIn");  
      navigate("/");
    }
  };

  const handleGoogleClick = () => {
    alert("Google sign-in is not connected yet. Use email and password for now.");
  };

  return (
    <div className="relative flex min-h-screen flex-col bg-[#E8EBF6]">
      <header className="w-full border-b border-gray-200 bg-white px-4 py-3.5 shadow-sm sm:px-6">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-lg font-bold tracking-tight text-gray-900 sm:text-xl flex items-center gap-2">
            <LuPackage /> Inventory Management
          </h1>
        </div>
      </header>

      <div className="flex flex-1 flex-col px-4 py-10 sm:px-6 sm:py-14">
        <div className="mx-auto flex w-full max-w-lg flex-1 flex-col">
          <div className="rounded-2xl border border-gray-100/80 bg-white p-6 shadow-xl shadow-gray-200/60 sm:p-8">
            {currState === "Login" ? (
              <>
                <h2 className="text-2xl font-bold text-gray-900">
                  Welcome Back
                </h2>
                <p className="mt-2 text-sm text-gray-500">
                  Please enter your details to access the warehouse dashboard.
                </p>

                <form onSubmit={onSubmitHandler} className="mt-8 space-y-5">
                  <div>
                    <label htmlFor="usernameoremail" className={labelClass}>
                      Email or username
                    </label>
                    <div className={inputShell}>
                      <HiOutlineMail
                        className="h-5 w-5 shrink-0 text-gray-400"
                        aria-hidden
                      />
                      <input
                        id="usernameoremail"
                        name="usernameoremail"
                        type="text"
                        autoComplete="username"
                        placeholder="name@kinetic.com"
                        required
                        className="min-w-0 flex-1 bg-transparent placeholder:text-gray-400 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="mb-2 flex items-center justify-between gap-2">
                      <label
                        htmlFor="password"
                        className={labelClass + " mb-0"}
                      >
                        Password
                      </label>
                      <button
                        type="button"
                        className="text-[11px] font-semibold uppercase tracking-wide text-[#3B5BDB] hover:underline"
                      >
                        Forgot password?
                      </button>
                    </div>
                    <div className={inputShell}>
                      <IoLockClosedOutline
                        className="h-5 w-5 shrink-0 text-gray-400"
                        aria-hidden
                      />
                      <input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="current-password"
                        placeholder="••••••••"
                        required
                        className="min-w-0 flex-1 bg-transparent placeholder:text-gray-400 focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((v) => !v)}
                        className="shrink-0 text-gray-400 hover:text-gray-600"
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                      >
                        {showPassword ? (
                          <FaEyeSlash className="h-4 w-4" />
                        ) : (
                          <FaEye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-600">
                    <input
                      type="checkbox"
                      name="rememberme"
                      className="h-4 w-4 rounded border-gray-300 text-[#3B5BDB] focus:ring-[#3B5BDB]"
                    />
                    Keep me logged in
                  </label>

                  <button type="submit" className={primaryBtn}>
                    Sign In
                  </button>

                  <SocialDivider>Or continue with</SocialDivider>

                  <button
                    type="button"
                    onClick={handleGoogleClick}
                    className={googleBtn}
                  >
                    <FcGoogle className="h-5 w-5" />
                    Sign in with Google
                  </button>
                </form>

                <p className="mt-8 text-center text-sm text-gray-600">
                  New to Kinetic?{" "}
                  <button
                    type="button"
                    onClick={() => setCurrState("Sign Up")}
                    className="font-semibold text-[#3B5BDB] hover:underline"
                  >
                    Create an Account
                  </button>
                </p>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-gray-900">
                  Create Account
                </h2>
                <p className="mt-2 text-sm text-gray-500">
                  Join the ecosystem of modern warehouse management.
                </p>

                <form onSubmit={onSubmitHandler} className="mt-8 space-y-5">
                  <div>
                    <label htmlFor="fname" className={labelClass}>
                      Full name
                    </label>
                    <input
                      id="fname"
                      name="fname"
                      type="text"
                      placeholder="Alex Sterling"
                      required
                      className={plainInput}
                    />
                  </div>

                  <div>
                    <label htmlFor="signup-email" className={labelClass}>
                      Email address
                    </label>
                    <div className={inputShell}>
                      <HiOutlineMail
                        className="h-5 w-5 shrink-0 text-gray-400"
                        aria-hidden
                      />
                      <input
                        id="signup-email"
                        name="usernameoremail"
                        type="email"
                        autoComplete="email"
                        placeholder="alex@warehouse-alpha.com"
                        required
                        className="min-w-0 flex-1 bg-transparent placeholder:text-gray-400 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="orgname" className={labelClass}>
                      Organization
                    </label>
                    <input
                      id="orgname"
                      name="orgname"
                      type="text"
                      placeholder="Nexus Logistics Group"
                      required
                      className={plainInput}
                    />
                  </div>

                  <div>
                    <label htmlFor="signup-password" className={labelClass}>
                      Password
                    </label>
                    <div className={inputShell}>
                      <IoLockClosedOutline
                        className="h-5 w-5 shrink-0 text-gray-400"
                        aria-hidden
                      />
                      <input
                        id="signup-password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="new-password"
                        placeholder="••••••••"
                        required
                        className="min-w-0 flex-1 bg-transparent placeholder:text-gray-400 focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((v) => !v)}
                        className="shrink-0 text-gray-400 hover:text-gray-600"
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                      >
                        {showPassword ? (
                          <FaEyeSlash className="h-4 w-4" />
                        ) : (
                          <FaEye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <label className="flex cursor-pointer items-start gap-2 text-sm text-gray-600">
                    <input
                      type="checkbox"
                      name="terms"
                      required
                      className="mt-0.5 h-4 w-4 rounded border-gray-300 text-[#3B5BDB] focus:ring-[#3B5BDB]"
                    />
                    <span>
                      I agree to the{" "}
                      <a
                        href="#"
                        className="font-medium text-[#3B5BDB] hover:underline"
                      >
                        Terms of Service
                      </a>{" "}
                      and{" "}
                      <a
                        href="#"
                        className="font-medium text-[#3B5BDB] hover:underline"
                      >
                        Privacy Policy
                      </a>
                      .
                    </span>
                  </label>

                  <button type="submit" className={primaryBtn}>
                    Create Account →
                  </button>

                  <p className="text-center text-sm text-gray-600">
                    Already have an account?{" "}
                    <button
                      type="button"
                      onClick={() => setCurrState("Login")}
                      className="font-semibold text-[#3B5BDB] hover:underline"
                    >
                      Log in
                    </button>
                  </p>

                  <SocialDivider>Social sync</SocialDivider>

                  <button
                    type="button"
                    onClick={handleGoogleClick}
                    className={googleBtn}
                  >
                    <FcGoogle className="h-5 w-5" />
                    Google
                  </button>
                </form>
              </>
            )}
          </div>

          {currState === "Login" ? (
            <p className="mt-auto pt-10 text-right text-[11px] font-medium uppercase tracking-wide text-gray-400">
              V2.4.0 Stable
              <span className="mx-2 text-gray-300">·</span>
              Warehouse Alpha Node
            </p>
          ) : (
            <p className="mt-auto pt-10 text-center text-[11px] font-medium uppercase tracking-wide text-gray-400">
              © 2024 Inventory Management · All rights reserved
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
