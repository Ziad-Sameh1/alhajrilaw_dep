import React, { useState, useEffect } from "react";
import { GetReportCheckpoints } from "../CRUDEntities/SenderCRUD/CheckpointMethods";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import "react-datepicker/dist/react-datepicker.css";
import { TextField } from "@mui/material";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const columns = [
  { field: "email", headerName: "Email", width: 200 },
  { field: "lat", headerName: "Latitude", width: 150 },
  { field: "lng", headerName: "Longitude", width: 150 },
  { field: "checkInTime", headerName: "Check-In Time", width: 200 },
  { field: "checkOutTime", headerName: "Check-Out Time", width: 200 },
  { field: "placeName", headerName: "Place Name", width: 200 },
];

const ReportsDialog = ({ open, setOpen }) => {
  const [data, setData] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [pageNum, setPageNum] = useState(0);
  const [startDate, setStartDate] = useState(null);
  const [email, setEmail] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const rows = data.flatMap((user, userIndex) =>
    user.checkpoints.map((checkpoint, index) => ({
      id: `${userIndex}-${index}`,
      email: user._id,
      lat: checkpoint.lat,
      lng: checkpoint.lng,
      checkInTime: new Date(checkpoint.checkInTime).toLocaleString(),
      checkOutTime: new Date(checkpoint.checkOutTime).toLocaleString(),
      placeName: checkpoint.placeName,
    }))
  );

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
