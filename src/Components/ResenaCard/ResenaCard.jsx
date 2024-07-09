/* eslint-disable react/prop-types */
import './ResenaCard.css';

function ResenaCard({ resena, user, deleteResena, setNuevaRes }) {
    const firebaseUserId = localStorage.getItem('firebaseId');

    const handleDelete = () => {
        deleteResena(resena.resenaId);
        setNuevaRes(prev => !prev);
    }
    if(resena.usuario.username === user && firebaseUserId === resena.usuarioId){
        return (
            <div className="resena-card">
              <h3>{resena.usuario.username}.</h3>
              <div id="borde">
                <p id="comentario">{resena.comentario}</p>
              </div>      
              <p id="calificacion">Calificación: {resena.calificacion}</p>
              <div id="botones">
                <button className="delete" onClick={handleDelete}>Eliminar</button>
                {/* <button className="edit">Editar</button> */}
              </div>                
            </div>
          );
    }
    else {
        return (
            <div className="resena-card">
              <h3>{resena.usuario.username}</h3>
              <div>
                <p id="comentario">{resena.comentario}</p>
              </div>      
              <p id="calificacion">Calificación: {resena.calificacion}</p>
            </div>
          );
    }
  
}

export default ResenaCard;
