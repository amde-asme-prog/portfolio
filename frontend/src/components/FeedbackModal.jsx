import { useState, useEffect } from "react";
import StarRating from "./StarRating";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import {
  useAddFeedbackMutation,
  useUpdateFeedbackMutation,
} from "../hooks/feedbackQuery";
import { handleToast } from "../common/handleToast";

const FeedbackModal = ({ isOpen, onClose, initialData }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [job, setJob] = useState("");
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");

  const [error, setError] = useState("");

  const { mutate: addFeedback } = useAddFeedbackMutation();
  const { mutate: updateFeedback } = useUpdateFeedbackMutation();

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setEmail(initialData.email);
      setJob(initialData.job);
      setRating(initialData.rating);
      setComment(initialData.comment);
    }
  }, [initialData]);

  const validateForm = () => {
    if (!name || !email || !rating) {
      return "Please fill in all required fields.";
    }
    return null;
  };

  const handleSubmit = (e) => {
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }
    const formData = { name, email, job, rating, comment };

    if (initialData) {
      updateFeedback(
        { id: initialData.id, updatedFeedback: formData },
        {
          onSuccess: () => {
            handleToast(200, "Feedback updated successfully.");
            onClose();
          },
          onError: (error) => {
            handleToast(
              422,
              error.response?.data?.message || "Error updating feedback."
            );
          },
        }
      );
      onClose(); // Close the modal
    } else {
      addFeedback(formData, {
        onSuccess: () => {
          handleToast(200, "Feedback added successfully.");
          onClose();
        },
        onError: (error) => {
          handleToast(
            422,
            error.response?.data?.message || "Error adding feedback."
          );
        },
      });
      onClose(); // Close the modal
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed z-10 content-center inset-0 bg-black/35 backdrop-blur-sm transition-colors duration-200 overflow-y-scroll mt-10 mb-4"
    >
      <DialogPanel className="place-self-center relative top-16 bg-background_card  text-text_primary p-6 rounded-lg shadow-lg w-11/12 mx-auto  md:w-96">
        <DialogTitle className="text-xl font-bold mb-4">
          Provide Feedback
        </DialogTitle>
        <form className="space-y-6">
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              className="mt-2 p-2 w-full border rounded bg-input_background_color"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="mt-2 p-2 w-full border rounded bg-input_background_color"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="job" className="block text-sm font-medium">
              Job (Optional)
            </label>
            <input
              type="text"
              id="job"
              name="job"
              value={job}
              onChange={(e) => setJob(e.target.value)}
              placeholder="Job Title (Optional)"
              className="mt-2 p-2 w-full border rounded bg-input_background_color"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="rating" className="block text-sm font-medium">
              Rating <span className="text-red-500">*</span>
            </label>
            <StarRating
              rating={rating}
              onRatingChange={(rating) => setRating(rating)}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="comment" className="block text-sm font-medium">
              Comment (Optional)
            </label>
            <textarea
              id="comment"
              name="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Comment"
              className="mt-2 p-2 w-full border rounded bg-input_background_color"
              rows="3"
            ></textarea>
          </div>

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-400 text-white px-6 py-3 rounded-lg hover:bg-gray-500 transition"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="bg-button_primary text-white px-6 py-3 rounded-lg hover:bg-button_hover transition"
            >
              Save
            </button>
          </div>
        </form>
      </DialogPanel>
    </Dialog>
  );
};

export default FeedbackModal;
