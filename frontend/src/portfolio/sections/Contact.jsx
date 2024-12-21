/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from "react";
import { BiPhone } from "react-icons/bi";
import { GoLocation } from "react-icons/go";
import { MdEmail, MdSend } from "react-icons/md";
import { RiShakeHandsLine } from "react-icons/ri";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import emailjs from "@emailjs/browser";

const myServiceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const myPublicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const myTemplateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const form = useRef();

  const validateField = (name, value) => {
    switch (name) {
      case "username":
        return !value.trim()
          ? "Name is required"
          : value.trim().length < 3
          ? "Name must be at least 3 characters"
          : "";
      case "email":
        return !value.trim()
          ? "Email is required"
          : !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
          ? "Invalid email address"
          : "";
      case "message":
        return !value.trim()
          ? "Message is required"
          : value.trim().length < 10
          ? "Message must be at least 10 characters"
          : "";
      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: validateField(name, value),
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate all fields
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      toast.error("Please fix the errors in the form");
      return;
    }

    try {
      // const emailTemplate = {
      //   to_name: "Amdebirhan",
      //   from_name: formData.username,
      //   message: formData.message,
      //   reply_to: formData.email,
      // };
      const emailTemplate = {
        username: formData.username,
        email: formData.email,
        message: formData.message,
      };
      await emailjs.sendForm(myServiceId, myTemplateId, e.target, {
        publicKey: myPublicKey,
      });

      toast.success("Message sent successfully!");
      setFormData({ username: "", email: "", message: "" });
      setTouched({});
      setErrors({});
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
      console.error("Email error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="w-full min-h-screen py-20 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Get in Touch
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Have a question or want to work together? I'd love to hear from you.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* Form Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full lg:w-3/5"
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 backdrop-blur-lg bg-opacity-95">
              <form ref={form} onSubmit={handleSubmit} className="space-y-6">
                {["username", "email", "message"].map((field) => (
                  <div key={field} className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                      {field.charAt(0).toUpperCase() + field.slice(1)}
                    </label>
                    {field === "message" ? (
                      <textarea
                        name={field}
                        value={formData[field]}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        rows="5"
                        className={`w-full px-4 py-3 rounded-xl border-2 transition duration-200
                          ${
                            errors[field]
                              ? "border-red-500 focus:border-red-500"
                              : "border-gray-200 dark:border-gray-600 focus:border-blue-500"
                          }
                          bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                          focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                        placeholder={`Enter your ${field}...`}
                      />
                    ) : (
                      <input
                        type={field === "email" ? "email" : "text"}
                        name={field}
                        value={formData[field]}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`w-full px-4 py-3 rounded-xl border-2 transition duration-200
                          ${
                            errors[field]
                              ? "border-red-500 focus:border-red-500"
                              : "border-gray-200 dark:border-gray-600 focus:border-blue-500"
                          }
                          bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                          focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                        placeholder={`Enter your ${field}...`}
                      />
                    )}
                    <AnimatePresence>
                      {errors[field] && touched[field] && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="text-sm text-red-500"
                        >
                          {errors[field]}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                ))}

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full bg-gradient-to-r from-blue-600 to-blue-700 
                    hover:from-blue-700 hover:to-blue-800 text-white font-medium 
                    py-3 rounded-xl transition-all disabled:opacity-70 
                    flex items-center justify-center gap-2`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <MdSend className="w-5 h-5" />
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* Contact Info Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full lg:w-2/5"
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 backdrop-blur-lg bg-opacity-95">
              <h3 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white">
                Contact Information
              </h3>
              <div className="space-y-8">
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
                className="mt-12 inline-flex items-center gap-2 bg-gradient-to-r 
                  from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 
                  text-white px-8 py-3 rounded-xl font-medium transition-all w-full 
                  justify-center"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Hire Me
                <RiShakeHandsLine className="w-5 h-5" />
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const ContactItem = ({ icon, title, value }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
  >
    <div className="p-3 bg-blue-500/10 dark:bg-blue-500/20 rounded-xl text-blue-600 dark:text-blue-400">
      {icon}
    </div>
    <div>
      <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
        {title}
      </h4>
      <p className="text-gray-900 dark:text-white font-medium">{value}</p>
    </div>
  </motion.div>
);

export default Contact;
