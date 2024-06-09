import React, { useEffect, useState, Component, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { checkLoginStatus } from "../../services/AdminService";
import { Box } from "@mui/system";
import ErrorAlert from "../../components/ErrorAlert/ErrorAlert";
import SuccessAlert from "../../components/SuccessAlert/SuccessAlert";
import LoadingBar from "../../components/LoadingBar.js/loadingBar";
import { Button, Menu, MenuItem, TextField } from "@mui/material";
import { EnArTxt } from "../../utils/Language";
import { ArrowDropDown, CloudUpload } from "@mui/icons-material";
import AccProfile from "../../assets/images/acc-profile.png";
import { Logout } from "../CRUDEntities/AdminCRUD/AdminMethods";
import {
  EditorState,
  convertToRaw,
  ContentState,
  convertFromHTML,
} from "draft-js";
import draftToHtml from "draftjs-to-html";
import * as yup from "yup";
import "./add-new-page.scss";
import { useTranslation } from "react-i18next";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { AddPages, UpdatePages } from "../CRUDEntities/PagesCRUD/PagesMethods";
import { useFormik } from "formik";
import { useDropzone } from "react-dropzone";
import { getCategories } from "../../services/CategoryService";
import CreateCategoryDialog from "./CreateCategoryDialog";
import { configureStates } from "../../utils/FeedbackStates";

const ImageDropzone = (props) => {
  const { t } = useTranslation();
  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles[0]);
    props.formik.setFieldValue("thumbnail", acceptedFiles[0]);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    multiple: false,
  });
  return (
    <div {...getRootProps()} className="upload-thumbnail-div">
      <input {...getInputProps()} name="video" />
      <CloudUpload sx={{ color: "#a6acb3", fontSize: "60px" }} />
      <div>{t("upload-thumbnail")}</div>
      {isDragActive ? (
        <p>{t("drag-thumbnail")}</p>
      ) : (
        <p>{t("drag-drop-thumbnail")}</p>
      )}
    </div>
  );
};

const VideoDropzone = (props) => {
  const { t } = useTranslation();
  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles[0]);
    props.formik.setFieldValue("video", acceptedFiles[0]);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    multiple: false,
  });
  return (
    <div {...getRootProps()} className="upload-thumbnail-div">
      <input {...getInputProps()} name="video" />
      <CloudUpload sx={{ color: "#a6acb3", fontSize: "60px" }} />
      <div>{t("upload-video")}</div>
      {isDragActive ? <p>{t("drag-video")}</p> : <p>{t("drag-drop-video")}</p>}
    </div>
  );
};

