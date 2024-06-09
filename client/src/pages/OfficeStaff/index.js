import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Box } from "@mui/system";
import ErrorAlert from "../../components/ErrorAlert/ErrorAlert";
import SuccessAlert from "../../components/SuccessAlert/SuccessAlert";
import LoadingBar from "../../components/LoadingBar.js/loadingBar";
import { useTranslation } from "react-i18next";
import { resetStates } from "../../utils/FeedbackStates";
import { getStaff } from "../../services/StaffService";
import { motion } from "framer-motion";
import { Card } from "@mui/material";
import { EnArTxt } from "../../utils/Language";
import "./staff.scss";
import { GetStaff } from "../CRUDEntities/StaffCRUD/StaffMethods";
import { getJobs } from "../../services/JobService";

const OfficeStaffPage = () => {
  const isError = useSelector((state) => state.isError);
  const isSuccess = useSelector((state) => state.isSuccess);
  const isLoading = useSelector((state) => state.isLoading);
  const errorMessage = useSelector((state) => state.errorMessage);
  const successMessage = useSelector((state) => state.successMessage);
  const navigate = useNavigate();
  const lang = useSelector((state) => state.language);
  const { t } = useTranslation();
  const viewToken = useSelector((state) => state.viewToken);
  const [staff, setStaff] = useState([]);
  const [jobs, setJobs] = useState([]);
  const EmployeeItem = (props) => {
    const name = props.data.name.split("\n");
    const [enName, arName] = name;
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
        <Card className="employee-item">
          <img
            src={`${process.env.REACT_APP_SERVER}/${props.data.imgLink}`}
            alt={props.data.name}
            className="employee-item-img"
          />
          <div className="employee-item-name-en">{enName}</div>
          <div className="employee-item-name-ar">{arName}</div>
        </Card>
      </motion.div>
    );
  };
  const sortJobs = (jobs) => {
    const sorted = [];
    const added = Array(jobs.length).fill(false);
    /**
     * Order:
     * - Legal Advisors and experts
     * - Lawyers authorized
     * - Lawyers
     * - Adminstratives
     */
    for (var i = 0; i < jobs.length; i++) {
      if (jobs[i].value === "legal-advisors-and experts") {
        added[i] = true;
        sorted.push(jobs[i]);
      }
    }
    for (var i = 0; i < jobs.length; i++) {
      if (
        jobs[i].value ===
        "lawyers-authorized-to appear and plead before the courts of all degrees"
      ) {
        added[i] = true;
        sorted.push(jobs[i]);
      }
    }
    for (var i = 0; i < jobs.length; i++) {
      if (jobs[i].value === "lawyers") {
        added[i] = true;
        sorted.push(jobs[i]);
      }
    }
    for (var i = 0; i < jobs.length; i++) {
      if (jobs[i].value === "administratives") {
        added[i] = true;
        sorted.push(jobs[i]);
      }
    }
    console.log(added);
    for (var i = 0; i < added.length; i++) {
      if (added[i] === false) {
        added[i] = true;
        sorted.push(jobs[i]);
      }
    }
    return sorted;
  };
  const fetchJobs = async () => {
    const res = await getJobs(t);
    console.log(res);
    const sorted = sortJobs(res);
    setJobs(sorted);
  };
  useEffect(() => {
    resetStates();
    const fetchStaff = async () => {
      await GetStaff(setStaff, 999, 0, t);
    };
    fetchStaff();
    fetchJobs();
  }, []);
  useEffect(() => {
    console.log("staff");
    console.log(staff);
  }, [staff]);
  useEffect(() => {
    console.log("jobs");
    console.log(jobs);
  }, [jobs]);
  return (
    <Box>
      {isError === true && (
        <ErrorAlert isError={isError} errorMessage={errorMessage} />
      )}
      {isSuccess === true && (
        <SuccessAlert isSuccess={isSuccess} msg={successMessage} />
      )}
      {isLoading === true && <LoadingBar />}
      <div className="office-staff-page">
        <div className={EnArTxt("office-staff-page-title", lang)}>
          {t("office-staff")}
        </div>
        <div className={EnArTxt("office-staff-page-title-desc", lang)}>
          {t("office-staff-desc")}
        </div>
        {(() => {
          const jobDiv = [];
          if (jobs) {
            for (let k = 0; k < jobs.length; k++) {
              if (jobs[k]) {
                jobDiv.push(
                  <div className="office-staff-type">
                    <div className={EnArTxt("staff-type-header", lang)}>
                      {lang === "ar" ? jobs[k].labelAR : jobs[k].labelEN}
                    </div>
                    <div className="staff-list">
                      {(() => {
                        const arr = [];
                        if (staff) {
                          for (let i = 0; i < staff.length; i++) {
                            if (
                              staff[i] &&
                              staff[i].position === jobs[k].value
                            ) {
                              arr.push(
                                <EmployeeItem
                                  data={staff[i]}
                                  key={staff[i]._id}
                                />
                              );
                            }
                          }
                        }
                        return arr;
                      })()}
                    </div>
                  </div>
                );
              }
            }
          }
          return jobDiv;
        })()}
      </div>
    </Box>
  );
};

export default OfficeStaffPage;
