import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "./main-dashboard.scss";
import AccProfile from "../../assets/images/acc-profile.png";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import {
  FormControl,
  IconButton,
  Menu,
  MenuItem,
  Select,
  useMediaQuery,
} from "@mui/material";
import { useSelector } from "react-redux";
import AdminsIcon from "../../assets/images/admins-stats.png";
import StaffIcon from "../../assets/images/staff-stats.png";
import ClientsIcon from "../../assets/images/clients-stats.png";
import AppointmentsIcon from "../../assets/images/appointments-stats.png";
import FAQsIcon from "../../assets/images/faqs-stats.png";
import MessagesIcon from "../../assets/images/messages-stats.png";
import PagesIcon from "../../assets/images/pages-stats.png";
import ReviewCodesIcon from "../../assets/images/review-codes-stats.png";
import ReviewsIcon from "../../assets/images/reviews-stats.png";
import SharesIcon from "../../assets/images/shares-stats.png";
import { EnArTxt, setCurrentLanguage } from "../../utils/Language";
import { Close, MenuOpen } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Box } from "@mui/system";
import ErrorAlert from "../../components/ErrorAlert/ErrorAlert";
import LoadingBar from "../../components/LoadingBar.js/loadingBar";
import SuccessAlert from "../../components/SuccessAlert/SuccessAlert";
import {
  checkLoginStatus,
  getAdminStats,
  logout,
} from "../../services/AdminService";
import { getStaffStats } from "../../services/StaffService";
import { getClientsStats } from "../../services/ClientsService";
import { getAppointmentsStats } from "../../services/AppointmentService";
import { getFAQsStats } from "../../services/FAQService";
import { getMessagesStats } from "../../services/MessageService";
import { getReviewCodesStats } from "../../services/ReviewCodeService";
import { getSharesStats } from "../../services/SharesService";
import { getPagesStats } from "../../services/WebPagesService";
import { getReviewsStats } from "../../services/ReviewService";
import { configureStates } from "../../utils/FeedbackStates";

