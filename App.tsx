
import React, { useState, useCallback } from 'react';
import { generatePhotoShoot } from './services/geminiService';
import { AspectRatio, StylePreset } from './types';
import { ASPECT_RATIOS, STYLE_PRESETS, STOCK_MODELS } from './constants';
import GalaxyBackground from './components/GalaxyBackground';
import Header from './components/Header';
import ImageUploader from './components/ImageUploader';
import SmartPromptBox from './components/SmartPromptBox';
import StyleSelector from './components/StyleSelector';
import OutputDisplay from './components/OutputDisplay';
import Loader from './components/Loader';
import SparklesIcon from './components/icons/SparklesIcon';

const App: React.FC = () => {
  const [modelImage, setModelImage] = useState<string | null>(null);
  const [productImage, setProductImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string>('');
  const [selectedStyle, setSelectedStyle] = useState<StylePreset>(STYLE_PRESETS[0]);
  const [selectedAspectRatio, setSelectedAspectRatio] = useState<AspectRatio>(ASPECT_RATIOS[0]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateClick = useCallback(async () => {
    if (!modelImage || !productImage || !prompt) {
      setError('Please upload both images and enter a prompt.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);

    try {
      const fullPrompt = `Merge the product image into the model's environment. Creative direction: "${prompt}". Apply a "${selectedStyle.name}" style. The final image aspect ratio must be ${selectedAspectRatio.value}. Ensure realistic lighting, shadows, and perspective.`;

      const result = await generatePhotoShoot(modelImage, productImage, fullPrompt);
      setGeneratedImage(result);
    } catch (e) {
      console.error(e);
      setError('Failed to generate image. Please check your API key and try again.');
    } finally {
      setIsLoading(false);
    }
  }, [modelImage, productImage, prompt, selectedStyle, selectedAspectRatio]);

  const isGenerateDisabled = !modelImage || !productImage || !prompt || isLoading;

  return (
    <div className="relative min-h-screen w-full font-sans text-white bg-gray-900 overflow-x-hidden">
      <GalaxyBackground />
      <div className="relative z-10 p-4 sm:p-6 lg:p-8">
        <Header />
        <main className="mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: Inputs */}
            <div className="lg:col-span-4 space-y-8">
              <ImageUploader
                title="1. Upload Model"
                onImageUpload={setModelImage}
                stockImages={STOCK_MODELS}
              />
              <ImageUploader
                title="2. Upload Product"
                onImageUpload={setProductImage}
              />
            </div>

            {/* Middle Column: Controls */}
            <div className="lg:col-span-4 space-y-8 flex flex-col">
              <SmartPromptBox value={prompt} onChange={setPrompt} />
              <StyleSelector
                selectedStyle={selectedStyle}
                onStyleChange={setSelectedStyle}
                selectedAspectRatio={selectedAspectRatio}
                onAspectRatioChange={setSelectedAspectRatio}
              />
              <button
                onClick={handleGenerateClick}
                disabled={isGenerateDisabled}
                className="w-full mt-auto flex items-center justify-center gap-2 text-lg font-bold py-4 px-6 rounded-lg bg-cyan-500 text-gray-900 transition-all duration-300 ease-in-out hover:bg-cyan-400 hover:shadow-[0_0_20px_theme(colors.cyan.500)] disabled:bg-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed disabled:shadow-none"
              >
                {isLoading ? (
                  <>
                    <Loader />
                    Generating...
                  </>
                ) : (
                  <>
                    <SparklesIcon />
                    Generate Photoshoot
                  </>
                )}
              </button>
            </div>

            {/* Right Column: Output */}
            <div className="lg:col-span-4">
              <OutputDisplay
                productImage={productImage}
                generatedImage={generatedImage}
                isLoading={isLoading}
                error={error}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
