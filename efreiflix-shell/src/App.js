import React, { Suspense } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

const Header = React.lazy(() => import("header/Header"));
const Skeleton = React.lazy(() => import("skeleton/Skeleton"));
const Films = React.lazy(() => import("films/Films"));

const App = () => {
    return (
        <Router>
            <Suspense fallback={<div>Chargement du header...</div>}>
                <Header />
            </Suspense>

            <main style={{ padding: "2rem" }}>
                <Routes>
                    {/* Page d'accueil */}
                    <Route
                        path="/"
                        element={
                            <Suspense fallback={<div>Chargement...</div>}>
                                <div>
                                    <h2>Bienvenue sur Efreiflix</h2>
                                    <p>Contenu principal de l'application...</p>

                                    <Suspense
                                        fallback={
                                            <div>Chargement du skeleton...</div>
                                        }
                                    >
                                        <Skeleton />
                                    </Suspense>
                                </div>
                            </Suspense>
                        }
                    />

                    {/* Page films SEULEMENT sur /films */}
                    <Route
                        path="/films"
                        element={
                            <Suspense
                                fallback={<div>Chargement des films...</div>}
                            >
                                <Films />
                            </Suspense>
                        }
                    />
                </Routes>
            </main>
        </Router>
    );
};

export default App;
