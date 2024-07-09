/* eslint-disable react/prop-types */
import { useState } from 'react';
import './Resena.css';

function Resenas({ libroId, resenas, addResena }) {
  const [nombre, setNombre] = useState('');
  const [texto, setTexto] = useState('');
  const [exceeded, setExceeded] = useState(false);

  const handleTextChange = (e) => {
    const maxLength = 350;
    const currentLength = e.target.value.length;
    setTexto(e.target.value);
    if (currentLength === maxLength) {
      setExceeded(true);
    } else {
      setExceeded(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addResena(libroId, { nombre, texto });
    setNombre('');
    setTexto('');
  };

  return (
    <div className="resenas">
      <h2><u>Reseñas</u></h2>
      {resenas.length === 0 ? (
        <div>
            <p>No hay reseñas aún.</p>
            <p>¡Se el primero en añadir una!</p>
        </div>
      ) : (
        resenas.map((resena, index) => (
          <div key={index} className="resena">
            <h3>{resena.nombre}</h3>
            <p>{resena.texto}</p>
          </div>
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
        <button type="submit">Enviar Reseña</button>
      </form>
    </div>
  );
}

export default Resenas;
