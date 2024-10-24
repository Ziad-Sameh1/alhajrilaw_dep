import { configureStates, showSuccessMsg } from "../utils/FeedbackStates";
import axios from "axios";

const addCategory = async (body, t) => {
  try {
    configureStates(true, false, "");
    const result = await axios.post(
      `${process.env.REACT_APP_SERVER_LINK}/categories/add`,
      body,
      {
        withCredentials: true,  // Ensure this is set
      }
    );
    if (result.status === 201) {
      configureStates(false, false, "");
      showSuccessMsg(t("added-successfully"));
    } else {
      configureStates(false, true, t("error-occurred"));
    }
  } catch (err) {
    configureStates(false, true, err);
  }
};

const getCategories = async (t) => {
  try {
    configureStates(true, false, "");
    const result = await axios.get(
      `${process.env.REACT_APP_SERVER_LINK}/categories/`,
      {
        withCredentials: true,  // Ensure this is set
      }
    );
    if (result.status == 200) {
      configureStates(false, false, "");
    } else if (result.status == 404) {
      configureStates(false, true, t("no-data-found"));
    } else {
      configureStates(false, true, t("error-occurred"));
    }
    return result.data;
  } catch (err) {
    configureStates(false, true, t("internet-problem"));
  }
};

export { addCategory, getCategories };
