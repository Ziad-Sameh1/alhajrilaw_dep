import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HomeBGCover from "../../assets/images/home-cover.jpg";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import "./home.scss";
import { motion } from "framer-motion";
import FounderImg from "../../assets/images/founder.jpg";
import { Box, Button } from "@mui/material";
import { AccountBalance } from "@mui/icons-material";
import HomeServices1Img from "../../assets/images/home-services-1.png";
import HomeServices2Img from "../../assets/images/home-services-2.png";
import HomeServices3Img from "../../assets/images/home-services-3.png";
import HomeServices4Img from "../../assets/images/home-services-4.png";
import HomeServices5Img from "../../assets/images/home-services-6.png";
import Carousel from "react-multi-carousel";
import CountUp from "react-countup";
import "react-multi-carousel/lib/styles.css";
import { getStats } from "../../services/WebsiteInfoService";
import LoadingBar from "../../components/LoadingBar.js/loadingBar";
import ErrorAlert from "../../components/ErrorAlert/ErrorAlert";
import { getTopClients } from "../../services/ClientsService";
import { resetStates } from "../../utils/FeedbackStates";
import { getLastPages } from "../../services/WebPagesService";
const responsive = {
  largeDesktop: {
    breakpoint: { max: 3000, min: 1440 },
    items: 6,
  },
  desktop: {
    breakpoint: { max: 1440, min: 1280 },
    items: 5,
  },
  largeTablet: {
    breakpoint: { max: 1280, min: 1024 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 768 },
    items: 3,
  },
  largeMobile: {
    breakpoint: { max: 768, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};
const pageSliderRes = {
  all: {
    breakpoint: { max: 9999, min: 0 },
    items: 1,
  },
};

const PageSliderItem = (props) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <div className="home-page-slider-item-container">
      <div
        className="home-slider-item"
        style={{
          backgroundImage: `${
            props.values.thumbnail === "" ||
            props.values.thumbnail === undefined
              ? "url('https://i.ibb.co/tZRrHT7/NotFound.png')"
              : `url('${process.env.REACT_APP_SERVER}/${props.values.thumbnail}')`
          }`,
        }}
      >
        <div className="home-slider-item-abs-div">
          <div
            className="home-slider-item-btn"
            onClick={() => {
              window.location.replace(props.values.link);
            }}
          >
            {t("read-more")}
          </div>
          <div className="home-slider-item-title">{props.values.title}</div>
        </div>
      </div>
    </div>
  );
};

