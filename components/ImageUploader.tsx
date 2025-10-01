
import React, { useState, useRef } from 'react';
import type { StockModel } from '../types';
import UploadIcon from './icons/UploadIcon';

interface ImageUploaderProps {
  title: string;
  onImageUpload: (base64: string) => void;
  stockImages?: StockModel[];
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ title, onImageUpload, stockImages }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setPreview(base64String);
        onImageUpload(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleStockImageClick = async (imageUrl: string) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setPreview(base64String);
        onImageUpload(base64String);
      };
      reader.readAsDataURL(blob);
    } catch (error) {
      console.error('Error fetching stock image:', error);
    }
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 shadow-lg">
      <h3 className="text-xl font-bold text-cyan-400 mb-4">{title}</h3>
      <div
        className="w-full h-64 border-2 border-dashed border-gray-600 rounded-lg flex items-center justify-center cursor-pointer bg-gray-900/50 hover:border-cyan-500 transition-colors"
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept="image/png, image/jpeg, image/webp"
        />
        {preview ? (
          <img src={preview} alt="Preview" className="w-full h-full object-cover rounded-md" />
        ) : (
          <div className="text-center text-gray-400">
            <UploadIcon />
            <p>Click to upload</p>
            <p className="text-xs">PNG, JPG, WEBP</p>
          </div>
        )}
      </div>
      {stockImages && (
        <div className="mt-4">
          <p className="text-sm text-gray-400 mb-2">Or select a stock model:</p>
          <div className="grid grid-cols-4 gap-2">
            {stockImages.map((img) => (
              <img
                key={img.id}
                src={img.src}
                alt={img.alt}
                className="w-full h-16 object-cover rounded-md cursor-pointer border-2 border-transparent hover:border-cyan-500 transition-all"
                onClick={() => handleStockImageClick(img.src)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
