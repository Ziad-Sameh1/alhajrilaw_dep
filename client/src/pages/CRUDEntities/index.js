import React, { useEffect, useState } from "react";
import { useLocation, useMatch, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { checkLoginStatus } from "../../services/AdminService";
import { Box } from "@mui/system";
import ErrorAlert from "../../components/ErrorAlert/ErrorAlert";
import SuccessAlert from "../../components/SuccessAlert/SuccessAlert";
import LoadingBar from "../../components/LoadingBar.js/loadingBar";
import { FormControl, Menu, MenuItem, Select } from "@mui/material";
import { EnArTxt, setCurrentLanguage } from "../../utils/Language";
import { ArrowDropDown } from "@mui/icons-material";
import AccProfile from "../../assets/images/acc-profile.png";
import StatsImg from "../../assets/images/stats.png";
import { LineChart, Line, XAxis, ResponsiveContainer } from "recharts";
import { Tooltip as GraphTooltip } from "recharts";
import "./modify-admins.scss";
import { get, Logout, getStats } from "./AdminCRUD/AdminMethods";
import { GetStaff, GetStaffStats } from "./StaffCRUD/StaffMethods";
import { GetClients, GetClientsStats } from "./ClientsCRUD/ClientMethods";
import { GetShares, GetSharesStats } from "./SharesCRUD/SharesMethods";
import { GetPages, GetPagesStats } from "./PagesCRUD/PagesMethods";
import { GetReviews, GetReviewsStats } from "./ReviewCRUD/ReviewMethods";
import { GetSenders, GetSenderStats } from "./SenderCRUD/SenderMethods";
import {
  GetAppointments,
  GetAppointmentsStats,
} from "./AppointmentCRUD/AppointmentMethods";
import AdminCRUD from "./AdminCRUD/admin";
import { useTranslation } from "react-i18next";
import { dashboardRoutes } from "../../routes/Routes";
import StaffCRUD from "./StaffCRUD/staff";
import ClientCRUD from "./ClientsCRUD/clients";
import AppointmentCRUD from "./AppointmentCRUD/appointment";
import SharesCRUD from "./SharesCRUD/shares";
import PagesCRUD from "./PagesCRUD/pages";
import SenderCRUD from "./SenderCRUD/sender";
import ReviewCRUD from "./ReviewCRUD/review";
import FAQsCRUD from "./FAQsCRUD/faqs";
import MessageCRUD from "./MessageCRUD/message";
import ReviewCodeCRUD from "./ReviewCodeCRUD/reviewCodes";
import { GetFAQs, GetFAQsStats } from "./FAQsCRUD/FAQMethods";
import { GetMessages, GetMessagesStats } from "./MessageCRUD/MessageMethods";
import {
  GetReviewCodes,
  GetReviewCodesStats,
} from "./ReviewCodeCRUD/ReviewCodeMethods";
import { configureStates } from "../../utils/FeedbackStates";
import { getSenders, getSenderStats } from "../../services/SenderService";

const CRUDPage = () => {
  const isAdminsRoute = useMatch(
    `/dashboard/${dashboardRoutes.PAGE_MODIFY_ADMINS}`
  );
  const isStaffRoute = useMatch(
    `/dashboard/${dashboardRoutes.PAGE_MODIFY_STAFF}`
  );
  const isClientsRoute = useMatch(
    `/dashboard/${dashboardRoutes.PAGE_MODIFY_CLIENTS}`
  );
  const isAppointmentsRoute = useMatch(
    `/dashboard/${dashboardRoutes.PAGE_MODIFY_APPOINTMENTS}`
  );
  const isFAQsRoute = useMatch(`/dashboard/${dashboardRoutes.PAGE_MODIFY_FAQ}`);
  const isMessagesRoute = useMatch(
    `/dashboard/${dashboardRoutes.PAGE_MESSAGES}`
  );
  const isReviewCodesRoute = useMatch(
    `/dashboard/${dashboardRoutes.PAGE_MODIFY_REVIEW_CODES}`
  );
  const isSharesRoute = useMatch(`/dashboard/${dashboardRoutes.PAGE_SHARES}`);
  const isLocationsRoute = useMatch(
    `/dashboard/${dashboardRoutes.PAGE_LOCATIONS}`
  );
  const isPagesRoute = useMatch(`/dashboard/${dashboardRoutes.PAGE_PAGES}`);
  const isReviewsRoute = useMatch(`/dashboard/${dashboardRoutes.PAGE_REVIEWS}`);
  const isError = useSelector((state) => state.isError);
  const isSuccess = useSelector((state) => state.isSuccess);
  const isLoading = useSelector((state) => state.isLoading);
  const errorMessage = useSelector((state) => state.errorMessage);
  const successMessage = useSelector((state) => state.successMessage);
  const [admins, setAdmins] = useState([]);
  const [staff, setStaff] = useState([]);
  const [clients, setClients] = useState([]);
  const [faqs, setFAQs] = useState([]);
  const [messages, setMessages] = useState([]);
  const [reviewCodes, setReviewCodes] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [shares, setShares] = useState([]);
  const [pages, setPages] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [senders, setSenders] = useState([]);
  const [searchTxt, setSearchTxt] = useState("");
  const { t } = useTranslation();
  const [numericStats, setNumericStats] = useState({
    all: 0,
    month: 0,
    day: 0,
  });
  const [graphData, setGraphData] = useState([
    {
      name: t("january"),
      admins: 0,
      staff: 0,
      clients: 0,
      appointments: 0,
      faqs: 0,
      messages: 0,
      reviewCodes: 0,
      reviews: 0,
      shares: 0,
      pages: 0,
    },
    {
      name: t("february"),
      admins: 0,
      staff: 0,
      clients: 0,
      appointments: 0,
      faqs: 0,
      messages: 0,
      reviewCodes: 0,
      reviews: 0,
      shares: 0,
      pages: 0,
    },
    {
      name: t("march"),
      admins: 0,
      staff: 0,
      clients: 0,
      appointments: 0,
      faqs: 0,
      messages: 0,
      reviewCodes: 0,
      reviews: 0,
      shares: 0,
      pages: 0,
    },
    {
      name: t("april"),
      admins: 0,
      staff: 0,
      clients: 0,
      appointments: 0,
      faqs: 0,
      messages: 0,
      reviewCodes: 0,
      reviews: 0,
      shares: 0,
      pages: 0,
    },
    {
      name: t("may"),
      admins: 0,
      staff: 0,
      clients: 0,
      appointments: 0,
      faqs: 0,
      messages: 0,
      reviewCodes: 0,
      reviews: 0,
      shares: 0,
      pages: 0,
    },
    {
      name: t("june"),
      admins: 0,
      staff: 0,
      clients: 0,
      appointments: 0,
      faqs: 0,
      messages: 0,
      reviewCodes: 0,
      reviews: 0,
      shares: 0,
      pages: 0,
    },
    {
      name: t("july"),
      admins: 0,
      staff: 0,
      clients: 0,
      appointments: 0,
      faqs: 0,
      messages: 0,
      reviewCodes: 0,
      reviews: 0,
      shares: 0,
      pages: 0,
    },
    {
      name: t("august"),
      admins: 0,
      staff: 0,
      clients: 0,
      appointments: 0,
      faqs: 0,
      messages: 0,
      reviewCodes: 0,
      reviews: 0,
      shares: 0,
      pages: 0,
    },
    {
      name: t("september"),
      admins: 0,
      staff: 0,
      clients: 0,
      appointments: 0,
      faqs: 0,
      messages: 0,
      reviewCodes: 0,
      reviews: 0,
      shares: 0,
      pages: 0,
    },
    {
      name: t("october"),
      admins: 0,
      staff: 0,
      clients: 0,
      appointments: 0,
      faqs: 0,
      messages: 0,
      reviewCodes: 0,
      reviews: 0,
      shares: 0,
      pages: 0,
    },
    {
      name: t("november"),
      admins: 0,
      staff: 0,
      clients: 0,
      appointments: 0,
      faqs: 0,
      messages: 0,
      reviewCodes: 0,
      reviews: 0,
      shares: 0,
      pages: 0,
    },
    {
      name: t("december"),
      admins: 0,
      staff: 0,
      clients: 0,
      appointments: 0,
      faqs: 0,
      messages: 0,
      reviewCodes: 0,
      reviews: 0,
      shares: 0,
      pages: 0,
    },
  ]);
  const lang = useSelector((state) => state.language);
  const [headerAnchor, setHeaderAnchor] = useState(null);
  const headerMenuopen = Boolean(headerAnchor);

  const headerHandleClick = (event) => {
    if (headerAnchor == null) {
      setHeaderAnchor(event.currentTarget);
    } else {
      setHeaderAnchor(null);
    }
  };
  const headerHandleClose = () => {
    setHeaderAnchor(null);
  };
  const location = useLocation();
  const navigate = useNavigate();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const handleChange = (event) => {
    console.log(`change language into ${event.target.value}`);
    setCurrentLanguage(event.target.value);
  };
  useEffect(() => {
    if (
      location.pathname === `/dashboard/${dashboardRoutes.PAGE_MODIFY_ADMINS}`
    ) {
      get(setAdmins, rowsPerPage, page, t);
    } else if (
      location.pathname === `/dashboard/${dashboardRoutes.PAGE_MODIFY_STAFF}`
    ) {
      GetStaff(setStaff, rowsPerPage, page, t);
    } else if (
      location.pathname === `/dashboard/${dashboardRoutes.PAGE_MODIFY_CLIENTS}`
    ) {
      GetClients(setClients, rowsPerPage, page, t);
    } else if (
      location.pathname ===
      `/dashboard/${dashboardRoutes.PAGE_MODIFY_APPOINTMENTS}`
    ) {
      GetAppointments(setAppointments, rowsPerPage, page, t);
    } else if (
      location.pathname === `/dashboard/${dashboardRoutes.PAGE_MODIFY_FAQ}`
    ) {
      GetFAQs(setFAQs, rowsPerPage, page, t);
    } else if (
      location.pathname === `/dashboard/${dashboardRoutes.PAGE_MESSAGES}`
    ) {
      GetMessages(setMessages, rowsPerPage, page, t);
    } else if (
      location.pathname ===
      `/dashboard/${dashboardRoutes.PAGE_MODIFY_REVIEW_CODES}`
    ) {
      GetReviewCodes(setReviewCodes, rowsPerPage, page, t);
    } else if (
      location.pathname === `/dashboard/${dashboardRoutes.PAGE_SHARES}`
    ) {
      GetShares(setShares, rowsPerPage, page, t);
    } else if (
      location.pathname === `/dashboard/${dashboardRoutes.PAGE_PAGES}`
    ) {
      GetPages(setPages, rowsPerPage, page, t);
    } else if (
      location.pathname === `/dashboard/${dashboardRoutes.PAGE_REVIEWS}`
    ) {
      GetReviews(setReviews, rowsPerPage, page, t);
    }
  }, [rowsPerPage, page]);
  const checkAuth = async () => {
    try {
      const res = await checkLoginStatus();
      if (res.msg !== "Success") {
        navigate("/dashboard/login");
        configureStates(false, true, t("login-again"));
      }
    } catch (err) {
      console.log(err);
      navigate("/dashboard/login");
      configureStates(false, true, err);
    }
  };
  useEffect(() => {
    checkAuth();
    if (
      location.pathname === `/dashboard/${dashboardRoutes.PAGE_MODIFY_ADMINS}`
    ) {
      getStats(setNumericStats, setGraphData, t);
      get(setAdmins, rowsPerPage, page, t);
    } else if (
      location.pathname === `/dashboard/${dashboardRoutes.PAGE_MODIFY_STAFF}`
    ) {
      GetStaffStats(setNumericStats, setGraphData, t);
      GetStaff(setStaff, rowsPerPage, page, t);
    } else if (
      location.pathname === `/dashboard/${dashboardRoutes.PAGE_MODIFY_CLIENTS}`
    ) {
      GetClientsStats(setNumericStats, setGraphData, t);
      GetClients(setClients, rowsPerPage, page, t);
    } else if (
      location.pathname ===
      `/dashboard/${dashboardRoutes.PAGE_MODIFY_APPOINTMENTS}`
    ) {
      GetAppointmentsStats(setNumericStats, setGraphData, t);
      GetAppointments(setAppointments, rowsPerPage, page, t);
    } else if (
      location.pathname === `/dashboard/${dashboardRoutes.PAGE_MODIFY_FAQ}`
    ) {
      GetFAQsStats(setNumericStats, setGraphData, t);
      GetFAQs(setFAQs, rowsPerPage, page, t);
    } else if (
      location.pathname === `/dashboard/${dashboardRoutes.PAGE_MESSAGES}`
    ) {
      GetMessagesStats(setNumericStats, setGraphData, t);
      GetMessages(setMessages, rowsPerPage, page, t);
    } else if (
      location.pathname ===
      `/dashboard/${dashboardRoutes.PAGE_MODIFY_REVIEW_CODES}`
    ) {
      GetReviewCodesStats(setNumericStats, setGraphData, t);
      GetReviewCodes(setReviewCodes, rowsPerPage, page, t);
    } else if (
      location.pathname === `/dashboard/${dashboardRoutes.PAGE_SHARES}`
    ) {
      GetSharesStats(setNumericStats, setGraphData, t);
      GetShares(setShares, rowsPerPage, page, t);
    } else if (
      location.pathname === `/dashboard/${dashboardRoutes.PAGE_PAGES}`
    ) {
      GetPagesStats(setNumericStats, setGraphData, t);
      GetPages(setPages, rowsPerPage, page, t);
    } else if (
      location.pathname === `/dashboard/${dashboardRoutes.PAGE_REVIEWS}`
    ) {
      GetReviewsStats(setNumericStats, setGraphData, t);
      GetReviews(setReviews, rowsPerPage, page, t);
    }
  }, [location]);
  useEffect(() => {
    checkAuth();
    if (
      location.pathname === `/dashboard/${dashboardRoutes.PAGE_MODIFY_ADMINS}`
    ) {
      getStats(setNumericStats, setGraphData, t);
      get(setAdmins, rowsPerPage, page, t);
    } else if (
      location.pathname === `/dashboard/${dashboardRoutes.PAGE_MODIFY_STAFF}`
    ) {
      GetStaffStats(setNumericStats, setGraphData, t);
      GetStaff(setStaff, rowsPerPage, page, t);
    } else if (
      location.pathname === `/dashboard/${dashboardRoutes.PAGE_MODIFY_CLIENTS}`
    ) {
      GetClientsStats(setNumericStats, setGraphData, t);
      GetClients(setClients, rowsPerPage, page, t);
    } else if (
      location.pathname ===
      `/dashboard/${dashboardRoutes.PAGE_MODIFY_APPOINTMENTS}`
    ) {
      GetAppointmentsStats(setNumericStats, setGraphData, t);
      GetAppointments(setAppointments, rowsPerPage, page, t);
    } else if (
      location.pathname === `/dashboard/${dashboardRoutes.PAGE_MODIFY_FAQ}`
    ) {
      GetFAQsStats(setNumericStats, setGraphData, t);
      GetFAQs(setFAQs, rowsPerPage, page, t);
    } else if (
      location.pathname === `/dashboard/${dashboardRoutes.PAGE_MESSAGES}`
    ) {
      GetMessagesStats(setNumericStats, setGraphData, t);
      GetMessages(setMessages, rowsPerPage, page, t);
    } else if (
      location.pathname ===
      `/dashboard/${dashboardRoutes.PAGE_MODIFY_REVIEW_CODES}`
    ) {
      GetReviewCodesStats(setNumericStats, setGraphData, t);
      GetReviewCodes(setReviewCodes, rowsPerPage, page, t);
    } else if (
      location.pathname === `/dashboard/${dashboardRoutes.PAGE_SHARES}`
    ) {
      GetSharesStats(setNumericStats, setGraphData, t);
      GetShares(setShares, rowsPerPage, page, t);
    } else if (
      location.pathname === `/dashboard/${dashboardRoutes.PAGE_PAGES}`
    ) {
      GetPagesStats(setNumericStats, setGraphData, t);
      GetPages(setPages, rowsPerPage, page, t);
    } else if (
      location.pathname === `/dashboard/${dashboardRoutes.PAGE_REVIEWS}`
    ) {
      GetReviewsStats(setNumericStats, setGraphData, t);
      GetReviews(setReviews, rowsPerPage, page, t);
    } else if (
      location.pathname === `/dashboard/${dashboardRoutes.PAGE_LOCATIONS}`
    ) {
      GetSenderStats(setNumericStats, setGraphData, t);
      GetSenders(setSenders, rowsPerPage, page, t);
    }
  }, []);
  return (
    <Box className="crud-page">
      {isError === true && (
        <ErrorAlert isError={isError} errorMessage={errorMessage} />
      )}
      {isSuccess === true && (
        <SuccessAlert isSuccess={isSuccess} msg={successMessage} />
      )}
      {isLoading === true && <LoadingBar />}
      <div className="dashboard-header">
        <div className="dashboard-header-txt">
          <div className={EnArTxt("dashboard-header-path", lang)}>
            {isAdminsRoute && `${t("pages")} / ${t("admins")}`}
            {isStaffRoute && `${t("pages")} / ${t("staff")}`}
            {isClientsRoute && `${t("pages")} / ${t("clients")}`}
            {isAppointmentsRoute && `${t("pages")} / ${t("appointments")}`}
            {isFAQsRoute && `${t("pages")} / ${t("faqs")}`}
            {isReviewCodesRoute && `${t("pages")} / ${t("review-codes")}`}
            {isMessagesRoute && `${t("pages")} / ${t("messages")}`}
            {isSharesRoute && `${t("pages")} / ${t("shares")}`}
            {isPagesRoute && `${t("pages")} / ${t("pages")}`}
            {isReviewsRoute && `${t("pages")} / ${t("reviews")}`}
          </div>
          <div className={EnArTxt("dashboard-header-page-title", lang)}>
            {isAdminsRoute && `${t("admins")}`}
            {isStaffRoute && `${t("staff")}`}
            {isClientsRoute && `${t("clients")}`}
            {isAppointmentsRoute && `${t("appointments")}`}
            {isFAQsRoute && `${t("faaqs")}`}
            {isMessagesRoute && `${t("messages")}`}
            {isReviewCodesRoute && `${t("review-codes")}`}
            {isSharesRoute && `${t("shares")}`}
            {isPagesRoute && `${t("pages")}`}
            {isReviewsRoute && `${t("reviews")}`}
            {isLocationsRoute && `${t("locations")}`}
          </div>
        </div>
        <div className="lang-and-acc">
          <FormControl className="lang-view">
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
          <div className="dashboard-header-acc" onClick={headerHandleClick}>
            <img src={AccProfile} alt="profile" width="40px" />
            <ArrowDropDown fontSize="large" />
            <Menu
              id="basic-menu"
              anchorEl={headerAnchor}
              open={headerMenuopen}
              onClose={headerHandleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem
                onClick={() => {
                  Logout(t);
                }}
              >
                {t("logout")}
              </MenuItem>
            </Menu>
          </div>
        </div>
      </div>
      <div className="crud-stats-div-container">
        <div className="crud-stats-div">
          <div className="crud-stats-list-div">
            <div className="crud-stats-list-item">
              <img src={StatsImg} alt="" className="crud-stats-list-item-img" />
              <div className="crud-stats-list-item-txt">
                <div className="crud-stats-list-item-txt-head">
                  {t("all-time")}
                </div>
                <div className="crud-stats-list-item-txt-details">
                  {numericStats.all}
                </div>
              </div>
            </div>
            <div className="crud-stats-list-item">
              <img src={StatsImg} alt="" className="crud-stats-list-item-img" />
              <div className="crud-stats-list-item-txt">
                <div className="crud-stats-list-item-txt-head">
                  {t("this-month")}
                </div>
                <div className="crud-stats-list-item-txt-details">
                  {numericStats.month}
                </div>
              </div>
            </div>
            <div className="crud-stats-list-item">
              <img src={StatsImg} alt="" className="crud-stats-list-item-img" />
              <div className="crud-stats-list-item-txt">
                <div className="crud-stats-list-item-txt-head">
                  {t("today")}
                </div>
                <div className="crud-stats-list-item-txt-details">
                  {numericStats.day}
                </div>
              </div>
            </div>
          </div>
          <div className="crud-stats-graph">
            <ResponsiveContainer width="60%" height={220}>
              <LineChart
                data={graphData}
                margin={{ left: 20, right: 20, top: 20, bottom: 20 }}
              >
                <XAxis dataKey="name" />
                {isAdminsRoute && (
                  <Line
                    type="monotone"
                    dataKey="admins"
                    stroke="#8884d8"
                    strokeWidth={2}
                  />
                )}
                {isStaffRoute && (
                  <Line
                    type="monotone"
                    dataKey="staff"
                    stroke="#8884d8"
                    strokeWidth={2}
                  />
                )}
                {isClientsRoute && (
                  <Line
                    type="monotone"
                    dataKey="clients"
                    stroke="#8884d8"
                    strokeWidth={2}
                  />
                )}
                {isAppointmentsRoute && (
                  <Line
                    type="monotone"
                    dataKey="appointments"
                    stroke="#8884d8"
                    strokeWidth={2}
                  />
                )}
                {isFAQsRoute && (
                  <Line
                    type="monotone"
                    dataKey="faqs"
                    stroke="#8884d8"
                    strokeWidth={2}
                  />
                )}
                {isMessagesRoute && (
                  <Line
                    type="monotone"
                    dataKey="messages"
                    stroke="#8884d8"
                    strokeWidth={2}
                  />
                )}
                {isReviewCodesRoute && (
                  <Line
                    type="monotone"
                    dataKey="reviewCodes"
                    stroke="#8884d8"
                    strokeWidth={2}
                  />
                )}
                {isSharesRoute && (
                  <Line
                    type="monotone"
                    dataKey="shares"
                    stroke="#8884d8"
                    strokeWidth={2}
                  />
                )}
                {isPagesRoute && (
                  <Line
                    type="monotone"
                    dataKey="pages"
                    stroke="#8884d8"
                    strokeWidth={2}
                  />
                )}
                {isReviewsRoute && (
                  <Line
                    type="monotone"
                    dataKey="reviews"
                    stroke="#8884d8"
                    strokeWidth={2}
                  />
                )}
                {isLocationsRoute && (
                  <Line
                    type="monotone"
                    dataKey="senders"
                    stroke="#8884d8"
                    strokeWidth={2}
                  />
                )}
                <GraphTooltip />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      {isAdminsRoute && (
        <AdminCRUD
          searchTxt={searchTxt}
          entity={admins}
          entitySetter={setAdmins}
          searchSetter={setSearchTxt}
          numericSetter={setNumericStats}
          numericStats={numericStats}
          sizeSetter={setRowsPerPage}
          numSetter={setPage}
          size={rowsPerPage}
          num={page}
        />
      )}
      {isStaffRoute && (
        <StaffCRUD
          searchTxt={searchTxt}
          entity={staff}
          entitySetter={setStaff}
          searchSetter={setSearchTxt}
          numericSetter={setNumericStats}
          graphSetter={setGraphData}
          numericStats={numericStats}
          sizeSetter={setRowsPerPage}
          numSetter={setPage}
          size={rowsPerPage}
          num={page}
        />
      )}
      {isClientsRoute && (
        <ClientCRUD
          searchTxt={searchTxt}
          entity={clients}
          entitySetter={setClients}
          searchSetter={setSearchTxt}
          numericSetter={setNumericStats}
          graphSetter={setGraphData}
          numericStats={numericStats}
          sizeSetter={setRowsPerPage}
          numSetter={setPage}
          size={rowsPerPage}
          num={page}
        />
      )}
      {isAppointmentsRoute && (
        <AppointmentCRUD
          searchTxt={searchTxt}
          entity={appointments}
          entitySetter={setAppointments}
          searchSetter={setSearchTxt}
          numericSetter={setNumericStats}
          graphSetter={setGraphData}
          numericStats={numericStats}
          sizeSetter={setRowsPerPage}
          numSetter={setPage}
          size={rowsPerPage}
          num={page}
        />
      )}
      {isFAQsRoute && (
        <FAQsCRUD
          searchTxt={searchTxt}
          entity={faqs}
          entitySetter={setFAQs}
          searchSetter={setSearchTxt}
          numericSetter={setNumericStats}
          graphSetter={setGraphData}
          numericStats={numericStats}
          sizeSetter={setRowsPerPage}
          numSetter={setPage}
          size={rowsPerPage}
          num={page}
        />
      )}
      {isMessagesRoute && (
        <MessageCRUD
          searchTxt={searchTxt}
          entity={messages}
          entitySetter={setMessages}
          searchSetter={setSearchTxt}
          numericSetter={setNumericStats}
          graphSetter={setGraphData}
          numericStats={numericStats}
          sizeSetter={setRowsPerPage}
          numSetter={setPage}
          size={rowsPerPage}
          num={page}
        />
      )}
      {isReviewCodesRoute && (
        <ReviewCodeCRUD
          searchTxt={searchTxt}
          entity={reviewCodes}
          entitySetter={setReviewCodes}
          searchSetter={setSearchTxt}
          numericSetter={setNumericStats}
          graphSetter={setGraphData}
          numericStats={numericStats}
          sizeSetter={setRowsPerPage}
          numSetter={setPage}
          size={rowsPerPage}
          num={page}
        />
      )}
      {isSharesRoute && (
        <SharesCRUD
          searchTxt={searchTxt}
          entity={shares}
          entitySetter={setShares}
          searchSetter={setSearchTxt}
          numericSetter={setNumericStats}
          graphSetter={setGraphData}
          numericStats={numericStats}
          sizeSetter={setRowsPerPage}
          numSetter={setPage}
          size={rowsPerPage}
          num={page}
        />
      )}
      {isReviewsRoute && (
        <ReviewCRUD
          searchTxt={searchTxt}
          entity={reviews}
          entitySetter={setReviews}
          searchSetter={setSearchTxt}
          numericSetter={setNumericStats}
          graphSetter={setGraphData}
          numericStats={numericStats}
          sizeSetter={setRowsPerPage}
          numSetter={setPage}
          size={rowsPerPage}
          num={page}
        />
      )}
      {isLocationsRoute && (
        <SenderCRUD
          searchTxt={searchTxt}
          entity={senders}
          entitySetter={setSenders}
          searchSetter={setSearchTxt}
          numericSetter={setNumericStats}
          graphSetter={setGraphData}
          numericStats={numericStats}
          sizeSetter={setRowsPerPage}
          numSetter={setPage}
          size={rowsPerPage}
          num={page}
        />
      )}
      {isPagesRoute && (
        <PagesCRUD
          searchTxt={searchTxt}
          entity={pages}
          entitySetter={setPages}
          searchSetter={setSearchTxt}
          numericSetter={setNumericStats}
          graphSetter={setGraphData}
          numericStats={numericStats}
          sizeSetter={setRowsPerPage}
          numSetter={setPage}
          size={rowsPerPage}
          num={page}
        />
      )}
    </Box>
  );
};

export default CRUDPage;
