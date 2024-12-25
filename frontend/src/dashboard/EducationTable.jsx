// import React, { useContext, useState } from "react";
// import EducationModal from "../components/EducationModal";
// import TableHead from "./components/TableHead";
// import TableRow from "./components/TableRow";
// import EducationContext from "../context/EducationProvider";

// const EducationTable = () => {
//   const columnsData = [
//     "Title",
//     "Institute",
//     "Duration",
//     "Courses",
//     "Achievements",
//   ];

//   const {
//     education,
//     modalOpen,
//     setModalOpen,
//     editingEducation,
//     handleEdit,
//     handleDelete,
//     handleAdd,
//   } = useContext(EducationContext);

//   return (
//     <div className="overflow-x-auto rounded-lg shadow-sm">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-3xl font-bold text-heading">Education Table</h1>
//         <button
//           onClick={() => setModalOpen(true)}
//           className="bg-button_primary text-button_text py-2 px-4 rounded hover:bg-button_hover transition"
//         >
//           Add New Education
//         </button>
//       </div>
//       <div className="overflow-x-auto rounded-lg shadow-lg bg-background_card border border-border_primary">
//         <table
//           itemScope
//           itemType={education}
//           className="w-full text-sm text-text_secondary"
//         >
//           <TableHead columnsData={columnsData} />
//           <tbody>
//             {education.map((item, index) => (
//               <TableRow
//                 key={index}
//                 item={item}
//                 handleDelete={handleDelete}
//                 handleEdit={handleEdit}
//               >
//                 <td className="py-2 px-4 align-top">{item.title}</td>
//                 <td className="py-2 px-4 align-top">{item.institute}</td>
//                 <td className="py-2 px-4 align-top">{`${item.startYear} - ${item.endYear}`}</td>
//                 <td className="py-2 px-4 align-top">{item.courses}</td>
//                 <td className="py-2 px-4 align-top">{item.achievements}</td>
//               </TableRow>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {modalOpen && (
//         <EducationModal
//           isOpen={modalOpen}
//           onClose={() => {
//             setModalOpen(false);
//           }}
//           onSubmit={handleAdd}
//           initialData={editingEducation}
//         />
//       )}
//     </div>
//   );
// };

// export default EducationTable;

export default function EducationTable() {
  return <div>EducationTable</div>;
}
