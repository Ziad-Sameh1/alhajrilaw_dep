import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LogoAR from "../../assets/images/full-logo-ar.png";
import LogoEN from "../../assets/images/full-logo-en.png";
import FBIcon from "../../assets/svg/fb.svg";
import WAIcon from "../../assets/svg/whatsapp.svg";
import TwitterIcon from "../../assets/svg/twitter.svg";
import IGIcon from "../../assets/svg/ig.svg";
import "./Footer.scss";
import { websiteRoutes } from "../../routes/Routes";

const Logo = (props) => {
  return (
    <>
      {props.lang === "ar" && (
        <img
          src={LogoAR}
          alt="local logo"
          className="footer-img"
          onClick={() => {
            props.navigate("/");
          }}
        />
      )}
      {props.lang !== "ar" && (
        <img
          src={LogoEN}
          alt="international logo"
          className="footer-img"
          onClick={() => {
            props.navigate("/");
          }}
        />
      )}
    </>
  );
};

const FooterDesc = (props) => {
  return (
    <>
      {props.lang === "ar" && (
        <div className="footer-desc-ar">{props.t("footer-desc")}</div>
      )}
      {props.lang !== "ar" && (
        <div className="footer-desc">{props.t("footer-desc")}</div>
      )}
    </>
  );
};

const FooterHeader = (props) => {
  return (
    <>
      {props.lang === "ar" && (
        <div className="footer-sec-header-ar">{props.text}</div>
      )}
      {props.lang !== "ar" && (
        <div className="footer-sec-header">{props.text}</div>
      )}
    </>
  );
};

const Footer = () => {
  const { t } = useTranslation();
  const lang = useSelector((state) => state.language);
  const navigate = useNavigate();
  return (
    <div className="footer">
      <div className="footer-divider"></div>
      <div className="footer-main">
        <div className="footer-main-column">
          <Logo lang={lang} navigate={navigate} />
          <FooterDesc lang={lang} t={t} />
          <div className="footer-social">
            <img
              src={FBIcon}
              alt="fb-icon"
              className="footer-social-icon"
              onClick={() => {
                window.open("https://www.facebook.com/alhajrilawyer/");
              }}
            />
            <img
              src={IGIcon}
              alt="ig-icon"
              width="32px"
              style={{ cursor: "pointer" }}
              onClick={() => {
                window.open("https://www.instagram.com/alhajri.law_firm/");
              }}
            />
            <img
              src={TwitterIcon}
              alt="twitter-icon"
              className="footer-social-icon"
              onClick={() => {
                window.open("https://twitter.com/alhajrilawyer11");
              }}
            />
            <img
              src={WAIcon}
              alt="wa-icon"
              className="footer-social-icon"
              onClick={() => {
                window.open("https://wa.me/+97466900700");
              }}
            />
          </div>
        </div>
        <div className="footer-main-column">
          <FooterHeader lang={lang} text={t("our-services")} />
          <div className="footer-sec-list">
            <div
              className="footer-sec-list-item"
              onClick={() => {
                navigate(websiteRoutes.PAGE_FOUNDER_SPEECH);
                window.scrollTo(0, 0);
              }}
            >
              {t("founder-speech")}
            </div>

            <div
              className="footer-sec-list-item"
              onClick={() => {
                navigate(websiteRoutes.PAGE_OUR_MISSION);
                window.scrollTo(0, 0);
              }}
            >
              {t("our-goal")}
            </div>
            <div
              className="footer-sec-list-item"
              onClick={() => {
                navigate(websiteRoutes.PAGE_OUR_VISION);
                window.scrollTo(0, 0);
              }}
            >
              {t("our-vision")}
            </div>
            <div
              className="footer-sec-list-item"
              onClick={() => {
                navigate(websiteRoutes.PAGE_FAQ);
                window.scrollTo(0, 0);
              }}
            >
              {t("faqs")}
            </div>
            <div
              className="footer-sec-list-item"
              onClick={() => {
                navigate(websiteRoutes.PAGE_HOW_TO_REACH_US);
                window.scrollTo(0, 0);
              }}
            >
              {t("how-to-reach-us")}
            </div>
          </div>
        </div>
        <div className="footer-main-column">
          <FooterHeader lang={lang} text={t("navigation")} />
          <div className="footer-sec-list">
            <div
              className="footer-sec-list-item"
              onClick={() => {
                navigate(websiteRoutes.PAGE_BOOK_APPOINTMENT);
                window.scrollTo(0, 0);
              }}
            >
              {t("book-appointment")}
            </div>
            <div
              className="footer-sec-list-item"
              onClick={() => {
                navigate(websiteRoutes.PAGE_REVIEWS);
                window.scrollTo(0, 0);
              }}
            >
              {t("customer-reviews")}
            </div>
            <div
              className="footer-sec-list-item"
              onClick={() => {
                navigate(websiteRoutes.PAGE_OUR_CLIENTS);
                window.scrollTo(0, 0);
              }}
            >
              {t("our-clients")}
            </div>
            <div
              className="footer-sec-list-item"
              onClick={() => {
                navigate(websiteRoutes.PAGE_OFFICE_STAFF);
                window.scrollTo(0, 0);
              }}
            >
              {t("office-staff")}
            </div>
            <div
              className="footer-sec-list-item"
              onClick={() => {
                navigate(websiteRoutes.PAGE_ABOUT_US);
                window.scrollTo(0, 0);
              }}
            >
              {t("about-us")}
            </div>
            <div
              className="footer-sec-list-item"
              onClick={() => {
                navigate(websiteRoutes.PAGE_LAST_NEWS);
                window.scrollTo(0, 0);
              }}
            >
              {t("activities")}
            </div>
          </div>
        </div>
        <div className="footer-main-column">
          <FooterHeader lang={lang} text={t("contact-us")} />
          <div className="footer-sec-list">
            <div
              className="footer-sec-list-item"
              onClick={() => {
                navigate(websiteRoutes.PAGE_CONTACT_US);
                window.scrollTo(0, 0);
              }}
            >
              {t("contact-us")}
            </div>
            <div
              className="footer-sec-list-item"
              style={{ textDecoration: "underline" }}
              onClick={() => {
                window.open("mailto:Alhajri.law@hotmail.com", "_self");
              }}
            >
              Alhajri.law@hotmail.com
            </div>
            {lang === "ar" && (
              <div
                className="footer-sec-list-item"
                onClick={() => {
                  window.open("tel:+97466033911", "_self");
                }}
              >
                {process.env.REACT_APP_PHONE_NUMBER_RTL}
              </div>
            )}
            {lang !== "ar" && (
              <div
                className="footer-sec-list-item"
                onClick={() => {
                  window.open("tel:+97466033911", "_self");
                }}
              >
                {process.env.REACT_APP_PHONE_NUMBER_LTR}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
