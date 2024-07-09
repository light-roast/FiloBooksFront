/* eslint-disable react/prop-types */
import "./Libros.css";
import LibroCard from "./LibroCard/LibroCard";
import { useEffect } from "react";


function Libros({ libros, fetchLibros }) {
    useEffect(() => {
        fetchLibros();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <section id="mainSection">
            {libros.map((libro) => (
                <LibroCard key={libro.libroId} libro={libro} />
            ))}
        </section>
    );
}

export default Libros;
