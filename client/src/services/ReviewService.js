import axios from "axios";

import {
  configureStates,
  showSuccessMsg,
  setReviewToken,
} from "../utils/FeedbackStates";

const postReview = async (body, t) => {
  try {
    configureStates(true, false, "");
    const config = {
      headers: { Authorization: `Bearer ${body.token}`, withCredentials: true },
    };
    const result = await axios.post(
      `${process.env.REACT_APP_SERVER_LINK}/reviews/add`,
      body,
      config
    );
    if (result.status === 201) {
      configureStates(false, false, "");
      showSuccessMsg(t("review-success"));
      setReviewToken("");
      setTimeout(() => {
        window.location.replace(`${process.env.REACT_APP_CLIENT_LINK}/`);
      }, 1000);
    } else {
      configureStates(false, true, "An Error Occurred!");
    }
  } catch (err) {
    configureStates(false, true, err);
  }
};

const getLastReviews = async () => {
  try {
    configureStates(true, false, "");
    const reviews = await axios.get(
      `${process.env.REACT_APP_SERVER_LINK}/reviews/last`,
      {
        withCredentials: true,  // Ensure this is set
      }
    );
    if (reviews) {
      configureStates(false, false, "");
    } else {
      configureStates(false, true, "No Reviews Found");
    }
    return reviews.data;
  } catch (err) {
    configureStates(false, true, err);
  }
};

const addReview = async (body, t) => {
  try {
    configureStates(true, false, "");
    const result = await axios.post(
      `${process.env.REACT_APP_SERVER_LINK}/reviews/admin/add`,
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

const getReviews = async (pageSize, pageNum, t) => {
  try {
    configureStates(true, false, "");
    const result = await axios.get(
      `${process.env.REACT_APP_SERVER_LINK}/reviews/get-all?pageSize=${pageSize}&pageNum=${pageNum}`,
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

const getReviewsByName = async (name, t) => {
  try {
    configureStates(true, false, "");
    const result = await axios.get(
      `${process.env.REACT_APP_SERVER_LINK}/reviews/get-by-name?name=${name}`,
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

const updateReview = async (item, t) => {
  try {
    configureStates(true, false, "");
    const result = await axios.put(
      `${process.env.REACT_APP_SERVER_LINK}/reviews/update`,
      item,
      {
        withCredentials: true,  // Ensure this is set
      }
    );
    if (result.status == 200) {
      configureStates(false, false, "");
      showSuccessMsg(t("updated-successfully"));
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

const deleteReview = async (id, t) => {
  try {
    configureStates(true, false, "");
    const result = await axios.delete(
      `${process.env.REACT_APP_SERVER_LINK}/reviews/delete?_id=${id}`,
      {
        withCredentials: true,  // Ensure this is set
      }
    );
    if (result.status == 200) {
      configureStates(false, false, "");
      showSuccessMsg(t("deleted-successfully"));
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

const deleteAllReviews = async (id, t) => {
  try {
    configureStates(true, false, "");
    const result = await axios.delete(
      `${process.env.REACT_APP_SERVER_LINK}/reviews/delete-all`,
      {
        withCredentials: true,  // Ensure this is set
      }
    );
    if (result.status == 200) {
      configureStates(false, false, "");
      showSuccessMsg(t("deleted-successfully"));
    } else {
      configureStates(false, true, t("error-occurred"));
    }
    return result.data;
  } catch (err) {
    configureStates(false, true, t("internet-problem"));
  }
};

const getReviewsStats = async (t, status) => {
  try {
    if (status) configureStates(true, false, "");
    const result = await axios.get(
      `${process.env.REACT_APP_SERVER_LINK}/reviews/stats`,
      {
        withCredentials: true,  // Ensure this is set
      }
    );
    if (status) {
      if (result.status == 200) {
        configureStates(false, false, "");
      } else {
        configureStates(false, true, t("error-occurred"));
      }
    }
    return result.data;
  } catch (err) {
    configureStates(false, true, t("internet-problem"));
  }
};

export {
  addReview,
  getReviews,
  getReviewsByName,
  getReviewsStats,
  updateReview,
  deleteReview,
  deleteAllReviews,
  postReview,
  getLastReviews,
};
