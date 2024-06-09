import {
  Divider,
  Drawer,
  FormControl,
  IconButton,
  Menu,
  MenuItem,
  Select,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Outlet, useMatch, useNavigate } from "react-router-dom";
import LogoAR from "../../assets/images/full-logo-ar.png";
import LogoEN from "../../assets/images/full-logo-en.png";
import { ReactComponent as HomeIcon } from "../../assets/svg/home.svg";
import { ReactComponent as AdminIcon } from "../../assets/svg/admins.svg";
import { ReactComponent as StaffIcon } from "../../assets/svg/staff.svg";
import { ReactComponent as ClientsIcon } from "../../assets/svg/clients.svg";
import { ReactComponent as AppointmentsIcon } from "../../assets/svg/appointments.svg";
import { ReactComponent as FaqsIcon } from "../../assets/svg/faqs.svg";
import { ReactComponent as ReviewCodesIcon } from "../../assets/svg/review-codes.svg";
import { ReactComponent as ReviewsIcon } from "../../assets/svg/reviews.svg";
import { ReactComponent as ShareIcon } from "../../assets/svg/shares.svg";
import { ReactComponent as PageIcon } from "../../assets/svg/pages.svg";
import { ReactComponent as SettingsIcon } from "../../assets/svg/settings.svg";
import { ReactComponent as LocationsIcon } from "../../assets/svg/locations.svg";
import { ReactComponent as MessagesIcon } from "../../assets/svg/messages.svg";
import { dashboardRoutes } from "../../routes/Routes";
import { MenuOpen, Close } from "@mui/icons-material";

import "./admin-layout.scss";
import { EnArTxt, setCurrentLanguage } from "../../utils/Language";
import { useState } from "react";

const Logo = (props) => {
  return (
    <>
      {props.lang === "ar" && (
        <img
          src={LogoAR}
          alt="local logo"
          className="admin-layout-logo-img"
          onClick={() => {
            props.navigate("/dashboard/main");
          }}
        />
      )}
      {props.lang !== "ar" && (
        <img
          src={LogoEN}
          alt="international logo"
          className="admin-layout-logo-img"
          onClick={() => {
            props.navigate("/dashboard/main");
          }}
        />
      )}
    </>
  );
};

