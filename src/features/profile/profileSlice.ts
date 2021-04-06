import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../modules/api";
import { RootState } from "../../app/store";

export interface Profile {
  id: number;
  accessToken: string;
  advisoryCareer: string;
  businessName: string;
  businessNo: string;
  businessOwner: string;
  career: string;
  department: string;
  email: string;
  fieldCareer: string;
  group: string;
  isAdvisoryJoined: boolean;
  name: string;
  position: string;
  type: {
    description: string;
    id: 5;
  };
}

export interface ProfileState {
  data: Profile | null;
  status: "idle" | "loading" | "failed";
  message: "";
}

const initialState: ProfileState = {
  data: null,
  status: "idle",
  message: "",
};

export const profileLogin = createAsyncThunk(
  "profile/login",
  async (payload: { email: string; password: string }) => {
    const { data } = await api.post("user/login", payload);
    return data;
  }
);

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(profileLogin.pending, (state) => {
        state.status = "loading";
      })
      .addCase(profileLogin.fulfilled, (state, { payload }) => {
        state.status = "idle";
        state.data = payload.data;
      });
  },
});

export const {} = profileSlice.actions;

export const profileStatus = (state: RootState) => state.profile;
export const profileShow = (state: RootState) => state.profile.data;
