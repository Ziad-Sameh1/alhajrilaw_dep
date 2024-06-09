import { store } from "../redux/store";
import { setLanguage } from "../redux/slices/sessionStorageSlice";
import i18n from "../i18n/i18n";

const changeLanguage = (theme) => {
  const lang = store.getState().language;
  if (lang === "en") {
    store.dispatch(setLanguage("ar"));
    i18n.changeLanguage("ar");
  } else {
    store.dispatch(setLanguage("en"));
    i18n.changeLanguage("en");
  }
  document.body.dir = i18n.dir();
  theme.direction = i18n.dir();
};

const setCurrentLanguage = (lang) => {
  store.dispatch(setLanguage(lang));
  // i18n.changeLanguage(lang);
  window.location.replace(`?lng=${lang}`);
  window.localStorage.setItem("lang", lang);
};

const EnArTxt = (className, lang) => {
  if (lang === "ar") return className + " txt-ar";
  else return className;
};

export { changeLanguage, setCurrentLanguage, EnArTxt };
