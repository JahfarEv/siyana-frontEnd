"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { AuthModalProps } from "@/types";
import { loginUser, signupUser } from "@/lib/firebase/firebaseQueries";
import toast from "react-hot-toast";

const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLogin,
  onSignup,
}) => {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [signupForm, setSignupForm] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await loginUser(loginForm.email, loginForm.password);
      toast.success("Logged in successfully");
      onClose();
    } catch (err: any) {
      toast.error(err.message);
    }finally {
    setLoading(false);
  }
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (signupForm.password !== signupForm.confirmPassword) {
      return toast.error("Passwords do not match");
    }

    try {
      await signupUser(
        signupForm.name,
        signupForm.email,
        signupForm.mobile,
        signupForm.password,
      );
      toast.success("Account created successfully!");
      setIsLogin(true);
    } catch (err: any) {
      toast.error(err.message);
    }finally {
    setLoading(false);
  }
  };

  const switchToSignup = () => {
    setIsLogin(false);
    setLoginForm({ email: "", password: "" });
  };

  const switchToLogin = () => {
    setIsLogin(true);
    setSignupForm({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      mobile: "",
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-3 font-semibold text-center transition-colors ${
              isLogin
                ? "text-[#196b7a] border-b-2 border-[#196b7a]"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-3 font-semibold text-center transition-colors ${
              !isLogin
                ? "text-[#196b7a] border-b-2 border-[#196b7a]"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Login Form */}
        {isLogin ? (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Welcome Back
            </h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={loginForm.email}
                onChange={(e) =>
                  setLoginForm({ ...loginForm, email: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#196b7a] focus:border-transparent transition-all"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={loginForm.password}
                onChange={(e) =>
                  setLoginForm({ ...loginForm, password: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#196b7a] focus:border-transparent transition-all"
                placeholder="Enter your password"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#196b7a] text-white py-3 px-4 rounded-xl font-semibold hover:bg-[#196b7a]/90 transition-colors shadow-md"
            >
              Login
            </button>

            <p className="text-center text-sm text-gray-600 mt-4">
              Don't have an account?{" "}
              <button
                type="button"
                onClick={switchToSignup}
                className="text-[#196b7a] font-semibold hover:underline"
              >
                Sign up here
              </button>
            </p>
          </form>
        ) : (
          /* Signup Form */
          <form onSubmit={handleSignupSubmit} className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Create Account
            </h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={signupForm.name}
                onChange={(e) =>
                  setSignupForm({ ...signupForm, name: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#196b7a] focus:border-transparent transition-all"
                placeholder="Enter your full name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={signupForm.email}
                onChange={(e) =>
                  setSignupForm({ ...signupForm, email: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#196b7a] focus:border-transparent transition-all"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mobile Number
              </label>
              <input
                type="tel"
                value={signupForm.mobile}
                onChange={(e) =>
                  setSignupForm({ ...signupForm, mobile: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#196b7a] focus:border-transparent transition-all"
                placeholder="Enter your mobile number"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={signupForm.password}
                onChange={(e) =>
                  setSignupForm({ ...signupForm, password: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#196b7a] focus:border-transparent transition-all"
                placeholder="Create a password"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                value={signupForm.confirmPassword}
                onChange={(e) =>
                  setSignupForm({
                    ...signupForm,
                    confirmPassword: e.target.value,
                  })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#196b7a] focus:border-transparent transition-all"
                placeholder="Confirm your password"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-[#196b7a] text-white py-3 px-4 rounded-xl font-semibold shadow-md transition-all
    ${
      loading
        ? "opacity-70 cursor-not-allowed scale-95"
        : "hover:bg-[#196b7a]/90 active:scale-95"
    }
  `}
            >
              {loading ? (
                <span className="flex justify-center items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  Processing...
                </span>
              ) : isLogin ? (
                "Login"
              ) : (
                "Create Account"
              )}
            </button>

            <p className="text-center text-sm text-gray-600 mt-4">
              Already have an account?{" "}
              <button
                type="button"
                onClick={switchToLogin}
                className="text-[#196b7a] font-semibold hover:underline"
              >
                Login here
              </button>
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default AuthModal;
