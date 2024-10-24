import { configureStates, showSuccessMsg } from "../utils/FeedbackStates";
import axios from "axios";

const addClient = async (body, t) => {
  try {
    configureStates(true, false, "");
    const form = new FormData();
    const unique = Math.floor(Math.random() * 1000000);
    form.append("name", body.name);
    form.append("order", body.order);
    form.append("clientPic", body.clientPic);
    const result = await axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER_LINK}/clients/add?unique=${unique}`,
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

const getClients = async (pageSize, pageNum, t) => {
  try {
    configureStates(true, false, "");
    const result = await axios.get(
      `${process.env.REACT_APP_SERVER_LINK}/clients/get-all?pageSize=${pageSize}&pageNum=${pageNum}`,
      {
        withCredentials: true,  // Ensure this is set
      }
    );
    console.log("flag");
    console.log(result);
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

const getClientsByName = async (name, t) => {
  try {
    configureStates(true, false, "");
    const result = await axios.get(
      `${process.env.REACT_APP_SERVER_LINK}/clients/get-by-name?name=${name}`,
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

const updateClient = async (item, t) => {
  try {
    configureStates(true, false, "");
    const form = new FormData();
    form.append("_id", item._id);
    form.append("name", item.name);
    form.append("order", item.order);
    form.append("clientPic", item.clientPic);
    form.append("unique", item.unique);
    const result = await axios({
      method: "put",
      url: `${
        process.env.REACT_APP_SERVER_LINK
      }/clients/update?unique=${Math.floor(Math.random() * 1000000)}`,
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

const deleteClient = async (id, t) => {
  try {
    configureStates(true, false, "");
    const result = await axios.delete(
      `${process.env.REACT_APP_SERVER_LINK}/clients/delete?_id=${id}`,
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

const deleteAllClients = async (id, t) => {
  try {
    configureStates(true, false, "");
    const result = await axios.delete(
      `${process.env.REACT_APP_SERVER_LINK}/clients/delete-all`,
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

const getClientsStats = async (t, status) => {
  try {
    if (status) configureStates(true, false, "");
    const result = await axios.get(
      `${process.env.REACT_APP_SERVER_LINK}/clients/stats`,
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

const getTopClients = async () => {
  try {
    configureStates(true, false, "");
    const topClients = await axios.get(
      `${process.env.REACT_APP_SERVER_LINK}/clients/top`,
      {
        withCredentials: true,  // Ensure this is set
      }
    );
    if (topClients) {
      configureStates(false, false, "");
    } else {
      configureStates(false, true, "No Clients Found");
    }
    return topClients.data;
  } catch (err) {
    configureStates(false, true, err);
  }
};

export {
  addClient,
  getClients,
  getClientsByName,
  getClientsStats,
  updateClient,
  deleteClient,
  deleteAllClients,
  getTopClients,
};
