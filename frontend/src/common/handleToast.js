import { toast } from "sonner";

export const handleToast = (status, message) => {
  if (status >= 200 && status < 300) {
    toast.success(message, { position: "top-center", autoClose: 2000 });
  } else if (status >= 400 && status < 500) {
    toast.warning(message || "Client error occurred.", {
      position: "top-center",
      autoClose: 4000,
    });
  } else if (status >= 500) {
    toast.error(message || "Server error occurred.", {
      position: "top-center",
      autoClose: 5000,
    });
  } else {
    toast.info(message || "Unexpected response.", {
      position: "top-center",
      autoClose: 5000,
    });
  }
};
