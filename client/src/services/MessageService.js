import { configureStates, showSuccessMsg } from "../utils/FeedbackStates";
import axios from "axios";

const addMessage = async (body, t) => {
  try {
    configureStates(true, false, "");
    const result = await axios.post(
      `${process.env.REACT_APP_SERVER_LINK}/messages/add`,
      body
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
      `${process.env.REACT_APP_SERVER_LINK}/messages/get-all?pageSize=${pageSize}&pageNum=${pageNum}`
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
      `${process.env.REACT_APP_SERVER_LINK}/messages/get-by-name?name=${name}`
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
      item
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
      `${process.env.REACT_APP_SERVER_LINK}/messages/delete?_id=${id}`
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
      `${process.env.REACT_APP_SERVER_LINK}/messages/delete-all`
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
      `${process.env.REACT_APP_SERVER_LINK}/messages/stats`
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
