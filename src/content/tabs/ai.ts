import type { TabDefinition } from '../../types';
import { figmaAssets } from '../figmaAssets';

// 这里维护 玩玩 AI 页的拼贴配置。
export const aiTab: TabDefinition = {
  id: 'ai',
  label: '玩玩 AI',
  themeClass: 'theme-pink',
  boardTextureSrc: figmaAssets.boardTexture,
  items: [
    // 占位项目，后续按你的实际 AI 素材继续补
    {
      id: 'ai-project',
      kind: 'photo',
      title: 'AI 相关作品',
      body: '点击进入',
      x: 224,
      y: 144,
      width: 330,
      height: 250,
      rotate: -6,
      hoverEffect: 'breathe',
      action: { type: 'openProject', projectId: 'sample-html' },
      className: 'photo-card',
    },
  ],
};
