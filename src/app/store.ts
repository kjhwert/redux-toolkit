import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { counterSlice } from "../features/counter/counterSlice";
import { noticeSlice } from "../features/notice/noticeSlice";
import { profileSlice } from "../features/profile/profileSlice";

export const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
    notice: noticeSlice.reducer,
    profile: profileSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
