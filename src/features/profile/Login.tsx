import React, { useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { useToasts } from "react-toast-notifications";
import { profileLogin } from "./profileSlice";
import { RouteComponentProps } from "react-router";

const Login = ({ history }: RouteComponentProps) => {
  const { addToast } = useToasts();
  const dispatch = useAppDispatch();
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const login = async () => {
    const {
      payload: { statusCode, message },
    } = await dispatch(profileLogin(state));
    if (statusCode !== 200) {
      return addToast(message, {
        appearance: "warning",
        autoDismiss: true,
      });
    }
    addToast("로그인 되었습니다.", {
      appearance: "success",
      autoDismiss: true,
    });
    history.push("/profile");
  };

  return (
    <div>
      <div>
        <span>email</span>
        <input
          type="text"
          value={state.email}
          onChange={(e) => setState({ ...state, email: e.target.value })}
        />
      </div>
      <div>
        <span>password</span>
        <input
          type="password"
          value={state.password}
          onChange={(e) => setState({ ...state, password: e.target.value })}
        />
      </div>
      <button onClick={login}>login</button>
    </div>
  );
};

export default Login;
