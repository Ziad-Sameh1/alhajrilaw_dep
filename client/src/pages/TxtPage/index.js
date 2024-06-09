import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import ErrorAlert from "../../components/ErrorAlert/ErrorAlert";
import LoadingBar from "../../components/LoadingBar.js/loadingBar";
import SuccessAlert from "../../components/SuccessAlert/SuccessAlert";
import { GetShareByLink } from "../CRUDEntities/SharesCRUD/SharesMethods";
import "./txt-page.scss";

const TxtPage = () => {
  const [data, setData] = useState("");
  const { t } = useTranslation();
  const location = useLocation();
  const link = location.pathname.substring(18);
  const isError = useSelector((state) => state.isError);
  const isSuccess = useSelector((state) => state.isSuccess);
  const isLoading = useSelector((state) => state.isLoading);
  const errorMessage = useSelector((state) => state.errorMessage);
  const successMessage = useSelector((state) => state.successMessage);
  const viewToken = useSelector((state) => state.viewToken);
  const navigate = useNavigate();
  useEffect(() => {
    GetShareByLink(setData, link, t);
    console.log(location);
    console.log(link);
  }, []);
  useEffect(() => {
    console.log("data");
    console.log(data);
  }, [data]);
  return (
    <Box>
      {isError === true && (
        <ErrorAlert isError={isError} errorMessage={errorMessage} />
      )}
      {isSuccess === true && (
        <SuccessAlert isSuccess={isSuccess} msg={successMessage} />
      )}
      {isLoading === true && <LoadingBar />}
      <div className="share-txt-page-container">
        <div className="share-txt-page">{data.txt}</div>
      </div>
    </Box>
  );
};

export default TxtPage;
