import { postReview } from "../../services/ReviewService";
import { configureStates, setReviewToken } from "../../utils/FeedbackStates";

const formValues = {
  name: "",
  email: "",
  phoneNumber: "",
  reviewTxt: "",
  rating: 0,
  token: "",
};

const onFormSubmit = async (values, { setSubmitting }, t) => {
  setSubmitting(true);
  if (values.rating == 0) {
    configureStates(false, true, t("rating-error"));
  } else {
    console.log(values);
    await postReview(values, t);
  }
  setSubmitting(false);
};

export { formValues, onFormSubmit };
