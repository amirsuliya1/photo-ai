
import type { StylePreset, AspectRatio, StockModel } from './types';

export const STYLE_PRESETS: StylePreset[] = [
  { id: 'studio', name: 'Professional Studio' },
  { id: 'outdoor', name: 'Outdoor Lifestyle' },
  { id: 'social', name: 'Social Media Aesthetic' },
  { id: 'ecommerce', name: 'E-commerce' },
];

export const ASPECT_RATIOS: AspectRatio[] = [
  { name: '1:1 (Square)', value: '1:1' },
  { name: '16:9 (Landscape)', value: '16:9' },
  { name: '9:16 (Portrait)', value: '9:16' },
];

export const STOCK_MODELS: StockModel[] = [
    { id: 1, src: 'https://picsum.photos/id/1005/512/512', alt: 'Woman in sunlight' },
    { id: 2, src: 'https://picsum.photos/id/1011/512/512', alt: 'Woman smiling' },
    { id: 3, src: 'https://picsum.photos/id/1027/512/512', alt: 'Man with coffee' },
    { id: 4, src: 'https://picsum.photos/id/64/512/512', alt: 'Man in city' },
];