const DashboardMain = () => {
  const navigate = useNavigate();
  const isError = useSelector((state) => state.isError);
  const isSuccess = useSelector((state) => state.isSuccess);
  const isLoading = useSelector((state) => state.isLoading);
  const errorMessage = useSelector((state) => state.errorMessage);
  const successMessage = useSelector((state) => state.successMessage);
  const isMobileScreen = useMediaQuery("(max-width: 768px)");
  const lang = useSelector((state) => state.language);
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const fillArr = Array(10).fill(0);
  const [numericStats, setNumericStats] = useState(fillArr);
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
  const setGraphs = async (res) => {
    const d = [
      {
        name: t("january"),
        admins: res[0].monthly[0],
        staff: res[1].monthly[0],
        clients: res[2].monthly[0],
        appointments: res[3].monthly[0],
        faqs: res[4].monthly[0],
        messages: res[5].monthly[0],
        reviewCodes: res[6].monthly[0],
        reviews: res[9].monthly[0],
        shares: res[7].monthly[0],
        pages: res[8].monthly[0],
      },
      {
        name: t("february"),
        admins: res[0].monthly[1],
        staff: res[1].monthly[1],
        clients: res[2].monthly[1],
        appointments: res[3].monthly[1],
        faqs: res[4].monthly[1],
        messages: res[5].monthly[1],
        reviewCodes: res[6].monthly[1],
        reviews: res[9].monthly[1],
        shares: res[7].monthly[1],
        pages: res[8].monthly[1],
      },
      {
        name: t("march"),
        admins: res[0].monthly[2],
        staff: res[1].monthly[2],
        clients: res[2].monthly[2],
        appointments: res[3].monthly[2],
        faqs: res[4].monthly[2],
        messages: res[5].monthly[2],
        reviewCodes: res[6].monthly[2],
        reviews: res[9].monthly[2],
        shares: res[7].monthly[2],
        pages: res[8].monthly[2],
      },
      {
        name: t("april"),
        admins: res[0].monthly[3],
        staff: res[1].monthly[3],
        clients: res[2].monthly[3],
        appointments: res[3].monthly[3],
        faqs: res[4].monthly[3],
        messages: res[5].monthly[3],
        reviewCodes: res[6].monthly[3],
        reviews: res[9].monthly[3],
        shares: res[7].monthly[3],
        pages: res[8].monthly[3],
      },
      {
        name: t("may"),
        admins: res[0].monthly[4],
        staff: res[1].monthly[4],
        clients: res[2].monthly[4],
        appointments: res[3].monthly[4],
        faqs: res[4].monthly[4],
        messages: res[5].monthly[4],
        reviewCodes: res[6].monthly[4],
        reviews: res[9].monthly[4],
        shares: res[7].monthly[4],
        pages: res[8].monthly[4],
      },
      {
        name: t("june"),
        admins: res[0].monthly[5],
        staff: res[1].monthly[5],
        clients: res[2].monthly[5],
        appointments: res[3].monthly[5],
        faqs: res[4].monthly[5],
        messages: res[5].monthly[5],
        reviewCodes: res[6].monthly[5],
        reviews: res[9].monthly[5],
        shares: res[7].monthly[5],
        pages: res[8].monthly[5],
      },
      {
        name: t("july"),
        admins: res[0].monthly[6],
        staff: res[1].monthly[6],
        clients: res[2].monthly[6],
        appointments: res[3].monthly[6],
        faqs: res[4].monthly[6],
        messages: res[5].monthly[6],
        reviewCodes: res[6].monthly[6],
        reviews: res[9].monthly[6],
        shares: res[7].monthly[6],
        pages: res[8].monthly[6],
      },
      {
        name: t("august"),
        admins: res[0].monthly[7],
        staff: res[1].monthly[7],
        clients: res[2].monthly[7],
        appointments: res[3].monthly[7],
        faqs: res[4].monthly[7],
        messages: res[5].monthly[7],
        reviewCodes: res[6].monthly[7],
        reviews: res[9].monthly[7],
        shares: res[7].monthly[7],
        pages: res[8].monthly[7],
      },
      {
        name: t("september"),
        admins: res[0].monthly[8],
        staff: res[1].monthly[8],
        clients: res[2].monthly[8],
        appointments: res[3].monthly[8],
        faqs: res[4].monthly[8],
        messages: res[5].monthly[8],
        reviewCodes: res[6].monthly[8],
        reviews: res[9].monthly[8],
        shares: res[7].monthly[8],
        pages: res[8].monthly[8],
      },
      {
        name: t("october"),
        admins: res[0].monthly[9],
        staff: res[1].monthly[9],
        clients: res[2].monthly[9],
        appointments: res[3].monthly[9],
        faqs: res[4].monthly[9],
        messages: res[5].monthly[9],
        reviewCodes: res[6].monthly[9],
        reviews: res[9].monthly[9],
        shares: res[7].monthly[9],
        pages: res[8].monthly[9],
      },
      {
        name: t("november"),
        admins: res[0].monthly[10],
        staff: res[1].monthly[10],
        clients: res[2].monthly[10],
        appointments: res[3].monthly[10],
        faqs: res[4].monthly[10],
        messages: res[5].monthly[10],
        reviewCodes: res[6].monthly[10],
        reviews: res[9].monthly[10],
        shares: res[7].monthly[10],
        pages: res[8].monthly[10],
      },
      {
        name: t("december"),
        admins: res[0].monthly[11],
        staff: res[1].monthly[11],
        clients: res[2].monthly[11],
        appointments: res[3].monthly[11],
        faqs: res[4].monthly[11],
        messages: res[5].monthly[11],
        reviewCodes: res[6].monthly[11],
        reviews: res[9].monthly[11],
        shares: res[7].monthly[11],
        pages: res[8].monthly[11],
      },
    ];
    setGraphData(d);
  };
  const getNumericStats = async () => {
    configureStates(true, false, "");
    const newStats = [];
    let res = await getAdminStats(t, false);
    newStats.push(res);
    res = await getStaffStats(t, false);
    newStats.push(res);
    res = await getClientsStats(t, false);
    newStats.push(res);
    res = await getAppointmentsStats(t, false);
    newStats.push(res);
    res = await getFAQsStats(t, false);
    newStats.push(res);
    res = await getMessagesStats(t, false);
    newStats.push(res);
    res = await getReviewCodesStats(t, false);
    newStats.push(res);
    res = await getSharesStats(t, false);
    newStats.push(res);
    res = await getPagesStats(t, false);
    newStats.push(res);
    res = await getReviewsStats(t, false);
    newStats.push(res);
    console.log(newStats);
    setNumericStats(newStats);
    setGraphs(newStats);
    configureStates(false, false, "");
  };
  const handleChange = (event) => {
    console.log(`change language into ${event.target.value}`);
    setCurrentLanguage(event.target.value);
  };
  const handleClick = (event) => {
    if (anchorEl == null) {
      setAnchorEl(event.currentTarget);
    } else {
      setAnchorEl(null);
    }
  };
  const checkAuth = async () => {
    try {
      const res = await checkLoginStatus();
      if (res.msg !== "Success") {
        navigate("/dashboard/login");
        configureStates(false, true, t("login-again"));
      }
    } catch (err) {
      console.log(err);
      configureStates(false, true, err);
      navigate("/dashboard/login");
    }
  };
  useEffect(() => {
    checkAuth();
    getNumericStats();
  }, []);
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box>
      {isError === true && (
        <ErrorAlert isError={isError} errorMessage={errorMessage} />
      )}
      {isSuccess === true && (
        <SuccessAlert isSuccess={isSuccess} msg={successMessage} />
      )}
      {isLoading === true && <LoadingBar />}
      <div className="main-dashboard-page">
        <div className="dashboard-header">
          <div className="dashboard-header-txt">
            <div className={EnArTxt("dashboard-header-path", lang)}>
              {t("pages")} / {t("main-dashboard")}
            </div>
            <div className={EnArTxt("dashboard-header-page-title", lang)}>
              {t("main-dashboard")}
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
            <div className="dashboard-header-acc" onClick={handleClick}>
              <img src={AccProfile} alt="profile" width="40px" />
              <ArrowDropDownIcon fontSize="large" />
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem
                  onClick={() => {
                    logout(t);
                  }}
                >
                  {t("logout")}
                </MenuItem>
              </Menu>
            </div>
          </div>
        </div>
        <div className="main-dashboard-stats">
          <div
            className="main-dashboard-stats-item"
            onClick={() => navigate("../admins")}
          >
            <img src={AdminsIcon} alt="admins-stats" />
            <div className={EnArTxt("main-dashboard-stats-item-txt", lang)}>
              <div className="main-dashboard-stats-item-txt-title">
                {t("admins")}
              </div>
              <div className="main-dashboard-stats-item-txt-details">
                {numericStats[0].all}
              </div>
            </div>
          </div>
          <div
            className="main-dashboard-stats-item"
            onClick={() => navigate("../staff")}
          >
            <img src={StaffIcon} alt="admins-stats" />
            <div className={EnArTxt("main-dashboard-stats-item-txt", lang)}>
              <div className="main-dashboard-stats-item-txt-title">
                {t("staff")}
              </div>
              <div className="main-dashboard-stats-item-txt-details">
                {numericStats[1].all}
              </div>
            </div>
          </div>
          <div
            className="main-dashboard-stats-item"
            onClick={() => navigate("../clients")}
          >
            <img src={ClientsIcon} alt="admins-stats" />
            <div className={EnArTxt("main-dashboard-stats-item-txt", lang)}>
              <div className="main-dashboard-stats-item-txt-title">
                {t("clients")}
              </div>
              <div className="main-dashboard-stats-item-txt-details">
                {numericStats[2].all}
              </div>
            </div>
          </div>
          <div
            className="main-dashboard-stats-item"
            onClick={() => navigate("../appointments")}
          >
            <img src={AppointmentsIcon} alt="admins-stats" />
            <div className={EnArTxt("main-dashboard-stats-item-txt", lang)}>
              <div className="main-dashboard-stats-item-txt-title">
                {t("appointments")}
              </div>
              <div className="main-dashboard-stats-item-txt-details">
                {numericStats[3].all}
              </div>
            </div>
          </div>
          <div
            className="main-dashboard-stats-item"
            onClick={() => navigate("../faqs")}
          >
            <img src={FAQsIcon} alt="admins-stats" />
            <div className={EnArTxt("main-dashboard-stats-item-txt", lang)}>
              <div className="main-dashboard-stats-item-txt-title">
                {t("faqs")}
              </div>
              <div className="main-dashboard-stats-item-txt-details">
                {numericStats[4].all}
              </div>
            </div>
          </div>
          <div
            className="main-dashboard-stats-item"
            onClick={() => navigate("../messages")}
          >
            <img src={MessagesIcon} alt="admins-stats" />
            <div className={EnArTxt("main-dashboard-stats-item-txt", lang)}>
              <div className="main-dashboard-stats-item-txt-title">
                {t("messages")}
              </div>
              <div className="main-dashboard-stats-item-txt-details">
                {numericStats[5].all}
              </div>
            </div>
          </div>
          <div
            className="main-dashboard-stats-item"
            onClick={() => navigate("../pages")}
          >
            <img src={PagesIcon} alt="admins-stats" />
            <div className={EnArTxt("main-dashboard-stats-item-txt", lang)}>
              <div className="main-dashboard-stats-item-txt-title">
                {t("activities")}
              </div>
              <div className="main-dashboard-stats-item-txt-details">
                {numericStats[8].all}
              </div>
            </div>
          </div>
          <div
            className="main-dashboard-stats-item"
            onClick={() => navigate("../review-codes")}
          >
            <img src={ReviewCodesIcon} alt="admins-stats" />
            <div className={EnArTxt("main-dashboard-stats-item-txt", lang)}>
              <div className="main-dashboard-stats-item-txt-title">
                {t("review-codes")}
              </div>
              <div className="main-dashboard-stats-item-txt-details">
                {numericStats[6].all}
              </div>
            </div>
          </div>
          <div
            className="main-dashboard-stats-item"
            onClick={() => navigate("../reviews")}
          >
            <img src={ReviewsIcon} alt="admins-stats" />
            <div className={EnArTxt("main-dashboard-stats-item-txt", lang)}>
              <div className="main-dashboard-stats-item-txt-title">
                {t("reviews")}
              </div>
              <div className="main-dashboard-stats-item-txt-details">
                {numericStats[9].all}
              </div>
            </div>
          </div>
          <div
            className="main-dashboard-stats-item"
            onClick={() => navigate("../shares")}
          >
            <img src={SharesIcon} alt="admins-stats" />
            <div className={EnArTxt("main-dashboard-stats-item-txt", lang)}>
              <div className="main-dashboard-stats-item-txt-title">
                {t("shares")}
              </div>
              <div className="main-dashboard-stats-item-txt-details">
                {numericStats[7].all}
              </div>
            </div>
          </div>
        </div>
        <div className="main-dashboard-graphs">
          <div className="main-dashboard-graph-item">
            <div className={EnArTxt("main-dashboard-graph-item-header", lang)}>
              {t("admins")}
            </div>
            <div className="main-dashboard-graph-item-shape">
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={graphData}>
                  <defs>
                    <linearGradient id="admins" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" hide={true} />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="admins"
                    stroke="#8884d8"
                    fillOpacity={1}
                    fill="url(#admins)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="main-dashboard-graph-item">
            <div className={EnArTxt("main-dashboard-graph-item-header", lang)}>
              {t("staff")}
            </div>
            <div className="main-dashboard-graph-item-shape">
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={graphData}>
                  <defs>
                    <linearGradient id="staff" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#d884d4" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#d884d4" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" hide={true} />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="staff"
                    stroke="#d884d4"
                    fillOpacity={1}
                    fill="url(#staff)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="main-dashboard-graph-item">
            <div className={EnArTxt("main-dashboard-graph-item-header", lang)}>
              {t("clients")}
            </div>
            <div className="main-dashboard-graph-item-shape">
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={graphData}>
                  <defs>
                    <linearGradient id="clients" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#d8b584" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#d8b584" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" hide={true} />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="clients"
                    stroke="#d8b584"
                    fillOpacity={1}
                    fill="url(#clients)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="main-dashboard-graph-item">
            <div className={EnArTxt("main-dashboard-graph-item-header", lang)}>
              {t("appointments")}
            </div>
            <div className="main-dashboard-graph-item-shape">
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={graphData}>
                  <defs>
                    <linearGradient
                      id="appointments"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#95d884" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#95d884" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" hide={true} />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="appointments"
                    stroke="#95d884"
                    fillOpacity={1}
                    fill="url(#appointments)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="main-dashboard-graph-item">
            <div className={EnArTxt("main-dashboard-graph-item-header", lang)}>
              {t("faqs")}
            </div>
            <div className="main-dashboard-graph-item-shape">
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={graphData}>
                  <defs>
                    <linearGradient id="faqs" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#84d8c7" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#84d8c7" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" hide={true} />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="faqs"
                    stroke="#84d8c7"
                    fillOpacity={1}
                    fill="url(#faqs)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="main-dashboard-graph-item">
            <div className={EnArTxt("main-dashboard-graph-item-header", lang)}>
              {t("messages")}
            </div>
            <div className="main-dashboard-graph-item-shape">
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={graphData}>
                  <defs>
                    <linearGradient id="msgs" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#84a8d8" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#84a8d8" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" hide={true} />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="messages"
                    stroke="#84a8d8"
                    fillOpacity={1}
                    fill="url(#msgs)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="main-dashboard-graph-item">
            <div className={EnArTxt("main-dashboard-graph-item-header", lang)}>
              {t("activities")}
            </div>
            <div className="main-dashboard-graph-item-shape">
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={graphData}>
                  <defs>
                    <linearGradient id="pages" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#d8848b" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#d8848b" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" hide={true} />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="pages"
                    stroke="#d8848b"
                    fillOpacity={1}
                    fill="url(#pages)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="main-dashboard-graph-item">
            <div className={EnArTxt("main-dashboard-graph-item-header", lang)}>
              {t("review-codes")}
            </div>
            <div className="main-dashboard-graph-item-shape">
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={graphData}>
                  <defs>
                    <linearGradient id="codes" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#848ad8" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#848ad8" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" hide={true} />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="reviewCodes"
                    stroke="#848ad8"
                    fillOpacity={1}
                    fill="url(#codes)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="main-dashboard-graph-item">
            <div className={EnArTxt("main-dashboard-graph-item-header", lang)}>
              {t("reviews")}
            </div>
            <div className="main-dashboard-graph-item-shape">
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={graphData}>
                  <defs>
                    <linearGradient id="reviews" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#a6a838" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#a6a838" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" hide={true} />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="reviews"
                    stroke="#a6a838"
                    fillOpacity={1}
                    fill="url(#reviews)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="main-dashboard-graph-item">
            <div className={EnArTxt("main-dashboard-graph-item-header", lang)}>
              {t("shares")}
            </div>
            <div className="main-dashboard-graph-item-shape">
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={graphData}>
                  <defs>
                    <linearGradient id="shares" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ad74a2" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#7774ad" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" hide={true} />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="shares"
                    stroke="#7774ad"
                    fillOpacity={1}
                    fill="url(#reviews)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </Box>
  );
};

export default DashboardMain;
