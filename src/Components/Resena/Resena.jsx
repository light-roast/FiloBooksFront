/* eslint-disable react/prop-types */
import { useState} from 'react';
import './Resena.css';
import ResenaCard from '../ResenaCard/ResenaCard';


function Resenas({ libroId, resenas, addResena, libro, user, email }) {
  const [nombre, setNombre] = useState('');
  const [texto, setTexto] = useState('');
  const [calificacion, setCalificacion] = useState(0); // Estado para la calificación
  const [exceeded, setExceeded] = useState(false);


  const handleTextChange = (e) => {
    const maxLength = 350;
    const currentLength = e.target.value.length;
    setTexto(e.target.value);
    if (currentLength > maxLength) {
      setExceeded(true);
    } else {
      setExceeded(false);
    }
  };

  const handleCalificacionChange = (e) => {
    setCalificacion(parseInt(e.target.value)); 
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addResena(libroId, { nombre, texto, calificacion }); 
    setNombre('');
    setTexto('');
    setCalificacion(0); 
  };

  return (
    <div className="resenas">
      <h2><u>Reseñas - {libro.titulo}</u></h2>
      {resenas.length === 0 ? (
        <div>
            <p>No hay reseñas aún.</p>
            <p>¡Sé el primero en añadir una!</p>
        </div>
      ) : (
        resenas.map((resena) => (
          
            <ResenaCard resena={resena} key={resena.resenaId} user={user} email={email}/>
        ))
      )}
      <form onSubmit={handleSubmit} className="resena-form">
        <h2>Añadir Reseña</h2>
        {exceeded ? <p id="warning">Tu reseña no puede tener más de 350 caracteres</p> : null}
        <textarea
          placeholder="Tu reseña."
          value={texto}
          onChange={handleTextChange}
          maxLength="350"
        ></textarea>
        
          <select value={calificacion} onChange={handleCalificacionChange}>
            <option value="0">Selecciona una calificación para el libro.</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
       
        <button type="submit">Enviar Reseña</button>
      </form>
    </div>
  );
}

export default Resenas;
