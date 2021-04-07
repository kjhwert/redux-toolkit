import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  create,
  destroy,
  index,
  noticeIndex,
  noticeStatus,
} from "./noticeSlice";
import Loading from "../../modules/components/Loading";
import { useToasts } from "react-toast-notifications";
import { RouteComponentProps } from "react-router";
import { notify } from "../../modules/common";
import { HttpStatus } from "../../modules/httpStatus";

export const Notice = ({ history }: RouteComponentProps) => {
  const { addToast } = useToasts();
  const { status } = useAppSelector(noticeStatus);
  const notices = useAppSelector(noticeIndex);
  const dispatch = useAppDispatch();
  const [state, setState] = useState({
    title: "",
    description: "",
  });

  const createNotice = async () => {
    const { payload } = await dispatch(create(state));
    notify(payload, addToast);
    if (payload.statusCode === HttpStatus.UNAUTHORIZED) {
      return history.push("login");
    }
    if (payload.statusCode === HttpStatus.OK) {
      return setState({ title: "", description: "" });
    }
  };

  const destroyNotice = async (id: number) => {
    const { payload } = await dispatch(destroy(id));
    if (payload.statusCode === 401) {
      addToast("로그인이 필요합니다.", {
        appearance: "warning",
        autoDismiss: true,
      });
      return history.push("/login");
    }
    if (payload.statusCode === 200) {
      addToast(payload.message, {
        appearance: "success",
        autoDismiss: true,
      });
    }
  };

  const getIndex = async () => {
    const {
      payload: { statusCode },
    } = await dispatch(index());
    if (statusCode === 200) {
      addToast("데이터 조회에 성공했습니다.", {
        appearance: "success",
        autoDismiss: true,
      });
    }
  };

  useEffect(() => {
    getIndex();
  }, [dispatch]);

  return (
    <div>
      <div>
        <h1>공지사항 등록</h1>
        <input
          type="text"
          value={state.title}
          onChange={(e) => setState({ ...state, title: e.target.value })}
        />
        <textarea
          value={state.description}
          onChange={(e) => setState({ ...state, description: e.target.value })}
        />
        <button onClick={createNotice}>등록</button>
      </div>
      {status !== "loading" ? (
        notices.map((notice) => (
          <div key={notice.id}>
            <div>
              <h1>{notice.title}</h1>
              <button
                onClick={() => {
                  destroyNotice(notice.id);
                }}
              >
                x
              </button>
            </div>
            <p>{notice.description}</p>
          </div>
        ))
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Notice;
