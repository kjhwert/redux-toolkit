import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { counterSlice } from "../counter/counterSlice";
import { RootState } from "../../app/store";
import { api } from "../../modules/api";

export interface Notice {
  createdAt: string;
  description: string;
  id: number;
  title: string;
}

export interface NoticeState {
  data: Array<Notice>;
  status: "idle" | "loading" | "failed";
  message: "";
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
        state.status = "idle";
        state.data = payload.data;
      });
  },
});

export const {} = counterSlice.actions;

export const noticeStatus = (state: RootState) => state.notice;
export const noticeIndex = (state: RootState) => state.notice.data;
