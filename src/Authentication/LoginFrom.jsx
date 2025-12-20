import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import useAuth from "../Hooks/useAuth";

const LoginForm = () => {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();
    const form = event.target;
    const emailOrPhone = form.emailOrPhone.value;
    const password = form.password.value;

    setLoading(true);
    try {
      await signIn(emailOrPhone, password); // Firebase বা Backend লগইন
      toast.success("Login successful!");
      navigate("/"); // হোম পেজে নেভিগেট
      form.reset();
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center py-12 bg-gray-50">
      <div className="bg-white shadow-lg hover:shadow-2xl transition-shadow duration-300 p-8 w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-gray-700 mb-1 text-left">Log In</h2>
        <hr className="mb-6 text-gray-200" />

        <form onSubmit={handleLogin}>
          {/* Phone or Email */}
          <input
            name="emailOrPhone"
            type="text"
            placeholder="Phone or Email address"
            className="w-full bg-gray-100 border border-gray-300 px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          {/* Password */}
          <input
            name="password"
            type="password"
            placeholder="Password"
            className="w-full bg-gray-100 border border-gray-300 px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          {/* Login Button */}
         <button
  type="submit"
  className="w-full bg-blue-500 text-white py-2 rounded-full font-medium hover:bg-blue-600 transition flex justify-center items-center gap-2"
>
  {loading && <span className="loading loading-infinity loading-2xl"></span>}
  Log In
</button>

        </form>

        <div className="text-center mt-3">
          <Link to="/forgot-password" className="text-sm text-blue-500 hover:underline">
            Forgotten password?
          </Link>
        </div>

        {/* Google Login */}
        <button className="w-full mt-4 flex items-center justify-center gap-2 border border-blue-400 text-blue-500 py-2 rounded-full font-medium hover:bg-blue-50 transition">
          <FcGoogle className="text-xl" />
          Login with Google
        </button>

        {/* Signup Link */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Doesn&apos;t have any account?{" "}
          <Link to="/sign-up" className="text-blue-500 font-medium hover:underline">
            Sign Up Now.
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
