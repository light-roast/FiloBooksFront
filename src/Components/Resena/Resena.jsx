/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import './Resena.css';
import ResenaCard from '../ResenaCard/ResenaCard';

function Resenas({ libroId, resenas, addResena, libro, user, email, setNuevaRes }) {
  const [texto, setTexto] = useState('');
  const [calificacion, setCalificacion] = useState(0);
  const [exceeded, setExceeded] = useState(false);
  const [puedeResenar, setPuedeResenar] = useState(false);
  const firebaseUserId = localStorage.getItem('firebaseId');

  useEffect(() => {
    const handleResenaForm = () => {
      const userResena = resenas.find(resena => resena.usuarioId === firebaseUserId);
      if (userResena) {
        setPuedeResenar(false);
      } else {
        setPuedeResenar(true);
      }
    };

    handleResenaForm();
  }, [resenas, firebaseUserId]);

  const handleTextChange = (e) => {
    const maxLength = 350;
    const currentLength = e.target.value.length;
    setTexto(e.target.value);
    setExceeded(currentLength > maxLength);
  };

  const handleCalificacionChange = (e) => {
    setCalificacion(parseInt(e.target.value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    await addResena(libroId, { 
      "usuarioFirebaseUserId": firebaseUserId,
      "libroId": libroId,
      "calificacion": calificacion,
      "comentario": texto
    });
  
    setTexto('');
    setCalificacion(0);
    setNuevaRes(prev => !prev);
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
          <ResenaCard resena={resena} key={resena.resenaId} user={user} email={email} />
        ))
      )}
      {puedeResenar ? (
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
      ) : <h3>Ya añadiste tu reseña</h3>}
    </div>
  );
}

export default Resenas;
