import React, { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Grow,
  LinearProgress,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import "./admin-login.scss";
import logoEN from "../../assets/images/full-logo-en.png";
import logoAR from "../../assets/images/full-logo-ar.png";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import { formValues, onFormSubmit } from "./formValidation";
import ErrorAlert from "../../components/ErrorAlert/ErrorAlert";
import SuccessAlert from "../../components/SuccessAlert/SuccessAlert";
import LoadingBar from "../../components/LoadingBar.js/loadingBar";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const AdminLoginPage = () => {
  const { t } = useTranslation();
  const lang = useSelector((state) => state.language);
  const isError = useSelector((state) => state.isError);
  const isSuccess = useSelector((state) => state.isSuccess);
  const isLoading = useSelector((state) => state.isLoading);
  const errorMessage = useSelector((state) => state.errorMessage);
  const successMessage = useSelector((state) => state.successMessage);
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
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
    initialValues: formValues,
    validationSchema: validationSchema,
    onSubmit: onFormSubmit,
  });
  return (
    <Box>
      {isError === true && (
        <ErrorAlert isError={isError} errorMessage={errorMessage} />
      )}
      {isSuccess === true && (
        <SuccessAlert isSuccess={isSuccess} msg={successMessage} />
      )}
      {isLoading === true && <LoadingBar />}
      <div className="admin-login-page-container">
        <form onSubmit={formik.handleSubmit} className="admin-login-page-form">
          <div className="admin-login-page-form-img">
            {lang === "ar" && (
              <img
                src={logoAR}
                alt="logo-ar"
                className="admin-login-page-logo"
              />
            )}
            {lang !== "ar" && (
              <img
                src={logoEN}
                alt="logo-en"
                className="admin-login-page-logo"
              />
            )}
          </div>
          <TextField
            id="admin-login-email"
            label={t("email-address")}
            type="email"
            name="email"
            value={formik.values.email}
            variant="outlined"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            id="admin-login-pass"
            label={t("password")}
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
            name="password"
            variant="outlined"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Button
            type="submit"
            disabled={formik.isSubmitting}
            variant="contained"
            sx={{
              my: 2,
              py: 1.5,
              letterSpacing: "0.5px",
              fontWeight: "bold",
            }}
          >
            {t("enter")}
          </Button>
        </form>
      </div>
    </Box>
  );
};

export default AdminLoginPage;
