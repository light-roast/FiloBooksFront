/* eslint-disable react/prop-types */
import './ResenaCard.css';

function ResenaCard({ resena, user, deleteResena, setNuevaRes }) {
    const firebaseUserId = localStorage.getItem('firebaseId');
    const dateString = resena.fechaResena;
  
    // Convert the string to a Date object
    const dateObj = new Date(dateString);
    
    // Extract day, month, and year from the Date object
    const day = dateObj.getDate();
    const month = dateObj.getMonth() + 1; // getMonth() returns zero-based month, so add 1
    const year = dateObj.getFullYear();
    
    // Construct formatted date string
    const formattedDate = `${day}-${month}-${year}`;

    const handleDelete = () => {
        deleteResena(resena.resenaId);
        setNuevaRes(prev => !prev);
    }
    if(resena.usuario.username === user && firebaseUserId === resena.usuarioId){
        return (
            <div className="resena-card">
              <h3>{resena.usuario.username}.</h3><p>{formattedDate}</p>
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
              <h3>{resena.usuario.username}</h3><p>{formattedDate}</p>
              <div>
                <p id="comentario">{resena.comentario}</p>
              </div>      
              <p id="calificacion">Calificación: {resena.calificacion}</p>
            </div>
          );
    }
  
}

export default ResenaCard;
