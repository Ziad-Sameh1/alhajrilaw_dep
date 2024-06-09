import React from "react";
import {
  Alert,
  Box,
  Button,
  Grow,
  LinearProgress,
  TextField,
} from "@mui/material";
import "./index.scss";
import logoEN from "../../assets/images/full-logo-en.png";
import logoAR from "../../assets/images/full-logo-ar.png";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import { formValues, onFormSubmit } from "./formValidation";
import { useNavigate } from "react-router-dom";

const AccessLoginPage = () => {
  const { t } = useTranslation();
  const lang = useSelector((state) => state.language);
  const isError = useSelector((state) => state.isError);
  const errorMessage = useSelector((state) => state.errorMessage);
  const isSuccess = useSelector((state) => state.isSuccess);
  const navigate = useNavigate();
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
  if (isSuccess === true) {
    navigate("/");
  }
  return (
    <Box>
      {isError === true && (
        <Grow in={isError}>
          <Alert
            sx={{ position: "absolute", bottom: 30, left: 30 }}
            severity="error"
          >
            {t(errorMessage)}
          </Alert>
        </Grow>
      )}
      {formik.isSubmitting && (
        <Box
          sx={{
            width: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 10,
          }}
        >
          <LinearProgress />
        </Box>
      )}
      <div className="access-login-page-container">
        <form onSubmit={formik.handleSubmit} className="access-login-page-form">
          <div className="access-login-page-form-img">
            {lang === "ar" && (
              <img
                src={logoAR}
                alt="logo-ar"
                className="access-login-page-logo"
              />
            )}
            {lang !== "ar" && (
              <img
                src={logoEN}
                alt="logo-en"
                className="access-login-page-logo"
              />
            )}
          </div>
          <TextField
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
            label={t("password")}
            type="password"
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

export default AccessLoginPage;
