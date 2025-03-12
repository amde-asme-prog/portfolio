import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import {
  useAboutQuery,
  useUpdateAboutQuery,
  useUploadFile,
} from "../hooks/aboutQuery";
import { handleToast } from "../common/handleToast";
import { Toaster } from "sonner";

export const AboutContent = () => {
  const [aboutMe, setAboutMe] = useState([]);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { data: aboutData, isLoading: isDataLoading } = useAboutQuery();
  const { mutateAsync: updateAboutData, isLoading: isUpdating } =
    useUpdateAboutQuery();
  const { mutateAsync: uploadFile, isLoading: isUploading } = useUploadFile();

  useEffect(() => {
    if (aboutData) {
      try {
        const parsedData = Array.isArray(aboutData.about_me)
          ? aboutData.about_me
          : aboutData.about_me
          ? JSON.parse(aboutData.about_me)
          : [];

        setAboutMe(parsedData);

        if (aboutData.image_path) {
          setImagePreview(
            `${
              import.meta.env.VITE_SUPABASE_URL
            }/storage/v1/object/public/portfolio_files/${aboutData.image_path}`
          );
        }
      } catch (error) {
        console.error("Error parsing about_me data:", error);
        setAboutMe([]);
      }
    }
  }, [aboutData]);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const formData = {
        about_me: aboutMe,
        image_path: aboutData?.image_path || "",
      };

      if (image) {
        await uploadFile(
          { file: image },
          {
            onSuccess: (data) => {
              if (data && data.path) {
                handleToast(200, "Image uploaded successfully!");
                formData.image_path = data.path;
              }
            },
            onError: (error) => {
              handleToast(500, `Image upload error: ${error.message}`);
              throw error;
            },
          }
        );
      }

      await updateAboutData(formData, {
        onSuccess: () => {
          handleToast(200, "About me content updated successfully!");
        },
        onError: (error) => {
          handleToast(400, error.response?.data?.message || "Update failed");
          throw error;
        },
      });
    } catch (error) {
      console.error("Error in handleSubmit:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const addParagraph = () => {
    setAboutMe([...aboutMe, ""]);
  };

  const updateParagraph = (index, value) => {
    const updatedValues = [...aboutMe];
    updatedValues[index] = value;
    setAboutMe(updatedValues);
  };

  const deleteParagraph = (index) => {
    const updatedValues = aboutMe.filter((_, i) => i !== index);
    setAboutMe(updatedValues);
  };

  return (
    <div className="m-5 p-5 text-stone-900 dark:text-stone-100">
      <Toaster position="top-center" invert richColors />
      <header className="flex justify-between items-center mb-8">
        <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 tracking-tight mb-2">
          About Me Content
        </h2>

        <SaveButton
          onClick={handleSubmit}
          isLoading={isLoading || isUpdating || isUploading}
        />
      </header>

      <div className="space-y-8">
        {/* About Me Section */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <label className="block text-sm font-medium capitalize text-gray-700 dark:text-gray-200">
              Who am I <span className="text-red-500">*</span>
            </label>
            <button
              type="button"
              onClick={addParagraph}
              className="px-4 py-2 rounded-md bg-green-500 text-white font-semibold shadow-md 
                hover:bg-green-600 dark:bg-green-700 dark:hover:bg-green-800 transition-colors flex items-center gap-2"
            >
              <FontAwesomeIcon icon="plus" />
              Add Paragraph
            </button>
          </div>

          <div className="space-y-4">
            {isDataLoading ? (
              <div className="py-6 flex justify-center">
                <div className="animate-pulse text-gray-400">Loading...</div>
              </div>
            ) : aboutMe.length === 0 ? (
              <div className="py-6 text-center text-gray-500 dark:text-gray-400 italic border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
                No paragraphs added yet. Click "Add Paragraph" to get started.
              </div>
            ) : (
              aboutMe.map((paragraph, index) => (
                <div
                  key={index}
                  className="flex gap-4 border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-700 shadow-sm"
                >
                  <textarea
                    rows={4}
                    placeholder="Enter paragraph text here..."
                    className="w-full p-3 rounded-lg bg-white dark:bg-gray-700 border border-gray-300 
                      dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:ring-2 
                      focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent 
                      placeholder-gray-400 dark:placeholder-gray-500 resize-y"
                    value={paragraph}
                    onChange={(e) => updateParagraph(index, e.target.value)}
                  />

                  <button
                    type="button"
                    onClick={() => deleteParagraph(index)}
                    className="self-start px-3 py-2 rounded-md bg-red-500 text-white font-medium shadow-md 
                    hover:bg-red-600 dark:bg-red-700 dark:hover:bg-red-800 transition-colors flex items-center"
                    title="Delete paragraph"
                  >
                    <FontAwesomeIcon icon="trash" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Profile Image Section */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <label className="block text-sm font-medium mb-4 capitalize text-gray-700 dark:text-gray-200">
            Profile Image
          </label>
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="w-full md:w-1/2">
              <input
                type="file"
                accept="image/*"
                className="block w-full text-sm text-gray-500 dark:text-gray-400
                  file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0
                  file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700
                  dark:file:bg-blue-900/30 dark:file:text-blue-400
                  hover:file:bg-blue-100 dark:hover:file:bg-blue-900/40
                  transition-colors cursor-pointer mb-2"
                onChange={(e) => {
                  if (e.target.files[0]) {
                    setImagePreview(URL.createObjectURL(e.target.files[0]));
                    setImage(e.target.files[0]);
                  }
                }}
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                Recommended size: 800x800px. Max file size: 2MB.
              </p>
            </div>
            <div className="w-full md:w-1/2 flex justify-center">
              {imagePreview ? (
                <div className="relative group">
                  <img
                    src={imagePreview}
                    alt="Profile preview"
                    className="rounded-lg shadow-md dark:shadow-gray-900/50 max-h-64 object-cover"
                  />
                  {image && (
                    <button
                      onClick={() => {
                        setImage(null);
                        setImagePreview(
                          aboutData?.image_path
                            ? `${
                                import.meta.env.VITE_SUPABASE_URL
                              }/storage/v1/object/public/portfolio_files/${
                                aboutData.image_path
                              }`
                            : null
                        );
                      }}
                      className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Remove selected image"
                    >
                      <FontAwesomeIcon icon="times" />
                    </button>
                  )}
                </div>
              ) : (
                <div className="w-full h-64 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center text-gray-400">
                  <span>No image selected</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SaveButton = ({ onClick, isLoading }) => (
  <button
    onClick={onClick}
    disabled={isLoading}
    className={`
      ${
        isLoading
          ? "bg-blue-400 dark:bg-blue-800"
          : "bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
      } 
      text-white px-6 py-2 rounded-lg disabled:opacity-70 disabled:cursor-not-allowed 
      transition-colors flex items-center gap-2
    `}
  >
    {isLoading ? (
      <>
        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
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
