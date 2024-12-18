/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import {
  useLandingContent,
  useUpdateLandingContent,
} from "../hooks/landingContentQuery";
import { handleToast } from "../common/handleToast";
import { Toaster } from "sonner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Landing = () => {
  const { data: content, isLoading, error, fetchStatus } = useLandingContent();
  const { mutate: updateContent, isLoading: isUpdating } =
    useUpdateLandingContent();

  const [introText, setIntroText] = useState({
    greeting: "",
    introduction: "",
    name: "",
    additional_text: "",
  });
  const [typewriterTexts, setTypewriterTexts] = useState([]);
  const [referenceIcons, setReferenceIcons] = useState([]);
  const [image, setImage] = useState(null);
  const [cv, setCv] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    if (content) {
      setIntroText({
        greeting: content.greeting || "",
        introduction: content.introduction || "",
        name: content.name || "",
        additional_text: content.additional_text || "",
      });
      setTypewriterTexts(
        Array.isArray(content.typewriter_texts)
          ? content.typewriter_texts
          : JSON.parse(content.typewriter_texts) || []
      );
      setReferenceIcons(
        Array.isArray(content.reference_icons)
          ? content.reference_icons
          : JSON.parse(content.reference_icons) || []
      );
      setImage(import.meta.env.VITE_API_URL + content.image_path || null);
      setPreviewUrl(import.meta.env.VITE_API_URL + content.image_path || null);
      setCv(content.cv_path || null);
    }
  }, [content]);

  const handleSave = () => {
    if (!introText.greeting || !introText.name) {
      handleToast(400, "Please fill in all required fields.");
      return;
    }

    updateContent(
      {
        ...introText,
        typewriter_texts: typewriterTexts,
        reference_icons: referenceIcons,
        image_path: image,
        cv_path: cv,
      },
      {
        onSuccess: () => handleToast(200, "Content updated successfully!"),
        onError: (err) =>
          handleToast(err.response?.status, "Failed to update content."),
      }
    );
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size < 5 * 1024 * 1024) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      handleToast(400, "Please upload an image smaller than 5MB.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-900">
      <header className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Landing Page Content
        </h2>

        <SaveButton onClick={handleSave} isLoading={isUpdating} />
      </header>

      {isLoading && (
        <div className="flex justify-center items-center h-30">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 dark:border-blue-400"></div>
        </div>
      )}

      {fetchStatus === "paused" && (
        <div className="text-center py-8 text-red-600 dark:text-red-400">
          It seems you&apos;re offline. Please check your internet connection.
        </div>
      )}

      {error?.response?.status >= 500 && (
        <div className="text-center py-8 text-red-600 dark:text-red-400">
          Error fetching data. Please try again later.
        </div>
      )}

      {error?.response?.status === 404 && (
        <div className="text-center py-12 text-gray-600 dark:text-gray-400">
          No content found. Add some content on your dashboard!
        </div>
      )}

      <div className="grid gap-8">
        <Section title="Introduction">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.keys(introText).map((key) => (
              <InputField
                key={key}
                label={key.replace("_", " ")}
                value={introText[key]}
                onChange={(e) =>
                  setIntroText({ ...introText, [key]: e.target.value })
                }
                required={key === "greeting" || key === "name"}
              />
            ))}
          </div>
        </Section>

        <Section title="Typewriter Texts">
          <div className="space-y-4">
            {typewriterTexts.map((text, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={text}
                  onChange={(e) => {
                    const updated = [...typewriterTexts];
                    updated[index] = e.target.value;
                    setTypewriterTexts(updated);
                  }}
                  className="flex-1 p-2 rounded-lg bg-white dark:bg-gray-700 border border-gray-300 
                    dark:border-gray-600 text-gray-900 dark:text-gray-100
                    focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
                  placeholder="Enter typewriter text"
                />
                <DeleteButton
                  onClick={() =>
                    setTypewriterTexts((prev) =>
                      prev.filter((_, i) => i !== index)
                    )
                  }
                />
              </div>
            ))}
            <AddButton
              onClick={() => setTypewriterTexts((prev) => [...prev, ""])}
              label="Add Text"
            />
          </div>
        </Section>

        <Section title="Reference Icons">
          <div className="space-y-4">
            {referenceIcons.map((icon, index) => (
              <div
                key={index}
                className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  {["label", "href", "icon"].map((field) => (
                    <InputField
                      key={field}
                      label={field}
                      value={icon[field]}
                      onChange={(e) => {
                        const updated = [...referenceIcons];
                        updated[index][field] = e.target.value;
                        setReferenceIcons(updated);
                      }}
                    />
                  ))}
                </div>
                <DeleteButton
                  onClick={() =>
                    setReferenceIcons((prev) =>
                      prev.filter((_, i) => i !== index)
                    )
                  }
                />
              </div>
            ))}
            <AddButton
              onClick={() =>
                setReferenceIcons((prev) => [
                  ...prev,
                  { label: "", href: "", icon: "" },
                ])
              }
              label="Add Icon"
            />
          </div>
        </Section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Section title="Profile Image">
            <FileUpload
              accept="image/*"
              onChange={handleImageChange}
              preview={previewUrl || (typeof image === "string" ? image : null)}
              previewType="image"
            />
          </Section>

          <Section title="CV Upload">
            <FileUpload
              accept=".doc,.docx,.pdf"
              onChange={(e) => setCv(e.target.files[0])}
              currentFile={typeof cv === "string" ? cv.split("/").pop() : null}
            />
          </Section>
        </div>
      </div>

      <Toaster position="top-center" invert richColors />
    </div>
  );
};

