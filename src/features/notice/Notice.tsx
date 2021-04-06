import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { index, noticeIndex, noticeStatus } from "./noticeSlice";
import Loading from "../../modules/components/Loading";
import { useToasts } from "react-toast-notifications";

export const Notice = () => {
  const { addToast } = useToasts();
  const { status } = useAppSelector(noticeStatus);
  const notices = useAppSelector(noticeIndex);
  const dispatch = useAppDispatch();

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
      {status !== "loading" ? (
        notices.map((notice) => (
          <div key={notice.id}>
            <h1>{notice.title}</h1>
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
