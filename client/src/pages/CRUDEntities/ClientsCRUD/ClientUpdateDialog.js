import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  Button,
  Dialog,
  DialogTitle,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { AddClient, UpdateClient } from "./ClientMethods";
import { useDropzone } from "react-dropzone";
const ClientUpdateDialog = (props) => {
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
    setSubmitting(true);
    console.log(values);
    isAdd
      ? await AddClient(
          values,
          entitySetter,
          numericSetter,
          graphSetter,
          size,
          num,
          t
        )
      : await UpdateClient(values, entitySetter, size, num, t);
    setSubmitting(false);
    resetForm();
    setOpen(false);
  };
  const validationSchema = yup.object({
    name: yup.string(t("enter-name")).required(t("name-required")),
  });
  const formik = useFormik({
    initialValues: {
      _id: "",
      name: "",
      order: -1,
      clientPic: {},
      imgLink: "",
    },
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });
  useEffect(() => {
    if (open) {
      console.log("Dialog Showed");
      formik.setFieldValue("_id", data._id);
      formik.setFieldValue("name", data.name);
      formik.setFieldValue("order", data.order);
      formik.setFieldValue("imgLink", data.imgLink);
    }
  }, [open]);
  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles[0]);
    formik.setFieldValue("clientPic", acceptedFiles[0]);
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
        {formik.values.imgLink !== "" && (
          <img
            src={`${process.env.REACT_APP_SERVER}/${formik.values.imgLink}`}
            style={{ width: "100px", margin: "32px" }}
          />
        )}
        <div {...getRootProps()} className="drop-zone">
          <input {...getInputProps()} name="profilePic" />
          {isDragActive ? (
            <p>{t("drag-image")}</p>
          ) : (
            <p>{t("drag-drop-image")}</p>
          )}
        </div>
        <TextField
          id="name"
          name="name"
          label={t("full-name")}
          value={formik.values.name}
          style={{ margin: "32px" }}
          required
          defaultValue={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
        <TextField
          id="order"
          name="order"
          type="number"
          label={t("order")}
          value={formik.values.order}
          style={{ margin: "32px" }}
          required
          defaultValue={formik.values.order}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
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

export default ClientUpdateDialog;
