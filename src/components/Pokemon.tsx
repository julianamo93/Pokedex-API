import React, { useState, useEffect } from "react";
import logo from './logo.png';
import PokemonItem from "./PokemonItem";
import './Pokemon.css';

function Pokemon() {
    const [pokemonName, setPokemonName] = useState("");
    const [pokemonData, setPokemonData] = useState(null);
    const [pokemonList, setPokemonList] = useState([]);
    const [error, setError] = useState("");

  
    useEffect(() => {
      const fetchPokemonList = async () => {
          try {
              const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=12");
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

  const handleSearch = async () => {
    if (pokemonName.trim() === "") {
        setError("Por favor, insira um nome de um Pokémon existente.");
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
        setError("Ddos não encontrados. Tente novamente!");
        setPokemonData(null);
    }
};

    return (
      <div>
           <div className="flex justify-center">
      <img src={logo} alt="Pokedex" className="pokedex" />
           </div>
                  
          {!pokemonData && (
          <div className="flex justify-center">
            <div>
              <h1 className="text-center font-bold text-blue-600 text-3xl my-10">Conheça os Pokemons!</h1>
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
      <h1 className="text-center font-bold text-blue-600 text-3xl my-10">Encontre seu Pokémon</h1>
        <div className="flex items-center justify-center gap-7">
        <input
          type="text"
          className="px-8 py-4 rounded-lg border-2 border-pink-200 my-4"
          placeholder="Digite aqui..."
          value={pokemonName}
          onChange={(e) => setPokemonName(e.target.value)}
        />
        <button
          className="px-3 py-4 rounded-xl bg-blue-900 text-white"
          onClick={handleSearch}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 fill-white"viewBox="0 0 512 512"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></svg>
        </button>
        {error && <p className="text-blue-500">{error}</p>}
     </div>
      
  
      
        {pokemonData && (
          <div className="w-80 p-8 rounded-xl mt-8 shadow-md bg-white mx-auto my-auto flex flex-col items-center justify-center">
            <h1 className="text-yellow-600 text-xl font-bold">{pokemonData.name}</h1>
            <img src={pokemonData.sprites.other.dream_world.front_default} alt={pokemonData.name} className="w-[200px] h-[200px]" />
            <div className="flex gap-10">
            <div className="">
            <h1 className="mt-4 text-yellow-600 text-xl font-bold">Moves:</h1>
            <ul className="text-gray-500 font-bold text-lg">
            {pokemonData.moves.slice(0, 5).map((move, index) =>(
                  <li key={index}>{move.move.name}</li>
                ))}
              </ul>
            </div>
            <div>
            <h2 className="mt-4 text-yellow-600 text-xl font-bold">Abilities:</h2>
            <ul className="text-gray-500 font-bold text-lg">
              {pokemonData.abilities.map((ability, index) => (
                <li key={index}>{ability.ability.name}</li>
              ))}
            </ul>
            </div>
            </div>
          </div>

        )}     
       

      </div>    
      
    );
}

export default Pokemon;