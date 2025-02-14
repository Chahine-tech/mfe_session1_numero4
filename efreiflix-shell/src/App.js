import React, { Suspense } from 'react';

const Breadcrumbs = React.lazy(() => import('breadcrumbs/Breadcrumbs'));
const Films = React.lazy(() => import('films/Films'));
const About = React.lazy(() => import('about/About'));

const App = () => {
  return (
    <div>
      <Suspense fallback={<div>Chargement du breadcrumbs...</div>}>
        <Breadcrumbs />
      </Suspense>

      <main style={{ padding: '2rem' }}>
        <h2>Bienvenue sur Efreiflix</h2>
        <p>Contenu principal de l'application...</p>
        
        <Suspense fallback={<div>Chargement des films...</div>}>
          <Films />
        </Suspense>

        <Suspense fallback={<div>Chargement de l'about...</div>}>
          <About />
        </Suspense>
      </main>
    </div>
  );
};

export default App;