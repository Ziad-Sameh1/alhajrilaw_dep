import { configureStates, showSuccessMsg } from "../utils/FeedbackStates";
import axios from "axios";

const getLastPages = async (pageSize, pageNum) => {
  try {
    configureStates(true, false, "");
    const pages = await axios.get(
      `${process.env.REACT_APP_SERVER_LINK}/pages/last?pageSize=${pageSize}&pageNum=${pageNum}`
    );
    if (pages) {
      configureStates(false, false, "");
    } else {
      configureStates(false, true, "No Pages Found");
    }
    return pages.data;
  } catch (err) {
    configureStates(false, true, err);
  }
};

const getPage = async (pageLink) => {
  try {
    configureStates(true, false, "");
    const pages = await axios.get(
      `${process.env.REACT_APP_SERVER_LINK}/pages?link=${pageLink}`
    );
    console.log(pages);
    if (pages) {
      configureStates(false, false, "");
    } else {
      configureStates(false, true, "No Pages Found");
    }
    return pages.data;
  } catch (err) {
    configureStates(false, true, err);
  }
};

const addPage = async (body, t) => {
  try {
    configureStates(true, false, "");
    const form = new FormData();
    const unique1 = Math.floor(Math.random() * 100000000000);
    const unique2 = Math.floor(Math.random() * 100000000000);
    form.append("title", body.title);
    form.append("content", body.content);
    form.append("category", body.category);
    form.append("thumbnail", body.thumbnail);
    form.append("video", body.video);
    const result = await axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER_LINK}/pages/add?unique1=${unique1}&unique2=${unique2}`,
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

const getPages = async (pageSize, pageNum, t) => {
  try {
    configureStates(true, false, "");
    const result = await axios.get(
      `${process.env.REACT_APP_SERVER_LINK}/pages/get-all?pageSize=${pageSize}&pageNum=${pageNum}`
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

const getPagesByName = async (name, t) => {
  try {
    configureStates(true, false, "");
    const result = await axios.get(
      `${process.env.REACT_APP_SERVER_LINK}/pages/get-by-name?name=${name}`
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

const getPagesByCategory = async (pageSize, pageNum, category, t) => {
  try {
    configureStates(true, false, "");
    const result = await axios.get(
      `${process.env.REACT_APP_SERVER_LINK}/pages/get-by-category?pageSize=${pageSize}&pageNum=${pageNum}&category=${category}`
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

const updatePage = async (item, t) => {
  try {
    configureStates(true, false, "");
    const form = new FormData();
    const unique1 = Math.floor(Math.random() * 100000000000);
    const unique2 = Math.floor(Math.random() * 100000000000);
    form.append("_id", item._id);
    form.append("title", item.title);
    form.append("content", item.content);
    form.append("category", item.category);
    form.append("thumbnail", item.thumbnail);
    form.append("video", item.video);
    form.append("thumbnailLink", item.thumbnailLink);
    form.append("videoLink", item.videoLink);
    const result = await axios({
      method: "put",
      url: `${process.env.REACT_APP_SERVER_LINK}/pages/update?unique1=${unique1}&unique2=${unique2}`,
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

const deletePage = async (id, t) => {
  try {
    configureStates(true, false, "");
    const result = await axios.delete(
      `${process.env.REACT_APP_SERVER_LINK}/pages/delete?_id=${id}`
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

const deleteAllPages = async (id, t) => {
  try {
    configureStates(true, false, "");
    const result = await axios.delete(
      `${process.env.REACT_APP_SERVER_LINK}/pages/delete-all`
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

const getPagesStats = async (t, status = true) => {
  try {
    if (status) configureStates(true, false, "");
    const result = await axios.get(
      `${process.env.REACT_APP_SERVER_LINK}/pages/stats`
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
  addPage,
  getPages,
  getPagesByName,
  getPagesStats,
  updatePage,
  deletePage,
  deleteAllPages,
  getLastPages,
  getPage,
  getPagesByCategory,
};
