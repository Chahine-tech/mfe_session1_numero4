# EFREIFlix - Démo Micro-Frontends avec Webpack Module Federation

Ce projet est un exemple minimaliste de mise en œuvre des micro-frontends utilisant Webpack Module Federation et React. Il se compose de deux applications :
- Une application "Shell" (hôte)
- Un micro-frontend "Header" (remote)

## Structure du Projet

```
efreiflix/
├── efreiflix-header/          # Micro-frontend Header
│   ├── public/
│   │   └── index.html        # Template HTML pour le développement standalone
│   ├── src/
│   │   ├── components/
│   │   │   └── Header.js     # Composant Header
│   │   └── index.js          # Point d'entrée
│   ├── package.json          # Dépendances
│   └── webpack.config.js      # Configuration Webpack + Module Federation
│
└── efreiflix-shell/          # Application Shell (hôte)
    ├── public/
    │   └── index.html        # Template HTML
    ├── src/
    │   ├── App.js            # Composant principal avec import du Header
    │   └── index.js          # Point d'entrée
    ├── package.json          # Dépendances
    └── webpack.config.js      # Configuration Webpack + Module Federation
```

## Explication Détaillée

### 1. Micro-Frontend Header (`efreiflix-header`)

#### 📄 package.json
\`\`\`json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@babel/core": "^7.24.0",
    "@babel/preset-react": "^7.23.3",
    // ... autres dépendances
  }
}
\`\`\`
- Définit les dépendances React nécessaires
- Inclut Webpack et Babel pour la transpilation et le bundling
- Scripts `start` et `build` pour le développement et la production

#### 📄 webpack.config.js
\`\`\`javascript
new ModuleFederationPlugin({
  name: "header",
  filename: "remoteEntry.js",
  exposes: {
    "./Header": "./src/components/Header"
  },
  shared: {
    react: { singleton: true },
    "react-dom": { singleton: true }
  }
})
\`\`\`
Points clés :
- `name: "header"` : Identifiant unique du micro-frontend
- `filename: "remoteEntry.js"` : Point d'entrée pour Module Federation
- `exposes` : Déclare quels composants sont accessibles aux autres applications
- `shared` : Partage des dépendances React pour éviter les doublons

#### 📄 src/components/Header.js
\`\`\`javascript
const Header = () => {
  return (
    <header style={{ 
      padding: '1rem', 
      backgroundColor: '#1a1a1a',
      color: 'white'
    }}>
      <h1>EFREIFlix</h1>
    </header>
  );
};
\`\`\`
- Composant React simple
- Styles inline pour la démonstration
- Exporté pour être utilisé par l'application Shell

#### 📄 src/index.js
\`\`\`javascript
import React from 'react';
import { createRoot } from 'react-dom/client';
import Header from './components/Header';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<Header />);
\`\`\`
- Point d'entrée pour le développement standalone
- Permet de tester le Header indépendamment

### 2. Application Shell (`efreiflix-shell`)

#### 📄 webpack.config.js
\`\`\`javascript
new ModuleFederationPlugin({
  name: "shell",
  remotes: {
    header: "header@http://localhost:3001/remoteEntry.js"
  },
  shared: {
    react: { singleton: true },
    "react-dom": { singleton: true }
  }
})
\`\`\`
Points clés :
- `name: "shell"` : Identifiant de l'application hôte
- `remotes` : Déclare les micro-frontends à importer
- `shared` : Même configuration de partage que le Header

#### 📄 src/App.js
\`\`\`javascript
const Header = React.lazy(() => import('header/Header'));

const App = () => {
  return (
    <div>
      <Suspense fallback={<div>Chargement du header...</div>}>
        <Header />
      </Suspense>
      <main>
        <h2>Bienvenue sur EFREIFlix</h2>
        <p>Contenu principal de l'application...</p>
      </main>
    </div>
  );
};
\`\`\`
Points clés :
- `React.lazy()` : Chargement dynamique du Header
- `Suspense` : Gestion du chargement asynchrone
- Import depuis `header/Header` : Syntaxe spéciale de Module Federation

## Comment ça marche ?

1. Le micro-frontend Header expose son composant via Module Federation
2. L'application Shell déclare le Header comme "remote" dans sa configuration
3. Le Shell charge dynamiquement le Header quand nécessaire
4. Les dépendances React sont partagées pour éviter les doublons

## Installation et Démarrage

1. Dans le dossier `efreiflix-header` :
```bash
npm install
npm start
```

2. Dans le dossier `efreiflix-shell` :
```bash
npm install
npm start
```

3. Accéder aux applications :
- Shell : http://localhost:3000
- Header (standalone) : http://localhost:3001

## Points Clés à Retenir

1. **Module Federation** permet de partager du code entre applications
2. Le **chargement dynamique** améliore les performances
3. Le **partage des dépendances** évite les doublons
4. Les micro-frontends peuvent être développés et testés **indépendamment**
5. L'application Shell **orchestre** l'assemblage des micro-frontends

## Pour Aller Plus Loin

- Ajouter d'autres micro-frontends
- Implémenter un système de routing
- Ajouter des tests
- Mettre en place un système de déploiement
- Gérer la communication entre micro-frontends
