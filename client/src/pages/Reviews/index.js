import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Box } from "@mui/system";
import ErrorAlert from "../../components/ErrorAlert/ErrorAlert";
import LoadingBar from "../../components/LoadingBar.js/loadingBar";
import "react-phone-input-2/lib/style.css";
import SuccessAlert from "../../components/SuccessAlert/SuccessAlert";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import UserProfilePic from "../../assets/images/review-user-profile-pic.png";
import "./reviews.scss";
import { Star, StarOutlined } from "@mui/icons-material";
import { EnArTxt } from "../../utils/Language";
import { getLastReviews } from "../../services/ReviewService";

const ReviewItem = (props) => {
  return (
    <div className="review-item">
      <div className="review-item-card">
        <div className="review-item-header">
          <div className="review-item-user-info">
            <img
              src={UserProfilePic}
              alt="user-profile-pic"
              className="review-item-usr-pic"
            />
            <div className={EnArTxt("review-item-user-name", props.lang)}>
              {props.values.name}
            </div>
          </div>
          <div className="review-item-rating">
            {props.values.rating >= 1 && <Star color="primary" />}
            {props.values.rating < 1 && <StarOutlined />}
            {props.values.rating >= 2 && <Star color="primary" />}
            {props.values.rating < 2 && <StarOutlined />}
            {props.values.rating >= 3 && <Star color="primary" />}
            {props.values.rating < 3 && <StarOutlined />}
            {props.values.rating >= 4 && <Star color="primary" />}
            {props.values.rating < 4 && <StarOutlined />}
            {props.values.rating >= 5 && <Star color="primary" />}
            {props.values.rating < 5 && <StarOutlined />}
          </div>
        </div>
        <div className={EnArTxt("review-item-content", props.lang)}>
          {props.values.reviewTxt}
        </div>
      </div>
    </div>
  );
};
const ReviewsPage = () => {
  const isError = useSelector((state) => state.isError);
  const isSuccess = useSelector((state) => state.isSuccess);
  const isLoading = useSelector((state) => state.isLoading);
  const errorMessage = useSelector((state) => state.errorMessage);
  const successMessage = useSelector((state) => state.successMessage);
  const navigate = useNavigate();
  const lang = useSelector((state) => state.language);
  const { t } = useTranslation();
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    const fetchReviews = async () => {
      const res = await getLastReviews();
      console.log(res);
      setReviews(res);
    };
    fetchReviews();
  }, []);
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 1024, min: 0 },
      items: 1,
    },
  };

  const tstResponsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 1024, min: 0 },
      items: 1,
    },
  };
  return (
    <Box>
      {isError === true && (
        <ErrorAlert isError={isError} errorMessage={errorMessage} />
      )}
      {isSuccess === true && (
        <SuccessAlert isSuccess={isSuccess} msg={successMessage} />
      )}
      {isLoading === true && <LoadingBar />}
      <div className="reviews-page">
        <div className={EnArTxt("reviews-sec-title", lang)}>
          {t("customer-says")}
        </div>
        <div className={EnArTxt("reviews-sec-header", lang)}>
          {t("our-satisfied-customer-says")}
        </div>
        <div className="reviews-sec">
          <Carousel
            showDots={false}
            infinite={true}
            autoPlay={true}
            responsive={responsive}
            className="reviews-carousel"
            renderButtonGroupOutside={true}
          >
            {(() => {
              const arr = [];
              if (reviews) {
                for (let i = 0; i < reviews.length; i++) {
                  if (reviews[i]) {
                    arr.push(
                      <ReviewItem
                        values={reviews[i]}
                        key={reviews[i]._id}
                        lang={lang}
                      />
                    );
                  }
                }
              }
              return arr;
            })()}
          </Carousel>
        </div>
      </div>
    </Box>
  );
};

export default ReviewsPage;
