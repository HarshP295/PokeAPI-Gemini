import { PokemonData } from '../types';

const BASE_URL = 'https://pokeapi.co/api/v2';

export const fetchPokemon = async (nameOrId: string): Promise<PokemonData | null> => {
  try {
    const cleanName = nameOrId.toLowerCase().trim();
    if (!cleanName) return null;

    // 1. Fetch Basic Pokemon Data
    const response = await fetch(`${BASE_URL}/pokemon/${cleanName}`);
    if (!response.ok) {
      throw new Error('Pokemon not found');
    }
    const data = await response.json();

    // 2. Fetch Species Data for Flavor Text
    let flavorText = '';
    try {
      const speciesResponse = await fetch(data.species.url);
      if (speciesResponse.ok) {
        const speciesData = await speciesResponse.json();
        // Find the first English flavor text
        const englishEntry = speciesData.flavor_text_entries.find(
          (entry: any) => entry.language.name === 'en'
        );
        if (englishEntry) {
          flavorText = englishEntry.flavor_text.replace(/[\f\n\r\t]/g, ' ');
        }
      }
    } catch (speciesError) {
      console.warn('Could not fetch species data', speciesError);
    }

    return {
      id: data.id,
      name: data.name,
      height: data.height,
      weight: data.weight,
      sprites: data.sprites,
      stats: data.stats,
      types: data.types,
      abilities: data.abilities,
      flavorText,
    };
  } catch (error) {
    console.error('Error fetching Pokemon:', error);
    throw error;
  }
};
