import { configureStates, showSuccessMsg } from "../utils/FeedbackStates";
import axios from "axios";

const addMessage = async (body, t) => {
  try {
    configureStates(true, false, "");
    const result = await axios.post(
      `${process.env.REACT_APP_SERVER_LINK}/messages/add`,
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

const getMessages = async (pageSize, pageNum, t) => {
  try {
    configureStates(true, false, "");
    const result = await axios.get(
      `${process.env.REACT_APP_SERVER_LINK}/messages/get-all?pageSize=${pageSize}&pageNum=${pageNum}`,
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

const getMessagesByName = async (name, t) => {
  try {
    configureStates(true, false, "");
    const result = await axios.get(
      `${process.env.REACT_APP_SERVER_LINK}/messages/get-by-name?name=${name}`,
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

const updateMessage = async (item, t) => {
  try {
    configureStates(true, false, "");
    const result = await axios.put(
      `${process.env.REACT_APP_SERVER_LINK}/messages/update`,
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

const deleteMessage = async (id, t) => {
  try {
    configureStates(true, false, "");
    const result = await axios.delete(
      `${process.env.REACT_APP_SERVER_LINK}/messages/delete?_id=${id}`,
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

const deleteAllMessages = async (id, t) => {
  try {
    configureStates(true, false, "");
    const result = await axios.delete(
      `${process.env.REACT_APP_SERVER_LINK}/messages/delete-all`,
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

const getMessagesStats = async (t, status = true) => {
  try {
    if (status) configureStates(true, false, "");
    const result = await axios.get(
      `${process.env.REACT_APP_SERVER_LINK}/messages/stats`,
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
  addMessage,
  getMessages,
  getMessagesByName,
  getMessagesStats,
  updateMessage,
  deleteMessage,
  deleteAllMessages,
};
