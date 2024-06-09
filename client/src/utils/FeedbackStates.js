import {
  setErrorMessage,
  setIsError,
  setIsLoading,
  setIsSuccess,
  setReviewCodeToken,
  setSuccessMessage,
} from "../redux/slices/sessionStorageSlice";
import { store } from "../redux/store";

const configureStates = (isLoading, isError, errorMessage) => {
  store.dispatch(setIsLoading(isLoading));
  store.dispatch(setIsError(isError));
  store.dispatch(setErrorMessage(errorMessage));
};

const setSuccess = (isSuccess) => {
  store.dispatch(setIsSuccess(isSuccess));
};

const setReviewToken = (token) => {
  store.dispatch(setReviewCodeToken(token));
};

const showSuccessMsg = (msg) => {
  store.dispatch(setIsSuccess(true));
  store.dispatch(setSuccessMessage(msg));
  setTimeout(() => {
    store.dispatch(setIsSuccess(false));
    store.dispatch(setSuccessMessage(""));
  }, 3000);
};

const resetStates = () => {
  store.dispatch(setIsLoading(false));
  store.dispatch(setIsError(false));
  store.dispatch(setIsSuccess(false));
  store.dispatch(setErrorMessage(""));
  store.dispatch(setSuccessMessage(""));
};

export {
  configureStates,
  showSuccessMsg,
  resetStates,
  setSuccess,
  setReviewToken,
};
