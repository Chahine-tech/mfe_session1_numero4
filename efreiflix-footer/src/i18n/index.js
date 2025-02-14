import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    fr: {
      translation: {
        navigation: {
          home: "Accueil",
          series: "Séries",
          movies: "Films",
          newReleases: "Nouveautés",
          title: "Navigation",
        },
        legal: {
          privacy: "Confidentialité",
          terms: "Conditions d'utilisation",
          cookies: "Préférences cookies",
          title: "Légal",
        },
        social: {
          title: "Social",
          follow: "Suivez-nous",
        },
        copyright: "© {{year}} EFREIFlix. Tous droits réservés.",
      },
    },
    en: {
      translation: {
        navigation: {
          home: "Home",
          series: "Series",
          movies: "Movies",
          newReleases: "New Releases",
          title: "Navigation",
        },
        legal: {
          privacy: "Privacy",
          terms: "Terms of Use",
          cookies: "Cookie Preferences",
          title: "Legal",
        },
        social: {
          title: "Social",
          follow: "Follow us",
        },
        copyright: "© {{year}} EFREIFlix. All rights reserved.",
      },
    },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
