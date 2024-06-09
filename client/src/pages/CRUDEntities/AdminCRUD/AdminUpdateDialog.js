import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { post, update } from "./AdminMethods";
import { useFormik, useFormikContext } from "formik";
import * as yup from "yup";
import {
  Button,
  Dialog,
  DialogTitle,
  MenuItem,
  Select,
  TextField,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
const AdminUpdateDialog = (props) => {
  const { open, setOpen, data, isAdd, setData, entitySetter, size, num } =
    props;
  const { t } = useTranslation();
  const [role, setRole] = useState(10);
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setSubmitting(true);
    isAdd
      ? await post(values, entitySetter, size, num, t)
      : await update(values, entitySetter, size, num, t);
    setSubmitting(false);
    resetForm();
    setRole(10);
    setOpen(false);
  };
  const selectHandleChange = (event) => {
    setRole(event.target.value);
    formik.setFieldValue("role", event.target.value);
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
  });
  const formik = useFormik({
    initialValues: { _id: "", email: "", password: "", role: 99 },
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });
  useEffect(() => {
    if (open) {
      console.log("Dialog Showed");
      setRole(data.role);
      formik.setFieldValue("_id", data._id);
      formik.setFieldValue("email", data.email);
      formik.setFieldValue("role", data.role);
      if (!isAdd) formik.setFieldValue("password", "000000000000");
    }
  }, [open]);
  return (
    <Dialog
      open={open}
      onClose={() => {
        setData({});
        setOpen(false);
        setRole(10);
        formik.resetForm();
      }}
    >
      <DialogTitle>{isAdd ? t("add-new-admin") : t("update")}</DialogTitle>
      <form onSubmit={formik.handleSubmit} className="crud-dialog">
        {isAdd && (
          <TextField
            id="crud-email"
            type="email"
            name="email"
            label={t("email-address")}
            value={formik.values.email}
            style={{ margin: "32px" }}
            required
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
        )}
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
            style={{ margin: "32px" }}
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
            type="email"
            name="email"
            label={t("email-address")}
            value={formik.values.email}
            style={{ margin: "32px" }}
            disabled
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
        )}

        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={role}
          label="Role"
          onChange={selectHandleChange}
          style={{ margin: "32px" }}
          defaultValue={10}
        >
          <MenuItem value={10}>Moderator</MenuItem>
          <MenuItem value={99}>Full Authority</MenuItem>
        </Select>
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

export default AdminUpdateDialog;
