import { useState, useLayoutEffect } from "react";
import StarRating from "./StarRating";

const FeedbackModal = ({ isOpen, onClose, onSubmit, initialData }) => {
	const [formData, setFormData] = useState({});

	useLayoutEffect(() => {
		setFormData(initialData);
	}, [initialData]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		onSubmit(formData);
		onClose();
	};

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
			<div className="relative top-20 mx-auto p-5 border border-border_card w-96 shadow-lg rounded-md bg-background_card text-text_secondary">
				<div className="mt-3 text-center">
					<h3 className="text-lg leading-6 font-medium text-sub_heading">
						Edit User
					</h3>
					<form onSubmit={handleSubmit} className="mt-2">
						<input
							type="text"
							name="name"
							value={formData.name}
							onChange={handleChange}
							placeholder="Name"
							className="mt-2 p-2 w-full border rounded bg-input_background_color"
						/>
						<input
							type="email"
							name="email"
							value={formData.email}
							onChange={handleChange}
							placeholder="Email"
							className="mt-2 p-2 w-full border rounded bg-input_background_color"
						/>
						<div className="mt-2">
							<label className="block text-sm font-medium ">Rating</label>
							<StarRating
								rating={formData.rating}
								onRatingChange={(rating) =>
									setFormData((prev) => ({ ...prev, rating }))
								}
							/>
						</div>
						<textarea
							name="comment"
							value={formData.comment}
							onChange={handleChange}
							placeholder="Comment"
							className="mt-2 p-2 w-full border rounded bg-input_background_color"
							rows="3"></textarea>
						<div className="items-center px-4 py-3">
							<button
								type="submit"
								className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300">
								Save
							</button>
							<button
								onClick={onClose}
								className="ml-2 px-4 py-2 bg-gray-300 text-gray-800 text-base font-medium rounded-md shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500">
								Close
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default FeedbackModal;
