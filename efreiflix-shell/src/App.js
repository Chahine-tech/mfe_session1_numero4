import React, { Suspense, useEffect, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";

const Header = React.lazy(() => import("header/Header"));
const Player = React.lazy(() => import("player/Player"));
const Footer = React.lazy(() => import("footer/Footer"));
const ItemCard = React.lazy(() => import("item/ItemCard"));

const GlobalStyle = createGlobalStyle`
  * {
    font-family: 'Montserrat', sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  // scrollbar
  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background:rgb(0, 0, 0);
  }

  ::-webkit-scrollbar-thumb {
    background: red;
    border-radius: 5px;
  }
`;

const MainContainer = styled.div`
  background-color: #141414;
  color: white;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: "Montserrat", sans-serif;
`;

const ContentArea = styled.main`
  flex: 1;
  padding: 4% 4% 0;
  margin-top: 80px; // Hauteur du header
`;

const HeroSection = styled.div`
  margin-bottom: 4rem;
  h2 {
    font-size: 3.5rem;
    margin-bottom: 1.5rem;
    background: linear-gradient(45deg, #e50914, #eb144c);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-family: "Montserrat", sans-serif;
  }

  p {
    font-size: 1.4rem;
    max-width: 600px;
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.8);
    font-family: "Montserrat", sans-serif;
  }
`;

const SectionTitle = styled.h3`
  font-size: 1.8rem;
  margin: 2rem 0;
  position: relative;
  padding-left: 20px;

  &:before {
    content: "";
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 5px;
    height: 70%;
    background: #e50914;
  }
`;

const ItemsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1.5rem;
  margin-bottom: 4rem;
`;

// Add this sample data (you can move it to a separate file later)
const sampleContent = [
  {
    id: 1,
    title: "Stranger Things",
    description:
      "Une série de science-fiction mystérieuse qui suit les aventures d'un groupe d'enfants dans les années 80.",
  },
  {
    id: 2,
    title: "The Crown",
    description:
      "Un drame historique sur la vie de la reine Elizabeth II et les événements qui ont façonné le 20e siècle.",
  },
  {
    id: 3,
    title: "Breaking Bad",
    description:
      "L'histoire d'un professeur de chimie qui se tourne vers la fabrication de méthamphétamine après un diagnostic de cancer.",
  },
  {
    id: 4,
    title: "The Witcher",
    description:
      "Un chasseur de monstres aux pouvoirs surnaturels lutte pour trouver sa place dans un monde où les humains sont souvent plus méchants que les bêtes.",
  },
  {
    id: 5,
    title: "Black Mirror",
    description:
      "Une série d'anthologie qui explore un futur proche où les innovations technologiques ont des conséquences inattendues.",
  },
  {
    id: 6,
    title: "La Casa de Papel",
    description:
      "Un groupe de braqueurs exceptionnels attaque la Fabrique nationale de la monnaie et du timbre.",
  },
];

const App = () => {
  const [isPlayerLoaded, setIsPlayerLoaded] = useState(false);

  // Add useEffect for escape key handling
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape" && isPlayerLoaded) {
        setIsPlayerLoaded(false);
      }
    };

    // Add event listener when component mounts
    document.addEventListener("keydown", handleEscape);

    // Cleanup event listener when component unmounts
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isPlayerLoaded]); // Only re-run effect if isPlayerLoaded changes

  return (
    <>
      <GlobalStyle />
      <MainContainer>
        <Suspense
          fallback={
            <div style={{ color: "white", padding: "1rem" }}>
              Chargement du header...
            </div>
          }
        >
          <Header />
        </Suspense>

        <ContentArea>
          <HeroSection>
            <h2>Bienvenue sur EFREIFlix</h2>
            <p>
              Des milliers de films, séries et documentaires à découvrir.
              Regardez où vous voulez. Annulez quand vous voulez.
            </p>
          </HeroSection>

          <SectionTitle>Tendances actuelles</SectionTitle>
          <ItemsGrid>
            {sampleContent.map((content, i) => (
              <Suspense
                key={content.id}
                fallback={
                  <div style={{ height: 330, background: "#1a1a1a" }}></div>
                }
              >
                <ItemCard
                  imageSrc={`https://picsum.photos/300/450?random=${i}`}
                  alt={content.title}
                  title={content.title}
                  description={content.description}
                  onClick={() => setIsPlayerLoaded(true)}
                />
              </Suspense>
            ))}
          </ItemsGrid>

          <SectionTitle>Séries populaires</SectionTitle>
          <ItemsGrid>
            {sampleContent.map((content, i) => (
              <Suspense
                key={content.id}
                fallback={
                  <div style={{ height: 330, background: "#1a1a1a" }}></div>
                }
              >
                <ItemCard
                  imageSrc={`https://picsum.photos/300/450?random=${i + 10}`}
                  alt={content.title}
                  title={content.title}
                  description={content.description}
                  onClick={() => setIsPlayerLoaded(true)}
                />
              </Suspense>
            ))}
          </ItemsGrid>
        </ContentArea>

        {isPlayerLoaded && (
          <Suspense
            fallback={
              <div style={{ color: "white", padding: "1rem" }}>
                Chargement du lecteur vidéo...
              </div>
            }
          >
            <Player onClose={() => setIsPlayerLoaded(false)} />
          </Suspense>
        )}

        <Suspense
          fallback={
            <div style={{ color: "white", padding: "1rem" }}>
              Chargement du footer...
            </div>
          }
        >
          <Footer />
        </Suspense>
      </MainContainer>
    </>
  );
};

export default App;
