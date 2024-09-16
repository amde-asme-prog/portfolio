// Import Tailwind CSS

// Import React and Tailwind
import { useState } from "react";

// Import icons
import { BiUser, BiLock } from "react-icons/bi";
import { IoMdMail } from "react-icons/io";

function RegistrationForm() {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
	});
	const [focused, setFocused] = useState(false);
	const handleFocus = () => setFocused(true);
	const handleBlur = () => setFocused(false);

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		// Call API to register
	};

	return (
		<div className="flex justify-center items-center min-h-screen p-4">
			<div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
				<h2 className="text-2xl font-bold mb-6">Register</h2>

				{/* Add subtle gradient to container */}
				<div className="bg-gradient-to-r from-blue-100 to-blue-50 py-2 rounded">
					{/* Fields */}
					<div className="mb-4">
						<IconField name="name" icon={<BiUser />} />
					</div>

					<div className="mb-4">
						<IconField name="email" icon={<IoMdMail />} />
					</div>

					<div className="mb-4">
						<IconField name="password" icon={<BiLock />} />
					</div>
				</div>

				<SubmitButton />
			</div>
		</div>
	);
}
export default RegistrationForm;
// Reusable field component
const IconField = ({ name, icon }) => {
	const [focused, setFocused] = useState(false);
	const handleFocus = () => setFocused(true);
	const handleBlur = () => setFocused(false);
	return (
		<div className="flex items-center">
			<span
				className={`text-xl p-2 rounded-full 
          hover:bg-blue-100 ${focused ? "bg-blue-100" : ""}`}>
				{icon}
			</span>

			<input className="w-full p-2 border border-blue-200 rounded" />
		</div>
	);
};

// Submit button with hover effect
const SubmitButton = () => (
	<button className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-white">
		Register
	</button>
);
