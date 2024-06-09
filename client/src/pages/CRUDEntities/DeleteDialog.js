import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useTranslation } from "react-i18next";

const DeleteDialog = (props) => {
  const { open, setOpen, isAll, deleteItem, deleteAll, data } = props;
  const { t } = useTranslation();
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle id="alert-dialog-title">
        {t("delete-confirmation")}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {isAll
            ? t("delete-confirmation-all-desc")
            : t("delete-confirmation-one-desc")}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)}>{t("cancel")}</Button>
        <Button
          onClick={() => {
            if (isAll) deleteAll(data);
            else deleteItem(data);
            setOpen(false);
          }}
          autoFocus
        >
          {isAll ? t("delete-all") : t("delete")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
