/* eslint-disable react/prop-types */
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import './Detalles.css';
import Resenas from '../Resena/Resena';

// eslint-disable-next-line react/prop-types
function Detalles({ libros, addResena, resenas, fetchResenas }) {
  const { libroId } = useParams();
  const libro = libros.find((lib) => lib.libroId === parseInt(libroId, 10));

  useEffect(() => {
    if (libro) {
      fetchResenas(libro.libroId);
    }
  }, [libro]);

  if (!libro) {
    return <div>Libro no encontrado</div>;
  }

  return (
    <div className="detalle-container">
        <div className="detalles">
            <div>
                <h1>{libro.titulo}</h1>
                <h2>Autor: {libro.autor}</h2>
                <img src={libro.urlImagen} alt={libro.titulo} />
                
                <h3>Categoría: {libro.categoria.nombreCategoria}</h3>
                <p>{libro.resumen}</p>
            </div>  
        </div>

        <div className="reseñas">
            <Resenas libroId={libro.libroId} resenas={resenas} libro={libro} addResena={addResena} />
        </div>
    </div>
  );
}

export default Detalles;