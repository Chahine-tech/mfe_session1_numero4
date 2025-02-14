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
                    <ul className="space-y-2">
                        {movies.map((movie, index) => (
                            <li
                                key={index}
                                className="p-3 bg-gray-100 rounded-md shadow-sm"
                            >
                                🎬 {movie.title} ({movie.year})
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default Films;
