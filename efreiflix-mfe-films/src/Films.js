import React, { useEffect, useState } from "react";
import "./styles.css";

const Films = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        fetch("http://localhost:2066/movies")
            .then((response) => response.json()) // Convertit en JSON
            .then((data) => {
                console.log("Films récupérés :", data); // Affiche les films dans la console
                setMovies(data); // Met à jour l'état avec les films
            })
            .catch((error) =>
                console.error("Erreur lors du chargement des films :", error)
            );
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Films MFE</h1>
            <div className="bg-white shadow-md rounded-lg p-6">
                {movies.length === 0 ? (
                    <p className="text-gray-700">Chargement des films...</p>
                ) : (
                    <ul className="space-y-6">
                        {movies.map((movie) => (
                            <div
                                key={movie.id}
                                className=" bg-slate-200 shadow-lg rounded-lg overflow-hidden transform transition duration-50 hover:shadow-2xl hover:cursor-pointer hover:bg-slate-300"
                            >
                                <h2 className="text-xl font-bold text-gray-900">
                                    🎬 {movie.title}
                                </h2>
                                <p className="text-sm text-gray-500">
                                    {movie.year}
                                </p>
                                {/* Genres */}
                                <p className="mt-2 text-sm text-gray-700">
                                    <strong>Genres :</strong>{" "}
                                    {movie.genres.join(", ")}
                                </p>

                                {/* Description */}
                                <p className="mt-2 text-gray-700 text-sm line-clamp-3">
                                    {movie.description}
                                </p>

                                {/* Note */}
                                <div className="mt-3 flex items-center">
                                    <span className="text-yellow-500 text-lg font-bold">
                                        ⭐ {movie.rating}/5
                                    </span>
                                </div>

                                {/* Bouton Voir Bande-annonce */}
                                <a
                                    href={movie.trailerUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-4 block text-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-md transition"
                                >
                                    ▶️ Voir la bande-annonce
                                </a>
                            </div>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default Films;
