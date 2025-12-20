import { Link, useNavigate } from "react-router-dom";
import signupImg from "../../src/assets/Signup/sign_up.png";
import useAuth from "../Hooks/useAuth";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { toast } from "react-toastify";

const SignupFrom = () => {
  const { createUser } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const handleSignup = async (event) => {
    event.preventDefault();
    const form = event.target;

    const name = form.name.value;
    const phoneNumber = form.phoneNumber.value;
    const email = form.email.value;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;

    // 🔐 Password match check
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      // 🔥 Create user (Firebase/Auth)
      await createUser(email, password);

      // 📦 User data for database
      const userInfo = {
        name,
        phoneNumber,
        email,
      };

      // 💾 Save user to database
      await axiosPublic.post(`/users/${email}`, userInfo);

      toast.success("Account created successfully 🎉");
      form.reset();
      navigate("/");

    } catch (error) {
      toast.error(error.message || "Signup failed");
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-50 h-screen px-2 sm:px-4 py-12">
      <div className="bg-white shadow-2xl grid grid-cols-1 md:grid-cols-2 w-full max-w-7xl">

        {/* Left Side - Form */}
        <div className="p-6 sm:p-10 flex flex-col justify-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-600 mb-6">
            Create a Retailer <br /> Account
          </h2>

          <form onSubmit={handleSignup} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="w-full bg-gray-100 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />

            <input
              type="text"
              name="phoneNumber"
              placeholder="Phone Number"
              className="w-full bg-gray-100 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />

            <input
              type="email"
              name="email"
              placeholder="E-mail Address"
              className="w-full bg-gray-100 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full bg-gray-100 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              className="w-full bg-gray-100 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 font-medium hover:bg-blue-600 transition"
            >
              Sign Up
            </button>
          </form>

          <p className="text-sm text-gray-600 mt-4 text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 font-medium hover:underline">
              Login now
            </Link>
          </p>
        </div>

        {/* Right Side - Image */}
        <div className="flex items-center justify-center p-6">
          <img
            src={signupImg}
            alt="Signup Illustration"
            className="w-full max-w-lg h-auto object-contain"
          />
        </div>

      </div>
    </div>
  );
};

export default SignupFrom;
