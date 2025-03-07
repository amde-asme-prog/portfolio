/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import {
  useLandingContent,
  useUpdateLandingContent,
  useUploadFile,
} from "../hooks/landingContentQuery";
import { handleToast } from "../common/handleToast";
import { Toaster } from "sonner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Landing = () => {
  const { data: content, isLoading, error, fetchStatus } = useLandingContent();
  const { mutateAsync: updateContent, isLoading: isUpdating } =
    useUpdateLandingContent();
  const { mutateAsync: uploadFile, isLoading: isUploading } = useUploadFile();

  const [introText, setIntroText] = useState({
    greeting: "",
    introduction: "",
    name: "",
    additional_text: "",
  });
  const [typewriterTexts, setTypewriterTexts] = useState([]);
  const [referenceIcons, setReferenceIcons] = useState([]);

  // File state management
  const [imageFile, setImageFile] = useState(null);
  const [cvFile, setCvFile] = useState(null);
  const [imagePath, setImagePath] = useState("");
  const [cvPath, setCvPath] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      setImagePath(content.image_path || "");
      setCvPath(content.cv_path || "");

      // Set image preview if image path exists
      if (content.image_path) {
        setImagePreview(
          `${
            import.meta.env.VITE_SUPABASE_URL
          }/storage/v1/object/public/portfolio_files/${content.image_path}`
        );
      }
    }
  }, [content]);

  const handleSave = async () => {
    if (!introText.greeting || !introText.name) {
      handleToast(400, "Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);

    // Prepare data object with current values
    const updateData = {
      ...introText,
      typewriter_texts: JSON.stringify(typewriterTexts),
      reference_icons: JSON.stringify(referenceIcons),
      image_path: imagePath,
      cv_path: cvPath,
    };

    try {
      // Handle image upload if a new file was selected
      if (imageFile) {
        await uploadFile(
          { file: imageFile, type: "image" },
          {
            onSuccess: (data) => {
              if (data && data.path) {
                updateData.image_path = data.path;
                setImagePath(data.path);
                handleToast(200, "Image uploaded successfully!");
              } else {
                handleToast(500, "Image upload failed");
              }
            },
            onError: (error) => {
              handleToast(500, `Image upload error: ${error.message}`);
            },
          }
        );
      }

      // Handle CV upload if a new file was selected
      if (cvFile) {
        await uploadFile(
          { file: cvFile, type: "cv" },
          {
            onSuccess: (data) => {
              if (data && data.path) {
                updateData.cv_path = data.path;
                handleToast(200, "CV uploaded successfully!");
                setCvPath(data.path);
              } else {
                handleToast(500, "CV upload failed");
              }
            },
            onError: (error) => {
              handleToast(500, `CV upload error: ${error.message}`);
            },
          }
        );
      }

      // Finally update the content with all new data
      await updateContent(updateData, {
        onSuccess: () => {
          handleToast(200, "Content updated successfully!");
          setImageFile(null);
          setCvFile(null);
        },
        onError: (error) => {
          handleToast(500, `Failed to update content: ${error.message}`);
        },
        onSettled: () => {
          setIsSubmitting(false);
        },
      });
    } catch (error) {
      handleToast(500, `An unexpected error occurred: ${error.message}`);
      setIsSubmitting(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      handleToast(400, "Please upload an image smaller than 5MB.");
      return;
    }

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleCvChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      handleToast(400, "Please upload a CV smaller than 10MB.");
      return;
    }

    setCvFile(file);
  };

  // Helper to extract filename from path
  const getFilenameFromPath = (path) => {
    if (!path) return null;
    return path.split("/").pop();
  };

  return (
    <div className="m-5 p-5 text-stone-900 dark:text-stone-100">
      <header className="flex justify-between items-center mb-8">
        <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 tracking-tight mb-2">
          Landing Page Content
        </h2>

        <SaveButton
          onClick={handleSave}
          isLoading={isUpdating || isUploading || isSubmitting}
        />
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
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="block w-full text-sm text-gray-500 dark:text-gray-400
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-50 file:text-blue-700
                    dark:file:bg-blue-900/30 dark:file:text-blue-400
                    hover:file:bg-blue-100 dark:hover:file:bg-blue-900/40
                    transition-colors cursor-pointer"
                />
                {imageFile && (
                  <span className="text-sm text-emerald-600 dark:text-emerald-400 font-medium">
                    Selected: {imageFile.name}
                  </span>
                )}
              </div>

              {imagePreview && (
                <div className="relative">
                  <div className="absolute inset-0 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-lg" />
                  <img
                    src={imagePreview}
                    alt="Profile Preview"
                    className="relative z-10 max-w-xs h-auto object-cover rounded-lg shadow-md border-2 border-blue-100 dark:border-blue-900"
                    onLoad={(e) =>
                      (e.target.previousSibling.style.display = "none")
                    }
                  />
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    {imagePath && !imageFile && <>Current path: {imagePath}</>}
                  </p>
                </div>
              )}

              {!imagePreview && imagePath && (
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Current image path: {imagePath}
                </p>
              )}
            </div>
          </Section>

          <Section title="CV Upload">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <input
                  type="file"
                  accept=".doc,.docx,.pdf"
                  onChange={handleCvChange}
                  className="block w-full text-sm text-gray-500 dark:text-gray-400
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-50 file:text-blue-700
                    dark:file:bg-blue-900/30 dark:file:text-blue-400
                    hover:file:bg-blue-100 dark:hover:file:bg-blue-900/40
                    transition-colors cursor-pointer"
                />
                {cvFile && (
                  <span className="text-sm text-emerald-600 dark:text-emerald-400 font-medium">
                    Selected: {cvFile.name}
                  </span>
                )}
              </div>

              {cvPath && (
                <div className="flex items-center gap-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <FontAwesomeIcon
                    icon="file-pdf"
                    className="text-blue-600 dark:text-blue-400 text-xl"
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {getFilenameFromPath(cvPath) || "CV File"}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Current path: {cvPath}
                    </p>
                  </div>
                </div>
              )}
            </div>
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
        <div className="animate-spin w-4 h-4 text-white">
          <FontAwesomeIcon icon="circle-notch" />
        </div>
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

export default Landing;
