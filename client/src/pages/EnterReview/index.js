import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Box } from "@mui/system";
import ErrorAlert from "../../components/ErrorAlert/ErrorAlert";
import LoadingBar from "../../components/LoadingBar.js/loadingBar";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Button, IconButton, TextField } from "@mui/material";
import * as yup from "yup";
import { StarOutline, Star } from "@mui/icons-material";
import { EnArTxt } from "../../utils/Language";
import { useFormik } from "formik";
import { formValues, onFormSubmit } from "./formValidation";
import SuccessAlert from "../../components/SuccessAlert/SuccessAlert";
import { resetStates } from "../../utils/FeedbackStates";
import "./enter-review.scss";
const EnterReviewPage = () => {
  const navigate = useNavigate();
  const reviewCodeToken = useSelector((state) => state.reviewCodeToken);
  const isError = useSelector((state) => state.isError);
  const isSuccess = useSelector((state) => state.isSuccess);
  const isLoading = useSelector((state) => state.isLoading);
  const errorMessage = useSelector((state) => state.errorMessage);
  const successMessage = useSelector((state) => state.successMessage);
  const lang = useSelector((state) => state.language);
  const { t } = useTranslation();
  const [enteredPhone, setEnteredPhone] = useState("");
  const [rating, setRating] = useState(0);
  const reviewToken = useSelector((state) => state.reviewCodeToken);
  const validationSchema = yup.object({
    name: yup.string(t("enter-name")).required(t("name-required")),
    email: yup
      .string(t("enter-email"))
      .email(t("enter-valid-email"))
      .required(t("email-required")),
    reviewTxt: yup.string(t("enter-review")).required(t("review-required")),
  });
  const formik = useFormik({
    initialValues: formValues,
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      values.phoneNumber = enteredPhone;
      values.rating = rating;
      values.token = reviewToken;
      onFormSubmit(values, { setSubmitting }, t);
    },
  });
  useEffect(() => {
    resetStates();
    if (reviewCodeToken === "") {
      navigate("/reviews/auth");
    }
  }, []);
  return (
    <Box>
      {isError === true && (
        <ErrorAlert isError={isError} errorMessage={errorMessage} />
      )}
      {isSuccess === true && (
        <SuccessAlert isSuccess={isSuccess} msg={successMessage} />
      )}
      {isLoading === true && <LoadingBar />}
      <div className="enter-review-page">
        <form className="enter-review-main-sec" onSubmit={formik.handleSubmit}>
          <div className={EnArTxt("enter-review-form-header", lang)}>
            {t("enter-your-review")}
          </div>
          <div className={EnArTxt("contact-form-desc", lang)}>
            {t("contact-us-desc")}
            <div className="contact-form-desc-email">
              {process.env.REACT_APP_CONTACT_EMAIL}
            </div>
          </div>
          <div className="enter-review-form-item">
            <div className={EnArTxt("form-label", lang)}>{t("name")}</div>
            <TextField
              sx={{ width: "100%" }}
              placeholder={t("your-name")}
              type="text"
              name="name"
              value={formik.values.name}
              variant="outlined"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
          </div>
          <div className="enter-review-form-item">
            <div className={EnArTxt("form-label", lang)}>
              {t("email-address")}
            </div>
            <TextField
              sx={{ width: "100%" }}
              placeholder="you@company.com"
              type="email"
              name="email"
              value={formik.values.email}
              variant="outlined"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </div>
          <div className="enter-review-form-item">
            <div className={EnArTxt("form-label", lang)}>
              {t("phone-number")}
            </div>
            <div className="enter-review-form-item-phone">
              <PhoneInput
                onChange={(value) => {
                  setEnteredPhone(value);
                }}
                onBlur={formik.handleBlur}
                name="phoneNumber"
                id="phoneNumber"
                value={formik.values.phoneNumber}
                country={"qa"}
                containerStyle={{ width: "100%", color: "red" }}
              />
            </div>
          </div>
          <div className="enter-review-form-item">
            <div className={EnArTxt("form-label", lang)}>
              {t("how-can-we-help")}
            </div>
            <TextField
              sx={{ width: "100%" }}
              multiline={true}
              rows={5}
              placeholder={t("tell-us-more")}
              type="text"
              name="reviewTxt"
              value={formik.values.reviewTxt}
              variant="outlined"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.reviewTxt && Boolean(formik.errors.reviewTxt)
              }
              helperText={formik.touched.reviewTxt && formik.errors.reviewTxt}
            />
          </div>
          <div className="enter-review-form-item">
            <div className={EnArTxt("form-label", lang)}>
              {t("select-rating")}
            </div>
            <div className="choose-rating-div">
              <IconButton onClick={() => setRating(1)}>
                {rating >= 1 && <Star color="primary" fontSize="large" />}
                {rating < 1 && <StarOutline fontSize="large" />}
              </IconButton>
              <IconButton onClick={() => setRating(2)}>
                {rating >= 2 && <Star color="primary" fontSize="large" />}
                {rating < 2 && <StarOutline fontSize="large" />}
              </IconButton>
              <IconButton onClick={() => setRating(3)}>
                {rating >= 3 && <Star color="primary" fontSize="large" />}
                {rating < 3 && <StarOutline fontSize="large" />}
              </IconButton>
              <IconButton onClick={() => setRating(4)}>
                {rating >= 4 && <Star color="primary" fontSize="large" />}
                {rating < 4 && <StarOutline fontSize="large" />}
              </IconButton>
              <IconButton onClick={() => setRating(5)}>
                {rating >= 5 && <Star color="primary" fontSize="large" />}
                {rating < 5 && <StarOutline fontSize="large" />}
              </IconButton>
            </div>
          </div>
          <div className="enter-review-form-item">
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={formik.isSubmitting}
              sx={{
                my: 2,
                py: 1.5,
                letterSpacing: "0.5px",
                fontWeight: "bold",
              }}
            >
              {t("submit")}
            </Button>
          </div>
        </form>
      </div>
    </Box>
  );
};

export default EnterReviewPage;
