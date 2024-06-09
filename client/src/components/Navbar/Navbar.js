import React from "react";
import "./Navbar.scss";
import LogoAR from "../../assets/images/full-logo-ar.png";
import LogoEN from "../../assets/images/full-logo-en.png";
import {
  FormControl,
  IconButton,
  MenuItem,
  Select,
  useMediaQuery,
} from "@mui/material";
import { Menu, Close, ArrowDropDown } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { setCurrentLanguage } from "../../utils/Language";
import { useMatch, useNavigate } from "react-router-dom";
import { websiteRoutes } from "../../routes/Routes";
import { t } from "i18next";

const NavList = (props) => {
  const isHomeRoute = useMatch(websiteRoutes.PAGE_HOME);
  const isCustomerReviewsRoute = useMatch(websiteRoutes.PAGE_REVIEWS);
  const isFAQsRoute = useMatch(websiteRoutes.PAGE_FAQ);
  const isAboutUsRoute = useMatch(websiteRoutes.PAGE_ABOUT_US);
  const isLatestNewsRoute = useMatch(websiteRoutes.PAGE_LAST_NEWS);
  const isMobileScreen = useMediaQuery("(max-width: 768px)");
  return (
    <>
      {isHomeRoute && (
        <div
          className="navbar-navlist-item-checked"
          onClick={() => {
            props.toggleMenu(false);
            props.navigate(websiteRoutes.PAGE_HOME);
            window.scrollTo(0, 0);
          }}
        >
          {props.t("home")}
        </div>
      )}
      {!isHomeRoute && (
        <div
          className="navbar-navlist-item"
          onClick={() => {
            props.toggleMenu(false);
            props.navigate(websiteRoutes.PAGE_HOME);
            window.scrollTo(0, 0);
          }}
        >
          {props.t("home")}
        </div>
      )}
      {isLatestNewsRoute && (
        <div
          className="navbar-navlist-item-checked"
          onClick={() => {
            props.toggleMenu(false);
            props.navigate(websiteRoutes.PAGE_LAST_NEWS);
            window.scrollTo(0, 0);
          }}
        >
          {props.t("activities")}
        </div>
      )}
      {!isLatestNewsRoute && (
        <div
          className="navbar-navlist-item"
          onClick={() => {
            props.toggleMenu(false);
            props.navigate(websiteRoutes.PAGE_LAST_NEWS);
            window.scrollTo(0, 0);
          }}
        >
          {props.t("activities")}
        </div>
      )}
      {isCustomerReviewsRoute && (
        <div
          className="navbar-navlist-item-checked"
          onClick={() => {
            props.toggleMenu(false);
            props.navigate(websiteRoutes.PAGE_REVIEWS);
            window.scrollTo(0, 0);
          }}
        >
          {props.t("customer-reviews")}
        </div>
      )}
      {!isCustomerReviewsRoute && (
        <div
          className="navbar-navlist-item"
          onClick={() => {
            props.toggleMenu(false);
            props.navigate(websiteRoutes.PAGE_REVIEWS);
            window.scrollTo(0, 0);
          }}
        >
          {props.t("customer-reviews")}
        </div>
      )}
      {isFAQsRoute && (
        <div
          className="navbar-navlist-item-checked"
          onClick={() => {
            props.toggleMenu(false);
            props.navigate(websiteRoutes.PAGE_FAQ);
            window.scrollTo(0, 0);
          }}
        >
          {props.t("faqs")}
        </div>
      )}
      {!isFAQsRoute && (
        <div
          className="navbar-navlist-item"
          onClick={() => {
            props.toggleMenu(false);
            props.navigate(websiteRoutes.PAGE_FAQ);
            window.scrollTo(0, 0);
          }}
        >
          {props.t("faqs")}
        </div>
      )}
      {isMobileScreen && isAboutUsRoute && (
        <div
          className="navbar-navlist-item-checked"
          onClick={() => {
            props.toggleMenu(false);
            props.navigate(websiteRoutes.PAGE_ABOUT_US);
            window.scrollTo(0, 0);
          }}
        >
          {props.t("about-us")}
        </div>
      )}
      {isMobileScreen && !isAboutUsRoute && (
        <div
          className="navbar-navlist-item"
          onClick={() => {
            props.toggleMenu(false);
            props.navigate(websiteRoutes.PAGE_ABOUT_US);
            window.scrollTo(0, 0);
          }}
        >
          {props.t("about-us")}
        </div>
      )}
      {!isMobileScreen && isAboutUsRoute && (
        <div className="navbar-dropdown">
          <div
            className="navbar-navlist-item-checked"
            onClick={() => {
              props.toggleMenu(false);
              props.navigate(websiteRoutes.PAGE_ABOUT_US);
              window.scrollTo(0, 0);
            }}
          >
            {props.t("about-us")}
            <ArrowDropDown />
          </div>
          <div className="navbar-dropdown-content">
            <div
              className="navbar-dropdown-item"
              onClick={() => {
                props.toggleMenu(false);
                props.navigate(websiteRoutes.PAGE_FOUNDER_SPEECH);
                window.scrollTo(0, 0);
              }}
            >
              {t("founder-speech")}
            </div>
            <div
              className="navbar-dropdown-item"
              onClick={() => {
                props.toggleMenu(false);
                props.navigate(websiteRoutes.PAGE_OUR_VISION);
                window.scrollTo(0, 0);
              }}
            >
              {t("our-vision")}
            </div>
            <div
              className="navbar-dropdown-item"
              onClick={() => {
                props.toggleMenu(false);
                props.navigate(websiteRoutes.PAGE_OUR_MISSION);
                window.scrollTo(0, 0);
              }}
            >
              {t("our-goal")}{" "}
            </div>
            <div
              className="navbar-dropdown-item"
              onClick={() => {
                props.toggleMenu(false);
                props.navigate(websiteRoutes.PAGE_OFFICE_STAFF);
                window.scrollTo(0, 0);
              }}
            >
              {t("office-staff")}
            </div>
            <div
              className="navbar-dropdown-item"
              onClick={() => {
                props.toggleMenu(false);
                props.navigate(websiteRoutes.PAGE_OUR_CLIENTS);
                window.scrollTo(0, 0);
              }}
            >
              {t("our-clients")}
            </div>
            <div
              className="navbar-dropdown-item"
              onClick={() => {
                props.toggleMenu(false);
                props.navigate(websiteRoutes.PAGE_HOW_TO_REACH_US);
                window.scrollTo(0, 0);
              }}
            >
              {t("how-to-reach-us")}
            </div>
          </div>
        </div>
      )}
      {!isMobileScreen && !isAboutUsRoute && (
        <div className="navbar-dropdown">
          <div
            className="navbar-navlist-item"
            onClick={() => {
              props.navigate(websiteRoutes.PAGE_ABOUT_US);
              window.scrollTo(0, 0);
            }}
          >
            {props.t("about-us")}
            <ArrowDropDown />
          </div>
          <div className="navbar-dropdown-content">
            <div
              className="navbar-dropdown-item"
              onClick={() => {
                props.navigate(websiteRoutes.PAGE_FOUNDER_SPEECH);
                window.scrollTo(0, 0);
              }}
            >
              {t("founder-speech")}
            </div>
            <div
              className="navbar-dropdown-item"
              onClick={() => {
                props.navigate(websiteRoutes.PAGE_OUR_VISION);
                window.scrollTo(0, 0);
              }}
            >
              {t("our-vision")}
            </div>
            <div
              className="navbar-dropdown-item"
              onClick={() => {
                props.navigate(websiteRoutes.PAGE_OUR_MISSION);
                window.scrollTo(0, 0);
              }}
            >
              {t("our-goal")}{" "}
            </div>
            <div
              className="navbar-dropdown-item"
              onClick={() => {
                props.navigate(websiteRoutes.PAGE_OFFICE_STAFF);
                window.scrollTo(0, 0);
              }}
            >
              {t("office-staff")}
            </div>
            <div
              className="navbar-dropdown-item"
              onClick={() => {
                props.navigate(websiteRoutes.PAGE_OUR_CLIENTS);
                window.scrollTo(0, 0);
              }}
            >
              {t("our-clients")}
            </div>
            <div
              className="navbar-dropdown-item"
              onClick={() => {
                props.navigate(websiteRoutes.PAGE_HOW_TO_REACH_US);
                window.scrollTo(0, 0);
              }}
            >
              {t("how-to-reach-us")}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const ReceiveConsultationBtn = (props) => {
  return (
    <>
      {props.lang === "ar" && (
        <button
          className="navbar-consult-btn-ar"
          onClick={() => {
            props.navigate(websiteRoutes.PAGE_BOOK_APPOINTMENT);
            props.toggleMenu(false);
          }}
        >
          {props.t("receive-consultation")}
        </button>
      )}
      {props.lang !== "ar" && (
        <button
          className="navbar-consult-btn"
          onClick={() => {
            props.navigate(websiteRoutes.PAGE_BOOK_APPOINTMENT);
            props.toggleMenu(false);
          }}
        >
          {props.t("receive-consultation")}
        </button>
      )}
    </>
  );
};

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
            window.scrollTo(0, 0);
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
            window.scrollTo(0, 0);
          }}
        />
      )}
    </>
  );
};

