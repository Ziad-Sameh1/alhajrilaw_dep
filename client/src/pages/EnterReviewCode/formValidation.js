import { isValidCode } from "../../services/ReviewCodeService";
const formValues = { code: "" };

const onFormSubmit = async (values, { setSubmitting }, t) => {
  setSubmitting(true);
  await isValidCode(values, t);
  setSubmitting(false);
};

export { formValues, onFormSubmit };
