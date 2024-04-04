import React, { useState } from "react";

function Pokemon() {
    const [pokemonName, setPokemonName] = useState("");
    const [pokemonData, setPokemonData] = useState(null);
    const [error, setError] = useState("");

    const handleSearch = async () => {
        if (pokemonName.trim() === "") {
            setError("Por favor, insira um nome de Pokémon.");
            return;
        }

        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);
            if (!response.ok) {
                throw new Error("Pokémon não encontrado.");
            }
            const data = await response.json();
            setPokemonData(data);
            setError("");
        } catch (error) {
            console.error('Error fetching Pokemon data:', error);
            setError("Erro ao buscar dados do Pokémon.");
            setPokemonData(null);
        }
    };

    return (
        <div className="h-screen flex items-center justify-center flex-col">
        <input
          type="text"
          className="px-6 py-4 rounded-lg border-2 border-purple-200 my-4"
          placeholder="Digite o nome do Pokémon"
          value={pokemonName}
          onChange={(e) => setPokemonName(e.target.value)}
        />
        <button
          className="px-6 py-4 rounded-full bg-purple-600 text-white border-none"
          onClick={handleSearch}
        >
          Buscar Pokémon
        </button>
      
        {error && <p className="text-red-500">{error}</p>}
      
        {pokemonData && (
          <div className="flex items-center justify-center flex-col w-80 p-8 rounded-xl mt-8 shadow-md bg-purple-200">
            <h1>{pokemonData.name}</h1>
            <img src={pokemonData.sprites.front_default} alt={pokemonData.name} />
            <h2 className="mt-4">Habilidades:</h2>
            <ul>
              {pokemonData.abilities.map((ability, index) => (
                <li key={index}>{ability.ability.name}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      
    );
}

export default Pokemon;