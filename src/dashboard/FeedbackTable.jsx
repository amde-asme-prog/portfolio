import { useContext, useState } from "react";
import { FaStar } from "react-icons/fa";
import FeedbackModal from "../components/FeedbackModal";
import TableRow from "./components/TableRow";
import TableHead from "./components/TableHead";
import FeedbackContext from "../context/FeedbackProvider";

const Rate = ({ rating }) => {
	const [hover, setHover] = useState(null);

	return (
		<div className="flex">
			{[...Array(5)].map((_, i) => {
				const ratingValue = i + 1;
				return (
					<label key={i}>
						<FaStar
							className={`cursor-pointer transition-colors duration-300 ${
								ratingValue <= (hover || rating)
									? "text-yellow-400"
									: "text-gray-300"
							}`}
							size="14"
							onMouseEnter={() => setHover(ratingValue)}
							onMouseLeave={() => setHover(null)}
						/>
					</label>
				);
			})}
		</div>
	);
};

const FeedbackTable = () => {
	const {
		feedbacks,
		modalOpen,
		setModalOpen,
		editingFeedback,
		setEditingFeedback,
		handleEdit,
		handleAdd,
		handleDelete,
	} = useContext(FeedbackContext);

	const columns = ["Name", "Email", "Job", "Rating", "Date", "Comment"];

	return (
		<>
			<div className="overflow-x-auto rounded-lg shadow-sm">
				<div className="flex justify-between items-center mb-6">
					<h1 className="text-3xl font-bold text-heading">Feedback Table</h1>
					<button
						onClick={() => setModalOpen(true)}
						className="bg-button_primary text-button_text py-2 px-4 rounded hover:bg-button_hover transition">
						Add New Feedback
					</button>
				</div>
				<div className="overflow-x-auto rounded-lg shadow-lg bg-background_card border border-border_primary">
					<table className="w-full text-sm text-text_secondary">
						<TableHead columnsData={columns} />

						<tbody className="text-text_secondary  text-sm font-light">
							{feedbacks.map((feedback) => (
								<TableRow
									key={feedback.id}
									item={feedback}
									handleDelete={handleDelete}
									handleEdit={handleEdit}>
									<td className="py-2 px-4 text-left align-top flex items-start gap-2">
										<img
											src={feedback.photo}
											alt={feedback.name}
											className="bg-contain size-8 rounded-full"
										/>
										<span className="font-medium">{feedback.name}</span>
									</td>
									<td className="py-3 px-4 text-left align-top">
										<span>{feedback.email}</span>
									</td>
									<td className="py-2 px-4 text-left align-top">
										<span>{feedback.job}</span>
									</td>
									<td className="py-2 px-4 text-left align-top">
										<Rate rating={feedback.rating} />
									</td>
									<td className="py-2 px-4 text-left align-top">
										<span>{feedback.date}</span>
									</td>
									<td className="py-2 px-4 text-left align-top">
										<p className="text-wrap align-top w-64">
											{feedback.comment}
										</p>
									</td>
								</TableRow>
							))}
						</tbody>
					</table>
				</div>
			</div>

			<FeedbackModal
				isOpen={modalOpen}
				onClose={() => {
					setModalOpen(false);
					setEditingFeedback({});
				}}
				onSubmit={handleAdd}
				initialData={editingFeedback}
			/>
		</>
	);
};

export default FeedbackTable;
