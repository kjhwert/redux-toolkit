import { AddToast } from "react-toast-notifications";
import { HttpStatus } from "./httpStatus";
export const BASE_URL = "http://localhost:3002/";

export interface Notify {
  statusCode: number;
  message: string;
}

export const notify = ({ statusCode, message }: Notify, addToast: AddToast) => {
  switch (statusCode) {
    case HttpStatus.NOT_ACCEPTABLE:
      addToast(message, {
        appearance: "warning",
        autoDismiss: true,
      });
      break;
    case HttpStatus.OK | HttpStatus.CREATED:
      addToast(message, {
        appearance: "success",
        autoDismiss: true,
      });
      break;
    default:
      addToast(message, {
        appearance: "error",
        autoDismiss: true,
      });
  }
};
