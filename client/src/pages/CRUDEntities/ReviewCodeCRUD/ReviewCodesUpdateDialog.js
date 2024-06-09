import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  Button,
  Dialog,
  DialogTitle,
  Rating,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { AddReviewCodes, UpdateReviewCodes } from "./ReviewCodeMethods";
const ReviewCodeUpdateDialog = (props) => {
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
    console.log("submitting");
    console.log(values);
    isAdd
      ? await AddReviewCodes(
          values,
          entitySetter,
          numericSetter,
          graphSetter,
          size,
          num,
          t
        )
      : await UpdateReviewCodes(values, entitySetter, size, num, t);
    setSubmitting(false);
    resetForm();
    setOpen(false);
  };
  const [status, setStatus] = useState("valid");
  const validationSchema = yup.object({
    code: yup.string(t("enter-code")).required(t("code-required")),
  });
  const formik = useFormik({
    initialValues: {
      _id: "",
      code: "",
      status: "",
    },
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });
  useEffect(() => {
    if (open) {
      formik.setFieldValue("_id", data._id);
      formik.setFieldValue("code", data.code);
      formik.setFieldValue("status", data.status);
      setStatus(data.status);
    }
  }, [open]);
  return (
    <Dialog
      open={open}
      onClose={() => {
        setData({});
        setOpen(false);
        setStatus("not-valid");
        formik.resetForm();
      }}
    >
      <DialogTitle>{isAdd ? t("add-new-item") : t("update")}</DialogTitle>
      <form onSubmit={formik.handleSubmit} className="crud-dialog">
        <TextField
          id="form-code"
          name="code"
          label={t("code")}
          value={formik.values.code}
          style={{ margin: "32px" }}
          required
          disabled
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.code && Boolean(formik.errors.code)}
          helperText={formik.touched.code && formik.errors.code}
        />
        <ToggleButtonGroup
          exclusive
          value={status}
          onChange={(event, newVal) => {
            setStatus(newVal);
            formik.setFieldValue("status", newVal);
          }}
        >
          <ToggleButton value="valid">{t("valid")}</ToggleButton>
          <ToggleButton value="not-valid">{t("not-valid")}</ToggleButton>
        </ToggleButtonGroup>
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

export default ReviewCodeUpdateDialog;
