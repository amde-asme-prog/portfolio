import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import FormButton from "./FormButton";
import { AuthContext } from "./AuthProvider";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = () => {
    login(formData.email, formData.password);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="w-full max-w-sm bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
        <form className="space-y-6">
          <h5 className="text-2xl font-medium text-gray-900 dark:text-white">
            Sign in to your account
          </h5>

          {/* Error Message */}
          {errorMessage && (
            <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6 dark:bg-red-900 dark:text-red-400">
              {errorMessage}
            </div>
          )}

          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:text-white dark:placeholder-gray-400"
              placeholder="name@company.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:text-white dark:placeholder-gray-400"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                name="rememberMe"
                id="remember"
                checked={formData.rememberMe}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
              />
              <label
                htmlFor="remember"
                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Remember me
              </label>
            </div>
            <a
              href="#"
              className="text-sm text-blue-700 hover:underline dark:text-blue-500"
            >
              Lost Password?
            </a>
          </div>

          <FormButton text="Login to your account" onclick={handleSubmit} />

          <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
            Not registered?{" "}
            <Link
              to="/register"
              className="text-blue-700 hover:underline dark:text-blue-500"
            >
              Create account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
