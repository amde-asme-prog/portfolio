/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from "react";
import { BiPhone, BiMailSend } from "react-icons/bi";
import { GoLocation } from "react-icons/go";
import {
  MdEmail,
  MdSend,
  MdContentCopy,
  MdDone,
  MdError,
} from "react-icons/md";
import { RiShakeHandsLine, RiMailSendLine } from "react-icons/ri";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import emailjs from "@emailjs/browser";

// Environment variables
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
  const [success, setSuccess] = useState(false);
  const [formError, setFormError] = useState(null);
  const form = useRef();

  // Reset success message after 5 seconds
  useEffect(() => {
    let timer;
    if (success) {
      timer = setTimeout(() => {
        setSuccess(false);
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [success]);

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
    // Clear global form error when user starts typing again
    if (formError) setFormError(null);
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
    setFormError(null);

    // Touch all fields to show validation errors
    const allTouched = Object.keys(formData).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});
    setTouched(allTouched);

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
      setFormError("Please fix all errors before submitting");
      return;
    }

    try {
      // Prepare template parameters (ensure keys match EmailJS template variables)
      const templateParams = {
        from_name: formData.username,
        from_email: formData.email,
        message: formData.message,
        to_name: "Amdebirhan", // recipient name
        reply_to: formData.email,
      };

      // Send email using EmailJS with direct parameters rather than form data
      const result = await emailjs.send(
        myServiceId,
        myTemplateId,
        templateParams,
        myPublicKey
      );

      console.log("Email sent successfully:", result);

      // Show success feedback
      setSuccess(true);
      toast.success("Message sent successfully!");

      // Reset form
      setFormData({ username: "", email: "", message: "" });
      setTouched({});
      setErrors({});
    } catch (error) {
      console.error("Email error:", error);
      toast.error("Failed to send message. Please try again.");
      setFormError(
        "There was an error sending your message. Please try again or contact directly via email."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="w-full min-h-screen py-20 relative overflow-hidden bg-gradient-to-b from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-950/30"
    >
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-blue-500/5 to-transparent pointer-events-none" />
      <div className="absolute -top-10 -right-10 w-64 h-64 rounded-full bg-blue-500/5 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-20 w-96 h-96 rounded-full bg-indigo-500/5 blur-3xl pointer-events-none" />

      {/* Subtle grid pattern overlay */}
      <div
        className="absolute inset-0 bg-grid-pattern opacity-[0.02] dark:opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        }}
      />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 text-blue-600 dark:text-blue-400 font-medium text-sm tracking-wide mb-4 shadow-sm">
            <BiMailSend className="mr-2" />
            Let's Connect
          </span>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
            Get in Touch
          </h2>

          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
            Have a question or want to work together? I'd love to hear from you.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12 items-stretch">
          {/* Form Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="w-full lg:w-3/5"
          >
            <div className="h-full bg-white dark:bg-gray-800/90 backdrop-blur-lg rounded-2xl shadow-xl p-8 md:p-10 relative overflow-hidden border border-gray-100 dark:border-gray-700">
              {/* Success message overlay */}
              <AnimatePresence>
                {success && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="absolute inset-0 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm flex flex-col items-center justify-center p-6 z-20"
                  >
                    <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4 text-green-600 dark:text-green-400">
                      <MdDone className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-green-600 dark:text-green-400 mb-2">
                      Message Sent!
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-center mb-6">
                      Thank you for your message. I'll get back to you as soon
                      as possible.
                    </p>
                    <button
                      onClick={() => setSuccess(false)}
                      className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-white px-6 py-2 rounded-lg transition-colors"
                    >
                      Close
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Form decorations */}
              <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-blue-500/5 blur-2xl pointer-events-none" />
              <div className="absolute -bottom-40 -left-20 w-64 h-64 rounded-full bg-indigo-500/5 blur-3xl pointer-events-none" />

              <h3 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white flex items-center">
                <div className="mr-3 p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-600 dark:text-blue-400">
                  <RiMailSendLine className="w-5 h-5" />
                </div>
                Send a Message
              </h3>

              {formError && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 flex items-start gap-3"
                >
                  <MdError className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <p>{formError}</p>
                </motion.div>
              )}

              <form
                ref={form}
                onSubmit={handleSubmit}
                className="space-y-6 relative z-10"
              >
                {["username", "email", "message"].map((field) => (
                  <div key={field} className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                      {field === "username"
                        ? "Name"
                        : field.charAt(0).toUpperCase() + field.slice(1)}
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
                            errors[field] && touched[field]
                              ? "border-red-500 focus:border-red-500"
                              : "border-gray-200 dark:border-gray-700 focus:border-blue-500"
                          }
                          bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                          focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                        placeholder={`Enter your ${
                          field === "username" ? "name" : field
                        }...`}
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
                            errors[field] && touched[field]
                              ? "border-red-500 focus:border-red-500"
                              : "border-gray-200 dark:border-gray-700 focus:border-blue-500"
                          }
                          bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                          focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                        placeholder={`Enter your ${
                          field === "username" ? "name" : field
                        }...`}
                      />
                    )}
                    <AnimatePresence>
                      {errors[field] && touched[field] && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="text-sm text-red-500 flex items-center gap-1"
                        >
                          <MdError className="flex-shrink-0" />
                          {errors[field]}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                ))}

                {/* Submit button with gradient background and loading state */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 
                    hover:from-blue-700 hover:via-blue-800 hover:to-indigo-800 text-white font-medium 
                    py-3 px-6 rounded-xl transition-all shadow-md hover:shadow-lg disabled:opacity-70 
                    flex items-center justify-center gap-2`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                      <span>Sending message...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
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
            transition={{ duration: 0.7 }}
            className="w-full lg:w-2/5"
          >
            <div className="bg-white dark:bg-gray-800/90 backdrop-blur-lg rounded-2xl shadow-xl p-8 md:p-10 h-full relative border border-gray-100 dark:border-gray-700">
              {/* Contact Info decorations */}
              <div className="absolute -top-20 -left-20 w-48 h-48 rounded-full bg-indigo-500/5 blur-2xl pointer-events-none" />
              <div className="absolute -bottom-24 -right-24 w-64 h-64 rounded-full bg-blue-500/5 blur-3xl pointer-events-none" />

              <h3 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white">
                Contact Information
              </h3>

              <div className="space-y-8 relative z-10">
                <ContactItem
                  icon={<MdEmail className="w-6 h-6" />}
                  title="Email"
                  value="Amdebrhanasmamaw93@gmail.com"
                  href="mailto:Amdebrhanasmamaw93@gmail.com"
                />
                <ContactItem
                  icon={<BiPhone className="w-6 h-6" />}
                  title="Phone"
                  value="(+251) 921-975-184"
                  href="tel:+251921975184"
                />
                <ContactItem
                  icon={<GoLocation className="w-6 h-6" />}
                  title="Location"
                  value="Addis Ababa, Ethiopia"
                />
              </div>

              <div className="mt-12 space-y-4">
                <motion.p className="text-gray-600 dark:text-gray-300 mb-4">
                  Interested in working together? Let's discuss how I can help
                  bring your ideas to life.
                </motion.p>

                <motion.a
                  href="#contact"
                  className="block text-center bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 
                    hover:from-blue-700 hover:via-blue-800 hover:to-indigo-800 text-white px-8 py-3 rounded-xl 
                    font-medium shadow-md hover:shadow-lg transition-all w-full justify-center"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="flex items-center justify-center gap-2">
                    Hire Me
                    <RiShakeHandsLine className="w-5 h-5" />
                  </span>
                </motion.a>

                <div className="pt-8 mt-8 border-t border-gray-200 dark:border-gray-700">
                  <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-4">
                    Connect with me on social media
                  </h4>
                  <div className="flex gap-4 justify-center">
                    {[
                      {
                        icon: "github",
                        url: "https://github.com/yourusername",
                      },
                      {
                        icon: "linkedin",
                        url: "https://linkedin.com/in/yourusername",
                      },
                      {
                        icon: "twitter",
                        url: "https://twitter.com/yourusername",
                      },
                    ].map((social) => (
                      <motion.a
                        key={social.icon}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors"
                      >
                        <i className={`fab fa-${social.icon}`}></i>
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Availability banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 max-w-4xl mx-auto"
        >
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 shadow-xl">
            <div className="absolute top-0 left-0 w-full h-full bg-pattern-dots opacity-10"></div>
            <div className="relative p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-white md:flex-1">
                <h3 className="text-2xl font-bold mb-2">
                  Available for Freelance Work
                </h3>
                <p className="opacity-90">
                  Currently accepting new projects and remote opportunities
                </p>
              </div>
              <motion.a
                href="#contact"
                className="bg-white text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-xl font-medium shadow-md transition-colors flex items-center gap-2 whitespace-nowrap"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <RiShakeHandsLine className="w-5 h-5" />
                Let's Talk
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const ContactItem = ({ icon, title, value, href }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success("Copied to clipboard!");

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="flex items-start gap-4 p-4 rounded-xl hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-colors"
    >
      <div className="p-3 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 dark:from-blue-500/20 dark:to-indigo-500/20 rounded-xl text-blue-600 dark:text-blue-400 shadow-sm">
        {icon}
      </div>

      <div className="flex-1">
        <div className="flex items-center gap-2">
          <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
            {title}
          </h4>
          {href && (
            <button
              onClick={() => copyToClipboard(value)}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
            >
              {copied ? (
                <MdDone className="text-green-500" />
              ) : (
                <MdContentCopy />
              )}
            </button>
          )}
        </div>
        <a
          href={href}
          className="text-gray-900 dark:text-white font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          {value}
        </a>
      </div>
    </motion.div>
  );
};

export default Contact;
