import { toast, ToastContent } from "react-toastify";
import { createSlice } from "@reduxjs/toolkit";

const initialState: ToastContent = {
  type: "default",
  hideProgressBar: true,
  autoClose: 3000,
  closeOnClick: true,
  position: "top-center",
};

export const notifySlice = createSlice({
  name: "notify",
  initialState,
  reducers: {
    info: (state, { payload }) => {
      toast.info(payload.message, {
        position: "top-center",
        hideProgressBar: true,
        autoClose: 3000,
        closeOnClick: true,
      });
    },
  },
});

export const { info } = notifySlice.actions;
