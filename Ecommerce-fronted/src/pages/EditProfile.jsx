import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DataContext } from "../context/UserContext.jsx";
import { useContext } from "react";

const EditProfile = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  const { data: CenterData, setCenterData } = useContext(DataContext);
  console.log("User Data:", CenterData);
  const navigate = useNavigate();

  // Prefill on mount
  useEffect(() => {
    if (CenterData && CenterData.username) {
      setUsername(CenterData.username);
      setEmail(CenterData.email);
    }
  }, [CenterData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors([]);
    const userData = { username, email };

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/user/update`,
        userData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setCenterData(response.data.user || userData);
      navigate("/profile");
    } catch (error) {
      console.error(error.response);
      const errorMsg = error.response?.data?.message || 'Update failed';
      setErrors(Array.isArray(errorMsg) ? errorMsg : [errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-slate-50 overflow-hidden font-sans">
      {/* Parallax Wash Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-emerald-50 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob" />
        <div className="absolute top-[10%] right-[-5%] w-[400px] h-[400px] bg-blue-50 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob animation-delay-2000" />
        <div className="absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] bg-purple-50 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-4000" />
      </div>

      {/* Edit Profile Card */}
      <div className="relative z-10 w-full max-w-md p-10 mx-4 bg-white/80 backdrop-blur-xl border border-white/60 rounded-3xl shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">
            Edit Profile
          </h1>
          <p className="text-slate-500">
            Update your account information below
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {errors.length > 0 && (
            <div className="space-y-2">
              {errors.map((err, index) => (
                <div key={index} className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-xl text-sm">
                  {err}
                </div>
              ))}
            </div>
          )}

          {/* Username Field */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-slate-300 focus:border-transparent transition-all text-sm"
              placeholder="Enter username"
              disabled={loading}
            />
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-slate-300 focus:border-transparent transition-all text-sm"
              placeholder="Enter email address"
              disabled={loading}
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-4 bg-gradient-to-r from-slate-800 to-slate-900 text-white font-semibold rounded-2xl hover:from-slate-900 hover:to-slate-950 focus:outline-none focus:ring-4 focus:ring-slate-500/20 transition-all shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </>
            ) : (
              'Save Changes'
            )}
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-slate-200 text-center">
          <Link
            to="/profile"
            className="inline-block text-slate-700 hover:text-slate-900 font-semibold hover:underline text-sm transition-colors"
          >
            ← Back to Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
