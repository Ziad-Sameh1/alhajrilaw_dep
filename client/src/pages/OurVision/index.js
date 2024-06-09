import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Box } from "@mui/system";
import ErrorAlert from "../../components/ErrorAlert/ErrorAlert";
import LoadingBar from "../../components/LoadingBar.js/loadingBar";
import FounderImage from "../../assets/images/founder-img.png";
import { motion } from "framer-motion";
import "./vision.scss";

const OurVisionPage = () => {
  const isError = useSelector((state) => state.isError);
  const isLoading = useSelector((state) => state.isLoading);
  const errorMessage = useSelector((state) => state.errorMessage);
  const navigate = useNavigate();
  const lang = useSelector((state) => state.language);
  const { t } = useTranslation();
  return (
    <Box>
      {isError === true && (
        <ErrorAlert isError={isError} errorMessage={errorMessage} />
      )}
      {isLoading === true && <LoadingBar />}
      <div className="vision-main-sec">
        <div className="vision-main-sec-header">
          <motion.div
            viewport={{ once: true }}
            initial={{ opacity: 0, y: "20px" }}
            whileInView={{ opacity: 1, y: "0px" }}
            transition={{
              x: { duration: 1 },
              default: { ease: "easeInOut" },
            }}
          >
            <div className="vision-main-sec-header-content">
              <div className="vision-main-sec-header-content-divider"></div>
              <div
                className={
                  lang === "ar"
                    ? "vision-main-sec-header-content-txt txt-ar"
                    : "vision-main-sec-header-content-txt"
                }
              >
                {t("our-vision")}
              </div>
              <div className="vision-main-sec-header-content-divider"></div>
            </div>
          </motion.div>
        </div>
        <motion.div
          viewport={{ once: true }}
          initial={{ opacity: 0, y: "20px" }}
          whileInView={{ opacity: 1, y: "0px" }}
          transition={{
            x: { duration: 1 },
            default: { ease: "easeInOut" },
          }}
        >
          <div className="vision-main-sec-header-img">
            <img
              src={FounderImage}
              alt={"founder-image"}
              className={"vision-main-sec-header-img-item"}
            />
          </div>
        </motion.div>

        <div className="vision-main-sec-body">
          <div className="vision-main-sec-body-content">
            <motion.div
              viewport={{ once: true }}
              initial={{ opacity: 0, y: "20px" }}
              whileInView={{ opacity: 1, y: "0px" }}
              transition={{
                delay: 0.5,
                x: { duration: 1 },
                default: { ease: "easeInOut" },
              }}
            >
              <div
                className={
                  lang === "ar"
                    ? "vision-main-sec-body-item-txt txt-ar"
                    : "vision-main-sec-body-item-txt"
                }
              >
                {t("our-vision-desc")}
              </div>
            </motion.div>
            <motion.div
              viewport={{ once: true }}
              initial={{ opacity: 0, y: "20px" }}
              whileInView={{ opacity: 1, y: "0px" }}
              transition={{
                delay: 0.5,
                x: { duration: 1 },
                default: { ease: "easeInOut" },
              }}
            >
              <div
                className={
                  lang === "ar"
                    ? "vision-main-sec-body-quote txt-ar"
                    : "vision-main-sec-body-quote"
                }
              >
                {t("founder-quote")}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </Box>
  );
};

export default OurVisionPage;
