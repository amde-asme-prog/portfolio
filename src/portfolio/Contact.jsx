import { useState, useRef } from "react";
import { BiPhone } from "react-icons/bi";
import { GoLocation } from "react-icons/go";
import { MdEmail } from "react-icons/md";
import emailjs from "@emailjs/browser";
import { RiShakeHandsLine } from "react-icons/ri";
import { motion } from "framer-motion";

const SERVICE_ID = "service_ecb503a";
const TEMPLATE_ID = "template_iuajp3p";
const PUBLIC_KEY = "CVBjB8BkVTJFPW0YT";
const Contact = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    console.log(form.current);
    emailjs
      .sendForm(SERVICE_ID, TEMPLATE_ID, form.current, {
        publicKey: PUBLIC_KEY,
      })
      .then(
        (response) => {
          console.log(response);
          console.log("SUCCESS!");
        },
        (error) => {
          console.log("FAILED...", error.text);
        }
      );
  };

  const handleSubmit = async (e) => {
    // e.preventDefault();
    const formData = new FormData();
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("message", message);
    console.log(formData);
    const response = await fetch(
      "https://formsubmit.co/amdebrhanasmamaw93@gmail.com",
      {
        method: "POST",
        body: formData,
      }
    );
    console.log(response);
    const data = await response.json();
    console.log(data);
    const reply =
      "Hey {{user_name}}!Thank you for contacting us. We will reply to you soon. Best regards,The Awesome Team";
  };
  return (
    <section
      id="contact"
      className="py-20 w-full bg-gradient-to-br from-background_container to-background_card_accent flex flex-wrap justify-center gap-x-20 items-start"
    >
      <div className="m-5 mb-4 w-full max-w-lg ">
        <h1 className="text-4xl font-bold mb-6 text-heading text-center">
          Let&rsquo;s Connect
        </h1>
        <form
          ref={form}
          className="w-full flex flex-col justify-start gap-y-4 px-6 py-6 bg-background_card_accent rounded-lg shadow-lg"
        >
          <p className="italic text-text_accent">
            If you want to know more about me or my work, or if you would just
            like to say hello, send me a message. I'd love to hear from you.
          </p>
          <div className="mb-6">
            <label
              htmlFor="name"
              className="block text-lg font-medium text-text_secondary"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="username"
              className="bg-background_accent text-text_secondary mt-1 block w-full px-4 py-2 border border-border_primary rounded-md shadow-sm focus:border-text_tertiary  "
              placeholder="Your Name"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-lg font-medium text-text_secondary"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="bg-background_accent text-text_secondary mt-1 block w-full px-4 py-2 border border-border_primary rounded-md shadow-sm focus:border-text_tertiary  "
              placeholder="Your Email"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="message"
              className="block text-lg font-medium text-text_secondary"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="4"
              className="bg-background_accent text-text_secondary mt-1 block w-full px-4 py-2 border border-border_primary rounded-md shadow-sm focus:border-text_tertiary  "
              placeholder="Your Message"
            ></textarea>
          </div>
          <button
            type="submit"
            onClick={sendEmail}
            className="w-full bg-button_primary text-white px-4 py-2 rounded-md font-medium hover:bg-blue-600 transition-colors"
          >
            Send Message
          </button>
        </form>
      </div>
      <div className="mt-8 text-3xl flex flex-col gap-5 h-full self-center flex-wrap max-sm:mx-4">
        <div className="flex flex-col gap-y-4 mt-8">
          <div className="flex items-center gap-x-2">
            <div className="rounded-md shadow-lg p-2 bg-background_card">
              <MdEmail
                size={24}
                cursor={"pointer"}
                className="text-text_secondary"
                onClick={() => {
                  console.log("Amdebrhanasmamaw93@gmail.com".valueOf());
                }}
              />
            </div>
            <div className="not-italic text-lg text-text_secondary ml-2">
              <span className="capitalize">email</span>
              <address className="font-bold text-base lg:text-lg  text-text_accent text-wrap overflow-ellipsis">
                Amdebrhanasmamaw93@gmail.com
              </address>
            </div>
          </div>
          <div className="flex items-center gap-x-2">
            <div className="rounded-md shadow-lg p-2 bg-background_card">
              <BiPhone
                size={24}
                cursor={"pointer"}
                className="text-text_secondary"
                onClick={() => {
                  console.log("(+251) 921-975-184".valueOf());
                }}
              />
            </div>
            <div className="flex flex-col justify-start text-lg text-text_secondary ml-2">
              <span className="capitalize">phone</span>
              <address className="font-bold text-base lg:text-lg  text-text_accent text-wrap overflow-ellipsis">
                (+251) 921-975-184
              </address>
            </div>
          </div>
          <div className="flex items-center gap-x-2 ">
            <div className="rounded-md shadow-lg p-2 bg-background_card ">
              <GoLocation
                size={24}
                color="background_card"
                cursor={"pointer"}
                className="text-text_secondary"
              />
            </div>
            <div className="flex flex-col justify-start text-lg text-text_secondary ml-2">
              <span className="capitalize">location</span>
              <address className="font-bold text-base lg:text-lg  text-text_accent text-wrap overflow-ellipsis">
                Addis ababa, Ethiopia
              </address>
            </div>
          </div>
        </div>
        <motion.a
          href="#contact"
          className=" w-fit uppercase rounded-xl bg-blue-600 text-white px-5 py-3 flex flex-row items-center gap-3 text-lg border-2 border-border_primary "
          whileHover={{ scale: 1.05, rotate: 5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          hire me
          <RiShakeHandsLine
            size={24}
            className="inline-flex text-sm sm:text-base lg:text-lg"
          />
        </motion.a>
      </div>
    </section>
  );
};

export default Contact;
