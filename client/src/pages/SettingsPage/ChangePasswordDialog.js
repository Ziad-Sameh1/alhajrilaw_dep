import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  Button,
  Dialog,
  DialogTitle,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { changePassword } from "../../services/AdminService";
const ChangePasswordDialog = (props) => {
  const { open, setOpen } = props;
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setSubmitting(true);
    console.log("submitting");
    console.log(values);
    await changePassword(values.oldPassword, values.newPassword, t);
    setSubmitting(false);
    resetForm();
    setOpen(false);
  };
  const validationSchema = yup.object({
    oldPassword: yup
      .string(t("enter-current-password"))
      .min(8, t("password-rules"))
      .required(t("current-password-required")),
    newPassword: yup
      .string(t("enter-new-password"))
      .min(8, t("password-rules"))
      .required(t("new-password-required")),
  });
  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
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
      <DialogTitle>{t("change-password")}</DialogTitle>
      <form onSubmit={formik.handleSubmit} className="crud-dialog">
        <TextField
          id="form-current-pass"
          name="oldPassword"
          label={t("current-password")}
          value={formik.values.oldPassword}
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
          style={{ margin: "32px" }}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.oldPassword && Boolean(formik.errors.oldPassword)
          }
          helperText={formik.touched.oldPassword && formik.errors.oldPassword}
        />
        <TextField
          id="form-new-pass"
          name="newPassword"
          type={showPassword ? "text" : "password"}
          label={t("new-password")}
          value={formik.values.newPassword}
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
          style={{ margin: "32px" }}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.newPassword && Boolean(formik.errors.newPassword)
          }
          helperText={formik.touched.newPassword && formik.errors.newPassword}
        />
        <Button
          disabled={formik.isSubmitting}
          type="submit"
          variant="contained"
          style={{ margin: "32px" }}
          sx={{
            textTransform: "none",
          }}
        >
          {t("change")}
        </Button>
      </form>
    </Dialog>
  );
};

export default ChangePasswordDialog;
