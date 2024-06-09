import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { checkLoginStatus } from "../../services/AdminService";
import { Box } from "@mui/system";
import ErrorAlert from "../../components/ErrorAlert/ErrorAlert";
import SuccessAlert from "../../components/SuccessAlert/SuccessAlert";
import LoadingBar from "../../components/LoadingBar.js/loadingBar";
import { Button, Menu, MenuItem, TextField } from "@mui/material";
import { EnArTxt } from "../../utils/Language";
import { ArrowDropDown, CloudUpload } from "@mui/icons-material";
import AccProfile from "../../assets/images/acc-profile.png";
import { GetAdminEmail, Logout } from "../CRUDEntities/AdminCRUD/AdminMethods";
import "./settings-page.scss";
import { useTranslation } from "react-i18next";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {
  getStats,
  getWebsiteStats,
  updateWebsiteStats,
} from "../../services/WebsiteInfoService";
import { configureStates } from "../../utils/FeedbackStates";
import ChangePasswordDialog from "./ChangePasswordDialog";

const SettingsPage = () => {
  const viewToken = useSelector((state) => state.viewToken);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const isError = useSelector((state) => state.isError);
  const isSuccess = useSelector((state) => state.isSuccess);
  const isLoading = useSelector((state) => state.isLoading);
  const errorMessage = useSelector((state) => state.errorMessage);
  const successMessage = useSelector((state) => state.successMessage);
  const lang = useSelector((state) => state.language);
  const [headerAnchor, setHeaderAnchor] = useState(null);
  const headerMenuopen = Boolean(headerAnchor);
  const [clientsNum, setClientsNum] = useState("1000+");
  const [casesNum, setCasesNum] = useState("1000+");
  const [studentsNum, setStudentsNum] = useState("30+");
  const [email, setEmail] = useState("");
  const [isDialogOpen, setIsOpen] = useState(false);

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
    const fetchStats = async () => {
      const res = await getWebsiteStats(t);
      setCasesNum(res.casesNum);
      setClientsNum(res.clientsNum);
      setStudentsNum(res.studentsNum);
      console.log(res);
    };
    fetchStats();
    GetAdminEmail(setEmail, t);
    checkAuth();
  }, []);
  const updateClients = async (value) => {
    await updateWebsiteStats(
      { casesNum: casesNum, clientsNum: value, studentsNum: studentsNum },
      t
    );
  };
  const updateCases = async (value) => {
    await updateWebsiteStats(
      { casesNum: value, clientsNum: clientsNum, studentsNum: studentsNum },
      t
    );
  };
  const updateStudents = async (value) => {
    await updateWebsiteStats(
      { casesNum: casesNum, clientsNum: clientsNum, studentsNum: value },
      t
    );
  };
  return (
    <Box className="settings-page">
      {isError === true && (
        <ErrorAlert isError={isError} errorMessage={errorMessage} />
      )}
      {isSuccess === true && (
        <SuccessAlert isSuccess={isSuccess} msg={successMessage} />
      )}
      {isLoading === true && <LoadingBar />}
      <ChangePasswordDialog open={isDialogOpen} setOpen={setIsOpen} />
      <div className="dashboard-header">
        <div className="dashboard-header-txt">
          <div className={EnArTxt("dashboard-header-path", lang)}>
            {`${t("pages")} / ${t("settings")}`}
          </div>
          <div className={EnArTxt("dashboard-header-page-title", lang)}>
            {`${t("settings")}`}
          </div>
        </div>

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
      <div className="settings-page-content">
        <div className="settings-item-header">{t("statistics")}</div>
        <div className="settings-statistics">
          <div className="settings-statistics-item">
            <div className="width-200">{t("number-of-clients")}</div>
            <TextField
              variant="filled"
              InputProps={{ disableUnderline: true }}
              select
              name="clientsNum"
              value={clientsNum}
              onChange={(event) => {
                const newVal = event.target.value;
                setClientsNum(newVal);
                updateClients(newVal);
              }}
              defaultValue={clientsNum}
              style={{ width: "220px" }}
            >
              <MenuItem value={"1000+"}>{"1000+"}</MenuItem>
              <MenuItem value={"1500+"}>{"1500+"}</MenuItem>
              <MenuItem value={"2000+"}>{"2000+"}</MenuItem>
              <MenuItem value={"2500+"}>{"2500+"}</MenuItem>
              <MenuItem value={"3000+"}>{"3000+"}</MenuItem>
              <MenuItem value={"3500+"}>{"3500+"}</MenuItem>
              <MenuItem value={"4000+"}>{"4000+"}</MenuItem>
              <MenuItem value={"4500+"}>{"4500+"}</MenuItem>
              <MenuItem value={"5000+"}>{"5000+"}</MenuItem>
              <MenuItem value={"5500+"}>{"5500+"}</MenuItem>
              <MenuItem value={"6000+"}>{"6000+"}</MenuItem>
              <MenuItem value={"6500+"}>{"6500+"}</MenuItem>
              <MenuItem value={"7000+"}>{"7000+"}</MenuItem>
              <MenuItem value={"7500+"}>{"7500+"}</MenuItem>
              <MenuItem value={"8000+"}>{"8000+"}</MenuItem>
              <MenuItem value={"8500+"}>{"8500+"}</MenuItem>
              <MenuItem value={"9000+"}>{"9000+"}</MenuItem>
              <MenuItem value={"9500+"}>{"9500+"}</MenuItem>
              <MenuItem value={"10000+"}>{"10000+"}</MenuItem>
              <MenuItem value={"10500+"}>{"10500+"}</MenuItem>
              <MenuItem value={"11000+"}>{"11000+"}</MenuItem>
              <MenuItem value={"11500+"}>{"11500+"}</MenuItem>
              <MenuItem value={"12000+"}>{"12000+"}</MenuItem>
              <MenuItem value={"12500+"}>{"12500+"}</MenuItem>
              <MenuItem value={"13000+"}>{"13000+"}</MenuItem>
              <MenuItem value={"13500+"}>{"13500+"}</MenuItem>
              <MenuItem value={"14000+"}>{"14000+"}</MenuItem>
              <MenuItem value={"14500+"}>{"14500+"}</MenuItem>
              <MenuItem value={"15000+"}>{"15000+"}</MenuItem>
            </TextField>
          </div>
          <div className="settings-statistics-item">
            <div className="width-200">{t("number-of-cases")}</div>
            <TextField
              variant="filled"
              InputProps={{ disableUnderline: true }}
              select
              name="casesNum"
              value={casesNum}
              defaultValue={casesNum}
              onChange={(event) => {
                const newVal = event.target.value;
                setCasesNum(newVal);
                updateCases(newVal);
              }}
              style={{ width: "220px" }}
            >
              <MenuItem value={"1000+"}>{"1000+"}</MenuItem>
              <MenuItem value={"1500+"}>{"1500+"}</MenuItem>
              <MenuItem value={"2000+"}>{"2000+"}</MenuItem>
              <MenuItem value={"2500+"}>{"2500+"}</MenuItem>
              <MenuItem value={"3000+"}>{"3000+"}</MenuItem>
              <MenuItem value={"3500+"}>{"3500+"}</MenuItem>
              <MenuItem value={"4000+"}>{"4000+"}</MenuItem>
              <MenuItem value={"4500+"}>{"4500+"}</MenuItem>
              <MenuItem value={"5000+"}>{"5000+"}</MenuItem>
              <MenuItem value={"5500+"}>{"5500+"}</MenuItem>
              <MenuItem value={"6000+"}>{"6000+"}</MenuItem>
              <MenuItem value={"6500+"}>{"6500+"}</MenuItem>
              <MenuItem value={"7000+"}>{"7000+"}</MenuItem>
              <MenuItem value={"7500+"}>{"7500+"}</MenuItem>
              <MenuItem value={"8000+"}>{"8000+"}</MenuItem>
              <MenuItem value={"8500+"}>{"8500+"}</MenuItem>
              <MenuItem value={"9000+"}>{"9000+"}</MenuItem>
              <MenuItem value={"9500+"}>{"9500+"}</MenuItem>
              <MenuItem value={"10000+"}>{"10000+"}</MenuItem>
              <MenuItem value={"10500+"}>{"10500+"}</MenuItem>
              <MenuItem value={"11000+"}>{"11000+"}</MenuItem>
              <MenuItem value={"11500+"}>{"11500+"}</MenuItem>
              <MenuItem value={"12000+"}>{"12000+"}</MenuItem>
              <MenuItem value={"12500+"}>{"12500+"}</MenuItem>
              <MenuItem value={"13000+"}>{"13000+"}</MenuItem>
              <MenuItem value={"13500+"}>{"13500+"}</MenuItem>
              <MenuItem value={"14000+"}>{"14000+"}</MenuItem>
              <MenuItem value={"14500+"}>{"14500+"}</MenuItem>
              <MenuItem value={"15000+"}>{"15000+"}</MenuItem>
            </TextField>
          </div>
          <div className="settings-statistics-item">
            <div className="width-200">{t("number-of-students")}</div>
            <TextField
              variant="filled"
              InputProps={{ disableUnderline: true }}
              select
              name="studentsNum"
              value={studentsNum}
              defaultValue={studentsNum}
              onChange={(event) => {
                const newVal = event.target.value;
                setStudentsNum(newVal);
                updateStudents(newVal);
              }}
              style={{ width: "220px" }}
            >
              <MenuItem value={"10+"}>{"10+"}</MenuItem>
              <MenuItem value={"20+"}>{"20+"}</MenuItem>
              <MenuItem value={"30+"}>{"30+"}</MenuItem>
              <MenuItem value={"40+"}>{"40+"}</MenuItem>
              <MenuItem value={"50+"}>{"50+"}</MenuItem>
              <MenuItem value={"60+"}>{"60+"}</MenuItem>
              <MenuItem value={"70+"}>{"70+"}</MenuItem>
              <MenuItem value={"80+"}>{"80+"}</MenuItem>
              <MenuItem value={"90+"}>{"90+"}</MenuItem>
              <MenuItem value={"100+"}>{"100+"}</MenuItem>
              <MenuItem value={"150+"}>{"150+"}</MenuItem>
              <MenuItem value={"200+"}>{"200+"}</MenuItem>
              <MenuItem value={"250+"}>{"250+"}</MenuItem>
              <MenuItem value={"300+"}>{"300+"}</MenuItem>
              <MenuItem value={"350+"}>{"350+"}</MenuItem>
              <MenuItem value={"400+"}>{"400+"}</MenuItem>
              <MenuItem value={"450+"}>{"450+"}</MenuItem>
              <MenuItem value={"500+"}>{"500+"}</MenuItem>
              <MenuItem value={"550+"}>{"550+"}</MenuItem>
              <MenuItem value={"600+"}>{"600+"}</MenuItem>
              <MenuItem value={"650+"}>{"650+"}</MenuItem>
              <MenuItem value={"700+"}>{"700+"}</MenuItem>
              <MenuItem value={"750+"}>{"750+"}</MenuItem>
              <MenuItem value={"800+"}>{"800+"}</MenuItem>
              <MenuItem value={"850+"}>{"850+"}</MenuItem>
              <MenuItem value={"900+"}>{"900+"}</MenuItem>
              <MenuItem value={"950+"}>{"950+"}</MenuItem>
              <MenuItem value={"1000+"}>{"1000+"}</MenuItem>
              <MenuItem value={"1500+"}>{"1500+"}</MenuItem>
              <MenuItem value={"2000+"}>{"2000+"}</MenuItem>
              <MenuItem value={"2500+"}>{"2500+"}</MenuItem>
              <MenuItem value={"3000+"}>{"3000+"}</MenuItem>
              <MenuItem value={"3500+"}>{"3500+"}</MenuItem>
              <MenuItem value={"4000+"}>{"4000+"}</MenuItem>
              <MenuItem value={"4500+"}>{"4500+"}</MenuItem>
              <MenuItem value={"5000+"}>{"5000+"}</MenuItem>
              <MenuItem value={"5500+"}>{"5500+"}</MenuItem>
              <MenuItem value={"6000+"}>{"6000+"}</MenuItem>
              <MenuItem value={"6500+"}>{"6500+"}</MenuItem>
              <MenuItem value={"7000+"}>{"7000+"}</MenuItem>
              <MenuItem value={"7500+"}>{"7500+"}</MenuItem>
              <MenuItem value={"8000+"}>{"8000+"}</MenuItem>
              <MenuItem value={"8500+"}>{"8500+"}</MenuItem>
              <MenuItem value={"9000+"}>{"9000+"}</MenuItem>
              <MenuItem value={"9500+"}>{"9500+"}</MenuItem>
              <MenuItem value={"10000+"}>{"10000+"}</MenuItem>
            </TextField>
          </div>
          <div className="settings-item-header">{t("account-details")}</div>
          <div className="settings-statistics-item">
            <div className="width-200">{t("email-address")}</div>
            <TextField
              variant="filled"
              InputProps={{ disableUnderline: true }}
              name="admin-email"
              value={email}
              disabled
              style={{ width: "250px" }}
            />
          </div>
          <div className="settings-statistics-item">
            <div className="width-200">{t("password")}</div>
            <Button
              variant="contained"
              onClick={() => {
                setIsOpen(true);
              }}
              sx={{
                textTransform: "none",
                width: "250px",
                marginInlineStart: "15px",
              }}
            >
              {t("change-password")}
            </Button>
          </div>
        </div>
      </div>
    </Box>
  );
};

export default SettingsPage;
