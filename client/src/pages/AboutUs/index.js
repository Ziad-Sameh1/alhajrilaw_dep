import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ErrorAlert from "../../components/ErrorAlert/ErrorAlert";
import LoadingBar from "../../components/LoadingBar.js/loadingBar";
import AboutBG from "../../assets/images/about-bg.jpg";
import "./about.scss";
import { motion } from "framer-motion";
import { Button } from "@mui/material";
// import ARLanguageIcon from "../../assets/images/ar-language-icon.svg";
import { ReactComponent as ARLanguageIcon } from "../../assets/images/ar-language-icon.svg";
import { ReactComponent as ENLanguageIcon } from "../../assets/images/en-language-icon.svg";
import { ReactComponent as FRLanguageIcon } from "../../assets/images/fr-language-icon.svg";
import { ReactComponent as HILanguageIcon } from "../../assets/images/hi-language-icon.svg";
import AboutIndividuals from "../../assets/images/about-individuals.png";
import AboutGovernment from "../../assets/images/about-government.png";
import AboutStock from "../../assets/images/about-stock.png";
import AboutCompanies from "../../assets/images/about-companies.png";

const LangItem = (props) => {
  return (
    <div className="about-3rd-section-main-list-item">
      <div
        className={
          props.lang === "ar"
            ? "about-3rd-section-main-list-item-lang-txt txt-ar"
            : "about-3rd-section-main-list-item-lang-txt"
        }
      >
        {props.langTxt}
      </div>
      <div className="about-3rd-section-main-list-item-lang-img">
        {props.flag === "ar" && <ARLanguageIcon />}
        {props.flag === "en" && <ENLanguageIcon />}
        {props.flag === "fr" && <FRLanguageIcon />}
        {props.flag === "hi" && <HILanguageIcon />}
      </div>
    </div>
  );
};

