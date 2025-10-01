
import React from 'react';

interface SmartPromptBoxProps {
  value: string;
  onChange: (value: string) => void;
}

const SmartPromptBox: React.FC<SmartPromptBoxProps> = ({ value, onChange }) => {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 shadow-lg h-full flex flex-col">
      <h3 className="text-xl font-bold text-cyan-400 mb-4">3. Creative Direction</h3>
      <div className="relative w-full h-full">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="e.g., A model holding the product on a city rooftop at sunset..."
          className="w-full h-full p-4 bg-gray-900/70 border-2 border-gray-600 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-300 resize-none shadow-inner"
          rows={6}
        />
        <div className="absolute inset-0 border-2 border-cyan-500 rounded-lg pointer-events-none opacity-0 focus-within:opacity-100 blur-md transition-opacity duration-300"></div>
      </div>
    </div>
  );
};

export default SmartPromptBox;
