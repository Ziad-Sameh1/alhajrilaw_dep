import { Button, Dialog, TextField } from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import { addJob } from "../../../services/JobService";
import * as yup from "yup";

const AddJobDialog = (props) => {
  const { open, setOpen } = props;
  const { t } = useTranslation();

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setSubmitting(true);
    values.value = values.value.toLowerCase().replace(" ", "-");
    console.log("submitting");
    console.log(values);
    // add job
    await addJob(values, t);
    setSubmitting(false);
    resetForm();
    setOpen(false);
  };
  const validationSchema = yup.object({
    labelEN: yup.string(t("enter-job-en")).required(t("job-required")),
    labelAR: yup.string(t("enter-job-ar")).required(t("job-required")),
  });
  const formik = useFormik({
    initialValues: {
      labelAR: "",
      labelEN: "",
      value: "",
    },
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });
  return (
    <Dialog
      open={open}
      onClose={() => {
        setOpen(false);
        formik.resetForm();
      }}
    >
      <form onSubmit={formik.handleSubmit} className="column-form">
        <TextField
          id="form-label-ar"
          name="labelAR"
          label={t("job-ar")}
          value={formik.values.labelAR}
          style={{ margin: "32px" }}
          required
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.labelAR && Boolean(formik.errors.labelAR)}
          helperText={formik.touched.labelAR && formik.errors.labelAR}
        />
        <TextField
          id="form-label-en"
          name="labelEN"
          label={t("job-en")}
          value={formik.values.labelEN}
          style={{ margin: "32px" }}
          required
          onChange={(e) => {
            formik.handleChange(e);
            formik.setFieldValue(
              "value",
              e.target.value.toLowerCase().replace(" ", "-")
            );
          }}
          onBlur={formik.handleBlur}
          error={formik.touched.labelEN && Boolean(formik.errors.labelEN)}
          helperText={formik.touched.labelEN && formik.errors.labelEN}
        />
        <Button
          disabled={formik.isSubmitting}
          type="submit"
          variant="contained"
          style={{ margin: "32px" }}
        >
          {t("add")}
        </Button>
      </form>
    </Dialog>
  );
};

export default AddJobDialog;
