import { toast, ToastOptions } from "react-toastify";

const notifyOptions: ToastOptions = {
  hideProgressBar: true,
  autoClose: 3000,
  closeOnClick: true,
};

export const notify = {
  info: (message: string) => {
    toast.info(message, notifyOptions);
  },
  success: (message: string) => {
    toast.success(message, notifyOptions);
  },
  warning: (message: string) => {
    toast.warning(message, notifyOptions);
  },
  error: (message: string) => {
    toast.error(message, notifyOptions);
  },
};
