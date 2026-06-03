import type { CSSProperties } from 'react';
import type { CollageItemData } from '../types';

type CollageItemProps = {
  item: CollageItemData;
  onClick: (item: CollageItemData) => void;
};

export function CollageItem({ item, onClick }: CollageItemProps) {
  const isInteractive = item.action && item.action.type !== 'none';
  const style: CSSProperties & Record<'--base-rotate', string> = {
    left: item.x,
    top: item.y,
    width: item.width,
    height: item.height,
    zIndex: item.zIndex ?? 1,
    '--base-rotate': `${item.rotate ?? 0}deg`,
  };

  const classes = [
    'collage-item',
    item.className ?? '',
    item.hoverEffect === 'breathe' ? 'hover-breathe' : '',
    item.hoverEffect === 'swing' ? 'hover-swing' : '',
    isInteractive ? 'is-clickable' : '',
  ]
    .join(' ')
    .trim();

  return (
    <button
      type="button"
      className={classes}
      style={style}
      onClick={() => onClick(item)}
      aria-disabled={!isInteractive}
    >
      {item.imageSrc ? (
        <img className="collage-image" src={item.imageSrc} alt={item.alt ?? item.title ?? ''} />
      ) : (
        <div className="collage-placeholder" aria-hidden="true" />
      )}
      <div className="collage-content">
        {item.title ? <strong>{item.title}</strong> : null}
        {item.body ? <span>{item.body}</span> : null}
      </div>
    </button>
  );
}
