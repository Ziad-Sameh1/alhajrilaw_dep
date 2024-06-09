import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Box } from "@mui/system";
import ErrorAlert from "../../components/ErrorAlert/ErrorAlert";
import LoadingBar from "../../components/LoadingBar.js/loadingBar";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Button, TextField } from "@mui/material";
import * as yup from "yup";
import "./contact.scss";
import {
  EmailOutlined,
  LocationOnOutlined,
  CallOutlined,
} from "@mui/icons-material";
import { EnArTxt } from "../../utils/Language";
import { useFormik } from "formik";
import { formValues, onFormSubmit } from "./formValidation";
import SuccessAlert from "../../components/SuccessAlert/SuccessAlert";
import { resetStates } from "../../utils/FeedbackStates";

const ContactUsPage = () => {
  const isError = useSelector((state) => state.isError);
  const isSuccess = useSelector((state) => state.isSuccess);
  const isLoading = useSelector((state) => state.isLoading);
  const errorMessage = useSelector((state) => state.errorMessage);
  const successMessage = useSelector((state) => state.successMessage);
  const navigate = useNavigate();
  const lang = useSelector((state) => state.language);
  const { t } = useTranslation();
  const viewToken = useSelector((state) => state.viewToken);
  const [enteredPhone, setEnteredPhone] = useState("");
  const validationSchema = yup.object({
    name: yup.string(t("enter-name")).required(t("name-required")),
    email: yup
      .string(t("enter-email"))
      .email(t("enter-valid-email"))
      .required(t("email-required")),
    messageTxt: yup.string(t("enter-message")).required(t("message-required")),
  });
  const formik = useFormik({
    initialValues: formValues,
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      values.phoneNumber = enteredPhone;
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
      {isSuccess === true && (
        <SuccessAlert isSuccess={isSuccess} msg={successMessage} />
      )}
      {isLoading === true && <LoadingBar />}
      <div className="contact-main-section-flex-center">
        <div className="contact-main-div">
          <div
            className={
              lang === "ar" ? "contact-info-div-rtl" : "contact-info-div"
            }
          >
            <div className="contact-info-body">
              <div className={EnArTxt("contact-info-main-header", lang)}>
                {t("contact-us")}
              </div>
              <div className={EnArTxt("contact-info-main-desc", lang)}>
                {t("contact-us-info-desc")}
              </div>
              <div className="contact-info-item">
                <div className="item-icon">
                  <EmailOutlined />
                </div>
                <div className="item-text">
                  <div className={EnArTxt("contact-info-item-header", lang)}>
                    {t("send-to-us")}
                  </div>
                  <div className={EnArTxt("contact-info-item-desc", lang)}>
                    {t("send-to-us-item-desc")}
                  </div>
                  <div className="contact-info-item-details">
                    {process.env.REACT_APP_CONTACT_EMAIL}
                  </div>
                </div>
              </div>
              <div className="contact-info-item">
                <div className="item-icon">
                  <LocationOnOutlined />
                </div>
                <div className="item-text">
                  <div className={EnArTxt("contact-info-item-header", lang)}>
                    {t("office")}
                  </div>
                  <div className={EnArTxt("contact-info-item-desc", lang)}>
                    {t("office-item-desc")}
                  </div>
                  <div className={EnArTxt("contact-info-item-details", lang)}>
                    {t("office-address")}
                  </div>
                </div>
              </div>
              <div className="contact-info-item">
                <div className="item-icon">
                  <CallOutlined />
                </div>
                <div className="item-text">
                  <div className={EnArTxt("contact-info-item-header", lang)}>
                    {t("phone")}
                  </div>
                  <div className={EnArTxt("contact-info-item-desc", lang)}>
                    {t("phone-item-desc")}
                  </div>
                  <div
                    className="how-to-reach-us-info-item-details-no-rtl"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      window.open("https://wa.me/+97466900700");
                    }}
                  >
                    {t("whatsapp") + "/" + t("call") + ": "}
                    {process.env.REACT_APP_WHATSAPP_PHONE_NUMBER}
                  </div>
                  <div
                    className="how-to-reach-us-info-item-details-no-rtl"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      window.open("tel:+97444620202", "_self");
                    }}
                  >
                    {t("call") + ": "}
                    {process.env.REACT_APP_CALL_PHONE_NUMBER}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className={
              lang === "ar" ? "contact-form-div rtl-border" : "contact-form-div"
            }
          >
            <div className="contact-form-main-div">
              <div className={EnArTxt("contact-form-header", lang)}>
                {t("contact-us")}
              </div>
              <div className={EnArTxt("contact-form-desc", lang)}>
                {t("contact-us-desc")}
                <div className="contact-form-desc-email">
                  {process.env.REACT_APP_CONTACT_EMAIL}
                </div>
              </div>
              <form className="contact-form" onSubmit={formik.handleSubmit}>
                <div className="contact-form-item">
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
                <div className="contact-form-item">
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
                <div className="contact-form-item">
                  <div className={EnArTxt("form-label", lang)}>
                    {t("phone-number")}
                  </div>
                  <div className="contact-form-item-phone">
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
                <div className="contact-form-item">
                  <div className={EnArTxt("form-label", lang)}>
                    {t("how-can-we-help")}
                  </div>
                  <TextField
                    sx={{ width: "100%" }}
                    multiline={true}
                    rows={5}
                    placeholder={t("tell-us-more")}
                    type="text"
                    name="messageTxt"
                    value={formik.values.messageTxt}
                    variant="outlined"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.messageTxt &&
                      Boolean(formik.errors.messageTxt)
                    }
                    helperText={
                      formik.touched.messageTxt && formik.errors.messageTxt
                    }
                  />
                </div>
                <div className="contact-form-item">
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
          </div>
        </div>
      </div>
    </Box>
  );
};

export default ContactUsPage;
