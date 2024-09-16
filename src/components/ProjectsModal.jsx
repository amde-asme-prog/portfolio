import React, { useState, useEffect } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import ModalContainer from "./ModalContainer";

const ProjectModal = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [name, setName] = useState("");
  const [tools, setTools] = useState("");
  const [myRole, setMyRole] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setTools(initialData.tools.join(", "));
      setMyRole(initialData.myRole);
      setDescription(initialData.description);
      setLink(initialData.link);
    }
  }, [initialData]);

  const handleSubmit = () => {
    const newProject = {
      name,
      tools: tools.split(", ").map((tool) => tool.trim()),
      myRole,
      description,
      link,
    };
    onSubmit(newProject);
    onClose();
  };

  return (
    <ModalContainer
      onClose={onClose}
      isOpen={isOpen}
      handleSubmit={handleSubmit}
    >
      <DialogTitle className="text-xl font-bold mb-4">
        {initialData ? "Edit Project" : "Add Project"}
      </DialogTitle>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Project Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full border border-input_border_color rounded-md p-2 bg-input_background_color text-input_text_color"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Tools</label>
          <input
            type="text"
            value={tools}
            onChange={(e) => setTools(e.target.value)}
            className="mt-1 block w-full border border-input_border_color rounded-md p-2 bg-input_background_color text-input_text_color"
          />
          <small className="text-xs text-text_subtle">
            Comma-separated list
          </small>
        </div>
        <div>
          <label className="block text-sm font-medium">Role</label>
          <input
            type="text"
            value={myRole}
            onChange={(e) => setMyRole(e.target.value)}
            className="mt-1 block w-full border border-input_border_color rounded-md p-2 bg-input_background_color text-input_text_color"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full border border-input_border_color rounded-md p-2 bg-input_background_color text-input_text_color"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Link</label>
          <input
            type="text"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className="mt-1 block w-full border border-input_border_color rounded-md p-2 bg-input_background_color text-input_text_color"
          />
        </div>
      </div>
    </ModalContainer>
  );
};

export default ProjectModal;
