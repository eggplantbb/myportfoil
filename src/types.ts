export type HoverEffect = 'none' | 'breathe' | 'swing';

export type ItemAction =
  | { type: 'openProject'; projectId: string }
  | { type: 'openWechat' }
  | { type: 'none' };

export type CollageItemData = {
  id: string;
  kind: 'card' | 'photo' | 'note' | 'sticker' | 'paper';
  title?: string;
  body?: string;
  imageSrc?: string;
  alt?: string;
  x: number;
  y: number;
  width: number;
  height?: number;
  rotate?: number;
  zIndex?: number;
  hoverEffect?: HoverEffect;
  action?: ItemAction;
  className?: string;
};

export type TabDefinition = {
  id: string;
  label: string;
  themeClass: string;
  boardTextureSrc?: string;
  items: CollageItemData[];
};

export type ProjectImageDetail = {
  type: 'image';
  images: string[];
};

export type ProjectHtmlDetail = {
  type: 'html';
  src: string;
};

export type ProjectVideoDetail = {
  type: 'video';
  src: string;
};

export type ProjectDetail = ProjectImageDetail | ProjectHtmlDetail | ProjectVideoDetail;

export type ProjectDefinition = {
  id: string;
  title: string;
  summary: string;
  detail: ProjectDetail;
};