const NavListItems = (props) => {
  const { t } = useTranslation();
  const lang = useSelector((state) => state.language);
  const navigate = useNavigate();
  const isMainDashboardRoute = useMatch(
    `dashboard/${dashboardRoutes.PAGE_DASHBOARD_MAIN}`
  );
  const isAdminsRoute = useMatch(
    `dashboard/${dashboardRoutes.PAGE_MODIFY_ADMINS}`
  );
  const isStaffRoute = useMatch(
    `dashboard/${dashboardRoutes.PAGE_MODIFY_STAFF}`
  );
  const isClientsRoute = useMatch(
    `dashboard/${dashboardRoutes.PAGE_MODIFY_CLIENTS}`
  );
  const isAppointmentsRoute = useMatch(
    `dashboard/${dashboardRoutes.PAGE_MODIFY_APPOINTMENTS}`
  );
  const isFAQsRoute = useMatch(`dashboard/${dashboardRoutes.PAGE_MODIFY_FAQ}`);
  const isMessagesRoute = useMatch(
    `dashboard/${dashboardRoutes.PAGE_MESSAGES}`
  );
  const isReviewCodesRoute = useMatch(
    `dashboard/${dashboardRoutes.PAGE_MODIFY_REVIEW_CODES}`
  );
  const isReviewsRoute = useMatch(`dashboard/${dashboardRoutes.PAGE_REVIEWS}`);
  const isSharesRoute = useMatch(`dashboard/${dashboardRoutes.PAGE_SHARES}`);
  const isPagesRoute = useMatch(`dashboard/${dashboardRoutes.PAGE_PAGES}`);
  const isLocationsRoute = useMatch(`dashboard/${dashboardRoutes.PAGE_LOCATIONS}`);
  const isSettingsRoute = useMatch(
    `dashboard/${dashboardRoutes.PAGE_SETTINGS}`
  );
  return (
    <>
      <div
        className={EnArTxt(
          isMainDashboardRoute
            ? "admin-layout-navlist-item-active"
            : "admin-layout-navlist-item",
          lang
        )}
        onClick={() => {
          props.toggleMenu(false);
          navigate(dashboardRoutes.PAGE_DASHBOARD_MAIN);
        }}
      >
        <HomeIcon
          className={isMainDashboardRoute ? "item-icon-active" : "item-icon"}
        />
        <div>{t("main-dashboard")}</div>
      </div>
      <div
        className={EnArTxt(
          isAdminsRoute
            ? "admin-layout-navlist-item-active"
            : "admin-layout-navlist-item",
          lang
        )}
        onClick={() => {
          props.toggleMenu(false);
          navigate(dashboardRoutes.PAGE_MODIFY_ADMINS);
        }}
      >
        <AdminIcon
          className={isAdminsRoute ? "item-icon-active" : "item-icon"}
        />
        <div>{t("system-adminstrator")}</div>
      </div>
      <div
        className={EnArTxt(
          isStaffRoute
            ? "admin-layout-navlist-item-active"
            : "admin-layout-navlist-item",
          lang
        )}
        onClick={() => {
          props.toggleMenu(false);
          navigate(dashboardRoutes.PAGE_MODIFY_STAFF);
        }}
      >
        <StaffIcon
          className={isStaffRoute ? "item-icon-active" : "item-icon"}
        />
        <div>{t("staff")}</div>
      </div>
      <div
        className={EnArTxt(
          isClientsRoute
            ? "admin-layout-navlist-item-active"
            : "admin-layout-navlist-item",
          lang
        )}
        onClick={() => {
          props.toggleMenu(false);
          navigate(dashboardRoutes.PAGE_MODIFY_CLIENTS);
        }}
      >
        <ClientsIcon
          className={isClientsRoute ? "item-icon-active" : "item-icon"}
        />
        <div>{t("clients")}</div>
      </div>
      <div
        className={EnArTxt(
          isAppointmentsRoute
            ? "admin-layout-navlist-item-active"
            : "admin-layout-navlist-item",
          lang
        )}
        onClick={() => {
          props.toggleMenu(false);
          navigate(dashboardRoutes.PAGE_MODIFY_APPOINTMENTS);
        }}
      >
        <AppointmentsIcon
          className={isAppointmentsRoute ? "item-icon-active" : "item-icon"}
        />
        <div>{t("appointments")}</div>
      </div>
      <div
        className={EnArTxt(
          isFAQsRoute
            ? "admin-layout-navlist-item-active"
            : "admin-layout-navlist-item",
          lang
        )}
        onClick={() => {
          props.toggleMenu(false);
          navigate(dashboardRoutes.PAGE_MODIFY_FAQ);
        }}
      >
        <FaqsIcon className={isFAQsRoute ? "item-icon-active" : "item-icon"} />
        <div>{t("faqs")}</div>
      </div>
      <div
        className={EnArTxt(
          isMessagesRoute
            ? "admin-layout-navlist-item-active"
            : "admin-layout-navlist-item",
          lang
        )}
        onClick={() => {
          props.toggleMenu(false);
          navigate(dashboardRoutes.PAGE_MESSAGES);
        }}
      >
        <MessagesIcon
          className={isMessagesRoute ? "item-icon-active" : "item-icon"}
        />
        <div>{t("messages")}</div>
      </div>
      <div
        className={EnArTxt(
          isReviewCodesRoute
            ? "admin-layout-navlist-item-active"
            : "admin-layout-navlist-item",
          lang
        )}
        onClick={() => {
          props.toggleMenu(false);
          navigate(dashboardRoutes.PAGE_MODIFY_REVIEW_CODES);
        }}
      >
        <ReviewCodesIcon
          className={isReviewCodesRoute ? "item-icon-active" : "item-icon"}
        />
        <div>{t("clients-codes")}</div>
      </div>
      <div
        className={EnArTxt(
          isSharesRoute
            ? "admin-layout-navlist-item-active"
            : "admin-layout-navlist-item",
          lang
        )}
        onClick={() => {
          props.toggleMenu(false);
          navigate(dashboardRoutes.PAGE_SHARES);
        }}
      >
        <ShareIcon
          className={isSharesRoute ? "item-icon-active" : "item-icon"}
        />
        <div>{t("shares")}</div>
      </div>
      <div
        className={EnArTxt(
          isPagesRoute
            ? "admin-layout-navlist-item-active"
            : "admin-layout-navlist-item",
          lang
        )}
        onClick={() => {
          props.toggleMenu(false);
          navigate(dashboardRoutes.PAGE_PAGES);
        }}
      >
        <PageIcon className={isPagesRoute ? "item-icon-active" : "item-icon"} />
        <div>{t("activities")}</div>
      </div>
      <div
        className={EnArTxt(
          isReviewsRoute
            ? "admin-layout-navlist-item-active"
            : "admin-layout-navlist-item",
          lang
        )}
        onClick={() => {
          props.toggleMenu(false);
          navigate(dashboardRoutes.PAGE_REVIEWS);
        }}
      >
        <ReviewsIcon
          className={isReviewsRoute ? "item-icon-active" : "item-icon"}
        />
        <div>{t("reviews")}</div>
      </div>
      <div
        className={EnArTxt(
          isLocationsRoute
            ? "admin-layout-navlist-item-active"
            : "admin-layout-navlist-item",
          lang
        )}
        onClick={() => {
          props.toggleMenu(false);
          navigate(dashboardRoutes.PAGE_LOCATIONS);
        }}
      >
        <LocationsIcon
          className={isLocationsRoute ? "item-icon-active" : "item-icon"}
        />
        <div>{t("locations")}</div>
      </div>
      <div
        className={EnArTxt(
          isSettingsRoute
            ? "admin-layout-navlist-item-active"
            : "admin-layout-navlist-item",
          lang
        )}
        onClick={() => {
          props.toggleMenu(false);
          navigate(dashboardRoutes.PAGE_SETTINGS);
        }}
      >
        <SettingsIcon
          className={isSettingsRoute ? "item-icon-active" : "item-icon"}
        />
        <div>{t("settings")}</div>
      </div>
    </>
  );
};

