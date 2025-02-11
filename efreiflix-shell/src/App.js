import React, { Suspense } from 'react';

const Header = React.lazy(() => import('header/Header'));
const Player = React.lazy(() => import('player/Player'));

const App = () => {
  return (
    <div>
      <Suspense fallback={<div>Chargement du header...</div>}>
        <Header />
      </Suspense>

      <main style={{ padding: '2rem' }}>
        <h2>Bienvenue sur Efreiflix</h2>
        <Suspense fallback={<div>Chargement du lecteur vidéo...</div>}>
          <Player />
        </Suspense>
      </main>
    </div>
  );
};

export default App;