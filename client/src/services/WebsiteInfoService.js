import axios from "axios";
import { configureStates, showSuccessMsg } from "../utils/FeedbackStates";

const formatStats = (stats) => {
  const clientsNum = parseInt(
    stats.clientsNum.substring(0, stats.clientsNum.length - 1)
  );
  const casesNum = parseInt(
    stats.casesNum.substring(0, stats.casesNum.length - 1)
  );
  const studentsNum = parseInt(
    stats.studentsNum.substring(0, stats.studentsNum.length - 1)
  );
  const yearsNum = new Date().getFullYear() - 2011;
  return { clientsNum, casesNum, yearsNum, studentsNum };
};

export const getStats = async () => {
  try {
    configureStates(true, false, "");
    const stats = await axios.get(
      `${process.env.REACT_APP_SERVER_LINK}/info/`,
      {
        withCredentials: true, // Ensure this is set
      }
    );
    if (stats.data) {
      configureStates(false, false, "");
      return formatStats(stats.data);
    } else {
      configureStates(false, true, "No Stats Found");
    }
  } catch (err) {
    configureStates(false, true, err);
    console.log(err);
  }
};

export const getWebsiteStats = async (t) => {
  try {
    configureStates(true, false, "");
    const result = await axios.get(
      `${process.env.REACT_APP_SERVER_LINK}/info/`,
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

export const updateWebsiteStats = async (item, t) => {
  try {
    console.log(item);
    configureStates(true, false, "");
    const result = await axios.put(
      `${process.env.REACT_APP_SERVER_LINK}/info/update`,
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
