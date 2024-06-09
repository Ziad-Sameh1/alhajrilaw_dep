import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  viewToken: "",
  language: "",
  isLoading: false,
  isError: false,
  isSuccess: false,
  errorMessage: "",
  successMessage: "",
  reviewCodeToken: "",
};

export const sessionStorageSlice = createSlice({
  name: "sessionStorage",
  initialState,
  reducers: {
    setViewToken: (state, action) => {
      state.viewToken = action.payload;
    },
    clearViewToken: (state) => {
      state.viewToken = "";
    },
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setIsError: (state, action) => {
      state.isError = action.payload;
    },
    setIsSuccess: (state, action) => {
      state.isSuccess = action.payload;
    },
    setErrorMessage: (state, action) => {
      state.errorMessage = action.payload;
    },
    setSuccessMessage: (state, action) => {
      state.successMessage = action.payload;
    },
    setReviewCodeToken: (state, action) => {
      state.reviewCodeToken = action.payload;
    },
  },
});

export const {
  setViewToken,
  clearViewToken,
  setLanguage,
  setIsLoading,
  setIsError,
  setIsSuccess,
  setErrorMessage,
  setSuccessMessage,
  setReviewCodeToken,
} = sessionStorageSlice.actions;

export default sessionStorageSlice.reducer;
