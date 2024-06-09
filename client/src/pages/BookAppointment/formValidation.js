import { addAppointment } from "../../services/AppointmentService";

const formValues = { name: "", email: "", phoneNumber: "", messageTxt: "" };

const onFormSubmit = async (values, { setSubmitting }, t) => {
  console.log(values);
  setSubmitting(true);
  await addAppointment(values, t);
  setTimeout(() => {
    window.location.replace(`${process.env.REACT_APP_CLIENT_LINK}/`);
  }, 2000);
  setSubmitting(false);
};

export { formValues, onFormSubmit };
