import React from 'react';
import { PokemonData } from '../types';
import { TypeBadge } from './TypeBadge';

interface PokemonCardProps {
  pokemon: PokemonData;
  onAskGemini: () => void;
  geminiLoading: boolean;
}

export const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon, onAskGemini, geminiLoading }) => {
  // Helper to format stat names
  const formatStatName = (name: string) => {
    switch (name) {
      case 'hp': return 'HP';
      case 'attack': return 'ATK';
      case 'defense': return 'DEF';
      case 'special-attack': return 'SpA';
      case 'special-defense': return 'SpD';
      case 'speed': return 'SPD';
      default: return name;
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl overflow-hidden w-full max-w-2xl mx-auto transition-all duration-500 animate-fade-in-up">
      {/* Header with Background Color based on first type */}
      <div className="relative h-32 bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center">
         <h1 className="text-4xl font-bold text-white capitalize drop-shadow-md tracking-wide">
           {pokemon.name}
         </h1>
         <span className="absolute top-4 right-4 text-white/80 font-mono text-xl">
           #{String(pokemon.id).padStart(3, '0')}
         </span>
      </div>

      {/* Image Container - Negative margin to pull it up */}
      <div className="relative -mt-12 flex justify-center mb-4">
        <div className="w-40 h-40 bg-white rounded-full p-4 shadow-lg flex items-center justify-center z-10">
          <img
            src={pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default}
            alt={pokemon.name}
            className="w-full h-full object-contain hover:scale-110 transition-transform duration-300"
          />
        </div>
      </div>

      <div className="px-8 pb-8">
        {/* Types */}
        <div className="flex justify-center gap-2 mb-6">
          {pokemon.types.map((t) => (
            <TypeBadge key={t.slot} type={t.type.name} />
          ))}
        </div>

        {/* Flavor Text */}
        {pokemon.flavorText && (
          <p className="text-gray-600 text-center italic mb-6 leading-relaxed">
            "{pokemon.flavorText}"
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Physical Stats */}
          <div className="bg-gray-50 p-5 rounded-2xl">
            <h3 className="text-gray-400 uppercase text-xs font-bold mb-4 tracking-wider">Physical</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex flex-col">
                <span className="text-gray-500">Height</span>
                <span className="font-semibold text-gray-800">{pokemon.height / 10} m</span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-500">Weight</span>
                <span className="font-semibold text-gray-800">{pokemon.weight / 10} kg</span>
              </div>
              <div className="flex flex-col col-span-2">
                 <span className="text-gray-500 mb-1">Abilities</span>
                 <div className="flex flex-wrap gap-2">
                   {pokemon.abilities.map((a, idx) => (
                     <span key={idx} className="bg-white border border-gray-200 px-2 py-1 rounded-md text-xs font-medium text-gray-700 capitalize">
                       {a.ability.name.replace('-', ' ')}
                       {a.is_hidden && <span className="text-gray-400 ml-1">(Hidden)</span>}
                     </span>
                   ))}
                 </div>
              </div>
            </div>
          </div>

          {/* Base Stats */}
          <div className="bg-gray-50 p-5 rounded-2xl">
             <h3 className="text-gray-400 uppercase text-xs font-bold mb-4 tracking-wider">Base Stats</h3>
             <div className="space-y-2">
               {pokemon.stats.map((stat) => (
                 <div key={stat.stat.name} className="flex items-center text-sm">
                   <span className="w-8 font-bold text-gray-500 text-xs">{formatStatName(stat.stat.name)}</span>
                   <div className="flex-1 h-2 bg-gray-200 rounded-full ml-2 overflow-hidden">
                     <div 
                        className="h-full bg-indigo-400 rounded-full" 
                        style={{ width: `${Math.min(100, (stat.base_stat / 255) * 100)}%` }}
                     ></div>
                   </div>
                   <span className="w-8 text-right font-semibold text-gray-700 text-xs">{stat.base_stat}</span>
                 </div>
               ))}
             </div>
          </div>
        </div>

        {/* Gemini Action */}
        <div className="mt-8 text-center">
          <button
            onClick={onAskGemini}
            disabled={geminiLoading}
            className="group relative inline-flex items-center justify-center px-8 py-3 font-semibold text-white transition-all duration-200 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full hover:from-pink-600 hover:to-rose-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {geminiLoading ? (
              <>
                 <svg className="w-5 h-5 mr-3 -ml-1 text-white animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Thinking...
              </>
            ) : (
              <>
                <span className="mr-2">✨</span> Ask Gemini for Fun Facts
              </>
            )}
             <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-pink-600 to-rose-600 opacity-0 group-hover:opacity-20 blur transition duration-200"></div>
          </button>
        </div>
      </div>
    </div>
  );
};