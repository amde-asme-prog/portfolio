import { BiPhone } from "react-icons/bi";
import { GoLocation } from "react-icons/go";
import { MdEmail } from "react-icons/md";

const Contact = () => {
	return (
		<section
			id="contact"
			className="py-24 w-full bg-background_primary flex flex-wrap justify-center gap-x-20 items-start">
			<div className="m-5 mb-4 w-full max-w-lg ">
				<h1 className="text-4xl font-bold mb-6 text-heading text-center">
					Let&rsquo;s Connect
				</h1>
				<form className="w-full flex flex-col justify-start gap-y-4 px-6 py-6 bg-background_secondary rounded-lg shadow-lg">
					<p className="italic text-text_accent">
						If you want to know more about me or my work, or if you would just
						like to say hello, send me a message. I'd love to hear from you.
					</p>

					<div className="mb-6">
						<label
							htmlFor="name"
							className="block text-lg font-medium text-text_secondary">
							Name
						</label>
						<input
							type="text"
							id="name"
							className="bg-background_accent mt-1 block w-full px-4 py-2 border border-border_primary rounded-md shadow-sm focus:border-text_tertiary focus:ring "
							placeholder="Your Name"
						/>
					</div>
					<div className="mb-6">
						<label
							htmlFor="email"
							className="block text-lg font-medium text-text_secondary">
							Email
						</label>
						<input
							type="email"
							id="email"
							className="bg-background_accent mt-1 block w-full px-4 py-2 border border-border_primary rounded-md shadow-sm focus:border-blue-500 focus:ring "
							placeholder="Your Email"
						/>
					</div>
					<div className="mb-6">
						<label
							htmlFor="message"
							className="block text-lg font-medium text-text_secondary">
							Message
						</label>
						<textarea
							id="message"
							rows="4"
							className="bg-background_accent  mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring "
							placeholder="Your Message"></textarea>
					</div>
					<button
						type="submit"
						className="w-full bg-button_primary text-white px-4 py-2 rounded-md font-medium hover:bg-blue-600 transition-colors">
						Send Message
					</button>
				</form>
			</div>
			<div className="mt-8 text-3xl flex flex-col gap-5 h-full self-center   ">
				<div className="flex flex-col gap-y-4 mt-8">
					<div className="flex items-center gap-x-2">
						<div className="rounded-md shadow-lg p-2 bg-background_secondary ">
							<MdEmail
								size={24}
								cursor={"pointer"}
								className="text-text_secondary"
							/>
						</div>
						<div className="not-italic text-lg text-text_secondary ml-2">
							<span className="capitalize">email</span>
							<address className="font-bold text-lg text-text_accent">
								Amdebrhanasmamaw93@gmail.com
							</address>
						</div>
					</div>
					<div className="flex items-center gap-x-2">
						<div className="rounded-md shadow-lg p-2 bg-background_secondary">
							<BiPhone
								size={24}
								cursor={"pointer"}
								className="text-text_secondary"
							/>
						</div>
						<div className="flex flex-col justify-start text-lg text-text_secondary ml-2">
							<span className="capitalize">phone</span>
							<address className="font-bold text-lg text-text_accent">
								(+251) 921-975-184
							</address>
						</div>
					</div>
					<div className="flex items-center gap-x-2">
						<div className="rounded-md shadow-lg p-2 bg-background_secondary ">
							<GoLocation
								size={24}
								color="background_secondary"
								cursor={"pointer"}
								className="text-text_secondary"
							/>
						</div>
						<div className="flex flex-col justify-start text-lg text-text_secondary ml-2">
							<span className="capitalize">location</span>
							<address className="font-bold text-lg text-text_accent">
								Addis ababa, Ethiopia
							</address>
						</div>
					</div>
				</div>
				<button className="capitalize w-full bg-button_primary bg-opacity-20 text-white px-4 py-2 rounded-md font-medium hover:bg-opacity-100 transition-colors">
					Hire Me
				</button>
			</div>
		</section>
	);
};

export default Contact;