const AdminLayout = () => {
  const isMobileScreen = useMediaQuery("(max-width: 768px)");
  const [isMenuToggled, toggleMenu] = useState(false);
  const { t } = useTranslation();
  const lang = useSelector((state) => state.language);
  const navigate = useNavigate();
  return (
    <>
      {isMobileScreen && isMenuToggled && (
        <div className="dashboard-page-mobile-nav">
          <NavListItems toggleMenu={toggleMenu} />
        </div>
      )}
      {isMobileScreen && (
        <div
          className=".dashboard-bg-color"
          style={{
            backgroundColor:
              isMenuToggled && isMobileScreen ? "white" : "#e2e8f0",
          }}
        >
          <IconButton onClick={() => toggleMenu(!isMenuToggled)}>
            {!isMenuToggled && <MenuOpen fontSize="large" />}
            {isMenuToggled && <Close fontSize="large" />}
          </IconButton>
        </div>
      )}
      <div className="dashboard-page">
        {!isMobileScreen && (
          <div className="admin-layout">
            <div className="admin-layout-flex">
              <div className="admin-layout-logo">
                <Logo lang={lang} navigate={navigate} />
              </div>
              {/* <Divider /> */}
              <div className="admin-layout-navlist">
                <NavListItems toggleMenu={toggleMenu} />
              </div>
            </div>
          </div>
        )}
        <Outlet />
      </div>
    </>
  );
};

export default AdminLayout;
