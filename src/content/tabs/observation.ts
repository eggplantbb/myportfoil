import type { TabDefinition } from '../../types';
import { figmaAssets } from '../figmaAssets';

// 这里维护 人类观察 页的拼贴配置。
export const observationTab: TabDefinition = {
  id: 'observation',
  label: '人类观察',
  themeClass: 'theme-yellow',
  boardTextureSrc: figmaAssets.boardTexture,
  items: [
    // 占位木板区域，后续可继续填入更多观察类素材
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
