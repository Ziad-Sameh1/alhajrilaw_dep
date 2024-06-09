import { accessLogin } from "../../services/AccessPagesService";
import { store } from "../../redux/store";
import {
  setErrorMessage,
  setIsError,
  setIsLoading,
  setIsSuccess,
  setViewToken,
} from "../../redux/slices/sessionStorageSlice";

const formValues = { email: "", password: "" };

const onFormSubmit = async (values, { setSubmitting }) => {
  store.dispatch(setViewToken(""));
  store.dispatch(setIsSuccess(false));
  store.dispatch(setIsError(false));
  store.dispatch(setIsLoading(false));
  store.dispatch(setErrorMessage(""));
  const res = await accessLogin(values);
  if (res === "success") {
    store.dispatch(setViewToken(process.env.REACT_APP_VIEW_TOKEN));
    store.dispatch(setIsSuccess(true));
    store.dispatch(setIsError(false));
    store.dispatch(setIsLoading(false));
    store.dispatch(setErrorMessage(""));
  } else if (res === "wrong-pass") {
    store.dispatch(setIsSuccess(false));
    store.dispatch(setIsError(true));
    store.dispatch(setIsLoading(false));
    store.dispatch(setErrorMessage("wrong-pass"));
  } else {
    store.dispatch(setIsSuccess(false));
    store.dispatch(setIsError(true));
    store.dispatch(setIsLoading(false));
    store.dispatch(setErrorMessage("wrong-email"));
  }
  setSubmitting(false);
};

export { formValues, onFormSubmit };
