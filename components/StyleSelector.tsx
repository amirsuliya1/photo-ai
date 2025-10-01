
import React from 'react';
import type { StylePreset, AspectRatio } from '../types';
import { STYLE_PRESETS, ASPECT_RATIOS } from '../constants';

interface StyleSelectorProps {
  selectedStyle: StylePreset;
  onStyleChange: (style: StylePreset) => void;
  selectedAspectRatio: AspectRatio;
  onAspectRatioChange: (ratio: AspectRatio) => void;
}

const StyleSelector: React.FC<StyleSelectorProps> = ({
  selectedStyle,
  onStyleChange,
  selectedAspectRatio,
  onAspectRatioChange,
}) => {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 shadow-lg">
      <div>
        <h3 className="text-xl font-bold text-cyan-400 mb-4">4. Style Presets</h3>
        <div className="grid grid-cols-2 gap-2">
          {STYLE_PRESETS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => onStyleChange(preset)}
              className={`px-4 py-2 text-sm font-semibold rounded-md transition-all duration-200 ${
                selectedStyle.id === preset.id
                  ? 'bg-cyan-500 text-gray-900 shadow-[0_0_10px_theme(colors.cyan.500)]'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {preset.name}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-6">
        <h3 className="text-xl font-bold text-cyan-400 mb-4">5. Image Size</h3>
        <select
          value={selectedAspectRatio.value}
          onChange={(e) => {
            const newRatio = ASPECT_RATIOS.find(r => r.value === e.target.value);
            if(newRatio) onAspectRatioChange(newRatio);
          }}
          className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
        >
          {ASPECT_RATIOS.map((ratio) => (
            <option key={ratio.value} value={ratio.value}>{ratio.name}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default StyleSelector;
