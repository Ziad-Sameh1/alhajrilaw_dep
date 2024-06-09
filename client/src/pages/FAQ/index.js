import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Box } from "@mui/system";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ErrorAlert from "../../components/ErrorAlert/ErrorAlert";
import LoadingBar from "../../components/LoadingBar.js/loadingBar";
import { getFAQs } from "../../services/FAQService";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./faq.scss";

const AccElement = (props) => {
  return (
    <div>
      <Accordion sx={{ backgroundColor: "#F4F4F4" }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon color="primary" />}
          aria-controls="panel1a-content"
        >
          <div className="faq-acc-title">{props.title}</div>
        </AccordionSummary>
        <AccordionDetails>
          <div className="faq-acc-desc">{props.desc}</div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};
const FAQ = () => {
  const isError = useSelector((state) => state.isError);
  const isLoading = useSelector((state) => state.isLoading);
  const errorMessage = useSelector((state) => state.errorMessage);
  const navigate = useNavigate();
  const lang = useSelector((state) => state.language);
  const { t } = useTranslation();
  const viewToken = useSelector((state) => state.viewToken);
  const [questions, setQuestions] = useState([]);
  const pageSize = 10;
  useEffect(() => {
    const fetchFAQs = async () => {
      const res = await getFAQs(pageSize, 0, t);
      console.log(res);
      setQuestions(res);
    };
    fetchFAQs();
  }, []);
  useEffect(() => {
    console.log("questions");
    console.log(questions);
  }, [questions]);
  return (
    <Box>
      {isError === true && (
        <ErrorAlert isError={isError} errorMessage={errorMessage} />
      )}
      {isLoading === true && <LoadingBar />}
      <div className="faq-main-sec">
        <div
          className={
            lang === "ar" ? "faq-main-sec-header txt-ar" : "faq-main-sec-header"
          }
        >
          {t("faq")}
        </div>
        <div className="faq-main-sec-acc">
          <div className="faq-main-sec-accordion">
            {(() => {
              const arr = [];
              if (questions) {
                for (var i = 0; i < questions.length; i++) {
                  arr.push(
                    <AccElement
                      title={questions[i].question}
                      desc={questions[i].answer}
                      key={questions[i]._id}
                    />
                  );
                }
              }
              return arr;
            })()}
          </div>
        </div>
      </div>
    </Box>
  );
};

export default FAQ;
