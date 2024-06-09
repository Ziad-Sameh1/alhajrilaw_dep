import React from "react";
import "./index.scss";
import logoAR from "../../assets/images/full-logo-ar.png";
import logoEN from "../../assets/images/full-logo-en.png";
import { useTranslation } from "react-i18next";
import { ReactComponent as FBIcon } from "../../assets/svg/fb.svg";
import { ReactComponent as InstagramIcon } from "../../assets/svg/ig.svg";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const UnderConstructionPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const lang = useSelector((state) => state.language);
  return (
    <>
      <div className="wrap">
        <div className="content">
          {lang === "ar" && (
            <img
              src={logoAR}
              alt="local logo"
              className="logo"
              onClick={() => {
                navigate("/");
                console.log("should go home");
              }}
            />
          )}
          {lang !== "ar" && (
            <img
              src={logoEN}
              alt="international logo"
              className="logo"
              onClick={() => {
                navigate("/");
              }}
            />
          )}
          {lang === "ar" && (
            <div className="under-maintenance-text">
              {t("under-maintenance-pg-txt")}
              <span className="under-maintenance-special-text">
                {t("under-maintenance")}
              </span>
            </div>
          )}
          {lang !== "ar" && (
            <div className="under-maintenance-text-en">
              {t("under-maintenance-pg-txt")}
              <span className="under-maintenance-special-text">
                {t("under-maintenance")}
              </span>
            </div>
          )}
          <div className="social-icons">
            <FBIcon
              className="fb-icon"
              onClick={() => {
                window.open(process.env.REACT_APP_FB_LINK, "_blank");
              }}
            />

            <InstagramIcon
              className="twitter-icon"
              onClick={() => {
                const link = process.env.REACT_APP_INSTAGRAM_LINK;
                window.open(link, "_blank");
              }}
            />
          </div>
        </div>
        <div className="under-construction-img"></div>
      </div>
    </>
  );
};

export default UnderConstructionPage;
