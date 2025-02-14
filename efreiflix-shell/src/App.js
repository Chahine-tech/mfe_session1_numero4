import React, { Suspense, useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

const Header = React.lazy(() => import('header/Header'));
const Player = React.lazy(() => import('player/Player'));
const Footer = React.lazy(() => import('footer/Footer'));

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
  font-family: 'Montserrat', sans-serif;
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
    font-family: 'Montserrat', sans-serif;
  }
  
  p {
    font-size: 1.4rem;
    max-width: 600px;
    line-height: 1.6;
    color: rgba(255,255,255,0.8);
    font-family: 'Montserrat', sans-serif;
  }
`;

const SectionTitle = styled.h3`
  font-size: 1.8rem;
  margin: 2rem 0;
  position: relative;
  padding-left: 20px;

  &:before {
    content: '';
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

const ItemCard = styled.div`
  border-radius: 4px;
  overflow: hidden;
  transition: transform 0.3s ease;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-5px);
    
    img {
      opacity: 0.8;
    }
  }

  img {
    width: 100%;
    height: 330px;
    object-fit: cover;
    transition: opacity 0.3s ease;
  }
`;

const App = () => {
  const [isPlayerLoaded, setIsPlayerLoaded] = useState(false);

  return (
    <>
      <GlobalStyle />
      <MainContainer>
        <Suspense fallback={<div style={{ color: 'white', padding: '1rem' }}>Chargement du header...</div>}>
          <Header />
        </Suspense>

        <ContentArea>
          <HeroSection>
            <h2>Bienvenue sur EFREIFlix</h2>
            <p>Des milliers de films, séries et documentaires à découvrir. Regardez où vous voulez. Annulez quand vous voulez.</p>
          </HeroSection>

          <SectionTitle>Tendances actuelles</SectionTitle>
          <ItemsGrid>
            {[...Array(6)].map((_, i) => (
              <ItemCard key={i} onClick={() => setIsPlayerLoaded(true)}>
                <img 
                  src={`https://picsum.photos/300/450?random=${i}`} 
                  alt="Content placeholder" 
                />
              </ItemCard>
            ))}
          </ItemsGrid>

          <SectionTitle>Séries populaires</SectionTitle>
          <ItemsGrid>
            {[...Array(6)].map((_, i) => (
              <ItemCard key={i} onClick={() => setIsPlayerLoaded(true)}>
                <img 
                  src={`https://picsum.photos/300/450?random=${i + 10}`} 
                  alt="Content placeholder" 
                />
              </ItemCard>
            ))}
          </ItemsGrid>
        </ContentArea>

        {
          isPlayerLoaded && (
            <Suspense fallback={<div style={{ color: 'white', padding: '1rem' }}>Chargement du lecteur vidéo...</div>}>
              <Player onClose={() => setIsPlayerLoaded(false)} />
            </Suspense>
          )
        }

        <Suspense fallback={<div style={{ color: 'white', padding: '1rem' }}>Chargement du footer...</div>}>
          <Footer />
        </Suspense>
      </MainContainer>
    </>
  );
};

export default App;