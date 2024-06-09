import "./App.scss";
import { CssBaseline } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { websiteRoutes, dashboardRoutes } from "./routes/Routes";
import AccessLoginPage from "./pages/AccessLogin";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { themeOptions } from "./styles/theme";
import NotFound from "./pages/NotFound";
import SettingsPage from "./pages/SettingsPage";
import HomePage from "./pages/Home";
import DashboardMain from "./pages/DashboardMain";
import FounderSpeech from "./pages/FounderSpeech";
import OurVision from "./pages/OurVision";
import OurMission from "./pages/OurMission";
import AboutUs from "./pages/AboutUs";
import HowToReachUs from "./pages/HowToReachUs";
import ContactUS from "./pages/ContactUs";
import OfficeStaff from "./pages/OfficeStaff";
import OurClients from "./pages/OurClients";
import BookAppointment from "./pages/BookAppointment";
import Reviews from "./pages/Reviews";
import EnterReview from "./pages/EnterReview";
import FAQ from "./pages/FAQ";
import CRUDPage from "./pages/CRUDEntities";
import TxtPage from "./pages/TxtPage";
import AddNewPage from "./pages/AddNewPage";
import AdminLogin from "./pages/AdminLogin";
import BasicLayout from "./components/BasicLayout/BasicLayout";
import AdminLayout from "./components/AdminLayout/AdminLayout";
import { setLanguage } from "./redux/slices/sessionStorageSlice";
import { setCurrentLanguage } from "./utils/Language";
import EnterReviewCodePage from "./pages/EnterReviewCode";
import SliderPage from "./pages/SliderPage";
import LatestNewsPage from "./pages/LatestNews";

const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

const cacheLtr = createCache({
  key: "muiltr",
});

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    if (window.localStorage.getItem("lang")) {
      dispatch(setLanguage(window.localStorage.getItem("lang").toString()));
      console.log(window.localStorage.getItem("lang"));
    }
    if (window.localStorage.getItem("lang") == null) {
      setCurrentLanguage("en");
    }
  }, []);
  const lang = useSelector((state) => state.language);
  const theme = useMemo(() => createTheme(themeOptions(lang)), [lang]);
  return (
    <CacheProvider value={lang === "ar" ? cacheRtl : cacheLtr}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/">
              <Route
                path={websiteRoutes.PAGE_ACCESS_LOGIN}
                element={<AccessLoginPage />}
              />
            </Route>
            <Route
              path={`/dashboard/${dashboardRoutes.PAGE_SHARES_TXT}`}
              element={<TxtPage />}
            />
            <Route path={"/*"} element={<BasicLayout />}>
              <Route path="page/:pageLink" element={<SliderPage />} />
              {/* <Route
                path={websiteRoutes.PAGE_ACCESS_LOGIN}
                element={<AccessLoginPage />}
              /> */}
              <Route
                index
                path={websiteRoutes.PAGE_HOME}
                element={<HomePage />}
              />
              <Route
                path={websiteRoutes.PAGE_FOUNDER_SPEECH}
                element={<FounderSpeech />}
              />
              <Route
                path={websiteRoutes.PAGE_OUR_VISION}
                element={<OurVision />}
              />
              <Route
                path={websiteRoutes.PAGE_OUR_MISSION}
                element={<OurMission />}
              />
              <Route path={websiteRoutes.PAGE_ABOUT_US} element={<AboutUs />} />
              <Route
                path={websiteRoutes.PAGE_HOW_TO_REACH_US}
                element={<HowToReachUs />}
              />
              <Route
                path={websiteRoutes.PAGE_CONTACT_US}
                element={<ContactUS />}
              />
              <Route
                path={websiteRoutes.PAGE_OFFICE_STAFF}
                element={<OfficeStaff />}
              />
              <Route
                path={websiteRoutes.PAGE_OUR_CLIENTS}
                element={<OurClients />}
              />
              <Route
                path={websiteRoutes.PAGE_BOOK_APPOINTMENT}
                element={<BookAppointment />}
              />
              <Route
                path={websiteRoutes.PAGE_LAST_NEWS}
                element={<LatestNewsPage />}
              />
              <Route path={websiteRoutes.PAGE_REVIEWS} element={<Reviews />} />
              <Route
                path={websiteRoutes.PAGE_ENTER_REVIEW}
                element={<EnterReview />}
              />
              <Route
                path={websiteRoutes.PAGE_ENTER_REVIEW_CODE}
                element={<EnterReviewCodePage />}
              />
              <Route path={websiteRoutes.PAGE_FAQ} element={<FAQ />} />
              <Route
                path={websiteRoutes.PAGE_NOT_FOUND}
                element={<NotFound />}
              />
            </Route>
            <Route
              path={`/dashboard/${dashboardRoutes.PAGE_ADMIN_LOGIN}`}
              element={<AdminLogin />}
            />
            <Route path={"/dashboard/"} element={<AdminLayout />}>
              <Route
                path={dashboardRoutes.PAGE_DASHBOARD_MAIN}
                element={<DashboardMain />}
              />
              <Route
                path={dashboardRoutes.PAGE_ADD_NEW_PAGE}
                element={<AddNewPage />}
              />
              <Route
                path={dashboardRoutes.PAGE_SHARES}
                element={<CRUDPage />}
              />
              <Route path={dashboardRoutes.PAGE_PAGES} element={<CRUDPage />} />
              <Route
                path={dashboardRoutes.PAGE_SETTINGS}
                element={<SettingsPage />}
              />
              <Route
                path={dashboardRoutes.PAGE_MESSAGES}
                element={<CRUDPage />}
              />
              <Route
                path={dashboardRoutes.PAGE_REVIEWS}
                element={<CRUDPage />}
              />
              <Route
                path={dashboardRoutes.PAGE_MODIFY_FAQ}
                element={<CRUDPage />}
              />
              <Route
                path={dashboardRoutes.PAGE_MODIFY_STAFF}
                element={<CRUDPage />}
              />
              <Route
                path={dashboardRoutes.PAGE_MODIFY_ADMINS}
                element={<CRUDPage />}
              />
              <Route
                path={dashboardRoutes.PAGE_MODIFY_CLIENTS}
                element={<CRUDPage />}
              />
              <Route
                path={dashboardRoutes.PAGE_MODIFY_APPOINTMENTS}
                element={<CRUDPage />}
              />
              <Route
                path={dashboardRoutes.PAGE_MODIFY_REVIEW_CODES}
                element={<CRUDPage />}
              />
              <Route
                path={dashboardRoutes.PAGE_LOCATIONS}
                element={<CRUDPage />}
              />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </CacheProvider>
  );
}

export default App;
