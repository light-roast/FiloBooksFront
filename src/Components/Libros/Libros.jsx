/* eslint-disable react/prop-types */
import { useEffect, useState, useCallback } from 'react';
import './Libros.css';
import LibroCard from './LibroCard/LibroCard';
import SearchBar from '../SearchBar/SearchBar';
import { debounce } from 'lodash';

function Libros({ libros, fetchLibros }) {
  const [filteredLibros, setFilteredLibros] = useState(libros);

  useEffect(() => {
    fetchLibros();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setFilteredLibros(libros);
  }, [libros]);

  
  const normalizeString = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  };
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleSearch = useCallback(
    debounce((searchTerm) => {
      if (searchTerm === '') {
        setFilteredLibros(libros);
        return;
      } else {
        const normalizedTerm = normalizeString(searchTerm);
        const filtered = libros.filter((libro) => {
          const normalizedTitulo = normalizeString(libro.titulo);
          const normalizedAutor = normalizeString(libro.autor);
          const normalizedCategoria = normalizeString(libro.categoria.nombreCategoria);
          
          return (
            normalizedTitulo.includes(normalizedTerm) ||
            normalizedAutor.includes(normalizedTerm) ||
            normalizedCategoria.includes(normalizedTerm)
          );
        });
        setFilteredLibros(filtered);
      }
    }, 500),
    [libros]
  );

  return (
    <>
        <SearchBar onSearch={handleSearch}/>
        <section id="mainSection">
        
        {filteredLibros.map((libro) => (
            <LibroCard key={libro.libroId} libro={libro} />
        ))}
        </section>
    </>
  );
}

export default Libros;
