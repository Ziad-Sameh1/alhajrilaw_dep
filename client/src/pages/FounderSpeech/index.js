import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Box } from "@mui/system";
import ErrorAlert from "../../components/ErrorAlert/ErrorAlert";
import LoadingBar from "../../components/LoadingBar.js/loadingBar";
import EmptyStar from "../../assets/svg/star-empty-icon.svg";
import FounderImage from "../../assets/images/founder-img.png";
import { motion } from "framer-motion";
import "./speech.scss";

const FounderSpeechPage = () => {
  const isError = useSelector((state) => state.isError);
  const isLoading = useSelector((state) => state.isLoading);
  const errorMessage = useSelector((state) => state.errorMessage);
  const navigate = useNavigate();
  const lang = useSelector((state) => state.language);
  const { t } = useTranslation();
  const viewToken = useSelector((state) => state.viewToken);
  return (
    <Box>
      {isError === true && (
        <ErrorAlert isError={isError} errorMessage={errorMessage} />
      )}
      {isLoading === true && <LoadingBar />}
      <div className="speech-main-sec">
        <div className="speech-main-sec-header">
          <motion.div
            viewport={{ once: true }}
            initial={{ opacity: 0, y: "20px" }}
            whileInView={{ opacity: 1, y: "0px" }}
            transition={{
              x: { duration: 1 },
              default: { ease: "easeInOut" },
            }}
          >
            <div className="speech-main-sec-header-content">
              <div className="speech-main-sec-header-content-divider"></div>
              <div
                className={
                  lang === "ar"
                    ? "speech-main-sec-header-content-txt txt-ar"
                    : "speech-main-sec-header-content-txt"
                }
              >
                {t("founder-speech")}
              </div>
              <div className="speech-main-sec-header-content-divider"></div>
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
          <div className="speech-main-sec-header-img">
            <img
              src={FounderImage}
              alt={"founder-image"}
              className={"speech-main-sec-header-img-item"}
            />
          </div>
        </motion.div>

        <div className="speech-main-sec-body">
          <div className="speech-main-sec-body-content">
            <motion.div
              viewport={{ once: true }}
              enableScrollSpy={true}
              initial={{ opacity: 0, y: "20px" }}
              whileInView={{ opacity: 1, y: "0px" }}
              transition={{
                delay: 0.5,
                x: { duration: 1 },
                default: { ease: "easeInOut" },
              }}
            >
              <div className="speech-main-sec-body-item">
                <div className="speech-main-sec-body-item-icon">
                  <img src={EmptyStar} className="speech-empty-star" />
                </div>
                <div
                  className={
                    lang === "ar"
                      ? "speech-main-sec-body-item-txt txt-ar"
                      : "speech-main-sec-body-item-txt"
                  }
                >
                  {t("speech-1")}
                </div>
              </div>
            </motion.div>
            <motion.div
              viewport={{ once: true }}
              enableScrollSpy={true}
              initial={{ opacity: 0, y: "20px" }}
              whileInView={{ opacity: 1, y: "0px" }}
              transition={{
                delay: 0.5,
                x: { duration: 1 },
                default: { ease: "easeInOut" },
              }}
            >
              <div className="speech-main-sec-body-item">
                <div className="speech-main-sec-body-item-icon">
                  <img src={EmptyStar} className="speech-empty-star" />
                </div>
                <div
                  className={
                    lang === "ar"
                      ? "speech-main-sec-body-item-txt txt-ar"
                      : "speech-main-sec-body-item-txt"
                  }
                >
                  {t("speech-2")}
                </div>
              </div>
            </motion.div>
            <motion.div
              viewport={{ once: true }}
              enableScrollSpy={true}
              initial={{ opacity: 0, y: "20px" }}
              whileInView={{ opacity: 1, y: "0px" }}
              transition={{
                delay: 0.5,
                x: { duration: 1 },
                default: { ease: "easeInOut" },
              }}
            >
              <div className="speech-main-sec-body-item">
                <div className="speech-main-sec-body-item-icon">
                  <img src={EmptyStar} className="speech-empty-star" />
                </div>
                <div
                  className={
                    lang === "ar"
                      ? "speech-main-sec-body-item-txt txt-ar"
                      : "speech-main-sec-body-item-txt"
                  }
                >
                  {t("speech-3")}
                </div>
              </div>
            </motion.div>
            <motion.div
              viewport={{ once: true }}
              enableScrollSpy={true}
              initial={{ opacity: 0, y: "20px" }}
              whileInView={{ opacity: 1, y: "0px" }}
              transition={{
                delay: 0.5,
                x: { duration: 1 },
                default: { ease: "easeInOut" },
              }}
            >
              <div className="speech-main-sec-body-item">
                <div className="speech-main-sec-body-item-icon">
                  <img src={EmptyStar} className="speech-empty-star" />
                </div>
                <div
                  className={
                    lang === "ar"
                      ? "speech-main-sec-body-item-txt txt-ar"
                      : "speech-main-sec-body-item-txt"
                  }
                >
                  {t("speech-4")}
                </div>
              </div>
            </motion.div>
            <motion.div
              viewport={{ once: true }}
              enableScrollSpy={true}
              initial={{ opacity: 0, y: "20px" }}
              whileInView={{ opacity: 1, y: "0px" }}
              transition={{
                delay: 0.5,
                x: { duration: 1 },
                default: { ease: "easeInOut" },
              }}
            >
              <div className="speech-main-sec-body-item">
                <div className="speech-main-sec-body-item-icon">
                  <img src={EmptyStar} className="speech-empty-star" />
                </div>
                <div
                  className={
                    lang === "ar"
                      ? "speech-main-sec-body-item-txt txt-ar"
                      : "speech-main-sec-body-item-txt"
                  }
                >
                  {t("speech-5")}
                </div>
              </div>
            </motion.div>
            <motion.div
              viewport={{ once: true }}
              enableScrollSpy={true}
              initial={{ opacity: 0, y: "20px" }}
              whileInView={{ opacity: 1, y: "0px" }}
              transition={{
                delay: 0.5,
                x: { duration: 1 },
                default: { ease: "easeInOut" },
              }}
            >
              <div className="speech-main-sec-body-item">
                <div className="speech-main-sec-body-item-icon">
                  <img src={EmptyStar} className="speech-empty-star" />
                </div>
                <div
                  className={
                    lang === "ar"
                      ? "speech-main-sec-body-item-txt txt-ar"
                      : "speech-main-sec-body-item-txt"
                  }
                >
                  {t("speech-6")}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </Box>
  );
};

export default FounderSpeechPage;
