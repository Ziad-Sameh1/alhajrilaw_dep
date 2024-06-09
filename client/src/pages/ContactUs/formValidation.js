import { addMessage } from "../../services/MessageService";

const formValues = { name: "", email: "", phoneNumber: "", messageTxt: "" };

const onFormSubmit = async (values, { setSubmitting }, t) => {
  console.log(values);
  setSubmitting(true);
  await addMessage(values, t);
  setTimeout(() => {
    window.location.replace(`${process.env.REACT_APP_CLIENT_LINK}/`);
  }, 3000);
  setSubmitting(false);
};

export { formValues, onFormSubmit };
