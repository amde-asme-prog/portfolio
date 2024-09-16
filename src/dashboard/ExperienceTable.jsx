import React, { useContext, useState } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import ExperienceModal from "../components/ExperienceModal";
import TableHead from "./components/TableHead";
import TableRow from "./components/TableRow";
import ExperienceContext from "../context/ExperienceProvider";

const ExperienceTable = () => {
	const {
		experience,
		modalOpen,
		setModalOpen,
		editingExperience,
		setEditingExperience,
		handleAdd,
		handleEdit,
		handleDelete,
	} = useContext(ExperienceContext);

	return (
		<div className="overflow-x-auto rounded-lg shadow-sm">
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-3xl font-bold text-heading">Experience Table</h1>
				<button
					onClick={() => setModalOpen(true)}
					className="bg-button_primary text-button_text py-2 px-4 rounded hover:bg-button_hover transition">
					Add New Experience
				</button>
			</div>
			<div className="overflow-x-auto rounded-lg shadow-lg bg-background_card border border-border_primary">
				<table className="min-w-full text-sm text-text_secondary">
					<TableHead
						columnsData={["Title", "Company", "Duration", "Technologies"]}
					/>
					<tbody>
						{experience.map((item) => (
							<TableRow
								key={item.id}
								item={item}
								handleDelete={handleDelete}
								handleEdit={handleEdit}>
								<td className="py-3 px-4">{item.title}</td>
								<td className="py-3 px-4">{item.company}</td>
								<td className="py-3 px-4">{item.duration}</td>
								<td className="py-3 px-4">{item.technologies.join(", ")}</td>
							</TableRow>
						))}
					</tbody>
				</table>
			</div>

			{modalOpen && (
				<ExperienceModal
					isOpen={modalOpen}
					onClose={() => setModalOpen(false)}
					onSubmit={handleAdd}
					initialData={editingExperience}
				/>
			)}
		</div>
	);
};

export default ExperienceTable;
