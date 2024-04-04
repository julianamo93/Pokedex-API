import React, { useState, useEffect } from "react";

function Pokemon() {
    const [pokemonName, setPokemonName] = useState("");
    const [pokemonData, setPokemonData] = useState(null);
    const [pokemonList, setPokemonList] = useState([]);
    const [error, setError] = useState("");

    const handleSearch = async () => {
        if (pokemonName.trim() === "") {
            setError("Por favor, insira um nome de um Pokemon existente.");
            return;
        }

        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);
            if (!response.ok) {
                throw new Error("Pokemon não encontrado.");
            }
            const data = await response.json();
            setPokemonData(data);
            setError("");
        } catch (error) {
            console.error('Error fetching Pokemon data:', error);
            setError("Dados não encontrado. Tente novamente!");
            setPokemonData(null);
        }
    };

    useEffect(() => {
      const fetchPokemonList = async () => {
          try {
              const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=10");
              if (!response.ok) {
                  throw new Error("Não foi possível obter a lista de Pokémon.");
              }
              const data = await response.json();
              setPokemonList(data.results);
              setError("");
          } catch (error) {
              console.error('Error fetching Pokemon list:', error);
              setError("Erro ao buscar a lista de Pokémon.");
          }
      };
      
      fetchPokemonList();
  }, []);

    return (
        <div className="h-screen flex items-center justify-center flex-col bg-gray-200">
        <input
          type="text"
          className="px-8 py-4 rounded-lg border-2 border-red-200 my-4"
          value={pokemonName}
          onChange={(e) => setPokemonName(e.target.value)}
        />
        <button
          className="px-6 py-4 rounded-full bg-red-500 text-white"
          onClick={handleSearch}
        >
          Encontre o seu Pokemon!
        </button>
      
        {error && <p className="text-red-500">{error}</p>}
      
        {pokemonData && (
          <div className="flex items-center justify-center flex-col w-80 p-8 rounded-xl mt-8 shadow-md bg-white">
            <h1 className="text-red-500 text-xl font-bold">{pokemonData.name}</h1>
            <img src={pokemonData.sprites.front_default} alt={pokemonData.name} className="w-[200px] h-[200px]" />
            <h2 className="mt-4 text-red-500 text-xl font-bold">Habilidades:</h2>
            <ul className="text-gray-500 font-bold text-lg">
              {pokemonData.abilities.map((ability, index) => (
                <li key={index}>{ability.ability.name}</li>
              ))}
            </ul>
          </div>
        )}

{!pokemonData && (
<div>
            
            <div className="w-80 p-8 rounded-xl mt-8 shadow-md bg-white">
                <h1 className="text-xl font-semibold mb-4 text-red-500">Conheça alguns dos pokemons!</h1>
                <ul>
                    {pokemonList.map((pokemon, index) => (
                        <li key={index} className="text-gray-500 font-bold text-lg">{pokemon.name}</li>
                       
                    ))}
                </ul>
            </div>
        </div>
)}
      </div>

      
      
    );
}

export default Pokemon;