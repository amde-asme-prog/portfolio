import { FaQuoteLeft, FaQuoteRight, FaStar } from "react-icons/fa";
import { motion } from "framer-motion";
import { useContext } from "react";
import FeedbackContext from "../context/FeedbackProvider";

export default function Testimonials() {
  const { feedbacks } = useContext(FeedbackContext);

  return (
    <div className="flex flex-wrap justify-center lg:justify-start gap-4">
      {feedbacks.map((testimonial, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="bg-background_card text-text_primary w-full md:w-80 shadow-md rounded-lg p-2 sm:p-4 mb-6 text-center flex flex-col items-center space-y-6"
        >
          <p className="text-lg text-text_secondary text-wrap flex">
            <span className="italic font-thin text-xl self-start justify-self-start mr-1">
              <FaQuoteLeft className="text-text_secondary font-thin italic" />
            </span>
            <span className="font-serif font-extralight italic text-base">
              {testimonial.comment}
            </span>
            <span className="italic font-thin text-xl self-end justify-self-end ml-1">
              <FaQuoteRight className="text-text_secondary font-thin" />
            </span>
          </p>

          <div className="self-start flex space-x-3 justify-center items-center">
            <div className="overflow-clip size-20">
              <img
                src="/assets/logo.jpg"
                alt={testimonial.name}
                className="size-fit rounded-full md:mb-0 bg-contain bg-background_container "
              />
            </div>
            <div className="flex-1 flex flex-col items-start self-end mb-2">
              <h3 className="text-lg font-bold font-montserrat">
                {testimonial.name}
              </h3>
              <small className="text-xs self-start font-roboto">
                {testimonial.job}
              </small>
              <div>
                <div className="flex ">
                  {[...Array(5)].map((star, i) => {
                    return (
                      <FaStar
                        key={i}
                        className={
                          Math.floor(parseFloat(testimonial.rating)) > i
                            ? "text-yellow-400"
                            : "text-gray-400"
                        }
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
