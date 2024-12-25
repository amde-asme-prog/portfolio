import { Dialog, DialogPanel } from "@headlessui/react";

export default function ModalContainer({
  isOpen,
  onClose,
  handleSubmit,
  children,
}) {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="pb-12 fixed inset-0 bg-black/35  backdrop-blur-sm transition-colors duration-200 overflow-y-scroll"
    >
      <DialogPanel className="relative top-24  bg-background_card text-text_primary p-6 rounded-lg shadow-lg w-full max-w-3xl mx-4 sm:mx-auto  max-sm:w-full max-lg:w-11/12 lg:w-1/2">
        {children}
        <div className="flex justify-end space-x-4 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-400 text-white px-6 py-3 rounded-lg hover:bg-gray-500 transition"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="bg-button_primary text-white px-6 py-3 rounded-lg hover:bg-button_hover transition"
          >
            Save
          </button>
        </div>
      </DialogPanel>
    </Dialog>
  );
}
