import { useState, useEffect } from 'react'
import './App.css'

import axios from 'axios';

function App() {
  const [cocktail, setCocktail] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResult, setSearchResult] = useState(null);

  useEffect(() => {
    fetchRandomCocktail();
  }, []);

  const fetchRandomCocktail = async () => {
    try {
      const response = await axios.get('https://www.thecocktaildb.com/api/json/v1/1/random.php');
      setCocktail(response.data.drinks[0]);
    } catch (error) {
      console.error('Error fetching random cocktail:', error);
    }
  };

  
  const searchCocktail = async () => {
    try {
      const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm}`);
      setSearchResult(response.data.drinks ? response.data.drinks[0] : null);
    } catch (error) {
      console.error('Error searching cocktail:', error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Päivän coctaili</h1>
      

      {cocktail ? (
        <div>
          <h2>{cocktail.strDrink}</h2>
          <p><strong>Glass:</strong> {cocktail.strGlass}</p>
          <p><strong>Instructions:</strong> {cocktail.strInstructions}</p>
          <ul>
            {Array.from({ length: 15 }, (_, i) => i + 1)
              .map(i => cocktail[`strIngredient${i}`] && (
                <li key={i}>{cocktail[`strIngredient${i}`]} - {cocktail[`strMeasure${i}`]}</li>
              ))}
          </ul>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      
      <h2>Etsi lisää coctaileja</h2>
      <input
        type="text"
        placeholder="Hae nimellä"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={searchCocktail}>Etsi</button>


      {searchResult ? (
        <div>
          <h2>{searchResult.strDrink}</h2>
          <p><strong>Glass:</strong> {searchResult.strGlass}</p>
          <p><strong>Instructions:</strong> {searchResult.strInstructions}</p>
          <ul>
            {Array.from({ length: 15 }, (_, i) => i + 1)
              .map(i => searchResult[`strIngredient${i}`] && (
                <li key={i}>{searchResult[`strIngredient${i}`]} - {searchResult[`strMeasure${i}`]}</li>
              ))}
          </ul>
        </div>
      ) : searchTerm && (
        <p>Ei löytynyt haulla: {searchTerm}</p>
      )}
    </div>
  );
}

export default App
