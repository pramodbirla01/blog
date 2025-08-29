import { sendOtp, verifyOtp } from "@/api/auth/otp";

import React, { useState } from "react";
import { register as registerApi, login as loginApi } from "@/api/auth";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import OtpForm from "./OtpForm";
import Profile from "./Profile";
import { useAuth } from "@/context/AuthContext";

interface AuthContentProps {
  open: boolean;
  onClose: () => void;
  isLoggedIn?: boolean;
  user?: { name: string; email: string };
  onLogout?: () => void;
}


const AuthContent: React.FC<AuthContentProps> = ({ open, onClose, onLogout }) => {
  const [tab, setTab] = useState<"login" | "register">("login");
  const [step, setStep] = useState<"form" | "otp">("form");
  const [email, setEmail] = useState("");
  const [showOtpLogin, setShowOtpLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { isLoggedIn, user, setIsLoggedIn, setUser } = useAuth();

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-10 relative border border-gray-200">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
          onClick={onClose}
        >
          &times;
        </button>
        {/** If logged in, show profile */}
        {isLoggedIn && user && (
          <Profile
            name={user.name}
            email={user.email}
            onLogout={async () => {
              if (onLogout) await onLogout();
              // Also clear auth state here for modal logout
              await import("@/api/auth").then(api => api.logout());
              setIsLoggedIn(false);
              setUser(null);
            }}
          />
        )}
        {!isLoggedIn && (
          <>
            <div className="flex mb-8">
              <button
                className={`flex-1 py-3 rounded-l-lg text-lg font-semibold transition ${tab === "login" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"}`}
                onClick={() => { setTab("login"); setStep("form"); setShowOtpLogin(false); }}
              >
                Login
              </button>
              <button
                className={`flex-1 py-3 rounded-r-lg text-lg font-semibold transition ${tab === "register" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-700"}`}
                onClick={() => { setTab("register"); setStep("form"); setShowOtpLogin(false); }}
              >
                Register
              </button>
            </div>
            {tab === "login" && step === "form" && !showOtpLogin && (
              <LoginForm
                onEmailPasswordSubmit={async (email: string, password: string) => {
                  setLoading(true);
                  setError(null);
                  try {
                    const res = await loginApi(email, password);
                    setUser(res.user);
                    setIsLoggedIn(true);
                    setLoading(false);
                    onClose();
                  } catch (err: any) {
                    setError(err?.response?.data?.error || "Login failed");
                    setLoading(false);
                  }
                }}
                onShowOtp={() => setShowOtpLogin(true)}
              />
            )}
            {tab === "login" && step === "form" && showOtpLogin && (
              <LoginForm
                otpMode
                onEmailOtpSubmit={async (email: string) => {
                  setLoading(true);
                  setError(null);
                  try {
                    await sendOtp(email);
                    setEmail(email);
                    setStep("otp");
                    setLoading(false);
                  } catch (err: any) {
                    setError(err?.response?.data?.error || "Failed to send OTP");
                    setLoading(false);
                  }
                }}
                onBackToPassword={() => setShowOtpLogin(false)}
              />
            )}
            {tab === "register" && step === "form" && (
              <RegisterForm
                onRegisterSubmit={async (name: string, email: string, password: string) => {
                  setLoading(true);
                  setError(null);
                  try {
                    const res = await registerApi(name, email, password);
                    setUser(res.user);
                    setIsLoggedIn(true);
                    setLoading(false);
                  } catch (err: any) {
                    setError(err?.response?.data?.error || "Registration failed");
                    setLoading(false);
                  }
                }}
              />
            )}
            {step === "otp" && (
              <OtpForm
                loading={loading}
                onOtpSubmit={async (otp: string) => {
                  setLoading(true);
                  setError(null);
                  try {
                    const res = await verifyOtp(email, otp);
                    setUser(res.user);
                    setIsLoggedIn(true);
                    setLoading(false);
                    onClose();
                  } catch (err: any) {
                    setError(err?.response?.data?.error || "Invalid OTP");
                    setLoading(false);
                  }
                }}
              />
            )}
          </>
        )}
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
        {loading && <div className="text-center text-gray-500 mb-4">Loading...</div>}
      </div>
    </div>
  );
};

export default AuthContent;
