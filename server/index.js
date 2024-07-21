const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const { connect } = require("./database/db");
const app = express();
const { dirname } = require("path");
const appDir = dirname(require.main.filename);
const cookieParser = require("cookie-parser");

const websiteInfoRouter = require("./routes/WebsiteInfoRoutes");
const clientRouter = require("./routes/ClientRoutes");
``;
const FAQRouter = require("./routes/FAQRoutes");
const messageRouter = require("./routes/MessageRoutes");
const checkpointRouter = require("./routes/CheckpointRoutes");
const appointmentRouter = require("./routes/AppointmentRoutes");
const employeeRouter = require("./routes/EmployeeRoutes");
const reviewCodesRouter = require("./routes/ReviewCodesRoutes");
const reviewsRouter = require("./routes/ReviewRoutes");
const pageRouter = require("./routes/PageRoutes");
const adminRouter = require("./routes/AdminRoutes");
const userRouter = require("./routes/UserRoutes");
const sharesRouter = require("./routes/ShareRoutes");
const categoriesRouter = require("./routes/CategoryRoutes");
const jobsRouter = require("./routes/JobRoutes");

app.use(cors());
app.options('*', cors());
dotenv.config();
app.use(express.json({ limit: "500mb" }));
app.use(express.urlencoded({ limit: "500mb" }));
app.use(cookieParser());
app.use(helmet());
// app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(
  "/api/uploads/images/staff",
  express.static(`${appDir}/uploads/images/staff`)
);
app.use(
  "/api/uploads/images/clients",
  express.static(`${appDir}/uploads/images/clients`)
);
app.use(
  "/api/uploads/images/thumbnails",
  express.static(`${appDir}/uploads/pages`)
);
app.use("/api/uploads/videos/pages", express.static(`${appDir}/uploads/pages`));
app.use("/api/shares", express.static(`${appDir}/uploads/pdfs/shares`));

app.use("/api/info", websiteInfoRouter);
app.use("/api/clients", clientRouter);
app.use("/api/faqs", FAQRouter);
app.use("/api/messages", messageRouter);
app.use("/api/checkpoints", checkpointRouter);
app.use("/api/appointments", appointmentRouter);
app.use("/api/staff", employeeRouter);
app.use("/api/review-codes", reviewCodesRouter);
app.use("/api/reviews", reviewsRouter);
app.use("/api/pages", pageRouter);
app.use("/api/admins", adminRouter);
app.use("/api/senders", userRouter);
app.use("/api/shares", sharesRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/jobs", jobsRouter);
app.use("/", (req, res) => {
  res.status(200).json({
    msg: "Welcome to Alhajri Office Backend..",
  });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server Connected on PORT ${PORT}`);
  connect();
});
