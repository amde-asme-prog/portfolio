import { createContext, useState } from "react";

const FeedbackContext = createContext();

export function FeedbackProvider({ children }) {
	const [feedbacks, setFeedbacks] = useState([
		{
			name: "John Doe",
			email: "Johndoe@gmail.com",
			job: "ceo",
			rating: 5,
			photo: "https://via.placeholder.com/150",
			comment:
				"Amazing developer! Delivered the project on time and exceeded my expectations.",
		},
		{
			name: "Jane Smith",
			email: "janesmith@gmail.com",
			job: "ceo",
			rating: 4,
			photo: "https://via.placeholder.com/150",
			comment:
				"Very professional and easy to work with. The end result was exactly what I needed.",
		},
		{
			name: "Mike Johnson",
			email: "mike@gmail.com",
			job: "ceo",
			rating: 4.5,
			photo: "https://via.placeholder.com/150",
			comment: "Great work! Would definitely recommend.",
		},
	]);
	const [editingFeedback, setEditingFeedback] = useState({});
	const [modalOpen, setModalOpen] = useState(false);

	function handleAdd(newFeedback) {
		setFeedbacks((prevFeedbacks) => {
			return prevFeedbacks;
		});
	}

	function handleEdit(feedback) {
		setEditingFeedback(feedback);
		setModalOpen(true);
	}
	function handleDelete(id) {
		setFeedbacks((prevFeedbacks) =>
			prevFeedbacks.filter((feedback) => feedback.id != id)
		);
	}

	return (
		<FeedbackContext.Provider
			value={{
				feedbacks,
				editingFeedback,
				setEditingFeedback,
				modalOpen,
				setModalOpen,
				handleEdit,
				handleAdd,
				handleDelete,
			}}>
			{children}
		</FeedbackContext.Provider>
	);
}

export default FeedbackContext;