const Section = ({ title, children }) => (
  <section className="bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
    <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
      {title}
    </h3>
    {children}
  </section>
);

const InputField = ({ label, value, onChange, required }) => (
  <div>
    <label className="block text-sm font-medium mb-1 capitalize text-gray-700 dark:text-gray-200">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type="text"
      value={value}
      onChange={onChange}
      className="w-full p-2 rounded-lg bg-white dark:bg-gray-700 border border-gray-300 
        dark:border-gray-600 text-gray-900 dark:text-gray-100
        focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent
        placeholder-gray-400 dark:placeholder-gray-500"
      placeholder={`Enter ${label.toLowerCase()}`}
    />
  </div>
);

const FileUpload = ({ accept, onChange, preview, currentFile }) => {
  return (
    <div className="space-y-4">
      <input
        type="file"
        accept={accept}
        onChange={onChange}
        className="block w-full text-sm text-gray-500 dark:text-gray-400
        file:mr-4 file:py-2 file:px-4
        file:rounded-full file:border-0
        file:text-sm file:font-semibold
        file:bg-blue-50 file:text-blue-700
        dark:file:bg-blue-900/30 dark:file:text-blue-400
        hover:file:bg-blue-100 dark:hover:file:bg-blue-900/40
        transition-colors cursor-pointer"
      />
      {preview && (
        <img
          src={preview.replace("public/", "")}
          alt="Preview"
          className="max-w-xs rounded-lg shadow-md dark:shadow-gray-900/50"
        />
      )}
      {currentFile && (
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Current file: {currentFile}
        </p>
      )}
    </div>
  );
};

const SaveButton = ({ onClick, isLoading }) => (
  <button
    onClick={onClick}
    disabled={isLoading}
    className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 
      text-white px-6 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed 
      transition-colors flex items-center gap-2"
  >
    {isLoading ? (
      <>
        <LoadingSpinner size="sm" />
        Saving...
      </>
    ) : (
      <>
        <FontAwesomeIcon icon="save" />
        Save Changes
      </>
    )}
  </button>
);

const DeleteButton = ({ onClick }) => (
  <button
    onClick={onClick}
    className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 
      dark:hover:bg-red-900/20 rounded-lg transition-colors"
    aria-label="Delete"
  >
    <FontAwesomeIcon icon="trash" />
  </button>
);

const AddButton = ({ onClick, label }) => (
  <button
    onClick={onClick}
    className="flex items-center gap-2 text-blue-600 dark:text-blue-400 
      hover:bg-blue-50 dark:hover:bg-blue-900/20 px-4 py-2 rounded-lg transition-colors"
  >
    <FontAwesomeIcon icon="plus" />
    {label}
  </button>
);

const LoadingSpinner = ({ size = "md" }) => (
  <div
    className={`animate-spin ${size === "sm" ? "w-4 h-4" : "w-8 h-8"} 
      text-white`}
  >
    <FontAwesomeIcon icon="circle-notch" />
  </div>
);

// const ErrorMessage = ({ message }) => (
//   <div
//     className="p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400
//     rounded-lg border border-red-200 dark:border-red-800"
//   >
//     <p>Error: {message}</p>
//   </div>
// );

export default Landing;