const HomePage = () => {
  // const { ref, inView } = useInView({
  //   /* Optional options */
  //   triggerOnce: true,
  // });
  const isError = useSelector((state) => state.isError);
  const isLoading = useSelector((state) => state.isLoading);
  const errorMessage = useSelector((state) => state.errorMessage);
  const lang = useSelector((state) => state.language);
  const { t } = useTranslation();
  const [clientsDivState, setClientDivState] = useState(false);
  const [yearsDivState, setYearsDivState] = useState(false);
  const [studentsDivState, setStudentsDivState] = useState(false);
  const [stats, setStats] = useState({});
  const [topClients, setTopClients] = useState([]);
  const [sliderPages, setSliderPages] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    resetStates();

    const fetchPages = async () => {
      const res = await getLastPages(5, 1);
      setSliderPages(res);
    };
    const fetchStats = async () => {
      const res = await getStats();
      setStats(res);
    };

    const fetchTopClients = async () => {
      const res = await getTopClients();
      setTopClients(res);
    };

    fetchStats();
    fetchTopClients();
    fetchPages();
  }, []);

  return (
    <Box>
      {isError === true && (
        <ErrorAlert isError={isError} errorMessage={errorMessage} />
      )}
      {isLoading === true && <LoadingBar />}
      <div className="home-page">
        <div className="home-1st-section">
          <img
            src={HomeBGCover}
            alt={"lawyers-cover"}
            className="home-1st-section-img"
          />
          <div className="home-1st-section-body">
            <motion.div
              viewport={{ once: true }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{
                delay: 0.5,
                x: { duration: 1 },
                default: { ease: "easeInOut" },
              }}
            >
              {lang === "ar" && (
                <div className="home-1st-section-body-desc home-ar">
                  {t("home-1st-section-body-title-1")}
                </div>
              )}
              {lang !== "ar" && (
                <div className="home-1st-section-body-desc">
                  {t("home-1st-section-body-title-1")}
                </div>
              )}
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
              {lang === "ar" && (
                <div className="home-1st-section-body-title home-ar">
                  {t("home-1st-section-body-title-2")}
                </div>
              )}
              {lang !== "ar" && (
                <div className="home-1st-section-body-title">
                  {t("home-1st-section-body-title-2")}
                </div>
              )}
            </motion.div>
            <motion.div
              viewport={{ once: true }}
              initial={{ opacity: 0, y: "20px" }}
              whileInView={{ opacity: 1, y: "0px" }}
              transition={{
                delay: 1.25,
                x: { duration: 1 },
                default: { ease: "easeInOut" },
              }}
            >
              {lang === "ar" && (
                <div className="home-1st-section-body-desc home-ar">
                  {t("home-1st-section-body-title-3")}
                </div>
              )}
              {lang !== "ar" && (
                <div className="home-1st-section-body-desc">
                  {t("home-1st-section-body-title-3")}
                </div>
              )}
            </motion.div>
            <motion.div
              viewport={{ once: true }}
              initial={{ opacity: 0, y: "20px" }}
              whileInView={{ opacity: 1, y: "0px" }}
              transition={{
                delay: 1.25,
                x: { duration: 1 },
                default: { ease: "easeInOut" },
              }}
            >
              {lang === "ar" && (
                <div className="home-1st-section-body-desc home-ar">
                  {t("home-1st-section-body-title-4")}
                </div>
              )}
              {lang !== "ar" && (
                <div className="home-1st-section-body-desc">
                  {t("home-1st-section-body-title-4")}
                </div>
              )}
            </motion.div>
          </div>
        </div>
        {sliderPages && (
          <>
            {sliderPages.length > 0 && (
              <div className="home-page-slider">
                <Carousel
                  responsive={pageSliderRes}
                  className="home-page-carousel"
                  infinite={true}
                  showDots={true}
                  autoPlay={true}
                >
                  {(() => {
                    const arr = [];
                    for (let i = 0; i < sliderPages.length; i++) {
                      if (sliderPages[i]) {
                        console.log(sliderPages[i]);
                        arr.push(
                          <PageSliderItem
                            values={sliderPages[i]}
                            key={sliderPages[i]._id}
                          />
                        );
                      }
                    }
                    return arr;
                  })()}
                </Carousel>
              </div>
            )}
          </>
        )}
        <div className="home-2nd-section">
          <div className="home-2nd-section-flex">
            <motion.div
              viewport={{ once: true }}
              initial={{ opacity: 0, x: "-200px" }}
              whileInView={{ opacity: 1, x: "0px" }}
              transition={{
                x: { duration: 1 },
                default: { ease: "easeInOut" },
              }}
              className="home-2nd-section-img-sec"
            >
              <img
                src={FounderImg}
                alt="mohamed majed alhajri photo"
                className="home-2nd-section-img-elmnt"
              />
            </motion.div>
            <div className="home-2nd-section-body-sec">
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
                  <div className="home-2nd-section-body-header-sec home-ar">
                    {t("founder-name")}
                  </div>
                )}
                {lang !== "ar" && (
                  <div className="home-2nd-section-body-header-sec">
                    {t("founder-name")}
                  </div>
                )}
              </motion.div>
              <motion.div
                viewport={{ once: true }}
                initial={{ opacity: 0, scaleX: 0 }}
                whileInView={{ opacity: 1, scaleX: 1 }}
                transition={{
                  delay: 1,
                  x: { duration: 1 },
                  default: { ease: "easeInOut" },
                }}
              >
                <div className="home-2nd-section-body-divider-sec">
                  <div className="home-2nd-section-body-divider-sec-center">
                    <div className="home-2nd-section-body-divider-elmnt"></div>
                    <AccountBalance
                      className="home-2nd-section-body-divider-sec-img-elmnt"
                      color="primary"
                    />
                    <div className="home-2nd-section-body-divider-elmnt"></div>
                  </div>
                </div>
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
              >
                {lang === "ar" && (
                  <div className="home-2nd-section-body-desc-sec-ar">
                    <div>{t("home-2nd-section-body-desc-sec-1")}</div>
                    <br />
                    <div>{t("home-2nd-section-body-desc-sec-2")}</div>
                    <br />
                    <div>{t("home-2nd-section-body-desc-sec-3")}</div>
                    <br />
                    <div>{t("home-2nd-section-body-desc-sec-4")}</div>
                  </div>
                )}
                {lang !== "ar" && (
                  <div className="home-2nd-section-body-desc-sec">
                    <div>{t("home-2nd-section-body-desc-sec-1")}</div>
                    <br />
                    <div>{t("home-2nd-section-body-desc-sec-2")}</div>
                    <br />
                    <div>{t("home-2nd-section-body-desc-sec-3")}</div>
                    <br />
                    <div>{t("home-2nd-section-body-desc-sec-4")}</div>
                  </div>
                )}
              </motion.div>
              <div className="home-2nd-section-body-btn-sec">
                <motion.div
                  enableScrollSpy={true}
                  viewport={{ once: true }}
                  initial={{ opacity: 0, y: "40px" }}
                  whileInView={{ opacity: 1, y: "0px" }}
                  transition={{
                    delay: 1.25,
                    x: { duration: 1 },
                    default: { ease: "easeInOut" },
                  }}
                >
                  <Button
                    size="small"
                    variant="contained"
                    sx={{
                      borderRadius: "30px",
                      textTransform: "none",
                      fontWeight: "600",
                      marginTop: "16px",
                      marginBottom: "16px",
                    }}
                    onClick={() => {
                      window.scrollTo(0, 0);
                      navigate("/about-us");
                    }}
                  >
                    {t("read-more")}
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
        <div className="home-3rd-section">
          {/* <motion.div
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
              <div className="home-3rd-section-header home-ar">
                {t("services")}
              </div>
            )}
            {lang !== "ar" && (
              <div className="home-3rd-section-header">{t("services")}</div>
            )}
          </motion.div> */}
          <div className="home-3rd-section-body">
            {lang === "ar" && (
              <div className="home-3rd-section-body-header home-ar">
                <motion.div
                  viewport={{ once: true }}
                  initial={{ opacity: 0, y: "20px" }}
                  whileInView={{ opacity: 1, y: "0px" }}
                  enableScrollSpy={true}
                  transition={{
                    x: { duration: 1 },
                    default: { ease: "easeInOut" },
                  }}
                >
                  {t("our-services")}
                </motion.div>
              </div>
            )}
            {lang !== "ar" && (
              <div className="home-3rd-section-body-header">
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
                  {t("our-services")}
                </motion.div>
              </div>
            )}

            <div className="home-3rd-section-body-flex">
              <motion.div
                viewport={{ once: true }}
                initial={{ opacity: 0, y: "20px" }}
                whileInView={{ opacity: 1, y: "0px" }}
                transition={{
                  delay: 0.75,
                  x: { duration: 1 },
                  default: { ease: "easeInOut" },
                }}
                className="home-3rd-section-body-flex-item"
              >
                <img
                  src={HomeServices4Img}
                  alt="service-4"
                  className="home-3rd-section-body-flex-item-img"
                />
                {lang === "ar" && (
                  <div
                    className="home-3rd-section-body-flex-item-txt home-ar"
                    style={{ color: "#475466" }}
                  >
                    {t("drafting-reviewing-contracts")}
                  </div>
                )}
                {lang !== "ar" && (
                  <div
                    className="home-3rd-section-body-flex-item-txt"
                    style={{ color: "#475466" }}
                  >
                    {t("drafting-reviewing-contracts")}
                  </div>
                )}
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
                className="home-3rd-section-body-flex-item"
              >
                <img
                  src={HomeServices2Img}
                  alt="service-2"
                  className="home-3rd-section-body-flex-item-img"
                />
                {lang === "ar" && (
                  <div
                    className="home-3rd-section-body-flex-item-txt home-ar"
                    style={{ color: "#2B6EAC" }}
                  >
                    {t("conflict-resolution")}
                  </div>
                )}
                {lang !== "ar" && (
                  <div
                    className="home-3rd-section-body-flex-item-txt"
                    style={{ color: "#2B6EAC" }}
                  >
                    {t("conflict-resolution")}
                  </div>
                )}
              </motion.div>
              <motion.div
                viewport={{ once: true }}
                initial={{ opacity: 0, y: "20px" }}
                whileInView={{ opacity: 1, y: "0px" }}
                transition={{
                  delay: 1.25,
                  x: { duration: 1 },
                  default: { ease: "easeInOut" },
                }}
                className="home-3rd-section-body-flex-item"
              >
                <img
                  src={HomeServices3Img}
                  alt="service-3"
                  className="home-3rd-section-body-flex-item-img"
                />
                {lang === "ar" && (
                  <div
                    className="home-3rd-section-body-flex-item-txt home-ar"
                    style={{ color: "#377771" }}
                  >
                    {t("arbitration")}
                  </div>
                )}
                {lang !== "ar" && (
                  <div
                    className="home-3rd-section-body-flex-item-txt"
                    style={{ color: "#377771" }}
                  >
                    {t("arbitration")}
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
                className="home-3rd-section-body-flex-item"
              >
                <img
                  src={HomeServices1Img}
                  alt="service-1"
                  className="home-3rd-section-body-flex-item-img"
                />
                {lang === "ar" && (
                  <div
                    className="home-3rd-section-body-flex-item-txt home-ar"
                    style={{ color: "#AC2B2B" }}
                  >
                    {t("commercial-companies")}
                  </div>
                )}
                {lang !== "ar" && (
                  <div
                    className="home-3rd-section-body-flex-item-txt"
                    style={{ color: "#AC2B2B" }}
                  >
                    {t("commercial-companies")}
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
                className="home-3rd-section-body-flex-item"
              >
                <img
                  src={HomeServices5Img}
                  alt="service-5"
                  className="home-3rd-section-body-flex-item-img"
                />
                {lang === "ar" && (
                  <div
                    className="home-3rd-section-body-flex-item-txt home-ar"
                    style={{ color: "#331C3A" }}
                  >
                    {t("pleading")}
                  </div>
                )}
                {lang !== "ar" && (
                  <div
                    className="home-3rd-section-body-flex-item-txt"
                    style={{ color: "#331C3A" }}
                  >
                    {t("pleading")}
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
        <div className="home-4th-section">
          {lang === "ar" && (
            <div className="home-4th-section-header home-ar">
              {t("our-clients")}
            </div>
          )}
          {lang !== "ar" && (
            <div className="home-4th-section-header">{t("our-clients")}</div>
          )}
          <div className="home-4th-section-divider"></div>
          <div className="home-4th-section-carousel">
            <Carousel
              showDots={false}
              removeArrowOnDeviceType={[
                "tablet",
                "mobile",
                "desktop",
                "largeMobile",
                "largeTablet",
                "largeDesktop",
              ]}
              infinite={true}
              autoPlay={true}
              responsive={responsive}
            >
              {(() => {
                const arr = [];
                if (topClients) {
                  for (let i = 0; i < topClients.length; i++) {
                    if (topClients[i]) {
                      arr.push(
                        <div
                          className="home-4th-section-carousel-item"
                          key={topClients[i]._id}
                        >
                          <img
                            src={`${process.env.REACT_APP_SERVER}/${topClients[i].imgLink}`}
                            alt="client-1-logo"
                            className="home-4th-section-carousel-item-img"
                          />
                        </div>
                      );
                    }
                  }
                }
                return arr;
              })()}
            </Carousel>
          </div>
          <div className="home-4th-section-divider"></div>
        </div>
        {stats && (
          <div className="home-5th-section">
            <motion.div
              viewport={{ once: true }}
              initial={{ opacity: 0, y: "50px" }}
              whileInView={{ opacity: 1, y: "0px" }}
              transition={{
                x: { duration: 1 },
                default: { ease: "easeInOut" },
              }}
            >
              <div className="home-5th-section-item">
                {lang === "ar" && (
                  <div className="home-5th-section-item-header home-ar">
                    {t("cases")}
                  </div>
                )}
                {lang !== "ar" && (
                  <div className="home-5th-section-item-header">
                    {t("cases")}
                  </div>
                )}
                <div className="home-5th-section-item-counter  no-rtl">
                  {stats && (
                    <CountUp
                      delay={0.5}
                      start={stats.casesNum - 500}
                      end={stats.casesNum}
                      suffix={"+"}
                      useEasing={true}
                      duration={3}
                      enableScrollSpy={true}
                      className="home-5th-section-item-counter-elmnt"
                      onEnd={() => {
                        setClientDivState(true);
                      }}
                    />
                  )}
                </div>
              </div>
            </motion.div>
            {clientsDivState && (
              <motion.div
                viewport={{ once: true }}
                initial={{ opacity: 0, y: "50px" }}
                whileInView={{ opacity: 1, y: "0px" }}
                transition={{
                  x: { duration: 1 },
                  default: { ease: "easeInOut" },
                }}
              >
                <div className="home-5th-section-item">
                  {lang === "ar" && (
                    <div className="home-5th-section-item-header home-ar">
                      {t("clients")}
                    </div>
                  )}
                  {lang !== "ar" && (
                    <div className="home-5th-section-item-header">
                      {t("clients")}
                    </div>
                  )}
                  <div className="home-5th-section-item-counter no-rtl">
                    {stats && (
                      <CountUp
                        start={stats.clientsNum - 200}
                        end={stats.clientsNum}
                        suffix={"+"}
                        useEasing={true}
                        enableScrollSpy={true}
                        duration={3}
                        className="home-5th-section-item-counter-elmnt"
                        onEnd={() => {
                          setYearsDivState(true);
                        }}
                      />
                    )}
                  </div>
                </div>
              </motion.div>
            )}
            {yearsDivState && (
              <motion.div
                viewport={{ once: true }}
                initial={{ opacity: 0, y: "50px" }}
                whileInView={{ opacity: 1, y: "0px" }}
                transition={{
                  x: { duration: 1 },
                  default: { ease: "easeInOut" },
                }}
              >
                <div className="home-5th-section-item">
                  {lang === "ar" && (
                    <div className="home-5th-section-item-header home-ar">
                      {t("years")}
                    </div>
                  )}
                  {lang !== "ar" && (
                    <div className="home-5th-section-item-header">
                      {t("years")}
                    </div>
                  )}
                  <div className="home-5th-section-item-counter no-rtl">
                    {stats && (
                      <CountUp
                        start={stats.yearsNum - 8}
                        end={stats.yearsNum}
                        suffix={"+"}
                        useEasing={true}
                        enableScrollSpy={true}
                        duration={3}
                        className="home-5th-section-item-counter-elmnt"
                        onEnd={() => {
                          setStudentsDivState(true);
                        }}
                      />
                    )}
                  </div>
                </div>
              </motion.div>
            )}
            {yearsDivState && (
              <motion.div
                viewport={{ once: true }}
                initial={{ opacity: 0, y: "50px" }}
                whileInView={{ opacity: 1, y: "0px" }}
                transition={{
                  x: { duration: 1 },
                  default: { ease: "easeInOut" },
                }}
              >
                <div className="home-5th-section-item">
                  {lang === "ar" && (
                    <div className="home-5th-section-item-header home-ar">
                      {t("scholarships-training")}
                    </div>
                  )}
                  {lang !== "ar" && (
                    <div className="home-5th-section-item-header">
                      {t("cases")}
                    </div>
                  )}
                  <div className="home-5th-section-item-counter  no-rtl">
                    {stats && (
                      <CountUp
                        start={stats.studentsNum - 10}
                        end={stats.studentsNum}
                        suffix={"+"}
                        useEasing={true}
                        duration={3}
                        enableScrollSpy={true}
                        className="home-5th-section-item-counter-elmnt"
                      />
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        )}
      </div>
    </Box>
  );
};

export default HomePage;
