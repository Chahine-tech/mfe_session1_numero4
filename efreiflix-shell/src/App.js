import React, { Suspense } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

const Header = React.lazy(() => import("header/Header"));
const Films = React.lazy(() => import("films/Films"));
const About = React.lazy(() => import("about/About"));

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
                            <Suspense
                                fallback={
                                    <div className="flex items-center justify-center min-h-screen">
                                        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
                                    </div>
                                }
                            >
                                <div className="container mx-auto px-4 py-16">
                                    <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl shadow-xl p-8 text-center">
                                        <h2 className="text-4xl font-bold text-white mb-4">
                                            Bienvenue sur Efreiflix
                                        </h2>
                                        <p className="text-xl text-gray-200 mb-8">
                                            Découvrez un monde de divertissement
                                            illimité
                                        </p>
                                        <div className="space-y-4">
                                            <p className="text-lg text-gray-300">
                                                Contenu principal de
                                                l'application...
                                            </p>
                                            <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105">
                                                Commencer
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </Suspense>
                        }
                    />

                    <Route
                        path="/parcourir"
                        element={
                            <Suspense
                                fallback={
                                    <div>Chargement des informations...</div>
                                }
                            >
                                <About />
                            </Suspense>
                        }
                    />
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
