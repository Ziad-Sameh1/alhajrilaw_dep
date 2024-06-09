import { configureStates, showSuccessMsg } from "../utils/FeedbackStates";
import axios from "axios";
const login = async (values) => {
  try {
    configureStates(true, false, "");
    const sender = await axios.post(
      `${process.env.REACT_APP_SERVER_LINK}/senders/login`,
      { email: values.email, password: values.password }
    );
    console.log(sender);
    if (sender) {
      configureStates(false, false, "");
    } else {
      configureStates(false, true, sender.msg);
    }
    return sender.data;
  } catch (err) {
    configureStates(false, true, err);
  }
};

const checkLoginStatus = async () => {
  try {
    axios.defaults.withCredentials = true;
    const result = await axios.get(
      `${process.env.REACT_APP_SERVER_LINK}/senders/status`,
      { withCredentials: true }
    );
    console.log(result);
    if (result.data.msg !== "Success" || result.status !== 200) {
      window.location.replace(
        `${process.env.REACT_APP_CLIENT_LINK}/dashboard/login`
      );
    }
    return result.data;
  } catch (err) {
    console.log(err);
    configureStates(false, true, err);
  }
};

const addSender = async (body, t) => {
  console.log(body);
  try {
    configureStates(true, false, "");
    const result = await axios.post(
      `${process.env.REACT_APP_SERVER_LINK}/senders/add`,
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

const getSenders = async (pageSize, pageNum, t) => {
  try {
    configureStates(true, false, "");
    const result = await axios.get(
      `${process.env.REACT_APP_SERVER_LINK}/senders/get-all?pageSize=${pageSize}&pageNum=${pageNum}`
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

const getSenderByEmail = async (email, t) => {
  try {
    configureStates(true, false, "");
    const result = await axios.get(
      `${process.env.REACT_APP_SERVER_LINK}/senders/get-by-email?email=${email}`
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

const updateSender = async (id, email, receivers, t) => {
  try {
    configureStates(true, false, "");
    const result = await axios.put(
      `${process.env.REACT_APP_SERVER_LINK}/senders/update`,
      { _id: id, email: email, receivers: receivers }
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

const deleteSender = async (email, t) => {
  try {
    configureStates(true, false, "");
    const result = await axios.delete(
      `${process.env.REACT_APP_SERVER_LINK}/senders/delete?email=${email}`
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

const logout = async (t) => {
  try {
    configureStates(true, false, "");
    await axios.post(`${process.env.REACT_APP_SERVER_LINK}/senders/logout`);
    window.location.replace(
      `${process.env.REACT_APP_CLIENT_LINK}/dashboard/login`
    );
  } catch (err) {
    configureStates(false, true, t("internet-problem"));
  }
};

const getSenderStats = async (t, status = true) => {
  try {
    if (status) configureStates(true, false, "");
    const result = await axios.get(
      `${process.env.REACT_APP_SERVER_LINK}/senders/stats`
    );
    console.log(result);
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

const getSenderEmail = async (t, status = true) => {
  try {
    if (status) configureStates(true, false, "");
    console.log("before");

    const result = await axios.get(
      `${process.env.REACT_APP_SERVER_LINK}/senders/get-email`
    );
    console.log("now flag");
    console.log(result);
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

const changePassword = async (currentPass, newPass, t) => {
  try {
    configureStates(true, false, "");
    const result = await axios.put(
      `${process.env.REACT_APP_SERVER_LINK}/senders/change-password`,
      { currentPass: currentPass, newPass: newPass }
    );
    console.log("inside change password");
    console.log(result);
    if (result.status == 200) {
      configureStates(false, false, "");
      showSuccessMsg(t("password-changed-successfully"));
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

export {
  login,
  checkLoginStatus,
  addSender,
  getSenderStats,
  getSenders,
  getSenderByEmail,
  updateSender,
  deleteSender,
  logout,
  getSenderEmail,
  changePassword,
};
