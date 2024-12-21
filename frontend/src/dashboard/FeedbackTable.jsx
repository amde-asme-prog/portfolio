import { useState } from "react";
import FeedbackModal from "../components/FeedbackModal";
import TableRow from "./components/TableRow";
import TableHead from "./components/TableHead";
import { Rate } from "../common/Rate";
import { useQueryClient } from "@tanstack/react-query";
import {
  useDeleteFeedbackMutation,
  useFeedbacksQuery,
} from "../hooks/feedbackQuery";
import { Toaster } from "sonner";
import { handleToast } from "../common/handleToast";

const FeedbackTable = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingFeedback, setEditingFeedback] = useState(null);

  const queryClient = useQueryClient();
  const {
    data: feedbacks,
    isLoading,
    error,
    fetchStatus,
  } = useFeedbacksQuery();
  const { mutate: deleteFeedback } = useDeleteFeedbackMutation({
    onSuccess: () => {
      queryClient.invalidateQueries("feedbacks");
    },
  });

  function handleDeleteFeedback(id) {
    deleteFeedback(id);
  }

  const handleModalClose = () => {
    setEditingFeedback(null);
    setModalOpen(false);
  };

  const columns = ["Name", "Email", "Job", "Rating", "Comment"];

  return (
    <div className="m-5 p-5  text-stone-900 dark:text-stone-100">
      <Toaster position="top-center" invert richColors />
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 tracking-tight mb-2">
          Feedback Table
        </h1>
        <button
          onClick={() => setModalOpen(true)}
          className="bg-indigo-600 text-white py-2.5 px-6 rounded-lg hover:bg-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
        >
          + Add Feedback
        </button>
      </div>

      <div className="border border-gray-300 dark:border-gray-700 p-1 bg-white dark:bg-gray-800 rounded-md shadow-lg">
        <div className="overflow-x-auto">
          {isLoading && (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
            </div>
          )}

          {error?.response?.status >= 500 && (
            <div className="text-center py-8 text-red-500 dark:text-red-400">
              Error fetching data. Please try again later.
            </div>
          )}

          {error?.response?.status == 404 && (
            <div className="text-center py-12 text-gray-500 dark:text-gray-300">
              No feedbacks found. Add your first feedback!
            </div>
          )}

          {!isLoading && !error && feedbacks && feedbacks.length > 0 && (
            <table className="w-full text-sm text-text_secondary">
              <TableHead columnsData={columns} />
              <tbody className="text-text_secondary font-light">
                {feedbacks.map((feedback) => (
                  <TableRow
                    key={feedback.id}
                    item={feedback}
                    handleDelete={handleDeleteFeedback}
                    handleEdit={() => {
                      setEditingFeedback(feedback);
                      setModalOpen(true);
                    }}
                  >
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
                      <p className="text-wrap align-top w-64">
                        {feedback.comment}
                      </p>
                    </td>
                  </TableRow>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      {modalOpen && (
        <FeedbackModal
          isOpen={modalOpen}
          onClose={handleModalClose}
          initialData={editingFeedback}
        />
      )}
      <div />
    </div>
  );
};

export default FeedbackTable;