const Navbar = () => {
  const isDesktopScreen = useMediaQuery("(min-width: 1350px)");
  const isMobileScreen = useMediaQuery("(max-width: 768px)");
  const isSmallScreen = useMediaQuery("(max-width: 550px)");
  const { t } = useTranslation();
  const lang = useSelector((state) => state.language);
  const [isMenuToggled, toggleMenu] = React.useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    console.log(`change language into ${event.target.value}`);
    setCurrentLanguage(event.target.value);
  };
  return (
    <>
      <div className={isMenuToggled ? "navbar" : "navbar sticky-navbar"}>
        <Logo lang={lang} navigate={navigate} />
        {isDesktopScreen && (
          <div className="navbar-navlist">
            <NavList navigate={navigate} t={t} toggleMenu={toggleMenu} />
          </div>
        )}
        {!isSmallScreen && (
          <ReceiveConsultationBtn
            lang={lang}
            t={t}
            navigate={navigate}
            toggleMenu={toggleMenu}
          />
        )}
        {!isMobileScreen && (
          <FormControl>
            <Select
              labelId="demo-simple-select-label"
              variant="standard"
              id="demo-simple-select"
              autoWidth
              value={lang}
              onChange={handleChange}
            >
              <MenuItem value={"en"}>English</MenuItem>
              <MenuItem value={"ar"}>العربية</MenuItem>
            </Select>
          </FormControl>
        )}
        {!isDesktopScreen && (
          <IconButton
            onClick={() => {
              toggleMenu(!isMenuToggled);
            }}
          >
            {isMenuToggled && <Close color="primary" fontSize="large" />}
            {!isMenuToggled && <Menu fontSize="large" />}
          </IconButton>
        )}
        {isMenuToggled && (
          <div className="navbar-menu-mobile">
            {!isDesktopScreen && (
              <div className="navbar-menu-navlist-mobile">
                <NavList navigate={navigate} t={t} toggleMenu={toggleMenu} />
              </div>
            )}
            {isSmallScreen && (
              <ReceiveConsultationBtn
                lang={lang}
                t={t}
                navigate={navigate}
                toggleMenu={toggleMenu}
              />
            )}
            {isMobileScreen && (
              <FormControl className="test-class-name">
                <Select
                  labelId="demo-simple-select-label"
                  variant="standard"
                  id="demo-simple-select"
                  autoWidth
                  value={lang}
                  onChange={handleChange}
                >
                  <MenuItem value={"en"}>English</MenuItem>
                  <MenuItem value={"ar"}>العربية</MenuItem>
                </Select>
              </FormControl>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
