import { login } from "../../services/AdminService";
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
  setSubmitting(true);
  const res = await login(values);
  if (res.email !== '') window.location.replace(`${process.env.REACT_APP_CLIENT_LINK}/dashboard/main`)
  setSubmitting(false);
};

export { formValues, onFormSubmit };
