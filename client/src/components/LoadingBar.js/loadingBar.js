import { Box, LinearProgress } from "@mui/material";

const LoadingBar = (props) => {
  return (
    <Box
      sx={{
        width: "100%",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 10,
      }}
    >
      <LinearProgress />
    </Box>
  );
};

export default LoadingBar;
