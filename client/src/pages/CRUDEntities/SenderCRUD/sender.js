import React, { useState } from "react";
import {
  Button,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  TextField,
  TablePagination,
  useMediaQuery,
  Dialog,
} from "@mui/material";
import { useSelector } from "react-redux";
import { LaunchRounded, MoreVert, Refresh, Search } from "@mui/icons-material";
import InputAdornment from "@mui/material/InputAdornment";
import {
  formatDateString,
  NodeJSDateToJS,
} from "../../../utils/HelperFunctions";
import { GetSenders, dlt, getByEmail } from "./SenderMethods";
import { useTranslation } from "react-i18next";
import SenderDeleteDialog from "./SenderDeleteDialog";
import SenderUpdateDialog from "./SenderUpdateDialog";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { checkLoginStatus } from "../../../services/SenderService";
import { configureStates } from "../../../utils/FeedbackStates";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { GetUserCheckpoints } from "./CheckpointMethods";
import ReportsDialog from "../../CheckpointsReport";

const monthInLetters = new Map();

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const SenderCRUD = (props) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const isMobileScreen = useMediaQuery("(max-width: 768px)");
  const [selectedItem, setSelectedItem] = useState({});
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [checkpointsDialog, setCheckpointsDialogOpen] = React.useState(false);
  const [updateDialogOpen, setUpdateDialogOpen] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10000);
  const [isAllItems, setIsAllItems] = React.useState(false);
  const [checkpoints, setCheckpoints] = useState([]);
  const [isAdd, setIsAdd] = React.useState(false);
  const lang = useSelector((state) => state.language);
  monthInLetters.set("01", t("janurary"));
  monthInLetters.set("02", t("february"));
  monthInLetters.set("03", t("march"));
  monthInLetters.set("04", t("april"));
  monthInLetters.set("05", t("may"));
  monthInLetters.set("06", t("june"));
  monthInLetters.set("07", t("july"));
  monthInLetters.set("08", t("august"));
  monthInLetters.set("09", t("september"));
  monthInLetters.set("10", t("october"));
  monthInLetters.set("11", t("november"));
  monthInLetters.set("12", t("december"));

  // props
  /**
   *
   * searchTxt
   * entity
   * entitySetter
   * searchSetter
   * numericSetter
   * sizeSetter
   * numSetter
   * size
   * num
   *
   */
  // crud list more options
  const [listAnchor, setListAnchor] = useState(null);
  const listOpen = Boolean(listAnchor);
  const listHandleClick = (event) => {
    if (listAnchor == null) {
      setListAnchor(event.currentTarget);
    } else {
      setListAnchor(null);
    }
  };
  const listHandleClose = () => {
    setListAnchor(null);
  };

  // crud item more options
  const [itemAnchor, setItemAnchor] = useState(null);
  const itemOpen = Boolean(itemAnchor);
  const itemHandleClick = (event) => {
    if (itemAnchor == null) {
      setItemAnchor(event.currentTarget);
    } else {
      setItemAnchor(null);
    }
  };
  const itemHandleClose = () => {
    setItemAnchor(null);
  };
  const handleChangePage = (event, newPage) => {
    props.numSetter(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    props.sizeSetter(parseInt(event.target.value, 10));
  };
  const deleteItem = (item) => {
    dlt(
      item,
      props.entitySetter,
      props.numericSetter,
      props.graphSetter,
      props.size,
      props.num,
      t
    );
  };
  const handleCheckpointsDialogOpen = () => {
    setCheckpointsDialogOpen(true);
  };

  const handleCheckpointsDialogClose = () => {
    setCheckpointsDialogOpen(false);
  };

  useEffect(() => {
    if (checkpointsDialog) {
      GetUserCheckpoints(
        selectedItem.email,
        setCheckpoints,
        rowsPerPage,
        page,
        t
      );
    }
  }, [checkpointsDialog]);

  const openInGoogleMaps = (lat, lng) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
    window.open(url, "_blank");
  };

  const [reportsDialog, setReportsDialog] = useState(false);
  return (
    <div className="crud-div-container">
      <ReportsDialog open={reportsDialog} setOpen={setReportsDialog} />
      <Dialog
        fullScreen
        open={checkpointsDialog}
        onClose={handleCheckpointsDialogClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleCheckpointsDialogClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {t("checkpoints")}
            </Typography>
          </Toolbar>
        </AppBar>
        {checkpoints.length === 0 ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
              fontSize: "24px",
              color: "gray",
            }}
          >
            {t("no-checkpoints")}
          </div>
        ) : (
          <List secondaryAction={<LaunchRounded />}>
            {checkpoints.map((checkpoint, index) => (
              <Tooltip title={t("click-maps")}>
                <div
                  key={checkpoint._id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <ListItemButton
                    onClick={() =>
                      openInGoogleMaps(checkpoint.lat, checkpoint.lng)
                    }
                  >
                    <ListItemText
                      primary={t("checkpoint-item", { num: index + 1 })}
                      secondary={`Lat: ${checkpoint.lat}, Lng: ${checkpoint.lng}`}
                    />
                  </ListItemButton>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    style={{ paddingLeft: "16px", paddingBottom: "8px" }}
                  >
                    {formatDateString(checkpoint.createdAt)}
                  </Typography>
                  {index < checkpoints.length - 1 && <Divider />}
                </div>
              </Tooltip>
            ))}
          </List>
        )}
      </Dialog>
      <SenderDeleteDialog
        open={deleteDialogOpen}
        setOpen={setDeleteDialogOpen}
        isAll={isAllItems}
        deleteItem={deleteItem}
        data={selectedItem}
      />
      <SenderUpdateDialog
        open={updateDialogOpen}
        setOpen={setUpdateDialogOpen}
        isAdd={isAdd}
        data={selectedItem}
        setData={setSelectedItem}
        entitySetter={props.entitySetter}
        size={props.size}
        num={props.num}
      />
      <div className="crud-div">
        <div className="crud-search-div">
          <TextField
            className="crud-search-item"
            label={t("search")}
            variant="filled"
            value={props.searchTxt}
            onChange={(event) =>
              getByEmail(
                props.entitySetter,
                props.searchSetter,
                event.target.value,
                t
              )
            }
            InputProps={{
              disableUnderline: true,
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            placeholder={t("search-email")}
            style={
              isMobileScreen
                ? {
                    width: "100%",
                    backgroundColor: "#E2E8F0",
                    borderRadius: "10px",
                  }
                : {
                    width: "60%",
                    backgroundColor: "#E2E8F0",
                    borderRadius: "10px",
                  }
            }
          />
          <Button
            variant="contained"
            onClick={() => {
              setIsAdd(true);
              setUpdateDialogOpen(true);
            }}
          >
            {t("add-sender")}
          </Button>
          
          <Button variant="contained" onClick={() => setReportsDialog(true)}>
            {t("open-reports")}
          </Button>
          <Tooltip title={t("refresh")}>
            <IconButton
              onClick={() => {
                props.searchSetter("");
                GetSenders(props.entitySetter, props.size, props.num, t);
              }}
            >
              <Refresh fontSize="large" style={{ color: "#a3aed0" }} />
            </IconButton>
          </Tooltip>
          {/* <Tooltip title={t("more-options")}>
              <IconButton onClick={listHandleClick}>
                <MoreVert fontSize="large" style={{ color: "#a3aed0" }} />
              </IconButton>
            </Tooltip> */}
          <Menu
            anchorEl={listAnchor}
            open={listOpen}
            onClose={listHandleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem
              onClick={(event) => {
                console.log("should delete all items");
                listHandleClick(event);
                setIsAllItems(true);
                setDeleteDialogOpen(true);
              }}
              style={{ color: "red" }}
            >
              {t("delete-all")}
            </MenuItem>
          </Menu>
        </div>
        <div className="crud-info-list">
          <div className="crud-info-item-header">
            <div className="crud-info-item-attr">{t("email-address")}</div>
            <div className="crud-info-item-attr">{t("receivers")}</div>
            <div className="crud-info-item-attr">{t("added")}</div>
            <div className="crud-info-item-attr">{t("document-id")}</div>
            <div className="crud-info-item-attr-settings">
              <IconButton style={{ margin: 0 }}>
                <MoreVert style={{ color: "#a3aed0" }} />
              </IconButton>
            </div>
          </div>
          <Menu
            anchorEl={itemAnchor}
            open={itemOpen}
            onClose={itemHandleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem
              onClick={(event) => {
                itemHandleClick(event);
                setIsAllItems(false);
                setDeleteDialogOpen(true);
              }}
              style={{ color: "red" }}
            >
              {t("delete")}
            </MenuItem>
            <MenuItem
              onClick={(event) => {
                itemHandleClick(event);
                setIsAllItems(false);
                setCheckpointsDialogOpen(true);
              }}
              style={{ color: "grey" }}
            >
              {t("checkpoints")}
            </MenuItem>
          </Menu>
          {(() => {
            const arr = [];
            if (props.entity) {
              for (let i = 0; i < props.entity.length; i++) {
                if (props.entity[i]) {
                  const date = NodeJSDateToJS(props.entity[i].createdAt);
                  console.log(date);
                  arr.push(
                    <Tooltip
                      title={t("click-to-view-more")}
                      key={props.entity[i]._id}
                    >
                      <div className="crud-info-item">
                        <div
                          className="crud-info-item-attr"
                          onClick={() => {
                            setSelectedItem(props.entity[i]);
                            setIsAdd(false);
                            setUpdateDialogOpen(true);
                          }}
                        >
                          {props.entity[i].email}
                        </div>
                        <div
                          className="crud-info-item-attr"
                          onClick={() => {
                            setSelectedItem(props.entity[i]);
                            setIsAdd(false);
                            setUpdateDialogOpen(true);
                          }}
                        >
                          {props.entity[i].receivers.map((receiver, index) => (
                            <div key={index}>{receiver}</div>
                          ))}
                        </div>
                        <div
                          className="crud-info-item-attr"
                          onClick={() => {
                            setSelectedItem(props.entity[i]);
                            setIsAdd(false);
                            setUpdateDialogOpen(true);
                          }}
                        >
                          {lang === "ar"
                            ? `${date.day} ${monthInLetters.get(date.month)}، ${
                                date.year
                              }`
                            : `${monthInLetters.get(date.month)} ${date.day}, ${
                                date.year
                              }`}
                        </div>
                        <div
                          className="crud-info-item-attr"
                          onClick={() => {
                            setSelectedItem(props.entity[i]);
                            setIsAdd(false);
                            setUpdateDialogOpen(true);
                          }}
                        >
                          {props.entity[i]._id}
                        </div>
                        <div className="crud-info-item-attr-settings">
                          <IconButton
                            style={{ margin: 0 }}
                            onClick={(event) => {
                              setSelectedItem(props.entity[i]);
                              itemHandleClick(event);
                            }}
                          >
                            <MoreVert style={{ color: "#a3aed0" }} />
                          </IconButton>
                        </div>
                      </div>
                    </Tooltip>
                  );
                }
              }
            }
            return arr;
          })()}
        </div>
        <div className="crud-pages-container">
          <TablePagination
            component="div"
            count={props.numericStats.all}
            page={props.num}
            onPageChange={handleChangePage}
            rowsPerPage={props.size}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
      </div>
    </div>
  );
};

export default SenderCRUD;
