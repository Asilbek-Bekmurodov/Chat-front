import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpenModal: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setIsOpenModal: (state, action) => {
      state.isOpenModal = action.payload;
    },
  },
});

export const { setIsOpenModal } = uiSlice.actions;
export default uiSlice.reducer;
