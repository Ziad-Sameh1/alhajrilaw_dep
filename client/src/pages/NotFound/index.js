import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logoEN from "../../assets/images/full-logo-en.png";
import logoAR from "../../assets/images/full-logo-ar.png";
import notFoundImg from "../../assets/svg/404.svg";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { resetStates } from "../../utils/FeedbackStates";
import { EnArTxt } from "../../utils/Language";
import "./not-found.scss";

const Logo = (props) => {
  return (
    <>
      {props.lang === "ar" && (
        <img
          src={logoAR}
          alt="local logo"
          className="navbar-img"
          onClick={() => {
            props.navigate("/");
          }}
        />
      )}
      {props.lang !== "ar" && (
        <img
          src={logoEN}
          alt="international logo"
          className="navbar-img"
          onClick={() => {
            props.navigate("/");
          }}
        />
      )}
    </>
  );
};

const NotFound = () => {
  const isError = useSelector((state) => state.isError);
  const isLoading = useSelector((state) => state.isLoading);
  const errorMessage = useSelector((state) => state.errorMessage);
  const navigate = useNavigate();
  const lang = useSelector((state) => state.language);
  const { t } = useTranslation();
  const viewToken = useSelector((state) => state.viewToken);
  useEffect(() => {
    resetStates();
  }, []);
  return (
    <div className="not-found-page">
      <Logo navigate={navigate} lang={lang} />
      <img src={notFoundImg} alt="local logo" />
      <div className={EnArTxt("not-found-desc", lang)}>
        {t("not-found-desc")}
      </div>
      <Button
        variant="contained"
        onClick={() => {
          navigate("/");
        }}
      >
        {t("back-home")}
      </Button>
    </div>
  );
};

export default NotFound;
