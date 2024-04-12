// Componente PokemonItem.js
import React, { useState, useEffect } from "react";

function PokemonItem({ name, url }) {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Falha ao buscar dados do Pokémon.");
        }
        const data = await response.json();
        setImageUrl(data.sprites.front_default);
      } catch (error) {
        console.error('Error fetching Pokemon data:', error);
      }
    };

    fetchPokemonData();
  }, [url]);

  return (
    <div className="pokemon-item">
      <h3 className="text-xl font-bold text-red-400">{name}</h3>
      <img src={imageUrl} alt={name} />
    </div>
  );
}

export default PokemonItem;