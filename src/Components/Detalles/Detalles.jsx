/* eslint-disable react/prop-types */
import { useParams } from 'react-router-dom';
import './Detalles.css';

// eslint-disable-next-line react/prop-types
function Detalles({ libros }) {
  const { libroId } = useParams();
  const libro = libros.find((lib) => lib.libroId === parseInt(libroId, 10));

  if (!libro) {
    return <div>Libro no encontrado</div>;
  }

  return (
    <>
        <div className="detalles">
        <h1>{libro.titulo}</h1>
        <h2>Autor: {libro.autor}</h2>
        <img src={libro.urlImagen} alt={libro.titulo} />
        
        <h3>Categoría: {libro.categoria.nombreCategoria}</h3>
        <p>{libro.resumen}</p>  
        </div>
        
        <div className="reseñas">

        </div>
    </>
  );
}

export default Detalles;