import { useState, useRef } from "react";
import { BiPhone } from "react-icons/bi";
import { GoLocation } from "react-icons/go";
import { MdEmail } from "react-icons/md";
import { RiShakeHandsLine } from "react-icons/ri";
import { motion } from "framer-motion";
import { toast } from "sonner";

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData(form.current);
      const response = await fetch(
        "https://formsubmit.co/amdebrhanasmamaw93@gmail.com",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        toast.success("Message sent successfully!");
        form.current.reset();
      } else {
        toast.error("Failed to send message. Please try again.");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="w-full py-24 bg-gradient-to-b bg-gray-100 dark:bg-stone-900 10"
    >
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* Form Section */}
          <div className="w-full lg:w-3/5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8"
            >
              <h2 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">
                Let's Connect
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                I'd love to hear from you. Send me a message and I'll respond as
                soon as possible.
              </p>

              <form ref={form} onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    rows="5"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-all disabled:opacity-70"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            </motion.div>
          </div>

          {/* Contact Info Section */}
          <div className="w-full lg:w-2/5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8"
            >
              <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                Contact Information
              </h3>

              <div className="space-y-6">
                <ContactItem
                  icon={<MdEmail className="w-6 h-6" />}
                  title="Email"
                  value="Amdebrhanasmamaw93@gmail.com"
                />
                <ContactItem
                  icon={<BiPhone className="w-6 h-6" />}
                  title="Phone"
                  value="(+251) 921-975-184"
                />
                <ContactItem
                  icon={<GoLocation className="w-6 h-6" />}
                  title="Location"
                  value="Addis Ababa, Ethiopia"
                />
              </div>

              <motion.a
                href="#contact"
                className="mt-8 inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Hire Me
                <RiShakeHandsLine className="w-5 h-5" />
              </motion.a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ContactItem = ({ icon, title, value }) => (
  <div className="flex items-start gap-4">
    <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">{icon}</div>
    <div>
      <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400">
        {title}
      </h4>
      <p className="text-gray-900 dark:text-white font-medium">{value}</p>
    </div>
  </div>
);

export default Contact;
