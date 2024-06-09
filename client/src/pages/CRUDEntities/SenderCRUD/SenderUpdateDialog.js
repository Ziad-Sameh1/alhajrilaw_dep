import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { post, update } from "./SenderMethods";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  Button,
  Dialog,
  DialogTitle,
  TextField,
  IconButton,
  InputAdornment,
  Divider,
} from "@mui/material";
import { Visibility, VisibilityOff, Delete } from "@mui/icons-material";

const SenderUpdateDialog = (props) => {
  const { open, setOpen, data, isAdd, setData, entitySetter, size, num } =
    props;
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const [receivers, setReceivers] = useState([{ email: "" }]);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleAddReceiver = () => {
    setReceivers([...receivers, { email: "" }]);
  };

  const handleRemoveReceiver = (index) => {
    setReceivers(receivers.filter((_, i) => i !== index));
  };

  const handleReceiverChange = (index, value) => {
    const newReceivers = receivers.slice();
    newReceivers[index].email = value;
    setReceivers(newReceivers);
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setSubmitting(true);
    values.receivers = receivers.map((r) => r.email);
    isAdd
      ? await post(values, entitySetter, size, num, t)
      : await update(values, entitySetter, size, num, t);
    setSubmitting(false);
    resetForm();
    setReceivers([{ email: "" }]);
    setOpen(false);
  };

  const validationSchema = yup.object({
    email: yup
      .string(t("enter-email"))
      .email(t("enter-valid-email"))
      .required(t("email-required")),
    password: yup
      .string(t("enter-pass"))
      .min(8, t("password-rules"))
      .required(t("password-required")),
    receivers: yup.array().of(
      yup.object().shape({
        email: yup
          .string(t("enter-email"))
          .email(t("enter-valid-email"))
          .required(t("email-required")),
      })
    ),
  });

  const formik = useFormik({
    initialValues: { _id: "", email: "", password: "", receivers: [] },
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    if (open) {
      console.log("Dialog Showed");
      formik.setFieldValue("_id", data._id);
      formik.setFieldValue("email", data.email);
      if (data.receivers) {
        setReceivers(data.receivers.map((email) => ({ email })));
        formik.setFieldValue(
          "receivers",
          data.receivers.map((email) => ({ email }))
        );
      }
      if (!isAdd) formik.setFieldValue("password", "000000000000");
    }
    else {
      setReceivers([])
    }
  }, [open]);

  return (
    <Dialog
      open={open}
      onClose={() => {
        setData({});
        setOpen(false);
        setReceivers([{ email: "" }]);
        formik.resetForm();
      }}
    >
      <DialogTitle>{isAdd ? t("add-new-sender") : t("update")}</DialogTitle>
      <form onSubmit={formik.handleSubmit} className="crud-dialog">
        <TextField
          id="crud-email"
          type="email"
          name="email"
          label={t("email-address")}
          value={formik.values.email}
          style={{ margin: "32px", width: "400px" }}
          required
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        {isAdd && (
          <TextField
            id="crud-password"
            name="password"
            type={showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            label={t("password")}
            style={{ margin: "16px", width: "400px" }}
            required
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
        )}
        {!isAdd && (
          <TextField
            type="password"
            name="password"
            label={t("password")}
            value={formik.values.password}
            style={{ margin: "16px", width: "400px" }}
            required
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
        )}
        <Divider style={{ width: "400px", marginTop: "16px" }} />

        <div style={{ marginTop: "16px", width: "400px" }}>
          {receivers.map((receiver, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: "16px",
              }}
            >
              <TextField
                type="email"
                label={t("receiver-email") + " " + index}
                value={receiver.email}
                onChange={(e) => handleReceiverChange(index, e.target.value)}
                error={Boolean(
                  formik.errors.receivers && formik.errors.receivers[index]
                )}
                helperText={
                  formik.errors.receivers &&
                  formik.errors.receivers[index]?.email
                }
              />
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => handleRemoveReceiver(index)}
              >
                <Delete />
              </IconButton>
            </div>
          ))}
        </div>

        <Button
          onClick={handleAddReceiver}
          style={{ margin: "32px" }}
          variant="outlined"
        >
          {t("add-receiver")}
        </Button>

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

export default SenderUpdateDialog;
