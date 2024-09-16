import { createContext, useState } from "react";

const EducationContext = createContext("");

const EducationProvider = ({ children }) => {
  const [education, setEducation] = useState([
    {
      title: "Bachelors of Computer Science",
      institute: "Bahir Dar University",
      startYear: "Sept 2020",
      endYear: "Jul 2024",
      courses:
        "Data Structures, Algorithms, Web Development, Mobile App Development",
      achievements: "Dean's List for 3 consecutive semesters",
    },
    {
      title: "Preparatory",
      institute: "Woldia Preparatory School",
      startYear: "Sept 2018",
      endYear: "Jun 2019",
      courses: "Mathematics, Physics, Chemistry, Biology",
      achievements: "Top 5% of the class",
    },
    {
      title: "High School",
      institute: "Woldia High School",
      startYear: "Sept 2016",
      endYear: "Jun 2017",
      courses: "Mathematics, Physics, Chemistry, Biology",
      achievements: "School Science Fair Winner",
    },
    {
      title: "Internship - Web Development",
      institute: "ASTC",
      startYear: "Jul 2023",
      endYear: "Sep 2023",
      courses: "Developed and maintained web applications using Next.js",
      achievements: "Successfully completed 3 major projects",
    },
    {
      title: "Bachelors of Computer Science",
      institute: "Bahir Dar University",
      startYear: "Sept 2020",
      endYear: "Jul 2024",
      courses:
        "Data Structures, Algorithms, Web Development, Mobile App Development",
      achievements: "Dean's List for 3 consecutive semesters",
    },
    {
      title: "Preparatory",
      institute: "Woldia Preparatory School",
      startYear: "Sept 2018",
      endYear: "Jun 2019",
      courses: "Mathematics, Physics, Chemistry, Biology",
      achievements: "Top 5% of the class",
    },
    {
      title: "High School",
      institute: "Woldia High School",
      startYear: "Sept 2016",
      endYear: "Jun 2017",
      courses: "Mathematics, Physics, Chemistry, Biology",
      achievements: "School Science Fair Winner",
    },
    {
      title: "Internship - Web Development",
      institute: "ASTC",
      startYear: "Jul 2023",
      endYear: "Sep 2023",
      courses: "Developed and maintained web applications using Next.js",
      achievements: "Successfully completed 3 major projects",
    },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingEducation, setEditingEducation] = useState(null);

  const handleEdit = (educationItem) => {
    setEditingEducation(educationItem);
    setModalOpen(true);
  };

  const handleDelete = (id) => {
    setEducation((prevEducation) =>
      prevEducation.filter((item) => item.id !== id)
    );
  };

  const handleAdd = (newEducation) => {
    setEducation((prevEducation) => [
      ...prevEducation,
      { ...newEducation, id: Date.now() },
    ]);
  };

  return (
    <EducationContext.Provider
      value={{
        education,
        modalOpen,
        setModalOpen,
        editingEducation,
        handleEdit,
        handleDelete,
        handleAdd,
      }}
    >
      {children}
    </EducationContext.Provider>
  );
};

export { EducationProvider };
export default EducationContext;
