/* eslint-disable react/prop-types */
import { useState } from 'react';
import './SearchBar.css';

function SearchBar({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleInputChange = (event) => {
      const value = event.target.value;
      setSearchTerm(value);
      onSearch(value);
    };
  
    return (
      <div className="search-bar">
        <input 
          type="text" 
          placeholder="Buscar por título, autor o categoría..." 
          value={searchTerm} 
          onChange={handleInputChange} 
        />
      </div>
    );
}

export default SearchBar;
