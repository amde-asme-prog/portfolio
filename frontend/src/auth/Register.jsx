import { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import FormButton from "./FormButton";
import { AuthContext } from "./AuthProvider";

function RegistrationForm() {
  const { register } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    register(
      formData.name,
      formData.email,
      formData.password,
      formData.confirmPassword
    );
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="w-full max-w-sm bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
        <form className="space-y-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
            Create an Account
          </h2>

          {/* Error Message */}
          {errorMessage && (
            <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6 dark:bg-red-900 dark:text-red-400">
              {errorMessage}
            </div>
          )}

          <div className="space-y-6">
            {/* Full Name Field */}
            <IconField
              name="name"
              type="text"
              placeholder="Full Name"
              icon={faUser}
              value={formData.name}
              onChange={handleChange}
              required
            />

            {/* Email Field */}
            <IconField
              name="email"
              type="email"
              placeholder="Email Address"
              icon={faEnvelope}
              value={formData.email}
              onChange={handleChange}
              required
            />

            {/* Password Field */}
            <IconField
              name="password"
              type="password"
              placeholder="Password"
              icon={faLock}
              value={formData.password}
              onChange={handleChange}
              required
            />
            <IconField
              name="confirmPassword"
              type="password"
              placeholder="confirm Password"
              icon={faLock}
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <FormButton text="Create Account" onclick={() => {}} />
          <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
            <span>Already have an account? </span>
            <Link
              to="/login"
              className="text-blue-700 hover:underline dark:text-blue-500"
            >
              Login here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

const IconField = ({
  name,
  type,
  placeholder,
  icon,
  value,
  onChange,
  required,
}) => {
  const [focused, setFocused] = useState(false);

  return (
    <div className="relative flex items-center">
      <span
        className={`absolute left-3 text-gray-500 transition-all duration-200 ${
          focused ? "text-blue-500" : ""
        }`}
      >
        <FontAwesomeIcon icon={icon} />
      </span>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={`w-full pl-12 pr-4 py-3 border rounded-lg outline-none transition-all duration-300
          ${
            focused
              ? "border-blue-500 ring-2 ring-blue-100"
              : "border-gray-300 hover:border-gray-400 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
          }`}
      />
    </div>
  );
};

export default RegistrationForm;
