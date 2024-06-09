import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { resetStates } from "../../utils/FeedbackStates";
import { useTranslation } from "react-i18next";
import { Box } from "@mui/system";
import LogoAR from "../../assets/images/full-logo-ar.png";
import LogoEN from "../../assets/images/full-logo-en.png";
import ErrorAlert from "../../components/ErrorAlert/ErrorAlert";
import LoadingBar from "../../components/LoadingBar.js/loadingBar";
import { Button, TextField, Typography } from "@mui/material";
import * as yup from "yup";
import "./enter-code.scss";
import { useFormik } from "formik";
import { formValues, onFormSubmit } from "./formValidation";

const Logo = (props) => {
  return (
    <>
      {props.lang === "ar" && (
        <img
          src={LogoAR}
          alt="local logo"
          className="navbar-img"
          onClick={() => {
            props.navigate("/");
          }}
        />
      )}
      {props.lang !== "ar" && (
        <img
          src={LogoEN}
          alt="international logo"
          className="navbar-img"
          onClick={() => {
            props.navigate("/");
          }}
        />
      )}
    </>
  );
};

const EnterReviewCodePage = () => {
  const isError = useSelector((state) => state.isError);
  const isSuccess = useSelector((state) => state.isSuccess);
  const isLoading = useSelector((state) => state.isLoading);
  const errorMessage = useSelector((state) => state.errorMessage);
  const successMessage = useSelector((state) => state.successMessage);
  const navigate = useNavigate();
  const lang = useSelector((state) => state.language);
  const { t } = useTranslation();
  const validationSchema = yup.object({
    code: yup
      .string(t("enter-code"))
      .required(t("code-required"))
      .min(8, t("enter-valid-code"))
      .max(8, "enter-valid-code"),
  });
  const formik = useFormik({
    initialValues: formValues,
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      onFormSubmit(values, { setSubmitting }, t);
    },
  });
  useEffect(() => {
    resetStates();
  }, []);
  return (
    <Box>
      {isError === true && (
        <ErrorAlert isError={isError} errorMessage={errorMessage} />
      )}
      {isSuccess === true && navigate("/private/customer/review")}
      {isLoading === true && <LoadingBar />}
      <div className="enter-review-code-page">
        <form className="enter-review-code-form" onSubmit={formik.handleSubmit}>
          <Logo navigate={navigate} lang={lang} />
          <TextField
            sx={{
              paddingTop: "3vh",
              paddingBottom: "2vh",
            }}
            fullWidth
            variant="outlined"
            name="code"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.code}
            placeholder={t("enter-code")}
            error={formik.touched.code && Boolean(formik.errors.code)}
            helperText={formik.touched.code && formik.errors.code}
          />
          <Button
            sx={{
              my: 2,
              py: 1.5,
              letterSpacing: "0.5px",
              fontWeight: "bold",
              marginTop: "1vh",
              marginBottom: "1vh",
            }}
            variant="contained"
            type="submit"
            fullWidth
          >
            {t("enter")}
          </Button>
          <div className="tst">
            <Typography
              fontSize="12px"
              color="primary"
              fontFamily={lang === "ar" ? "Cairo" : "Poppins"}
            >
              {t("enter-review-code-alert")}
            </Typography>
          </div>
        </form>
      </div>
    </Box>
  );
};

export default EnterReviewCodePage;
