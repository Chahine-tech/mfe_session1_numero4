export const initI18n = (i18n) => {
  // Initialize with stored language preference
  const storedLang = localStorage.getItem("preferred-language");
  if (storedLang) {
    i18n.changeLanguage(storedLang);
  }

  // Listen for language changes from other micro-frontends
  window.addEventListener("language-changed", (event) => {
    if (event.detail && i18n.language !== event.detail) {
      i18n.changeLanguage(event.detail);
    }
  });
};
