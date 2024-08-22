import { FaStar } from "react-icons/fa";

export default function Testimonials() {
	const testimonials = [
		{
			name: "John Doe",
			rating: 5,
			photo: "https://via.placeholder.com/150",
			comment:
				"Amazing developer! Delivered the project on time and exceeded my expectations.",
		},
		{
			name: "Jane Smith",
			rating: 4,
			photo: "https://via.placeholder.com/150",
			comment:
				"Very professional and easy to work with. The end result was exactly what I needed.",
		},
		{
			name: "Mike Johnson",
			rating: 4.5,
			photo: "https://via.placeholder.com/150",
			comment: "Great work! Would definitely recommend.",
		},
	];

	return (
		<div className="container flex flex-wrap justify-center sm:justify-start space-x-2 ">
			{testimonials.map((testimonial, index) => (
				<div
					key={index}
					className="bg-background_secondary w-44 shadow-md rounded-lg p-4 mb-6 text-center flex flex-col justify-around items-center ">
					<img
						src={testimonial.photo}
						alt={testimonial.name}
						className="w-24 h-24 rounded-full mb-4 md:mb-0  object-cover"
					/>
					<div className="flex-1 ">
						<h3 className="text-lg font-bold font-montserrat">
							{testimonial.name}
						</h3>
						<div className="flex-1 flex justify-center items-center mb-2">
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
							<span className="ml-2 text-sm text-gray-600">
								{testimonial.rating} /{" "}
								<ruby>
									<rb className="my-2">5</rb>
									<rt>
										<FaStar className="text-yellow-400" />
									</rt>
								</ruby>
							</span>
						</div>
						<p className="text-lg font-roboto text-text_secondary">
							<details>
								<summary className="px-2 cursor-pointer font-bold">
									comment
								</summary>
								<small className="font-light italic font-roboto text-text_tertiary">
									<q>{testimonial.comment}</q>
								</small>
							</details>
						</p>
					</div>
				</div>
			))}
		</div>
	);
}
