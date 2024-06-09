import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useTranslation } from "react-i18next";

const AdminDeleteDialog = (props) => {
  const { open, setOpen, isAll, deleteItem, data } = props;
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
            deleteItem(data);
            setOpen(false);
          }}
          autoFocus
        >
          {t("delete")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AdminDeleteDialog;
