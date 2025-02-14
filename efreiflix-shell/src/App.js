import React, { Suspense, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import styled, { createGlobalStyle } from "styled-components";
import "./i18n";

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

const App = () => {
  const [isPlayerLoaded, setIsPlayerLoaded] = useState(false);
  const { t } = useTranslation();

  // Create the content array using translations
  const sampleContent = [
    {
      id: 1,
      title: t("movies.strangerThings.title"),
      description: t("movies.strangerThings.description"),
    },
    {
      id: 2,
      title: t("movies.theCrown.title"),
      description: t("movies.theCrown.description"),
    },
    {
      id: 3,
      title: t("movies.breakingBad.title"),
      description: t("movies.breakingBad.description"),
    },
    {
      id: 4,
      title: t("movies.theWitcher.title"),
      description: t("movies.theWitcher.description"),
    },
    {
      id: 5,
      title: t("movies.blackMirror.title"),
      description: t("movies.blackMirror.description"),
    },
    {
      id: 6,
      title: t("movies.casaDePapel.title"),
      description: t("movies.casaDePapel.description"),
    },
  ];

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
        <Suspense fallback={<div>{t("loading.header")}</div>}>
          <Header />
        </Suspense>

        {isPlayerLoaded ? (
          <Suspense fallback={<div>{t("loading.player")}</div>}>
            <Player onClose={() => setIsPlayerLoaded(false)} />
          </Suspense>
        ) : (
          <ContentArea>
            <HeroSection>
              <h2>{t("welcome.title")}</h2>
              <p>{t("welcome.description")}</p>
            </HeroSection>

            <SectionTitle>{t("sections.trending")}</SectionTitle>
            <ItemsGrid>
              {sampleContent.map((content, i) => (
                <Suspense
                  key={content.id}
                  fallback={
                    <div style={{ height: 330, background: "#1a1a1a" }} />
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

            <SectionTitle>{t("sections.popularSeries")}</SectionTitle>
            <ItemsGrid>
              {sampleContent.map((content, i) => (
                <Suspense
                  key={content.id}
                  fallback={
                    <div style={{ height: 330, background: "#1a1a1a" }} />
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
        )}

        <Suspense fallback={<div>{t("loading.footer")}</div>}>
          <Footer />
        </Suspense>
      </MainContainer>
    </>
  );
};

export default App;
