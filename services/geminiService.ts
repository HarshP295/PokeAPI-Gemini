import { GoogleGenAI } from "@google/genai";
import { PokemonData } from "../types";

// Initialize the client
// The API key is guaranteed to be available in process.env.API_KEY per instructions.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const fetchGeminiInsight = async (pokemon: PokemonData): Promise<string> => {
  try {
    const model = 'gemini-2.5-flash';
    
    const prompt = `
      I have a Pokémon named ${pokemon.name}.
      Its types are: ${pokemon.types.map(t => t.type.name).join(', ')}.
      Its highest stat is usually around ${Math.max(...pokemon.stats.map(s => s.base_stat))}.
      
      Please provide two things in a fun, engaging, and concise way (keep it under 150 words total):
      1. A "Fun Fact" about this Pokémon (maybe related to its biology or lore).
      2. What real Life example is the Pokemon based on.
      
      Format the output clearly with headings. Use emojis where appropriate.
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });

    return response.text || "Gemini couldn't find any secrets about this Pokémon right now!";
  } catch (error) {
    console.error("Error asking Gemini:", error);
    throw new Error("Gemini is currently resting. Try again later!");
  }
};
