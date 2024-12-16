exports.validateAboutData = (data) => {
  // Required fields
  const requiredFields = ["about_me", "core_title", "interest_title"];
  for (const field of requiredFields) {
    if (!data[field]?.trim()) {
      return `${field.replace("_", " ")} is required`;
    }
  }

  // Validate core_lists
  try {
    const coreLists =
      typeof data.core_lists === "string"
        ? JSON.parse(data.core_lists)
        : data.core_lists;

    if (!Array.isArray(coreLists)) {
      return "core_lists must be an array";
    }

    for (const item of coreLists) {
      if (!item.title || !item.description) {
        return "Each core list item must have a title and description";
      }
    }
  } catch (error) {
    return "Invalid core_lists format";
  }

  // Validate interests_lists
  try {
    const interestsLists =
      typeof data.interests_lists === "string"
        ? JSON.parse(data.interests_lists)
        : data.interests_lists;

    if (!Array.isArray(interestsLists)) {
      return "interests_lists must be an array";
    }

    for (const item of interestsLists) {
      if (typeof item !== "string" || !item.trim()) {
        return "Each interest list item must be a non-empty string";
      }
    }
  } catch (error) {
    return "Invalid interests_lists format";
  }

  return null; // Return null if validation passes
};
