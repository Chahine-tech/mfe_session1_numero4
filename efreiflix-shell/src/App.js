import React, { Suspense } from 'react';

const Breadcrumbs = React.lazy(() => import('breadcrumbs/Breadcrumbs'));

const App = () => {
  return (
    <div>
      <Suspense fallback={<div>Chargement du breadcrumbs...</div>}>
        <Breadcrumbs />
      </Suspense>
    </div>
  );
};

export default App;