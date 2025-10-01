
import React from 'react';
import Loader from './Loader';
import DownloadIcon from './icons/DownloadIcon';

interface OutputDisplayProps {
  productImage: string | null;
  generatedImage: string | null;
  isLoading: boolean;
  error: string | null;
}

const OutputDisplay: React.FC<OutputDisplayProps> = ({ productImage, generatedImage, isLoading, error }) => {
  const handleDownload = () => {
    if (!generatedImage) return;
    const link = document.createElement('a');
    link.href = generatedImage;
    link.download = 'photo-ai-studio-result.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 shadow-lg h-full flex flex-col">
      <h3 className="text-xl font-bold text-cyan-400 mb-4">6. Result</h3>
      <div className="flex-grow w-full bg-gray-900/50 rounded-lg flex items-center justify-center p-4 min-h-[300px] lg:min-h-0">
        {isLoading && (
            <div className="text-center">
                <Loader large />
                <p className="mt-4 text-gray-300">AI is creating magic...</p>
                <p className="text-sm text-gray-500">This may take a moment.</p>
            </div>
        )}
        {error && <p className="text-red-400 text-center">{error}</p>}
        {generatedImage && (
            <div className="w-full space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-sm text-center mb-2 text-gray-400">Original Product</p>
                        <img src={productImage!} alt="Original Product" className="w-full object-contain rounded-md border border-gray-600" />
                    </div>
                    <div>
                        <p className="text-sm text-center mb-2 text-cyan-400">Generated Image</p>
                        <img src={generatedImage} alt="Generated Photoshoot" className="w-full object-contain rounded-md border border-cyan-500" />
                    </div>
                </div>
                <button 
                    onClick={handleDownload}
                    className="w-full flex items-center justify-center gap-2 text-md font-bold py-3 px-4 rounded-lg bg-purple-600 text-white transition-all duration-300 ease-in-out hover:bg-purple-500 hover:shadow-[0_0_20px_theme(colors.purple.600)]"
                >
                    <DownloadIcon />
                    Download Image
                </button>
            </div>
        )}
        {!isLoading && !error && !generatedImage && (
            <p className="text-gray-500 text-center">Your generated image will appear here.</p>
        )}
      </div>
    </div>
  );
};

export default OutputDisplay;
