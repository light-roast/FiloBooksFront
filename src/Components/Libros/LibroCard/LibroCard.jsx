/* eslint-disable react/prop-types */
import "./LibroCard.css";

// eslint-disable-next-line react/prop-types
function LibroCard({ libro }) {
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
                <h4 id="two"><a className="category" href="#">Añadir reseña</a></h4>
            </div>
        </div>
    </> 
    );
}

export default LibroCard;