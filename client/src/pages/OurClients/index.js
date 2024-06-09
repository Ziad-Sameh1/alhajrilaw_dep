import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Box } from "@mui/system";
import ErrorAlert from "../../components/ErrorAlert/ErrorAlert";
import SuccessAlert from "../../components/SuccessAlert/SuccessAlert";
import LoadingBar from "../../components/LoadingBar.js/loadingBar";
import { useTranslation } from "react-i18next";
import { resetStates } from "../../utils/FeedbackStates";
import { motion } from "framer-motion";
import { EnArTxt } from "../../utils/Language";
import "./clients.scss";
import { getClients } from "../../services/ClientsService";
import { Button } from "@mui/material";
import { Refresh } from "@mui/icons-material";

const ClientItem = (props) => {
  return (
    <motion.div
      viewport={{ once: true }}
      enableScrollSpy={true}
      initial={{ opacity: 0, y: "20px" }}
      whileInView={{ opacity: 1, y: "0px" }}
      transition={{
        x: { duration: 1 },
        default: { ease: "easeInOut" },
      }}
    >
      <div className="client-item">
        <img
          src={`${process.env.REACT_APP_SERVER}/${props.data.imgLink}`}
          alt={props.data.order}
          className="client-item-img"
        />
      </div>
    </motion.div>
  );
};

const OurClientPage = () => {
  const isError = useSelector((state) => state.isError);
  const isSuccess = useSelector((state) => state.isSuccess);
  const isLoading = useSelector((state) => state.isLoading);
  const errorMessage = useSelector((state) => state.errorMessage);
  const successMessage = useSelector((state) => state.successMessage);
  const [pageNum, setPageNum] = useState(0);
  const navigate = useNavigate();
  const lang = useSelector((state) => state.language);
  const { t } = useTranslation();
  const [clients, setClients] = useState([]);
  const pageSize = 10;

  const fetchOnDemand = async () => {
    console.log(`fetch page num: ${pageNum}`);
    const res = await getClients(pageSize, pageNum);
    setClients([...clients, ...res]);
    setPageNum(pageNum + 1);
    return res;
  };

  useEffect(() => {
    resetStates();
    fetchOnDemand();
  }, []);
  return (
    <Box>
      {isError === true && (
        <ErrorAlert isError={isError} errorMessage={errorMessage} />
      )}
      {isSuccess === true && (
        <SuccessAlert isSuccess={isSuccess} msg={successMessage} />
      )}
      {isLoading === true && <LoadingBar />}
      <div className="clients-page">
        <div className={EnArTxt("clients-page-header", lang)}>
          {t("who-we-work-with")}
        </div>
        <div className={EnArTxt("clients-page-desc", lang)}>
          {t("who-we-work-with-desc")}
        </div>
        <div className="clients-page-list">
          {(() => {
            const arr = [];
            if (clients) {
              for (let i = 0; i < clients.length; i++) {
                if (clients[i]) {
                  arr.push(
                    <ClientItem
                      data={clients[i]}
                      key={clients[i]._id}
                      setClients={setClients}
                      clients={clients}
                    />
                  );
                }
              }
            }
            return arr;
          })()}
        </div>
        {clients.length % pageSize == 0 && (
          <div className="clients-load-more">
            <Button
              sx={{ textTransform: "none" }}
              variant="contained"
              onClick={() => {
                fetchOnDemand();
              }}
            >
              <Refresh fontSize="small" sx={{ marginInlineEnd: "10px" }} />
              {t("load-more")}
            </Button>
          </div>
        )}
      </div>
    </Box>
  );
};

export default OurClientPage;
