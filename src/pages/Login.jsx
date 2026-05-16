import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAdmin } from "../services/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);

    const payload = {
      email,
      password,
    };

    const response = await loginAdmin(payload);

    console.log(response);

    if (response.success) {
      // Save Token
      localStorage.setItem("token", response.data.token);

      // Save User
      localStorage.setItem("user", JSON.stringify(response.data.user));

      navigate("/dashboard");
    } else {
      alert(response.message || "Login Failed");  
    }

    setLoading(false);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Small Circles */}
        <div className="absolute top-10 left-10 w-4 h-4 bg-blue-400 rounded-full opacity-60 animate-float-1"></div>
        <div className="absolute top-20 left-32 w-5 h-5 bg-purple-400 rounded-full opacity-60 animate-float-2"></div>
        <div className="absolute top-40 left-60 w-3 h-3 bg-green-400 rounded-full opacity-60 animate-float-3"></div>
        <div className="absolute top-60 left-20 w-4 h-4 bg-yellow-400 rounded-full opacity-60 animate-float-4"></div>
        <div className="absolute top-80 left-96 w-5 h-5 bg-pink-400 rounded-full opacity-60 animate-float-1"></div>

        <div className="absolute top-0 right-20 w-5 h-5 bg-indigo-400 rounded-full opacity-60 animate-float-2"></div>
        <div className="absolute top-32 right-40 w-4 h-4 bg-red-400 rounded-full opacity-60 animate-float-3"></div>
        <div className="absolute top-56 right-80 w-5 h-5 bg-teal-400 rounded-full opacity-60 animate-float-4"></div>
        <div className="absolute top-80 right-20 w-4 h-4 bg-orange-400 rounded-full opacity-60 animate-float-1"></div>
        <div className="absolute top-96 right-60 w-5 h-5 bg-cyan-400 rounded-full opacity-60 animate-float-2"></div>

        {/* Blur Background */}
        <div className="absolute top-20 left-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>

        <div className="absolute bottom-20 right-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>

        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-2000"></div>
      </div>

      {/* Login Form */}
      <div className="relative z-10 w-full max-w-md px-4">
        <form
          onSubmit={handleLogin}
          className="bg-gray-900/90 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-gray-700/50"
        >
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            </div>
          </div>

          {/* Heading */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              PG Admin ERP
            </h2>

            <p className="text-gray-400 mt-2">Login to continue</p>
          </div>

          {/* Inputs */}
          <div className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-gray-300 text-sm font-semibold mb-2">
                Email
              </label>

              <input
                type="email"
                placeholder="Enter Email"
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-gray-300 text-sm font-semibold mb-2">
                Password
              </label>

              <input
                type="password"
                placeholder="Enter Password"
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
            >
              {loading ? "Please Wait..." : "Sign In"}
            </button>
          </div>
        </form>
      </div>

      {/* Custom Animation */}
      <style>{`
        @keyframes float-1 {
          0%, 100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(30px, -30px);
          }
        }

        @keyframes float-2 {
          0%, 100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(-35px, 25px);
          }
        }

        @keyframes float-3 {
          0%, 100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(25px, 35px);
          }
        }

        @keyframes float-4 {
          0%, 100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(-25px, -35px);
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 0.2;
            transform: scale(1);
          }

          50% {
            opacity: 0.3;
            transform: scale(1.05);
          }
        }

        .animate-float-1 {
          animation: float-1 6s ease-in-out infinite;
        }

        .animate-float-2 {
          animation: float-2 8s ease-in-out infinite;
        }

        .animate-float-3 {
          animation: float-3 7s ease-in-out infinite;
        }

        .animate-float-4 {
          animation: float-4 9s ease-in-out infinite;
        }

        .animate-pulse {
          animation: pulse 4s ease-in-out infinite;
        }

        .delay-1000 {
          animation-delay: 1s;
        }

        .delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
}
