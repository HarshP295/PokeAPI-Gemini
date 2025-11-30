import React from 'react';
import ReactMarkdown from 'react-markdown'; // Actually, let's keep it simple without heavy deps if possible, or simple split.

interface GeminiSectionProps {
  content: string;
}

export const GeminiSection: React.FC<GeminiSectionProps> = ({ content }) => {
  if (!content) return null;

  return (
    <div className="w-full max-w-2xl mx-auto mt-6 animate-fade-in-up">
      <div className="bg-gradient-to-br from-indigo-50 to-pink-50 border border-indigo-100 p-8 rounded-3xl shadow-lg relative overflow-hidden">
        
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300"></div>
        <div className="absolute -right-6 -top-6 w-24 h-24 bg-pink-100 rounded-full opacity-50 blur-xl"></div>
        <div className="absolute -left-6 -bottom-6 w-24 h-24 bg-indigo-100 rounded-full opacity-50 blur-xl"></div>

        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-white rounded-xl shadow-sm">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-800">Gemini's Insight</h3>
        </div>
        
        <div className="prose prose-indigo max-w-none text-gray-700 leading-relaxed whitespace-pre-line">
            {content}
        </div>
      </div>
    </div>
  );
};
