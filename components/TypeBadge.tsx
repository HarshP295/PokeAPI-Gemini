import React from 'react';

interface TypeBadgeProps {
  type: string;
}

const TYPE_COLORS: Record<string, string> = {
  normal: 'bg-gray-400',
  fire: 'bg-red-500',
  water: 'bg-blue-500',
  electric: 'bg-yellow-400',
  grass: 'bg-green-500',
  ice: 'bg-cyan-300',
  fighting: 'bg-red-700',
  poison: 'bg-purple-500',
  ground: 'bg-yellow-700',
  flying: 'bg-indigo-300',
  psychic: 'bg-pink-500',
  bug: 'bg-lime-500',
  rock: 'bg-yellow-800',
  ghost: 'bg-purple-800',
  dragon: 'bg-indigo-700',
  steel: 'bg-gray-500',
  fairy: 'bg-pink-300',
};

export const TypeBadge: React.FC<TypeBadgeProps> = ({ type }) => {
  const colorClass = TYPE_COLORS[type] || 'bg-gray-400';
  
  return (
    <span className={`${colorClass} text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm`}>
      {type}
    </span>
  );
};
