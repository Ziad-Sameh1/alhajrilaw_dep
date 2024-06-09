import { configureStates, showSuccessMsg } from "../utils/FeedbackStates";
import axios from "axios";

const addStaff = async (body, t) => {
  try {
    configureStates(true, false, "");
    const form = new FormData();
    form.append("name", body.name);
    form.append("position", body.position);
    form.append("profilePic", body.profilePic);
    form.append("unique", body.unique);
    const result = await axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER_LINK}/staff/add?unique=${body.unique}`,
      data: form,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
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

const getStaff = async (pageSize, pageNum, t) => {
  try {
    configureStates(true, false, "");
    const result = await axios.get(
      `${process.env.REACT_APP_SERVER_LINK}/staff/get-all?pageSize=${pageSize}&pageNum=${pageNum}`
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

const getStaffByName = async (name, t) => {
  try {
    configureStates(true, false, "");
    const result = await axios.get(
      `${process.env.REACT_APP_SERVER_LINK}/staff/get-by-name?name=${name}`
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

const updateStaff = async (item, t) => {
  try {
    configureStates(true, false, "");
    const form = new FormData();
    form.append("_id", item._id);
    form.append("name", item.name);
    form.append("position", item.position);
    form.append("profilePic", item.profilePic);
    form.append("unique", item.unique);
    const result = await axios({
      method: "put",
      url: `${
        process.env.REACT_APP_SERVER_LINK
      }/staff/update?unique=${Math.floor(Math.random() * 1000000)}`,
      data: form,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
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

const deleteStaff = async (id, t) => {
  try {
    configureStates(true, false, "");
    const result = await axios.delete(
      `${process.env.REACT_APP_SERVER_LINK}/staff/delete?_id=${id}`
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

const deleteAllStaff = async (id, t) => {
  try {
    configureStates(true, false, "");
    const result = await axios.delete(
      `${process.env.REACT_APP_SERVER_LINK}/staff/delete-all`
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

const getStaffStats = async (t, status = true) => {
  try {
    if (status) configureStates(true, false, "");
    const result = await axios.get(
      `${process.env.REACT_APP_SERVER_LINK}/staff/stats`
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
  addStaff,
  getStaff,
  getStaffByName,
  getStaffStats,
  updateStaff,
  deleteStaff,
  deleteAllStaff,
};
