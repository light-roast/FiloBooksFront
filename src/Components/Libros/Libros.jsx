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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleSearch = useCallback(
    debounce((searchTerm) => {
      if (searchTerm === '') {
        setFilteredLibros(libros);
        return;
      }
      else {
      const lowercasedTerm = searchTerm.toLowerCase();
      const filtered = libros.filter((libro) => 
        libro.titulo.toLowerCase().includes(lowercasedTerm) || 
        libro.autor.toLowerCase().includes(lowercasedTerm) || 
        libro.categoria.nombreCategoria.toLowerCase().includes(lowercasedTerm)
      );
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
