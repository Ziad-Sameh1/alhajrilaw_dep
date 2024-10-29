import React, { useState, useEffect } from "react";
import {
  DeleteCheckpoint,
  GetReportCheckpoints,
} from "../CRUDEntities/SenderCRUD/CheckpointMethods";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useTranslation } from "react-i18next";

import "react-datepicker/dist/react-datepicker.css";
import { TextField } from "@mui/material";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ReportsDialog = ({ open, setOpen }) => {
  const { t } = useTranslation();

  const [data, setData] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [pageNum, setPageNum] = useState(0);
  const [startDate, setStartDate] = useState(null);
  const [email, setEmail] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const columns = [
    { field: "email", headerName: t("email-address"), width: 200 },
    { field: "checkin_lat", headerName: t("checkin_lat"), width: 150 },
    { field: "checkin_lng", headerName: t("checkin_lng"), width: 150 },
    { field: "checkout_lat", headerName: t("checkout_lat"), width: 150 },
    { field: "checkout_lng", headerName: t("checkout_lng"), width: 150 },
    { field: "checkInTime", headerName: t("checkin-time"), width: 200 },
    { field: "checkOutTime", headerName: t("checkout-time"), width: 200 },
    { field: "timeSpent", headerName: t("time-spent"), width: 200 },
    { field: "placeName", headerName: t("placename"), width: 200 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <>
          {/* Check-in location button */}
          <IconButton
            onClick={() =>
              openInGoogleMaps(params.row.checkin_lat, params.row.checkin_lng)
            }
            aria-label="open check-in location"
          >
            <LocationOnIcon /> {/* Icon for location */}
          </IconButton>

          {/* Check-out location button */}
          <IconButton
            disabled={
              params.row.checkout_lat == null ||
              params.row.checkout_lat == undefined
            }
            onClick={() =>
              openInGoogleMaps(params.row.checkout_lat, params.row.checkout_lng)
            }
            aria-label="open check-out location"
          >
            <ExitToAppIcon /> {/* Icon for checkout location */}
          </IconButton>

          {/* Delete button */}
          <IconButton
            onClick={() => handleDelete(params.id)}
            aria-label="delete"
          >
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  const rows = data.flatMap((user, userIndex) =>
    user.checkpoints.map((checkpoint, index) => {
      const checkInTime = new Date(checkpoint.checkInTime);
      const checkOutTime = new Date(checkpoint.checkOutTime);
      const timeSpent = Math.abs(checkOutTime - checkInTime); // difference in milliseconds

      return {
        id: checkpoint._id,
        email: user._id,
        checkin_lat: checkpoint.checkin_lat,
        checkin_lng: checkpoint.checkin_lng,
        checkout_lat: checkpoint.checkout_lat,
        checkout_lng: checkpoint.checkout_lng,
        checkInTime: checkInTime.toLocaleString(),
        checkOutTime: checkOutTime.toLocaleString(),
        placeName: checkpoint.placeName,
        timeSpent: formatTimeSpent(timeSpent), // convert to minutes and format
      };
    })
  );

  function formatTimeSpent(ms) {
    let totalSeconds = Math.floor(ms / 1000);
    let hours = Math.floor(totalSeconds / 3600);
    let minutes = Math.floor((totalSeconds % 3600) / 60);
    let seconds = totalSeconds % 60;
  
    // Add leading zeros if the values are less than 10
    let formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
    let formattedSeconds = seconds < 10 ? "0" + seconds : seconds;
    let formattedHours = hours < 10 ? "0" + hours : hours;
  
    if (hours > 0) {
      // If there are hours, show as "HH:MM"
      return `${formattedHours}:${formattedMinutes}`;
    } else {
      // Otherwise, show as "MM:SS"
      return `${formattedMinutes}:${formattedSeconds}`;
    }
  }
  

  const openInGoogleMaps = (lat, lng) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
    window.open(url, "_blank");
  };

  useEffect(() => {
    if (startDate != null && endDate != null)
      GetReportCheckpoints(
        setData,
        pageSize,
        pageNum,
        startDate,
        endDate,
        email
      );
  }, [startDate, endDate]);

  useEffect(() => {
    if (email != null)
      GetReportCheckpoints(
        setData,
        pageSize,
        pageNum,
        startDate,
        endDate,
        email
      );
  }, [email]);

  useEffect(() => {
    if (open)
      GetReportCheckpoints(
        setData,
        pageSize,
        pageNum,
        startDate,
        endDate,
        email
      );
  }, [open]);

  const handleDelete = async (id) => {
    await DeleteCheckpoint(id, t);
    GetReportCheckpoints(setData, pageSize, pageNum, startDate, endDate, email);
  };

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={() => setOpen(false)}
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: "relative" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => setOpen(false)}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            {t("reports")}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box style={{ padding: "16px" }}>
        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
          <div
            style={{
              width: "410px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {t("start-date")}
            <DatePicker
              value={startDate}
              onChange={(date) => setStartDate(date)}
            />
          </div>
          <div
            className="flex"
            style={{
              width: "410px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {t("end-date")}
            <DatePicker value={endDate} onChange={(date) => setEndDate(date)} />
          </div>
          <div
            className="flex"
            style={{
              width: "340px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {t("user")}
            <TextField
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              id="outlined-basic"
              label={t("filter-user")}
              variant="outlined"
            />
          </div>
        </div>
      </Box>
      <Box sx={{ width: "100%" }}>
        <DataGrid
          slots={{ toolbar: GridToolbar }}
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: pageSize,
              },
            },
          }}
          pageSizeOptions={[5, 10, 20, 50, 100]}
        />
      </Box>
    </Dialog>
  );
};

export default ReportsDialog;
