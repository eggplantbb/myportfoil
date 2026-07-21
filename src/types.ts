export type ProductModalId = 'codex' | 'book' | 'map' | 'jinyong' | 'write';

export type ItemAction =
  | { type: 'openProject'; projectId: string }
  | { type: 'openModal'; id: ProductModalId }
  | { type: 'openWechat' };

export type CollageItemData = {
  id: string;
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
  hoverEffect?: 'breathe';
  action?: ItemAction;
  className?: string;
};

export type TabDefinition = {
  id: string;
  label: string;
  themeClass: string;
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

export type ProjectDetail = ProjectImageDetail | ProjectHtmlDetail;

export type ProjectDefinition = {
  id: string;
  title: string;
  detail: ProjectDetail;
};
