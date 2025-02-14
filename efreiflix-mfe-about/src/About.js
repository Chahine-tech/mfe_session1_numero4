import React, { useEffect, useState } from "react";
import "./styles.css";

const About = () => {
    const [infos, setInfos] = useState([]);

    useEffect(() => {
        fetch("http://localhost:2066/about")
            .then((response) => response.json()) // Convertit en JSON
            .then((data) => {
                console.log("Informations récupérés :", data); // Affiche les informations dans la console
                setInfos(data); // Met à jour l'état avec les informations
            })
            .catch((error) =>
                console.error(
                    "Erreur lors du chargement des informations :",
                    error
                )
            );
    }, []);
    console.log(infos);

    return (
        <div className="container mx-auto p-4">
            <div className="bg-white shadow-md rounded-lg p-6">
                {infos.length === 0 ? (
                    <p className="text-gray-700">
                        Chargement des informations...
                    </p>
                ) : (
                    <ul className="space-y-6">
                        <h2 className="text-xl font-bold text-gray-900">
                            {infos.description}
                        </h2>
                        <p className="text-sm text-gray-500">{infos.version}</p>
                    </ul>
                )}
            </div>
        </div>
    );
};

export default About;
