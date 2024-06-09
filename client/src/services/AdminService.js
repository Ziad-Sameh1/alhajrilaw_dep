import { configureStates, showSuccessMsg } from "../utils/FeedbackStates";
import axios from "axios";
const login = async (values) => {
  try {
    configureStates(true, false, "");
    const admin = await axios.post(
      `${process.env.REACT_APP_SERVER_LINK}/admins/login`,
      { email: values.email, password: values.password }
    );
    console.log(admin);
    if (admin) {
      configureStates(false, false, "");
    } else {
      configureStates(false, true, admin.msg);
    }
    return admin.data;
  } catch (err) {
    configureStates(false, true, err);
  }
};

const checkLoginStatus = async () => {
  try {
    axios.defaults.withCredentials = true;
    const result = await axios.get(
      `${process.env.REACT_APP_SERVER_LINK}/admins/status`,
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

const addAdmin = async (body, t) => {
  console.log(body);
  try {
    configureStates(true, false, "");
    const result = await axios.post(
      `${process.env.REACT_APP_SERVER_LINK}/admins/add`,
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

const getAdmins = async (pageSize, pageNum, t) => {
  try {
    configureStates(true, false, "");
    const result = await axios.get(
      `${process.env.REACT_APP_SERVER_LINK}/admins/get-all?pageSize=${pageSize}&pageNum=${pageNum}`
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

const getAdminByEmail = async (email, t) => {
  try {
    configureStates(true, false, "");
    const result = await axios.get(
      `${process.env.REACT_APP_SERVER_LINK}/admins/get-by-email?email=${email}`
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

const updateAdmin = async (id, role, t) => {
  try {
    configureStates(true, false, "");
    const result = await axios.put(
      `${process.env.REACT_APP_SERVER_LINK}/admins/update`,
      { _id: id, role: role }
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

const deleteAdmin = async (id, t) => {
  try {
    configureStates(true, false, "");
    const result = await axios.delete(
      `${process.env.REACT_APP_SERVER_LINK}/admins/delete?_id=${id}`
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
    await axios.post(`${process.env.REACT_APP_SERVER_LINK}/admins/logout`);
    window.location.replace(
      `${process.env.REACT_APP_CLIENT_LINK}/dashboard/login`
    );
  } catch (err) {
    configureStates(false, true, t("internet-problem"));
  }
};

const getAdminStats = async (t, status = true) => {
  try {
    if (status) configureStates(true, false, "");
    const result = await axios.get(
      `${process.env.REACT_APP_SERVER_LINK}/admins/stats`
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

const getAdminEmail = async (t, status = true) => {
  try {
    if (status) configureStates(true, false, "");
    console.log("before");

    const result = await axios.get(
      `${process.env.REACT_APP_SERVER_LINK}/admins/get-email`
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
      `${process.env.REACT_APP_SERVER_LINK}/admins/change-password`,
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
  addAdmin,
  getAdminStats,
  getAdmins,
  getAdminByEmail,
  updateAdmin,
  deleteAdmin,
  logout,
  getAdminEmail,
  changePassword,
};
