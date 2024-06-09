import { asyncTimeout } from "../utils/HelperFunctions";

export const accessLogin = async (form) => {
  await asyncTimeout(1000);
  if (
    form.email === process.env.REACT_APP_ACCESS_EMAIL &&
    form.password === process.env.REACT_APP_ACCESS_PASS
  ) {
    return "success";
  } else if (form.email === process.env.REACT_APP_ACCESS_EMAIL) {
    return "wrong-pass";
  } else {
    return "wrong-email";
  }
};
