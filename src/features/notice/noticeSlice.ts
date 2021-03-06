import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { api } from "../../modules/api";
import { notify } from "../../modules/notify";
import { HttpStatus } from "../../modules/httpStatus";

export interface Notice {
  createdAt: string;
  description: string;
  id: number;
  title: string;
}

export interface NoticeState {
  data: Array<Notice>;
  status: "idle" | "loading" | "failed";
  message: string | undefined;
}

const initialState: NoticeState = {
  data: [],
  status: "idle",
  message: "",
};

export const index = createAsyncThunk("notice/index", async () => {
  const { data } = await api.get("notice?page=1");
  return data;
});

export const create = createAsyncThunk(
  "notice/create",
  async (state: { title: string; description: string }) => {
    try {
      const { data } = await api.post("notice", state);
      return data;
    } catch (e) {
      return e.response.data;
    }
  }
);

export const destroy = createAsyncThunk(
  "notice/destroy",
  async (id: number) => {
    try {
      const { data } = await api.delete(`notice/${id}`);
      data.data.id = id;
      return data;
    } catch (e) {
      return e.response.data;
    }
  }
);

export const noticeSlice = createSlice({
  name: "notice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(index.pending, (state) => {
        state.status = "loading";
      })
      .addCase(index.fulfilled, (state, { payload }) => {
        if (payload.statusCode === HttpStatus.OK) {
          state.status = "idle";
          state.data = payload.data;
          return notify.info("데이터 조회에 성공했습니다.");
        }

        notify.warning(payload.message);
      })
      .addCase(create.pending, (state) => {
        state.status = "loading";
      })
      .addCase(create.fulfilled, (state, { payload }) => {
        //TODO 데이터가 등록되면, 등록된 정보를 뱉어줘야겠네(back-end에서)
        state.status = "idle";
        if (payload.statusCode === HttpStatus.OK) {
          const { id, title, description, createdAt } = payload.data;
          state.data.unshift({ id, title, description, createdAt });
          return notify.info(payload.message);
        }

        notify.warning(payload.message);
      })
      .addCase(destroy.pending, (state) => {
        state.status = "loading";
      })
      .addCase(destroy.fulfilled, (state, { payload }) => {
        state.status = "idle";
        if (payload.statusCode === 200) {
          state.data = state.data.filter(
            (notice) => notice.id !== payload.data.id
          );
          return notify.info(payload.message);
        }
        notify.warning(payload.message);
      });
  },
});

export const noticeStatus = (state: RootState) => state.notice;
export const noticeIndex = (state: RootState) => state.notice.data;
