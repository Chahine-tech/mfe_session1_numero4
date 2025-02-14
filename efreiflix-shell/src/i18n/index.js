import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { initI18n } from "./config";

i18n.use(initReactI18next).init({
  resources: {
    fr: {
      translation: {
        welcome: {
          title: "Bienvenue sur EFREIFlix",
          description:
            "Des milliers de films, séries et documentaires à découvrir. Regardez où vous voulez. Annulez quand vous voulez.",
        },
        sections: {
          trending: "Tendances actuelles",
          popularSeries: "Séries populaires",
          newReleases: "Nouveautés",
          continueWatching: "Continuer à regarder",
          myList: "Ma liste",
          recommended: "Recommandé pour vous",
        },
        loading: {
          header: "Chargement du header...",
          content: "Chargement du contenu...",
          player: "Chargement du lecteur vidéo...",
          footer: "Chargement du footer...",
        },
        errors: {
          loadFailed: "Échec du chargement",
          retry: "Réessayer",
          generic: "Une erreur est survenue",
        },
        movies: {
          strangerThings: {
            title: "Stranger Things",
            description:
              "Une série de science-fiction mystérieuse qui suit les aventures d'un groupe d'enfants dans les années 80.",
          },
          theCrown: {
            title: "The Crown",
            description:
              "Un drame historique sur la vie de la reine Elizabeth II et les événements qui ont façonné le 20e siècle.",
          },
          breakingBad: {
            title: "Breaking Bad",
            description:
              "L'histoire d'un professeur de chimie qui se tourne vers la fabrication de méthamphétamine après un diagnostic de cancer.",
          },
          theWitcher: {
            title: "The Witcher",
            description:
              "Un chasseur de monstres aux pouvoirs surnaturels lutte pour trouver sa place dans un monde où les humains sont souvent plus méchants que les bêtes.",
          },
          blackMirror: {
            title: "Black Mirror",
            description:
              "Une série d'anthologie qui explore un futur proche où les innovations technologiques ont des conséquences inattendues.",
          },
          casaDePapel: {
            title: "La Casa de Papel",
            description:
              "Un groupe de braqueurs exceptionnels attaque la Fabrique nationale de la monnaie et du timbre.",
          },
        },
      },
    },
    en: {
      translation: {
        welcome: {
          title: "Welcome to EFREIFlix",
          description:
            "Thousands of movies, TV shows and documentaries to discover. Watch anywhere. Cancel anytime.",
        },
        sections: {
          trending: "Trending Now",
          popularSeries: "Popular Series",
          newReleases: "New Releases",
          continueWatching: "Continue Watching",
          myList: "My List",
          recommended: "Recommended for You",
        },
        loading: {
          header: "Loading header...",
          content: "Loading content...",
          player: "Loading video player...",
          footer: "Loading footer...",
        },
        errors: {
          loadFailed: "Failed to load",
          retry: "Retry",
          generic: "An error occurred",
        },
        movies: {
          strangerThings: {
            title: "Stranger Things",
            description:
              "A mysterious sci-fi series following the adventures of a group of children in the 1980s.",
          },
          theCrown: {
            title: "The Crown",
            description:
              "A historical drama about the life of Queen Elizabeth II and the events that shaped the 20th century.",
          },
          breakingBad: {
            title: "Breaking Bad",
            description:
              "The story of a chemistry teacher who turns to manufacturing methamphetamine after a cancer diagnosis.",
          },
          theWitcher: {
            title: "The Witcher",
            description:
              "A supernatural monster hunter struggles to find his place in a world where humans are often more wicked than beasts.",
          },
          blackMirror: {
            title: "Black Mirror",
            description:
              "An anthology series exploring a near future where technological innovations have unexpected consequences.",
          },
          casaDePapel: {
            title: "Money Heist",
            description:
              "An exceptional group of robbers attempts to carry out the most perfect robbery in Spanish history.",
          },
        },
      },
    },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

initI18n(i18n);
export default i18n;
