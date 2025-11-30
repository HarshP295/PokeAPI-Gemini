import React, { useState } from 'react';
import { SearchBar } from './components/SearchBar';
import { PokemonCard } from './components/PokemonCard';
import { GeminiSection } from './components/GeminiSection';
import { PokemonData } from './types';
import { fetchPokemon } from './services/pokeService';
import { fetchGeminiInsight } from './services/geminiService';

const App: React.FC = () => {
  const [pokemon, setPokemon] = useState<PokemonData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [geminiResult, setGeminiResult] = useState('');
  const [geminiLoading, setGeminiLoading] = useState(false);

  const handleSearch = async (query: string) => {
    setLoading(true);
    setError('');
    setPokemon(null);
    setGeminiResult('');
    
    try {
      const data = await fetchPokemon(query);
      setPokemon(data);
    } catch (err) {
      setError('Oops! Couldn\'t find that Pokémon. Try checking the spelling.');
    } finally {
      setLoading(false);
    }
  };

  const handleAskGemini = async () => {
    if (!pokemon) return;
    
    setGeminiLoading(true);
    try {
      const insight = await fetchGeminiInsight(pokemon);
      setGeminiResult(insight);
    } catch (err) {
      // Error is handled in the service logs mostly, but we can set a fallback text
      setGeminiResult("Sorry, I got a bit confused. Can we try again?");
    } finally {
      setGeminiLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        
        {/* Header */}
        <header className="mb-10 text-center">
          <div className="inline-block p-4 rounded-full bg-white shadow-md mb-4">
             <img 
               src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png" 
               alt="Pokeball" 
               className="w-12 h-12"
             />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-indigo-900 tracking-tight mb-2">
            Poké<span className="text-pink-500">Gemini</span>
          </h1>
          <p className="text-slate-500 text-lg">
            Discover Pokémon & Unlock AI Battle Secrets
          </p>
        </header>

        {/* Search */}
        <SearchBar onSearch={handleSearch} isLoading={loading} />

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 text-red-600 px-6 py-4 rounded-2xl border border-red-100 shadow-sm animate-bounce mb-8">
            {error}
          </div>
        )}

        {/* Content Area */}
        <div className="w-full transition-all duration-500 ease-in-out">
          {pokemon && (
            <>
              <PokemonCard 
                pokemon={pokemon} 
                onAskGemini={handleAskGemini} 
                geminiLoading={geminiLoading} 
              />
              <GeminiSection content={geminiResult} />
            </>
          )}
          
          {/* Empty State / Placeholder */}
          {!pokemon && !loading && !error && (
            <div className="text-center mt-12 opacity-50">
              <div className="grid grid-cols-3 gap-4 max-w-sm mx-auto mb-6 grayscale">
                <div className="h-20 bg-gray-200 rounded-2xl"></div>
                <div className="h-20 bg-gray-200 rounded-2xl"></div>
                <div className="h-20 bg-gray-200 rounded-2xl"></div>
              </div>
              <p className="text-slate-400">Search for a Pokémon to begin your journey!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
