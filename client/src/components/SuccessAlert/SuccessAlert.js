import { Alert, Grow } from "@mui/material";
import { useTranslation } from "react-i18next";

const SuccessAlert = (props) => {
  const { t } = useTranslation();
  return (
    <Grow in={props.isSuccess}>
      <Alert
        sx={{ position: "fixed", bottom: 30, left: 30, zIndex: 999 }}
        severity="success"
      >
        {t(props.msg)}
      </Alert>
    </Grow>
  );
};

export default SuccessAlert;
