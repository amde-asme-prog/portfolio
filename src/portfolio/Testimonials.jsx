import { FaQuoteLeft, FaQuoteRight, FaStar } from "react-icons/fa";

export default function Testimonials() {
	const testimonials = [
		{
			name: "John Doe",
			rating: 5,
			job: "ceo",
			photo: "https://via.placeholder.com/150",
			comment:
				"Amazing developer! Delivered the project on time and exceeded my expectations.",
		},
		{
			name: "Jane Smith",
			rating: 4,
			photo: "https://via.placeholder.com/150",
			job: "ceo",
			comment:
				"Very professional and easy to work with. The end result was exactly what I needed.",
		},
		{
			name: "Mike Johnson",
			rating: 4.5,
			job: "ceo",
			photo: "https://via.placeholder.com/150",
			comment: "Great work! Would definitely recommend.",
		},
	];

	return (
		<div className="flex flex-wrap justify-center sm:justify-start space-x-2 ">
			{testimonials.map((testimonial, index) => (
				<div
					key={index}
					className="bg-background_secondary  w-96 shadow-md rounded-lg p-4 mb-6 text-center flex flex-col items-center space-y-4">
					<p className="text-lg italic font-thin text-text_secondary text-wrap flex">
						<span className="italic font-extralight text-2xl self-start justify-self-start">
							<FaQuoteLeft className="text-text_secondary" />
						</span>
						<span>{testimonial.comment}</span>
						<span className="italic font-extralight text-2xl self-end justify-self-end">
							<FaQuoteRight className="text-text_secondary" />
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
				</div>
			))}
		</div>
	);
}
