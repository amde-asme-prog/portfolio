import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
	return (
		<footer className="bg-background_secondary text-text_primary p-4">
			<div className="container mx-auto flex justify-around items-center">
				<p className="text-sm">
					&copy; {new Date().getFullYear()} Amdebirhan Asmamaw. All rights
					reserved.
				</p>
				<div className="flex space-x-4">
					<a
						href="https://github.com/amde-asme-prog"
						className="text-button_primary hover:text-button_hover transition-transform transform hover:scale-110">
						<FaGithub size={20} />
					</a>
					<a
						href="https://linkedin.com/in/amdebirhan-asmamaw"
						className="text-button_primary hover:text-button_hover transition-transform transform hover:scale-110">
						<FaLinkedin size={20} />
					</a>
					<a
						href="https://twitter.com/"
						className="text-button_primary hover:text-button_hover transition-transform transform hover:scale-110">
						<FaTwitter size={20} />
					</a>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
