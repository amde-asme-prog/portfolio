import { useState, useEffect, useLayoutEffect } from "react";

import { FaEdit, FaStar, FaTrash } from "react-icons/fa";
import FeedbackModal from "./FeedbackModal";

const Rate = ({ rating }) => {
	const [hover, setHover] = useState(null);

	return (
		<div className="flex">
			{[...Array(5)].map((star, i) => {
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
						/>
					</label>
				);
			})}
		</div>
	);
};

const Table = () => {
	const [modalOpen, setModalOpen] = useState(false);
	const [editingUser, setEditingUser] = useState({});
	const [users, setUsers] = useState([
		{
			id: 1,
			name: "John Doe",
			email: "john@example.com",
			rating: 4,
			date: "05-2023",
			comment: "Great user!",
		},
		{
			id: 2,
			name: "Jane Smith",
			email: "jane@example.com",
			rating: 3,
			date: "06-2023",
			comment: "Good experience.",
		},
	]);

	const handleEdit = (user) => {
		setEditingUser(user);
		setModalOpen(true);
	};

	const handleDelete = (id) => {
		setUsers(users.filter((user) => user.id !== id));
	};

	const handleSubmit = (formData) => {
		setUsers(
			users.map((user) =>
				user.id === editingUser.id ? { ...user, ...formData } : user
			)
		);
	};

	return (
		<>
			<div className="light overflow-x-auto bg-background_card rounded-lg shadow">
				<table className="w-full text-sm  bg-background_card text-text_secondary">
					<caption className="caption-top">Users Feedback Table</caption>
					<thead className="">
						<tr className="bg-background_link_hover  uppercase text-sm leading-normal border-b border-background_link_active">
							<th colSpan={2} className="py-3 px-6 text-center">
								profile
							</th>
							<th className="py-3 px-6 text-left">Name</th>
							<th className="py-3 px-6 text-left">Email</th>
							<th className="py-3 px-6 text-left">Rating</th>
							<th className="py-3 px-6 text-left">Date</th>
							<th className="py-3 px-6 text-left">Comment</th>
							<th className="py-3 px-6 text-center">Action</th>
						</tr>
					</thead>
					<tbody className="text-text_secondary text-opacity-75 text-sm font-light shadow-2xl shadow-slate-900">
						{users.map((user, index) => (
							<tr
								key={user.id}
								className="border-b border-border_primary hover:bg-background_link_hover transition-colors duration-500">
								<td>{index}</td>
								<td>photo</td>
								<td className="py-3 px-6 text-left whitespace-nowrap">
									<div className="flex items-center">
										<span className="font-medium">{user.name}</span>
									</div>
								</td>
								<td className="py-3 px-6 text-left">
									<div className="flex items-center">
										<span>{user.email}</span>
									</div>
								</td>
								<td className="py-3 px-6 text-left">
									<Rate rating={user.rating} />
								</td>
								<td className="py-3 px-6 text-left">
									<span>{user.date}</span>
								</td>
								<td className="py-3 px-6 text-left">
									<p className="truncate w-64">{user.comment}</p>
								</td>
								<td className="py-3 px-6 text-center">
									<div className="flex item-center justify-center">
										<button
											onClick={() => handleEdit(user)}
											className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
											<FaEdit icon="edit" />
										</button>
										<button
											onClick={() => handleDelete(user.id)}
											className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
											<FaTrash />
										</button>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			<FeedbackModal
				isOpen={modalOpen}
				onClose={() => setModalOpen(false)}
				onSubmit={handleSubmit}
				initialData={editingUser}
			/>
		</>
	);
};

export default Table;
