import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faLock,
  faEnvelope,
  faCamera,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import {
  auth,
  db,
  storage,
  createUserWithEmailAndPassword,
  updateProfile,
  setDoc,
  doc,
  ref,
  uploadBytes,
  getDownloadURL,
} from "../config/firebaseConfig";

function RegistrationForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    profilePicture: null,
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData({ ...formData, profilePicture: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      // Create user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;

      let profilePicUrl = null;
      if (formData.profilePicture) {
        // Upload profile picture to Firebase Storage
        const storageRef = ref(storage, `profilePictures/${user.uid}`);
        await uploadBytes(storageRef, formData.profilePicture);
        profilePicUrl = await getDownloadURL(storageRef);
      }

      // Update user profile
      await updateProfile(user, {
        displayName: `${formData.firstName} ${formData.lastName}`,
        photoURL: profilePicUrl,
      });

      // Store user details in Firestore
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        profilePicture: profilePicUrl,
        createdAt: new Date(),
      });

      alert("Registration successful!");
    } catch (error) {
      setErrorMessage(error.message);
    }

    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="w-full max-w-sm bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
        <form onSubmit={handleSubmit} className="space-y-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
            Create an Account
          </h2>

          {errorMessage && (
            <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6 dark:bg-red-900 dark:text-red-400">
              {errorMessage}
            </div>
          )}

          <div className="space-y-6">
            {/* Profile Picture */}
            <div className="flex justify-center items-center mb-4">
              <label
                htmlFor="profilePicture"
                className="cursor-pointer w-24 h-24 rounded-full border-2 border-gray-300 dark:border-gray-600 overflow-hidden"
              >
                {formData.profilePicture ? (
                  <img
                    src={URL.createObjectURL(formData.profilePicture)}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faCamera}
                    className="w-full h-full text-gray-500 dark:text-gray-400"
                  />
                )}
              </label>
              <input
                type="file"
                id="profilePicture"
                name="profilePicture"
                className="hidden"
                accept="image/*"
                onChange={handleChange}
              />
            </div>

            <IconField
              name="firstName"
              type="text"
              placeholder="First Name"
              icon={faUser}
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            <IconField
              name="lastName"
              type="text"
              placeholder="Last Name"
              icon={faUser}
              value={formData.lastName}
              onChange={handleChange}
              required
            />
            <IconField
              name="email"
              type="email"
              placeholder="Email Address"
              icon={faEnvelope}
              value={formData.email}
              onChange={handleChange}
              required
            />
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
              placeholder="Confirm Password"
              icon={faLock}
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>

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
        className={`w-full pl-12 pr-4 py-3 border rounded-lg outline-none transition-all duration-300 ${
          focused
            ? "border-blue-500 ring-2 ring-blue-100"
            : "border-gray-300 hover:border-gray-400 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
        }`}
      />
    </div>
  );
};

export default RegistrationForm;
