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
      className="fixed inset-0 bg-black/35 flex justify-end lg:justify-center items-center backdrop-blur-[1px] transition-colors duration-200 overflow-y-scroll"
    >
      <DialogPanel className="bg-background_card text-text_primary p-6 rounded-lg shadow-lg w-96 mt-40 lg:mt-56 mb-2 max-sm:mx-auto max-lg:mr-20 ">
        {children}
        <div className="flex justify-end space-x-4 mt-4">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="bg-button_primary text-white px-4 py-2 rounded-lg hover:bg-button_hover"
          >
            Save
          </button>
        </div>
      </DialogPanel>
    </Dialog>
  );
}
