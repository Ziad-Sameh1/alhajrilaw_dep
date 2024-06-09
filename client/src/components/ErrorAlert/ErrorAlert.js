import { Alert, Grow } from "@mui/material";
import { useTranslation } from "react-i18next";

const ErrorAlert = (props) => {
  const { t } = useTranslation();
  return (
    <Grow in={props.isError}>
      <Alert
        sx={{ position: "fixed", bottom: 30, left: 30, zIndex: 999 }}
        severity="error"
      >
        {t(props.errorMessage)}
      </Alert>
    </Grow>
  );
};

export default ErrorAlert;
