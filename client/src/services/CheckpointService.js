import axios from "axios";

import { configureStates } from "../utils/FeedbackStates";

const getSenderCheckpoints = async (email, pageSize, pageNum, t) => {
  try {
    configureStates(true, false, "");
    const result = await axios.get(
      `${process.env.REACT_APP_SERVER_LINK}/checkpoints/user?email=${email}&pageSize=${pageSize}&pageNum=${pageNum}`,
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

const getCheckpointsReport = async (
  pageSize,
  pageNum,
  startDate,
  endDate,
  email,
  t
) => {
  try {
    configureStates(true, false, "");
    console.log("axios get")
    const result = await axios.get(
      `${process.env.REACT_APP_SERVER_LINK}/checkpoints/get-grouped`,
      {
        params: {
          pageSize,
          pageNum,
          startDate: startDate?.toISOString(),
          endDate: endDate?.toISOString(),
          email: email,
        },
        withCredentials: true
      },

    );
    console.log("result", result)
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

const deleteCheckpoint = async (
  id,
  t
) => {
  try {
    configureStates(true, false, "");
    console.log("axios get")
    const result = await axios.delete(
      `${process.env.REACT_APP_SERVER_LINK}/checkpoints/delete/${id}`,
      {
        withCredentials: true,  // Ensure this is set
      }
    );
    console.log("result", result)
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

export { getSenderCheckpoints, getCheckpointsReport, deleteCheckpoint };
