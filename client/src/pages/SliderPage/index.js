import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Box } from "@mui/system";
import ErrorAlert from "../../components/ErrorAlert/ErrorAlert";
import LoadingBar from "../../components/LoadingBar.js/loadingBar";
import "react-phone-input-2/lib/style.css";
import SuccessAlert from "../../components/SuccessAlert/SuccessAlert";
import { resetStates } from "../../utils/FeedbackStates";
import { getPage } from "../../services/WebPagesService";
import ReactPlayer from "react-player";
import "./slider-page.scss";

const PageContent = (props) => {
  return <div dangerouslySetInnerHTML={{ __html: props.content }} />;
};

const SliderPage = () => {
  const isError = useSelector((state) => state.isError);
  const isSuccess = useSelector((state) => state.isSuccess);
  const isLoading = useSelector((state) => state.isLoading);
  const errorMessage = useSelector((state) => state.errorMessage);
  const successMessage = useSelector((state) => state.successMessage);
  const [page, setPage] = useState({});
  const params = useParams();
  useEffect(() => {
    resetStates();
    const fetchPage = async () => {
      const res = await getPage(`${params.pageLink}`);
      console.log(res);
      setPage(res);
    };
    fetchPage();
  }, []);
  useEffect(() => {
    console.log(page);
  }, [page]);
  return (
    <Box>
      {isError === true && (
        <ErrorAlert isError={isError} errorMessage={errorMessage} />
      )}
      {isSuccess === true && (
        <SuccessAlert isSuccess={isSuccess} msg={successMessage} />
      )}
      {isLoading === true && <LoadingBar />}
      {page && (
        <div className="created-page-div">
          <div className="created-page-header">
            <div className="created-page-header-title">{page.title}</div>
            {/* <div className="created-page-header-date">{page.createdAt}</div> */}
          </div>
          {page.thumbnail !== "" && page.thumbnail !== undefined && (
            <div className="created-page-thumbnail-container">
              <img
                src={`${process.env.REACT_APP_SERVER}/${page.thumbnail}`}
                className="created-page-thumbnail"
                alt={page.title}
              />
            </div>
          )}
          <div className="created-page-content-container">
            <div className="created-page-content">
              <PageContent content={page.content} />
              {page.video !== "" && page.video !== undefined && (
                <div className="created-page-video">
                  <ReactPlayer
                    controls
                    url={`${process.env.REACT_APP_SERVER}/${page.video}`}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </Box>
  );
};

export default SliderPage;
