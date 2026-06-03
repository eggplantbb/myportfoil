import type { TabDefinition } from '../../types';
import { figmaAssets } from '../figmaAssets';

// 这里维护 看看世界 页的拼贴配置。
export const travelTab: TabDefinition = {
  id: 'travel',
  label: '看看世界',
  themeClass: 'theme-blue',
  boardTextureSrc: figmaAssets.boardTexture,
  items: [
     // w-1
    {
      id: 'w-1',
      kind: 'photo',
      imageSrc:'/public/assets/tiezhi/w-1.png',
      x: 210,
      y: 110,
      width: 630,
      height: 470,
      rotate: 3,
      hoverEffect: 'breathe',
      className: 'floating-cutout',
    },
  ],
};
