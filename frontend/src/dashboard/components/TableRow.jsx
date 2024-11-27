import { BiEdit, BiTrash } from "react-icons/bi";

export default function TableRow({ item, handleDelete, handleEdit, children }) {
  return (
    <tr className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
      {children}
      <td className="w-24 sticky right-0 border-l border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 py-4 px-6 text-center">
        <div className="flex justify-center gap-3">
          {/* Edit Button */}
          <button
            onClick={() => handleEdit(item)}
            className="p-2 text-green-600 hover:bg-green-100 dark:hover:bg-green-700 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            title="Edit"
          >
            <BiEdit className="w-5 h-5" />
          </button>

          {/* Delete Button */}
          <button
            onClick={() => handleDelete(item.id)}
            className="p-2 text-red-500 hover:bg-red-100 dark:hover:bg-red-700 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-500"
            title="Delete"
          >
            <BiTrash className="w-5 h-5" />
          </button>
        </div>
      </td>
    </tr>
  );
}
