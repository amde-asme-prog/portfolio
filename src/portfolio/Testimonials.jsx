import { FaQuoteLeft, FaQuoteRight, FaStar } from "react-icons/fa";
import { motion } from "framer-motion";
import { useContext } from "react";
import FeedbackContext from "../context/FeedbackProvider";

export default function Testimonials() {
	const { feedbacks } = useContext(FeedbackContext);

	return (
		<div className="flex flex-wrap justify-center  sm:justify-start sm:gap-x-4">
			{feedbacks.map((testimonial, index) => (
				<motion.div
					key={index}
					initial={{ opacity: 0, y: 50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: index * 0.1 }}
					className="bg-background_card  w-80 sm:w-96 shadow-md rounded-lg p-2 sm:p-4 mb-6 text-center flex flex-col items-center space-y-6">
					<p className="text-lg text-text_secondary text-wrap flex">
						<span className="italic font-thin text-2xl self-start justify-self-start mr-1">
							<FaQuoteLeft className="text-text_secondary font-thin italic" />
						</span>
						<span className="font-serif font-extralight italic text-base">
							{testimonial.comment}
						</span>
						<span className="italic font-thin text-2xl self-end justify-self-end ml-1">
							<FaQuoteRight className="text-text_secondary font-thin" />
						</span>
					</p>

					<div className="flex-1 self-start flex space-x-3 justify-center items-center">
						<img
							src={testimonial.photo}
							alt={testimonial.name}
							className="w-24 h-24 rounded-full mb-4 md:mb-0 bg-contain  object-cover bg-background_primary"
						/>
						<div className="flex-1 flex flex-col items-start mb-2">
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
