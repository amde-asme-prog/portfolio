import { useEffect, useState } from "react";
import TableRow from "./components/TableRow";
import TableHead from "./components/TableHead";
import { Dialog, DialogPanel } from "@headlessui/react";
import {
  useServicesQuery,
  useDeleteServiceMutation,
  useAddServiceMutation,
  useUpdateServiceMutation,
} from "../hooks/servicesQuery";
import { handleToast } from "../common/handleToast";
import { Toaster } from "sonner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ServicesTable() {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [services, setServices] = useState([]);

  const { mutate: deleteService } = useDeleteServiceMutation();
  const { data: servicesData, isLoading, error, status } = useServicesQuery();

  useEffect(() => {
    if (servicesData) {
      setServices(servicesData);
    }
  }, [servicesData, status]);

  const handleDelete = (id) => {
    deleteService(id);
  };

  return (
    <div className="m-5 p-5  text-stone-900 dark:text-stone-100">
      <Toaster position="top-center" invert richColors />
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 tracking-tight mb-2">
          Service Table
        </h1>
        <button
          onClick={() => setModalOpen(true)}
          className="bg-indigo-600 text-white py-2.5 px-6 rounded-lg hover:bg-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 dark:bg-indigo-500 dark:hover:bg-indigo-600"
        >
          + Add Service
        </button>
      </div>

      <div className="border border-gray-300 dark:border-gray-700 p-1 bg-white dark:bg-gray-800 rounded-md shadow-lg">
        <div className="overflow-x-auto">
          {isLoading && (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600 dark:border-indigo-400"></div>
            </div>
          )}

          {error && (
            <div className="text-center py-8 text-red-500 dark:text-red-400">
              Error fetching data. Please try again later.
            </div>
          )}

          {!isLoading && !error && (!services || services.length === 0) && (
            <div className="text-center py-12 text-gray-500 dark:text-gray-300">
              No services found. Add your first service!
            </div>
          )}

          {!isLoading && !error && services && services.length > 0 && (
            <table className="min-w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg">
              <TableHead columnsData={["Icon", "Title", "Description"]} />
              <tbody className="text-gray-700 dark:text-gray-300 text-sm font-light">
                {services.map((service) => (
                  <TableRow
                    key={service.id}
                    item={service}
                    handleDelete={handleDelete}
                    handleEdit={(service) => {
                      setEditingService(service);
                      setModalOpen(true);
                    }}
                  >
                    <td className="py-2 px-4">
                      <FontAwesomeIcon icon={service.icon} size="lg" />
                    </td>
                    <td className="py-2 px-4 font-mono">{service.title}</td>
                    <td className="py-2 px-4 font-serif">
                      {service.description}
                    </td>
                  </TableRow>
                ))}
              </tbody>
            </table>
          )}

          {modalOpen && (
            <ModalForm
              isOpen={modalOpen}
              initialData={editingService}
              onClose={() => {
                setEditingService(null);
                setModalOpen(false);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function ModalForm({ initialData, onClose, isOpen }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("");

  const { mutate: addService } = useAddServiceMutation();
  const { mutate: updateService } = useUpdateServiceMutation();

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || "");
      setDescription(initialData.description || "");
      setIcon(initialData.icon || "");
    }
  }, [initialData]);

  const handleSubmit = () => {
    if (initialData) {
      console.log(initialData);
      updateService(
        { id: initialData.id, updatedService: { title, description, icon } },
        {
          onSuccess: () => {
            handleToast(200, "Services updated successfully.");
            onClose();
          },
          onError: (error) => {
            handleToast(
              422,
              error.response?.data?.message || "Error updating services."
            );
          },
        }
      );
    } else {
      addService(
        { title, description, icon },
        {
          onSuccess: () => {
            handleToast(200, "Service updated successfully.");
            onClose();
          },
          onError: (error) => {
            handleToast(
              422,
              error.response?.data?.message || "Error updating service."
            );
          },
        }
      );
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 bg-black/35 backdrop-blur-sm transition-colors duration-200 overflow-y-scroll content-center"
    >
      <DialogPanel className="place-self-center bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-6 rounded-lg shadow-lg mx-4 md:w-4/12">
        <h2 className="text-xl font-bold mb-4">
          {initialData ? "Edit Service" : "Add New Service"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium">Icon</label>
            <input
              type="text"
              name="icon"
              value={icon}
              onChange={(e) => setIcon(e.target.value)}
              className="mt-1 p-2 bg-gray-100 dark:bg-gray-700 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 dark:border-gray-600 dark:text-gray-300"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Title</label>
            <input
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 p-2 bg-gray-100 dark:bg-gray-700 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 dark:border-gray-600 dark:text-gray-300"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Description</label>
            <textarea
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 px-2 py-4 bg-gray-100 dark:bg-gray-700 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 dark:border-gray-600 dark:text-gray-300"
            />
          </div>
        </form>
        <div className="flex justify-end space-x-4 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-400 text-white px-6 py-3 rounded-lg hover:bg-gray-500 transition dark:bg-gray-600 dark:hover:bg-gray-700"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition dark:bg-indigo-500 dark:hover:bg-indigo-600"
          >
            Save
          </button>
        </div>
      </DialogPanel>
    </Dialog>
  );
}
