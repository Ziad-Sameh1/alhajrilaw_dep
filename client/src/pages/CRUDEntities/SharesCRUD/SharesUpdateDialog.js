import { useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import * as yup from "yup";
import { Button, Dialog, DialogTitle, TextField } from "@mui/material";
import { AddShares, UpdateShares } from "./SharesMethods";
import { configureStates } from "../../../utils/FeedbackStates";
const SharesUpdateDialog = (props) => {
  const {
    open,
    setOpen,
    data,
    isAdd,
    setData,
    entitySetter,
    numericSetter,
    graphSetter,
    size,
    num,
  } = props;
  const { t } = useTranslation();

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    if (
      (values.txt === undefined || values.txt === "") &&
      values.shareFile.path === undefined
    ) {
      console.log("flag");
      setOpen(false);
      configureStates(false, true, t("fill-form"));
    } else {
      if (values.txt === undefined) values.txt = "";
      setSubmitting(true);
      isAdd
        ? await AddShares(
            values,
            entitySetter,
            numericSetter,
            graphSetter,
            size,
            num,
            t
          )
        : await UpdateShares(values, entitySetter, size, num, t);
      setSubmitting(false);
      resetForm();
      setOpen(false);
    }
  };
  const validationSchema = yup.object({
    label: yup.string(t("enter-label")).required(t("label-required")),
  });
  const formik = useFormik({
    initialValues: {
      _id: "",
      label: "",
      txt: "",
      shareFile: {},
    },
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });
  useEffect(() => {
    if (open) {
      formik.setFieldValue("_id", data._id);
      formik.setFieldValue("label", data.label);
      formik.setFieldValue("txt", data.txt);
      formik.setFieldValue("link", data.link);
    }
  }, [open]);
  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles[0]);
    formik.setFieldValue("shareFile", acceptedFiles[0]);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <Dialog
      open={open}
      onClose={() => {
        setData({});
        setOpen(false);
        formik.resetForm();
      }}
    >
      <DialogTitle>{isAdd ? t("add-new-item") : t("update")}</DialogTitle>
      <form onSubmit={formik.handleSubmit} className="crud-dialog">
        <TextField
          id="form-label"
          name="label"
          label={t("label")}
          value={formik.values.label}
          style={{ margin: "32px" }}
          required
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.label && Boolean(formik.errors.label)}
          helperText={formik.touched.label && formik.errors.label}
        />
        {!isAdd && (
          <TextField
            id="form-link"
            name="link"
            label={t("link")}
            value={formik.values.link}
            style={{ margin: "32px" }}
            required
            disabled
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.link && Boolean(formik.errors.link)}
            helperText={formik.touched.link && formik.errors.link}
          />
        )}
        <TextField
          id="form-txt"
          name="txt"
          label={t("text")}
          value={formik.values.txt}
          type="txt"
          multiline
          rows={6}
          style={{ margin: "32px" }}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.txt && Boolean(formik.errors.txt)}
          helperText={formik.touched.txt && formik.errors.txt}
        />
        <div {...getRootProps()} className="drop-zone">
          <input {...getInputProps()} name="profilePic" />
          {isDragActive ? (
            <p>{t("drag-file")}</p>
          ) : (
            <p>{t("drag-drop-file")}</p>
          )}
        </div>
        <Button
          disabled={formik.isSubmitting}
          type="submit"
          variant="contained"
          style={{ margin: "32px" }}
        >
          {isAdd ? t("add") : t("update")}
        </Button>
      </form>
    </Dialog>
  );
};

export default SharesUpdateDialog;
