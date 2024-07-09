/* eslint-disable react/prop-types */
import "./LibroCard.css";
import { useNavigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
function LibroCard({ libro }) {

    const navigate = useNavigate();

    const handleReviewClick = () => {
        navigate(`/detalles/${libro.libroId}`);
      };
    return ( 
    <>
        <div className="cards">
            <div className="image-container">
                <img src={libro.urlImagen} alt={libro.titulo} />
            </div>
            <h3 className="name">
                {libro.titulo}
            </h3>
            <div id="info">
                <h4 id="one" className="category">
                   {libro.autor}
                </h4>
                <h4 id="four" className="category">
                    {libro.categoria.nombreCategoria}
                </h4>
                <h4 id="two">
                    <a className="category" onClick={handleReviewClick}>Añadir reseña</a>
                </h4>
            </div>
        </div>
    </> 
    );
}

export default LibroCard;