import { useState, useLayoutEffect } from "react";
import StarRating from "./StarRating";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import ModalContainer from "./ModalContainer";

const FeedbackModal = ({ isOpen, onClose, onSubmit, initialData = {} }) => {
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
    console.log("working");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <ModalContainer
      onClose={onClose}
      isOpen={isOpen}
      handleSubmit={handleSubmit}
    >
      <DialogTitle className="text-xl font-bold mb-4">Edit User</DialogTitle>
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
          rows="3"
        ></textarea>
      </form>
    </ModalContainer>
  );
};

export default FeedbackModal;
