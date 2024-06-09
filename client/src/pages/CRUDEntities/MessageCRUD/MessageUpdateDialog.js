import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import * as yup from "yup";
import { Button, Dialog, DialogTitle, TextField } from "@mui/material";
import { AddMessages, UpdateMessages } from "./MessageMethods";
const MessageUpdateDialog = (props) => {
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
      ? await AddMessages(
          values,
          entitySetter,
          numericSetter,
          graphSetter,
          size,
          num,
          t
        )
      : await UpdateMessages(values, entitySetter, size, num, t);
    setSubmitting(false);
    resetForm();
    setOpen(false);
  };
  const validationSchema = yup.object({
    name: yup.string(t("enter-name")).required(t("name-required")),
    email: yup
      .string(t("enter-email"))
      .email(t("enter-valid-email"))
      .required(t("email-required")),
    phoneNumber: yup
      .string(t("enter-phone-number"))
      .required(t("phone-number-required")),
    messageTxt: yup.string(t("enter-message")).required(t("message-required")),
  });
  const formik = useFormik({
    initialValues: {
      _id: "",
      name: "",
      email: "",
      phoneNumber: "",
      messageTxt: "",
    },
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });
  useEffect(() => {
    if (open) {
      formik.setFieldValue("_id", data._id);
      formik.setFieldValue("name", data.name);
      formik.setFieldValue("email", data.email);
      formik.setFieldValue("phoneNumber", data.phoneNumber);
      formik.setFieldValue("messageTxt", data.messageTxt);
    }
  }, [open]);
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
          id="name"
          name="name"
          label={t("full-name")}
          value={formik.values.name}
          style={{ margin: "32px" }}
          required
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
        <TextField
          id="form-email"
          name="email"
          label={t("email")}
          value={formik.values.email}
          type="email"
          style={{ margin: "32px" }}
          required
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          id="form-phone"
          name="phoneNumber"
          label={t("phone-number")}
          value={formik.values.phoneNumber}
          type="tel"
          style={{ margin: "32px" }}
          required
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)
          }
          helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
        />
        <TextField
          id="form-message"
          name="messageTxt"
          label={t("message")}
          value={formik.values.messageTxt}
          type="text"
          multiline
          style={{ margin: "32px" }}
          required
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.messageTxt && Boolean(formik.errors.messageTxt)}
          helperText={formik.touched.messageTxt && formik.errors.messageTxt}
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

export default MessageUpdateDialog;
