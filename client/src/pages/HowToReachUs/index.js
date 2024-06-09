import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Box } from "@mui/system";
import ErrorAlert from "../../components/ErrorAlert/ErrorAlert";
import LoadingBar from "../../components/LoadingBar.js/loadingBar";
import "react-phone-input-2/lib/style.css";
import "./how-to-reach-us.scss";
import {
  EmailOutlined,
  LocationOnOutlined,
  CallOutlined,
} from "@mui/icons-material";
import { EnArTxt } from "../../utils/Language";
import SuccessAlert from "../../components/SuccessAlert/SuccessAlert";
import { resetStates } from "../../utils/FeedbackStates";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const HowToReachUsPage = () => {
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
      <div className="how-to-reach-us-main-section-flex-center">
        <div className="how-to-reach-us-main-div">
          <div
            className={
              lang === "ar"
                ? "how-to-reach-us-info-div-rtl"
                : "how-to-reach-us-info-div"
            }
          >
            <div className="how-to-reach-us-info-body">
              <div
                className={EnArTxt("how-to-reach-us-info-main-header", lang)}
              >
                {t("how-to-reach-us")}
              </div>
              <div className={EnArTxt("how-to-reach-us-info-main-desc", lang)}>
                {t("contact-us-info-desc")}
              </div>
              <div className="how-to-reach-us-info-item">
                <div className="item-icon">
                  <EmailOutlined />
                </div>
                <div className="item-text">
                  <div
                    className={EnArTxt(
                      "how-to-reach-us-info-item-header",
                      lang
                    )}
                  >
                    {t("send-to-us")}
                  </div>
                  <div
                    className={EnArTxt("how-to-reach-us-info-item-desc", lang)}
                  >
                    {t("send-to-us-item-desc")}
                  </div>
                  <div className="how-to-reach-us-info-item-details">
                    {process.env.REACT_APP_CONTACT_EMAIL}
                  </div>
                </div>
              </div>
              <div className="how-to-reach-us-info-item">
                <div className="item-icon">
                  <LocationOnOutlined />
                </div>
                <div className="item-text">
                  <div
                    className={EnArTxt(
                      "how-to-reach-us-info-item-header",
                      lang
                    )}
                  >
                    {t("office")}
                  </div>
                  <div
                    className={EnArTxt("how-to-reach-us-info-item-desc", lang)}
                  >
                    {t("office-item-desc")}
                  </div>
                  <div
                    className={EnArTxt(
                      "how-to-reach-us-info-item-details",
                      lang
                    )}
                  >
                    {t("office-address")}
                  </div>
                </div>
              </div>
              <div className="how-to-reach-us-info-item">
                <div className="item-icon">
                  <CallOutlined />
                </div>
                <div className="item-text">
                  <div
                    className={EnArTxt(
                      "how-to-reach-us-info-item-header",
                      lang
                    )}
                  >
                    {t("phone")}
                  </div>
                  <div
                    className={EnArTxt("how-to-reach-us-info-item-desc", lang)}
                  >
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
              lang === "ar"
                ? "how-to-reach-us-map-div rtl-border"
                : "how-to-reach-us-map-div"
            }
          >
            <iframe
              className={
                lang === "ar" ? "reach-us-map rtl-border" : "reach-us-map"
              }
              allowFullScreen={true}
              width="100%"
              height="100%"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d461884.0901869744!2d50.949574065625!3d25.254788599999994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e45d1fd16d72b4d%3A0x61b108145cddd74d!2zTW9oYW1tZWQgTWFqaWQgQWwtSGFqcmkgTGF3IEZpcm0g2YXZg9iq2Kgg2KfZhNmF2K3Yp9mF2Yog2YXYrdmF2K8g2YXYp9is2K8g2KfZhNmH2KfYrNix2Yog2YTZhNmF2K3Yp9mF2KfYqSDZiCDYp9mE2KfYs9iq2LTYp9ix2KfYqiDYp9mE2YLYp9mG2YjZhtmK2Kkg2Ygg2KfZhNiq2K3Zg9mK2YU!5e0!3m2!1sen!2seg!4v1678728973168!5m2!1sen!2seg"
            />
          </div>
        </div>
      </div>
    </Box>
  );
};

export default HowToReachUsPage;
