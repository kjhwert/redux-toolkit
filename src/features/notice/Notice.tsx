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
import { RouteComponentProps } from "react-router";
import { HttpStatus } from "../../modules/httpStatus";

export const Notice = ({ history }: RouteComponentProps) => {
  const { status } = useAppSelector(noticeStatus);
  const notices = useAppSelector(noticeIndex);
  const dispatch = useAppDispatch();
  const [state, setState] = useState({
    title: "",
    description: "",
  });

  const createNotice = async () => {
    const { payload } = await dispatch(create(state));
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
      return history.push("/login");
    }
  };

  useEffect(() => {
    dispatch(index());
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
