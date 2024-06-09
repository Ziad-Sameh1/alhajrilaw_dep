import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Box } from "@mui/system";
import ErrorAlert from "../../components/ErrorAlert/ErrorAlert";
import LoadingBar from "../../components/LoadingBar.js/loadingBar";
import "react-phone-input-2/lib/style.css";
import SuccessAlert from "../../components/SuccessAlert/SuccessAlert";
import { resetStates } from "../../utils/FeedbackStates";
import { useTranslation } from "react-i18next";
import { NodeJSDateToJS } from "../../utils/HelperFunctions";
import {
  getLastPages,
  getPagesByCategory,
} from "../../services/WebPagesService";
import "./latest-news.scss";
import { Button, Card, MenuItem, TextField } from "@mui/material";
import { EnArTxt } from "../../utils/Language";
import { Refresh } from "@mui/icons-material";
import { getCategories } from "../../services/CategoryService";

const monthInLetters = new Map();

const NewsItem = (props) => {
  const date = NodeJSDateToJS(props.values.createdAt);
  const lang = useSelector((state) => state.language);
  const { t } = useTranslation();
  monthInLetters.set("01", t("janurary"));
  monthInLetters.set("02", t("february"));
  monthInLetters.set("03", t("march"));
  monthInLetters.set("04", t("april"));
  monthInLetters.set("05", t("may"));
  monthInLetters.set("06", t("june"));
  monthInLetters.set("07", t("july"));
  monthInLetters.set("08", t("august"));
  monthInLetters.set("09", t("september"));
  monthInLetters.set("10", t("october"));
  monthInLetters.set("11", t("november"));
  monthInLetters.set("12", t("december"));
  const plainString = props.values.content.replace(/<[^>]+>/g, "");
  return (
    <div className="news-item-container">
      <Card
        className="news-item"
        onClick={() => {
          window.location.replace(props.values.link);
        }}
      >
        <div
          className="news-item-img"
          style={{
            backgroundImage: `${
              props.values.thumbnail === "" ||
              props.values.thumbnail === undefined
                ? "url('https://i.ibb.co/tZRrHT7/NotFound.png')"
                : `url('${process.env.REACT_APP_SERVER}/${props.values.thumbnail}')`
            }`,
          }}
        ></div>
        <div className="news-item-body">
          <div className="news-item-body-title">{props.values.title}</div>
          <div className="news-item-body-content">{plainString}...</div>
          <div className="news-item-body-date">
            {lang === "ar"
              ? `${date.day} ${monthInLetters.get(date.month)}، ${date.year}`
              : `${monthInLetters.get(date.month)} ${date.day}, ${date.year}`}
          </div>
        </div>
      </Card>
    </div>
  );
};

const LatestNewsPage = () => {
  const navigate = useNavigate();
  const isError = useSelector((state) => state.isError);
  const isSuccess = useSelector((state) => state.isSuccess);
  const isLoading = useSelector((state) => state.isLoading);
  const errorMessage = useSelector((state) => state.errorMessage);
  const successMessage = useSelector((state) => state.successMessage);
  const [pageNum, setPageNum] = useState(0);
  const [news, setNews] = useState([]);
  const lang = useSelector((state) => state.language);
  const [selectedCat, setSelectedCat] = useState("a-l-l");
  const [categories, setCategories] = useState([]);
  const { t } = useTranslation();
  const pageSize = 10;
  const fetchPages = async () => {
    const res = await getPagesByCategory(pageSize, pageNum, selectedCat, t);
    setPageNum(pageNum + 1);
    setNews(res);
  };
  useEffect(() => {
    resetStates();
    const fetchCategories = async () => {
      const res = await getCategories(t);
      console.log(res);
      res.push({ label: t("all"), value: "a-l-l" });
      setCategories(res);
    };
    fetchCategories();
    fetchPages();
  }, []);
  const handleChange = (event) => {
    setSelectedCat(event.target.value);
  };

  useEffect(() => {
    fetchPages(0);
  }, [selectedCat]);

  useEffect(() => {
    console.log(categories);
  }, [categories]);
  return (
    <Box>
      {isError === true && (
        <ErrorAlert isError={isError} errorMessage={errorMessage} />
      )}
      {isSuccess === true && (
        <SuccessAlert isSuccess={isSuccess} msg={successMessage} />
      )}
      {isLoading === true && <LoadingBar />}
      <div className="latest-news-page">
        <div className="latest-news-header-container">
          <div className={EnArTxt("latest-news-header", lang)}>
            {t("activities")}
          </div>
          <TextField
            variant="filled"
            id="outlined-select-currency"
            InputProps={{ disableUnderline: true }}
            select
            name="category"
            value={selectedCat}
            style={{ minWidth: "150px" }}
            label={t("select-category")}
            defaultValue="news"
            onChange={handleChange}
          >
            {categories.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </div>
        <div className="latest-news-list">
          {(() => {
            const arr = [];
            if (news) {
              for (let i = 0; i < news.length; i++) {
                arr.push(<NewsItem values={news[i]} key={news[i]._id} />);
              }
            }
            return arr;
          })()}
          {news.length % pageSize === 0 && (
            <div className="news-load-more">
              <Button
                sx={{ textTransform: "none" }}
                variant="contained"
                onClick={() => {
                  fetchPages();
                }}
              >
                <Refresh fontSize="small" sx={{ marginInlineEnd: "10px" }} />
                {t("load-more")}
              </Button>
            </div>
          )}
        </div>
      </div>
    </Box>
  );
};

export default LatestNewsPage;
