// Feedback.js
import { FaQuoteLeft, FaStar, FaUser } from "react-icons/fa";
import { motion } from "framer-motion";
import { useFeedbacksQuery } from "../../hooks/feedbackQuery";
import { useEffect, useState } from "react";

export default function Feedback() {
  const [feedbacks, setFeedbacks] = useState([]);
  const { data: feedbacksData, isLoading, error } = useFeedbacksQuery();

  useEffect(() => {
    if (feedbacksData) {
      setFeedbacks(feedbacksData);
    }
  }, [feedbacksData]);

  if (isLoading) {
    return (
      <div className="h-64 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-64 flex items-center justify-center text-red-500">
        <p>Error loading feedback</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {feedbacks.map((feedback, index) => (
        <FeedbackCard key={index} feedback={feedback} index={index} />
      ))}
    </div>
  );
}

function FeedbackCard({ feedback, index }) {
  return (
    <div className="ring-1  ring-blue-400 bg-gray-100 dark:bg-gray-800 rounded-2xl shadow-xl p-6 flex flex-col gap-6 transform hover:scale-[1.02] transition-transform duration-300">
      <div className="relative">
        <FaQuoteLeft className="text-4xl text-blue-500 opacity-20 absolute -top-2 -left-2 pb-4" />
        <p className="text-gray-600 dark:text-gray-300 pt-8 px-2 italic">
          {feedback.comment || "No feedback provided."}
        </p>
      </div>

      <div className="flex items-center gap-4 mt-auto">
        {feedback.avatar ? (
          <img
            src={feedback.avatar}
            alt={feedback.name}
            className="w-14 h-14 rounded-full object-cover"
          />
        ) : (
          <div className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
            <FaUser className="text-white text-xl" />
          </div>
        )}

        <div className="flex-1">
          <h3 className="font-bold text-gray-800 dark:text-gray-200">
            {feedback.name || "Anonymous"}
          </h3>
          {feedback.job && (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {feedback.job}
            </p>
          )}
          <div className="flex gap-1 mt-1">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                className={`text-sm ${
                  i < Math.floor(feedback.rating || 0)
                    ? "text-yellow-400"
                    : "text-gray-300 dark:text-gray-600"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
