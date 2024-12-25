import { useState } from "react";
import { FaStar } from "react-icons/fa";

const StarRating = ({ rating, onRatingChange }) => {
	const [hover, setHover] = useState(null);

	return (
		<div className="flex">
			{[...Array(5)].map((star, i) => {
				const ratingValue = i + 1;

				//!ratingValue = 1
				return (
					<label key={i}>
						<input
							type="radio"
							name="rating"
							className="hidden"
							value={ratingValue}
							onClick={() => onRatingChange(ratingValue)}
						/>
						<FaStar
							className={`cursor-pointer transition-colors duration-200 ${
								ratingValue <= (hover || rating)
									? "text-yellow-400"
									: "text-gray-300"
							}`}
							size="sm"
							onMouseEnter={() => setHover(ratingValue)}
							onMouseLeave={() => setHover(null)}
						/>
					</label>
				);
			})}
		</div>
	);
};

export default StarRating;