const AboutUsPage = () => {
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
      <div className="about-1st-section">
        <img
          src={AboutBG}
          alt={"about-cover"}
          className="about-1st-section-img"
        />
        <div className="about-1st-section-main">
          <motion.div
            viewport={{ once: true }}
            initial={{ opacity: 0, y: "20px" }}
            whileInView={{ opacity: 1, y: "0px" }}
            transition={{
              delay: 0.25,
              x: { duration: 1 },
              default: { ease: "easeInOut" },
            }}
          >
            <div
              className={
                lang === "ar"
                  ? "about-1st-section-txt1-main txt-ar"
                  : "about-1st-section-txt1-main"
              }
            >
              {t("law-firm")}
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
                  ? "about-1st-section-txt2-main  txt-ar"
                  : "about-1st-section-txt2-main"
              }
            >
              {t("founder-name")}
            </div>
          </motion.div>
          <motion.div
            viewport={{ once: true }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{
              delay: 1,
              x: { duration: 1 },
              default: { ease: "easeInOut" },
            }}
          >
            <div
              className={
                lang === "ar"
                  ? "about-1st-section-txt3-main  txt-ar"
                  : "about-1st-section-txt3-main"
              }
            >
              {t("office-desc")}
            </div>
          </motion.div>
          <motion.div
            viewport={{ once: true }}
            initial={{ scaleX: 0, scaleY: 0 }}
            whileInView={{ scaleX: 1, scaleY: 1 }}
            transition={{
              delay: 1.5,
              x: { duration: 1 },
              default: { ease: "easeInOut" },
            }}
          >
            <Button
              size="large"
              variant="outlined"
              color="secondary"
              sx={{
                borderRadius: "50px",
                fontSize: "18px",
                textTransform: "none",
              }}
              onClick={() => {
                document.getElementById("about-scroll-sec").scrollIntoView({
                  behavior: "smooth",
                  block: "center",
                  inline: "nearest",
                });
              }}
            >
              {t("know-more")}
            </Button>
          </motion.div>
        </div>
      </div>
      <div className="about-2nd-section" id="about-scroll-sec">
        <div className="about-2nd-section-main">
          <motion.div
            viewport={{ once: true }}
            initial={{ opacity: 0, y: "50px" }}
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
                  ? "about-2nd-section-header-txt txt-ar"
                  : "about-2nd-section-header-txt"
              }
            >
              {t("who-we-are")}
            </div>
          </motion.div>
          <motion.div
            viewport={{ once: true }}
            initial={{ opacity: 0, y: "20px" }}
            whileInView={{ opacity: 1, y: "0px" }}
            transition={{
              delay: 1,
              x: { duration: 1 },
              default: { ease: "easeInOut" },
            }}
          >
            <div
              className={
                lang === "ar"
                  ? "about-2nd-section-body-txt txt-ar"
                  : "about-2nd-section-body-txt"
              }
            >
              {t("who-we-are-desc")}
            </div>
          </motion.div>
        </div>
      </div>
      <div className="about-3rd-section">
        <div className="about-3rd-section-main">
          <div className="about-3rd-section-main-body1">
            <motion.div
              viewport={{ once: true }}
              initial={{ opacity: 0, x: "30px" }}
              whileInView={{ opacity: 1, x: "0px" }}
              transition={{
                delay: 0.5,
                x: { duration: 1 },
                default: { ease: "easeInOut" },
              }}
            >
              <div
                className={
                  lang === "ar"
                    ? "about-3rd-section-main-body-header-txt txt-ar"
                    : "about-3rd-section-main-body-header-txt"
                }
              >
                {t("we-can-deal-with-anyone")}
              </div>
            </motion.div>
            <motion.div
              viewport={{ once: true }}
              initial={{ opacity: 0, y: "20px" }}
              whileInView={{ opacity: 1, y: "0px" }}
              transition={{
                delay: 1.5,
                x: { duration: 1.5 },
                default: { ease: "easeInOut" },
              }}
            >
              <div
                className={
                  lang === "ar"
                    ? "about-3rd-section-main-body-desc-txt txt-ar"
                    : "about-3rd-section-main-body-desc-txt"
                }
              >
                {t("we-can-deal-with-anyone-desc")}
              </div>
            </motion.div>
          </div>
          <div className="about-3rd-section-main-body2">
            <div className="about-3rd-section-main-list">
              <motion.div
                viewport={{ once: true }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{
                  delay: 2,
                  x: { duration: 2 },
                  default: { ease: "easeInOut" },
                }}
              >
                <LangItem langTxt={t("arabic-lang")} lang={lang} flag={"ar"} />
              </motion.div>
              <motion.div
                viewport={{ once: true }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{
                  delay: 2.25,
                  x: { duration: 1 },
                  default: { ease: "easeInOut" },
                }}
              >
                <LangItem langTxt={t("english-lang")} lang={lang} flag={"en"} />
              </motion.div>
              {/* <motion.div
                viewport={{ once: true }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{
                  delay: 2.5,
                  x: { duration: 1 },
                  default: { ease: "easeInOut" },
                }}
              >
                <LangItem langTxt={t("french-lang")} lang={lang} flag={"fr"} />
              </motion.div>
              <motion.div
                viewport={{ once: true }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{
                  delay: 2.75,
                  x: { duration: 1 },
                  default: { ease: "easeInOut" },
                }}
              >
                <LangItem langTxt={t("hindi-lang")} lang={lang} flag={"hi"} />
              </motion.div> */}
            </div>
          </div>
        </div>
      </div>
      <div className="about-4th-section">
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
          {lang === "ar" && (
            <div className="about-4th-section-header txt-ar">
              {t("services")}
            </div>
          )}
          {lang !== "ar" && (
            <div className="about-4th-section-header">{t("services")}</div>
          )}
        </motion.div>
        <div className="about-4th-section-body">
          {lang === "ar" && (
            <div className="about-4th-section-body-header txt-ar">
              <motion.div
                viewport={{ once: true }}
                initial={{ opacity: 0, y: "20px" }}
                whileInView={{ opacity: 1, y: "0px" }}
                transition={{
                  delay: 1,
                  x: { duration: 1 },
                  default: { ease: "easeInOut" },
                }}
              >
                {t("beneficiaries-of-our-services")}
              </motion.div>
            </div>
          )}
          {lang !== "ar" && (
            <div className="about-4th-section-body-header">
              <motion.div
                viewport={{ once: true }}
                initial={{ opacity: 0, y: "20px" }}
                whileInView={{ opacity: 1, y: "0px" }}
                transition={{
                  delay: 1,
                  x: { duration: 1 },
                  default: { ease: "easeInOut" },
                }}
              >
                {t("beneficiaries-of-our-services")}
              </motion.div>
            </div>
          )}

          <div className="about-4th-section-body-flex">
            <motion.div
              viewport={{ once: true }}
              initial={{ opacity: 0, y: "20px" }}
              whileInView={{ opacity: 1, y: "0px" }}
              transition={{
                delay: 1.25,
                x: { duration: 1 },
                default: { ease: "easeInOut" },
              }}
              className="about-4th-section-body-flex-item"
            >
              <img
                src={AboutIndividuals}
                alt="service-1"
                className="about-4th-section-body-flex-item-img"
              />
              {lang === "ar" && (
                <div
                  className="about-4th-section-body-flex-item-txt txt-ar"
                  style={{ color: "#2B6EAC" }}
                >
                  {t("individuals")}
                </div>
              )}
              {lang !== "ar" && (
                <div
                  className="about-4th-section-body-flex-item-txt"
                  style={{ color: "#2B6EAC" }}
                >
                  {t("individuals")}
                </div>
              )}
            </motion.div>
            <motion.div
              viewport={{ once: true }}
              initial={{ opacity: 0, y: "20px" }}
              whileInView={{ opacity: 1, y: "0px" }}
              transition={{
                delay: 1.5,
                x: { duration: 1 },
                default: { ease: "easeInOut" },
              }}
              className="about-4th-section-body-flex-item"
            >
              <img
                src={AboutCompanies}
                alt="service-2"
                className="about-4th-section-body-flex-item-img"
              />
              {lang === "ar" && (
                <div
                  className="about-4th-section-body-flex-item-txt txt-ar"
                  style={{ color: "#377771" }}
                >
                  {t("companies")}
                </div>
              )}
              {lang !== "ar" && (
                <div
                  className="about-4th-section-body-flex-item-txt"
                  style={{ color: "#377771" }}
                >
                  {t("companies")}
                </div>
              )}
            </motion.div>
            <motion.div
              viewport={{ once: true }}
              initial={{ opacity: 0, y: "20px" }}
              whileInView={{ opacity: 1, y: "0px" }}
              transition={{
                delay: 1.75,
                x: { duration: 1 },
                default: { ease: "easeInOut" },
              }}
              className="about-4th-section-body-flex-item"
            >
              <img
                src={AboutGovernment}
                alt="service-3"
                className="about-4th-section-body-flex-item-img"
              />
              {lang === "ar" && (
                <div
                  className="about-4th-section-body-flex-item-txt txt-ar"
                  style={{ color: "#ED6A5E" }}
                >
                  {t("governmental-departments")}
                </div>
              )}
              {lang !== "ar" && (
                <div
                  className="about-4th-section-body-flex-item-txt"
                  style={{ color: "#ED6A5E" }}
                >
                  {t("governmental-departments")}
                </div>
              )}
            </motion.div>
            {/* <motion.div
              viewport={{ once: true }}
              initial={{ opacity: 0, y: "20px" }}
              whileInView={{ opacity: 1, y: "0px" }}
              transition={{
                delay: 2,
                x: { duration: 1 },
                default: { ease: "easeInOut" },
              }}
              className="about-4th-section-body-flex-item"
            >
              <img
                src={AboutStock}
                alt="service-4"
                className="about-4th-section-body-flex-item-img"
              />
              {lang === "ar" && (
                <div
                  className="about-4th-section-body-flex-item-txt txt-ar"
                  style={{ color: "#331C3A" }}
                >
                  {t("stock-companies")}
                </div>
              )}
              {lang !== "ar" && (
                <div
                  className="about-4th-section-body-flex-item-txt"
                  style={{ color: "#331C3A" }}
                >
                  {t("stock-companies")}
                </div>
              )}
            </motion.div> */}
          </div>
        </div>
      </div>
    </Box>
  );
};

export default AboutUsPage;