const AddNewPage = () => {
  const [isAdd, setIsAdd] = useState(true);
  const { state } = useLocation();
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const navigate = useNavigate();
  const { t } = useTranslation();
  const isError = useSelector((state) => state.isError);
  const isSuccess = useSelector((state) => state.isSuccess);
  const isLoading = useSelector((state) => state.isLoading);
  const errorMessage = useSelector((state) => state.errorMessage);
  const successMessage = useSelector((state) => state.successMessage);
  const [categories, setCategories] = useState([]);
  const [addDialogState, setAddDialogState] = useState(false);
  const lang = useSelector((state) => state.language);
  const [headerAnchor, setHeaderAnchor] = useState(null);
  const headerMenuopen = Boolean(headerAnchor);
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setSubmitting(true);
    console.log("submitting");
    console.log(values);
    isAdd ? await AddPages(values, t) : await UpdatePages(values, t);
    setSubmitting(false);
    resetForm();
    navigate("../pages");
  };
  const validationSchema = yup.object({
    title: yup.string(t("enter-label")).required(t("label-required")),
    category: yup.string(t("enter-category")).required(t("category-required")),
  });
  const formik = useFormik({
    initialValues: {
      _id: "",
      title: "",
      content: "",
      thumbnailLink: "",
      videoLink: "",
      category: "",
      video: {},
      thumbnail: {},
    },
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });
  useEffect(() => {
    console.log("state");
    console.log(state);
    const html = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    console.log(html);
    formik.setFieldValue("content", html);
  }, [editorState]);
  const fetchCat = async () => {
    const res = await getCategories();
    setCategories(res);
  };
  useEffect(() => {
    fetchCat();
  }, [addDialogState]);

  const headerHandleClick = (event) => {
    if (headerAnchor == null) {
      setHeaderAnchor(event.currentTarget);
    } else {
      setHeaderAnchor(null);
    }
  };
  const headerHandleClose = () => {
    setHeaderAnchor(null);
  };
  const checkAuth = async () => {
    try {
      const res = await checkLoginStatus();
      if (res.msg !== "Success") {
        navigate("/dashboard/login");
        configureStates(false, true, t("login-again"));
      }
    } catch (err) {
      console.log(err);
      navigate("/dashboard/login");
      configureStates(false, true, err);
    }
  };
  useEffect(() => {
    checkAuth();
    fetchCat();
    try {
      if (state._id === "") {
        setIsAdd(true);
      } else {
        setIsAdd(false);
        formik.setFieldValue("_id", state._id);
        formik.setFieldValue("title", state.title);
        formik.setFieldValue("content", state.content);
        formik.setFieldValue("category", state.category);
        formik.setFieldValue("thumbnailLink", state.thumbnail);
        formik.setFieldValue("videoLink", state.video);
        setEditorState(
          EditorState.createWithContent(
            ContentState.createFromBlockArray(convertFromHTML(state.content))
          )
        );
      }
    } catch (err) {
      setIsAdd(true);
    }
  }, []);
  return (
    <Box className="crud-page">
      {isError === true && (
        <ErrorAlert isError={isError} errorMessage={errorMessage} />
      )}
      {isSuccess === true && (
        <SuccessAlert isSuccess={isSuccess} msg={successMessage} />
      )}
      {isLoading === true && <LoadingBar />}
      <CreateCategoryDialog open={addDialogState} setOpen={setAddDialogState} />
      <div className="dashboard-header">
        <div className="dashboard-header-txt">
          <div className={EnArTxt("dashboard-header-path", lang)}>
            {`${t("pages")} / ${t("add-new-page")}`}
          </div>
          <div className={EnArTxt("dashboard-header-page-title", lang)}>
            {`${t("add-new-page")}`}
          </div>
        </div>

        <div className="dashboard-header-acc" onClick={headerHandleClick}>
          <img src={AccProfile} alt="profile" width="40px" />
          <ArrowDropDown fontSize="large" />
          <Menu
            id="basic-menu"
            anchorEl={headerAnchor}
            open={headerMenuopen}
            onClose={headerHandleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem
              onClick={() => {
                Logout(t);
              }}
            >
              {t("logout")}
            </MenuItem>
          </Menu>
        </div>
      </div>
      <div className="add-new-page-content-container">
        <form className="add-new-page-content" onSubmit={formik.handleSubmit}>
          <TextField
            variant="filled"
            className="form-item"
            style={{ width: "100%" }}
            InputProps={{ disableUnderline: true }}
            id="title"
            label={t("enter-page-title")}
            name="title"
            value={formik.values.title}
            required
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
          />
          <div className="category-div">
            <TextField
              variant="filled"
              id="outlined-select-currency"
              InputProps={{ disableUnderline: true }}
              select
              name="category"
              value={formik.values.category}
              fullWidth
              label={t("select-category")}
              defaultValue="news"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.category && Boolean(formik.errors.category)}
              helperText={formik.touched.category && formik.errors.category}
            >
              {categories.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <Button onClick={() => setAddDialogState(true)}>
              {t("add-new-category")}
            </Button>
          </div>
          <div className="add-page-editor">
            <Editor
              className="form-item"
              editorState={editorState}
              toolbarClassName="toolbarClassName"
              wrapperClassName="demo-wrapper"
              editorClassName="demo-editor"
              onEditorStateChange={setEditorState}
            />
          </div>

          <ImageDropzone formik={formik} />
          <VideoDropzone formik={formik} />
          <div className="add-new-page-button">
            <Button
              className="form-item"
              disabled={formik.isSubmitting}
              variant="contained"
              type="submit"
              style={{ borderRadius: "20px" }}
            >
              {isAdd ? t("create-page") : t("update-page")}
            </Button>
          </div>
        </form>
      </div>
    </Box>
  );
};

export default AddNewPage;
