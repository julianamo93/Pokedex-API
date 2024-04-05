import React, { useState, useEffect } from "react";
import PokemonItem from "./PokemonItem";

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
      <div>
           <h1 className="text-center font-bold text-3xl my-10">Pokédex</h1>
        
          {!pokemonData && (
          <div className="flex justify-center">
            <div>
              <h1 className="text-xl font-semibold  text-red-500 mb-10">Conheça alguns dos pokemons!</h1>
              <div className="grid grid-cols-4 gap-4">
                {pokemonList.map((pokemon, index) => (
                  <div key={index} className="p-4 bg-white rounded-xl shadow-md">
                     <PokemonItem key={index} name={pokemon.name} url={pokemon.url} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      <h1 className="text-center font-bold text-3xl my-10">Qual pokemon você está procurando?</h1>
        <div className="flex items-center justify-center gap-7">
        <input
          type="text"
          className="px-8 py-4 rounded-lg border-2 border-red-200 my-4"
          value={pokemonName}
          onChange={(e) => setPokemonName(e.target.value)}
        />
        <button
          className="px-3 py-4 rounded-xl bg-red-500 text-white"
          onClick={handleSearch}
        >
          Encontre o seu Pokemon!
        </button>
        {error && <p className="text-red-500">{error}</p>}
     </div>
      
  
      
        {pokemonData && (
          <div className="w-80 p-8 rounded-xl mt-8 shadow-md bg-white mx-auto my-auto flex flex-col items-center justify-center">
            <h1 className="text-red-500 text-xl font-bold">{pokemonData.name}</h1>
            <img src={pokemonData.sprites.other.dream_world.front_default} alt={pokemonData.name} className="w-[200px] h-[200px]" />
            <h2 className="mt-4 text-red-500 text-xl font-bold">Habilidades:</h2>
            <ul className="text-gray-500 font-bold text-lg">
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