import React, { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isLoading }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto mb-8 relative">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search Pokémon (e.g., Pikachu)..."
        className="w-full px-6 py-4 rounded-full border-2 border-indigo-100 bg-white focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-100 shadow-lg text-gray-700 placeholder-gray-400 transition-all duration-300"
        disabled={isLoading}
      />
      <button
        type="submit"
        disabled={isLoading || !query.trim()}
        className="absolute right-2 top-2 bottom-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-full px-6 font-semibold shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center"
      >
        {isLoading ? (
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        )}
      </button>
    </form>
  );
};