import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useAboutQuery, useUpdateAboutQuery } from "../hooks/aboutQuery";
import { handleToast } from "../common/handleToast";
import { Toaster } from "sonner";

export const AboutContent = () => {
  const [aboutMe, setAboutMe] = useState("");
  const [image, setImage] = useState(null);
  const [coreTitle, setCoreTitle] = useState("");
  const [coreSubtitle, setCoreSubtitle] = useState("");
  const [coreValues, setCoreValues] = useState([]);

  const [interestTitle, setInterestTitle] = useState("");
  const [interestSubtitle, setInterestSubtitle] = useState("");
  const [interestsValues, setInterestsValues] = useState([]);

  const { data: aboutData } = useAboutQuery();
  const { mutate: updateAboutData } = useUpdateAboutQuery();

  useEffect(() => {
    if (aboutData) {
      setAboutMe(aboutData.about_me);
      setImage(import.meta.env.VITE_API_URL + aboutData.image_path);
      setCoreTitle(aboutData.core_title);
      setCoreSubtitle(aboutData.core_subtitle);
      setCoreValues(
        Array.isArray(aboutData.core_lists)
          ? aboutData.core_lists
          : JSON.parse(aboutData.core_lists)
      );
      setInterestTitle(aboutData.interest_title);
      setInterestSubtitle(aboutData.interest_subtitle);
      setInterestsValues(
        Array.isArray(aboutData.interests_lists)
          ? aboutData.interests_lists
          : JSON.parse(aboutData.interests_lists)
      );
    }
  }, [aboutData]);

  const handleCoreValueChange = (index, value) => {
    const updatedValues = [...coreValues];
    updatedValues[index] = value;
    setCoreValues(updatedValues);
  };

  const handleInterestChange = (index, value) => {
    const updatedInterests = [...interestsValues];
    updatedInterests[index] = value;
    setInterestsValues(updatedInterests);
  };

  const handleSubmit = () => {
    const formData = {
      about_me: aboutMe,
      core_title: coreTitle,
      core_subtitle: coreSubtitle,
      core_lists: coreValues,
      interest_title: interestTitle,
      interest_subtitle: interestSubtitle,
      interests_lists: interestsValues,
      image_path: image,
    };

    updateAboutData(formData, {
      onSuccess: () => {
        handleToast(200, "About me content updated successfully!");
      },
      onError: (error) => {
        handleToast(400, error.response.data.message);
      },
    });
  };

  return (
    <div className="m-5 p-5  text-stone-900 dark:text-stone-100">
      <Toaster position="top-center" invert richColors />
      <header className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          About me Content
        </h2>

        <SaveButton onClick={handleSubmit} />
      </header>
      <div className="space-y-8">
        {/* About Me Section */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <label className="block text-sm font-medium mb-2 capitalize text-gray-700 dark:text-gray-200">
            Who am I <span className="text-red-500">*</span>
          </label>
          <textarea
            rows={5}
            placeholder="Enter your about me content here"
            className="w-full p-3 rounded-lg bg-white dark:bg-gray-700 border border-gray-300 
              dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:ring-2 
              focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent 
              placeholder-gray-400 dark:placeholder-gray-500"
            value={aboutMe}
            onChange={(e) => setAboutMe(e.target.value)}
          />
        </div>

        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <label className="block text-sm font-medium mb-2 capitalize text-gray-700 dark:text-gray-200">
            Profile Image
          </label>
          <input
            type="file"
            accept="image/*"
            className="block w-full text-sm text-gray-500 dark:text-gray-400
              file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0
              file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700
              dark:file:bg-blue-900/30 dark:file:text-blue-400
              hover:file:bg-blue-100 dark:hover:file:bg-blue-900/40
              transition-colors cursor-pointer mb-4"
            onChange={(e) => setImage(e.target.files[0])}
          />
          {image && (
            <img
              src={
                typeof image === "string"
                  ? image.replace("public/", "")
                  : URL.createObjectURL(image).replace("public/", "")
              }
              alt="Preview"
              className="max-w-xs rounded-lg shadow-md dark:shadow-gray-900/50"
            />
          )}
        </div>

        {/* Core Values Section */}
        <div className="flex flex-col items-start gap-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <p className="text-lg font-semibold mb-4">Core Values</p>
          <InputField
            placeholder="title"
            value={coreTitle}
            onChange={(e) => setCoreTitle(e.target.value)}
          />
          <InputField
            placeholder="subtitle"
            value={coreSubtitle}
            onChange={(e) => setCoreSubtitle(e.target.value)}
          />
          {coreValues.map((value, index) => (
            <div key={index} className="w-full flex justify-center gap-4 mb-3">
              .{" "}
              <InputField
                type="text"
                value={value.title}
                onChange={(e) => handleCoreValueChange(index, e.target.value)}
                placeholder={`Core title ${index + 1}`}
              />
              <InputField
                type="text"
                value={value.description}
                onChange={(e) => handleCoreValueChange(index, e.target.value)}
                placeholder={`Core value ${index + 1}`}
              />
            </div>
          ))}
          <button
            type="button"
            onClick={() => setCoreValues([...coreValues, ""])}
            className="px-4 py-2 rounded-md bg-blue-500 text-white font-semibold shadow-md 
              hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800 transition-colors"
          >
            Add Core Value
          </button>
        </div>

        {/* Interests Section */}
        <div className="flex flex-col items-start gap-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <p className=" text-lg font-semibold ">Interests</p>
          <InputField
            placeholder="title"
            value={interestTitle}
            onChange={(e) => setInterestTitle(e.target.value)}
          />
          <InputField
            placeholder="subtitle"
            value={interestSubtitle}
            onChange={(e) => setInterestSubtitle(e.target.value)}
          />

          {interestsValues.map((interest, index) => (
            <div key={index} className="w-full flex justify-center gap-4 mb-3">
              .{" "}
              <InputField
                type="text"
                value={interest}
                onChange={(e) => handleInterestChange(index, e.target.value)}
                placeholder={`Interest ${index + 1}`}
              />
            </div>
          ))}
          <button
            type="button"
            onClick={() => setInterestsValues([...interestsValues, ""])}
            className="px-4 py-2 rounded-md bg-green-500 text-white font-semibold shadow-md 
              hover:bg-green-600 dark:bg-green-700 dark:hover:bg-green-800 transition-colors"
          >
            Add Interest
          </button>
        </div>
      </div>
    </div>
  );
};

const InputField = ({ value, onChange, placeholder }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full p-3 rounded-lg bg-white dark:bg-gray-700 border border-gray-300 
        dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:ring-2 
        focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
    />
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
    <>
      <FontAwesomeIcon icon="save" />
      Save Changes
    </>
  </button>
);
