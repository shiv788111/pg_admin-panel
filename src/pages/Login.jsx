import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Dummy login credentials
    if (phone === "admin" && password === "1234") {
      localStorage.setItem("token", "dummy_token");
      navigate("/dashboard");
    } else {
      alert("Invalid credentials! Use admin / 1234");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
      
      {/* Animated Circles Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Small circles - increased size */}
        <div className="absolute top-10 left-10 w-4 h-4 bg-blue-400 rounded-full opacity-60 animate-float-1"></div>
        <div className="absolute top-20 left-32 w-5 h-5 bg-purple-400 rounded-full opacity-60 animate-float-2"></div>
        <div className="absolute top-40 left-60 w-3 h-3 bg-green-400 rounded-full opacity-60 animate-float-3"></div>
        <div className="absolute top-60 left-20 w-4 h-4 bg-yellow-400 rounded-full opacity-60 animate-float-4"></div>
        <div className="absolute top-80 left-96 w-5 h-5 bg-pink-400 rounded-full opacity-60 animate-float-1"></div>
        
        {/* Row 2 */}
        <div className="absolute top-0 right-20 w-5 h-5 bg-indigo-400 rounded-full opacity-60 animate-float-2"></div>
        <div className="absolute top-32 right-40 w-4 h-4 bg-red-400 rounded-full opacity-60 animate-float-3"></div>
        <div className="absolute top-56 right-80 w-5 h-5 bg-teal-400 rounded-full opacity-60 animate-float-4"></div>
        <div className="absolute top-80 right-20 w-4 h-4 bg-orange-400 rounded-full opacity-60 animate-float-1"></div>
        <div className="absolute top-96 right-60 w-5 h-5 bg-cyan-400 rounded-full opacity-60 animate-float-2"></div>
        
        {/* Row 3 */}
        <div className="absolute bottom-10 left-20 w-5 h-5 bg-blue-400 rounded-full opacity-60 animate-float-3"></div>
        <div className="absolute bottom-32 left-60 w-4 h-4 bg-purple-400 rounded-full opacity-60 animate-float-4"></div>
        <div className="absolute bottom-56 left-96 w-5 h-5 bg-green-400 rounded-full opacity-60 animate-float-1"></div>
        <div className="absolute bottom-80 left-40 w-3 h-3 bg-yellow-400 rounded-full opacity-60 animate-float-2"></div>
        <div className="absolute bottom-20 left-80 w-5 h-5 bg-pink-400 rounded-full opacity-60 animate-float-3"></div>
        
        {/* Row 4 */}
        <div className="absolute bottom-0 right-20 w-4 h-4 bg-indigo-400 rounded-full opacity-60 animate-float-4"></div>
        <div className="absolute bottom-40 right-60 w-5 h-5 bg-red-400 rounded-full opacity-60 animate-float-1"></div>
        <div className="absolute bottom-60 right-96 w-4 h-4 bg-teal-400 rounded-full opacity-60 animate-float-2"></div>
        <div className="absolute bottom-80 right-40 w-5 h-5 bg-orange-400 rounded-full opacity-60 animate-float-3"></div>
        
        {/* Extra random circles */}
        <div className="absolute top-1/2 left-1/4 w-4 h-4 bg-cyan-400 rounded-full opacity-60 animate-float-4"></div>
        <div className="absolute top-1/3 right-1/3 w-5 h-5 bg-blue-400 rounded-full opacity-60 animate-float-1"></div>
        <div className="absolute bottom-1/3 left-2/3 w-4 h-4 bg-purple-400 rounded-full opacity-60 animate-float-2"></div>
        <div className="absolute top-2/3 right-1/4 w-5 h-5 bg-green-400 rounded-full opacity-60 animate-float-3"></div>
        
        {/* Large blurred circles for depth */}
        <div className="absolute top-20 left-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-2000"></div>
      </div>

      {/* Login Form - Improved */}
      <div className="relative z-10 w-full max-w-md px-4">
        <form onSubmit={handleLogin} className="bg-gray-900/90 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-gray-700/50">
          {/* Logo/Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
          </div>

          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Welcome Back
            </h2>
       
          </div>
          
          <div className="space-y-5">
            <div>
            
              <input
                type="text"
                placeholder="Enter admin"
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-500 transition-all duration-200"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-gray-300 text-sm font-semibold mb-2">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter 1234"
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-500 transition-all duration-200"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-4 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-[1.02] shadow-lg"
            >
              Sign In
            </button>
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-700">
            <div className="text-center text-sm">
              <p className="text-gray-500">
                Demo Credentials: <span className="text-blue-400 font-mono">admin</span> / <span className="text-purple-400 font-mono">1234</span>
              </p>
            </div>
          </div>
        </form>
      </div>

      <style>{`
        @keyframes float-1 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(30px, -30px); }
        }
        @keyframes float-2 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-35px, 25px); }
        }
        @keyframes float-3 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(25px, 35px); }
        }
        @keyframes float-4 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-25px, -35px); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.3; transform: scale(1.05); }
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