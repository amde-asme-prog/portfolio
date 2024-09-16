import { BiEdit, BiTrash } from "react-icons/bi";

function TableRow({ item, handleDelete, handleEdit, children }) {
  return (
    <tr className="border-b border-border_primary hover:bg-background_link_hover">
      {children}
      <td className="w-20 sticky right-0 border-l border-background_link_hover  py-2 px-2 bg-background_card shadow-lg align-top text-center">
        <button
          onClick={() => handleEdit(item)}
          className="p-1 text-green-800  border rounded-full border-transparent hover:border-border_primary"
        >
          <BiEdit />
        </button>
        <button
          onClick={() => handleDelete(item.id)}
          className="p-1 text-red-700 hover:text-red-700 border rounded-full border-transparent hover:border-border_primary"
        >
          <BiTrash />
        </button>
      </td>
    </tr>
  );
}

export default TableRow;
