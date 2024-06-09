import React, { useEffect, useState } from "react";
import {
  Button,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  TextField,
  TablePagination,
  useMediaQuery,
} from "@mui/material";
import { useSelector } from "react-redux";
import { MoreVert, Refresh, Search } from "@mui/icons-material";
import InputAdornment from "@mui/material/InputAdornment";
import { NodeJSDateToJS } from "../../../utils/HelperFunctions";
import {
  GetReviewCodes,
  Delete,
  DeleteAll,
  GetReviewCodesByName,
} from "./ReviewCodeMethods";
import { useTranslation } from "react-i18next";
import DeleteDialog from "../DeleteDialog";
import ReviewCodesUpdateDialog from "./ReviewCodesUpdateDialog";
import { useNavigate } from "react-router-dom";
import { checkLoginStatus } from "../../../services/AdminService";
import { configureStates } from "../../../utils/FeedbackStates";

const monthInLetters = new Map();

const getRandomCode = () => {
  let res = "";
  const chars =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  for (let i = 0; i < 8; i++) {
    res += chars[Math.floor(Math.random() * chars.length)];
  }
  return res;
};

const ReviewCodesCRUD = (props) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const isMobileScreen = useMediaQuery("(max-width: 768px)");
  const [selectedItem, setSelectedItem] = useState({});
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [updateDialogOpen, setUpdateDialogOpen] = React.useState(false);
  const [isAllItems, setIsAllItems] = React.useState(false);
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
    Delete(
      item,
      props.entitySetter,
      props.numericSetter,
      props.graphSetter,
      props.size,
      props.num,
      t
    );
  };
  const deleteAll = (item) => {
    DeleteAll(
      item,
      props.entitySetter,
      props.numericSetter,
      props.graphSetter,
      props.size,
      props.num,
      t
    );
  };
  return (
    <div className="crud-div-container">
      <DeleteDialog
        open={deleteDialogOpen}
        setOpen={setDeleteDialogOpen}
        isAll={isAllItems}
        deleteItem={deleteItem}
        deleteAll={deleteAll}
        data={selectedItem}
      />
      <ReviewCodesUpdateDialog
        open={updateDialogOpen}
        setOpen={setUpdateDialogOpen}
        isAdd={isAdd}
        data={selectedItem}
        setData={setSelectedItem}
        entitySetter={props.entitySetter}
        numericSetter={props.numericSetter}
        graphSetter={props.graphSetter}
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
              GetReviewCodesByName(
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
            placeholder={t("search-code")}
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
              const code = getRandomCode();
              setSelectedItem({ code: code });
              setIsAdd(true);
              setUpdateDialogOpen(true);
            }}
          >
            {t("add-review-code")}
          </Button>
          <Tooltip title={t("refresh")}>
            <IconButton
              onClick={() => {
                props.searchSetter("");
                GetReviewCodes(props.entitySetter, props.size, props.num, t);
              }}
            >
              <Refresh fontSize="large" style={{ color: "#a3aed0" }} />
            </IconButton>
          </Tooltip>
          <Tooltip title={t("more-options")}>
            <IconButton onClick={listHandleClick}>
              <MoreVert fontSize="large" style={{ color: "#a3aed0" }} />
            </IconButton>
          </Tooltip>
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
            <div className="crud-info-item-attr" style={{ width: "32%" }}>
              {t("code")}
            </div>
            <div className="crud-info-item-attr" style={{ width: "32%" }}>
              {t("status")}
            </div>
            <div className="crud-info-item-attr" style={{ width: "32%" }}>
              {t("added")}
            </div>
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
          </Menu>
          {(() => {
            const arr = [];
            if (props.entity) {
              for (let i = 0; i < props.entity.length; i++) {
                if (props.entity[i]) {
                  const date = NodeJSDateToJS(props.entity[i].createdAt);
                  arr.push(
                    <Tooltip
                      title={t("click-to-view-more")}
                      key={props.entity[i]._id}
                    >
                      <div className="crud-info-item">
                        <div
                          className="crud-info-item-attr"
                          style={{ width: "32%" }}
                          onClick={() => {
                            setSelectedItem(props.entity[i]);
                            setIsAdd(false);
                            setUpdateDialogOpen(true);
                          }}
                        >
                          {props.entity[i].code}
                        </div>
                        <div
                          className="crud-info-item-attr"
                          style={{ width: "32%" }}
                          onClick={() => {
                            setSelectedItem(props.entity[i]);
                            setIsAdd(false);
                            setUpdateDialogOpen(true);
                          }}
                        >
                          {t(props.entity[i].status)}
                        </div>
                        <div
                          className="crud-info-item-attr"
                          style={{
                            width: "32%",
                          }}
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

export default ReviewCodesCRUD;
