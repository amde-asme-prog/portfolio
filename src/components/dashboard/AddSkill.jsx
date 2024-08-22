import axios from "axios";
import { useState } from "react";
import React from "react";

const AddSkill = () => {
	const [name, setName] = useState("");
	const [level, setLevel] = useState("");

	const handleSubmit = (e) => {
		// e.preventDefault();
		// axios.post("/api/skills", { name, level }).then(() => {
		// 	setName("");
		// 	setLevel("");
		// });
	};

	return (
		<form onSubmit={handleSubmit} className="mb-4">
			<h3 className="text-lg font-medium mb-2">Add New Skill</h3>
			<input
				type="text"
				placeholder="Skill Name"
				value={name}
				onChange={(e) => setName(e.target.value)}
				className="border p-2 mb-2"
			/>
			<input
				type="text"
				placeholder="Skill Level"
				value={level}
				onChange={(e) => setLevel(e.target.value)}
				className="border p-2 mb-2"
			/>
			<button type="submit" className="bg-blue-500 text-white p-2 rounded">
				Add Skill
			</button>
		</form>
	);
};

export const AddProject = () => {
	const [title, setTitle] = useState("");

	const handleSubmit = (e) => {
		// e.preventDefault();
		// axios.post("/api/projects", { title }).then(() => {
		// 	setTitle("");
		// });
	};

	return (
		<form onSubmit={handleSubmit} className="mb-4">
			<h3 className="text-lg font-medium mb-2">Add New Project</h3>
			<input
				type="text"
				placeholder="Project Title"
				value={title}
				onChange={(e) => setTitle(e.target.value)}
				className="border p-2 mb-2"
			/>
			<button type="submit" className="bg-blue-500 text-white p-2 rounded">
				Add Project
			</button>
		</form>
	);
};

export default {
	AddSkill,
	AddProject,
};
