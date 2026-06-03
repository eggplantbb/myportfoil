import { CollageItem } from './CollageItem';
import type { CollageItemData, TabDefinition } from '../types';

type CollageCanvasProps = {
  tab: TabDefinition;
  onItemClick: (item: CollageItemData) => void;
};

export function CollageCanvas({ tab, onItemClick }: CollageCanvasProps) {
  return (
    <section className={`canvas-shell ${tab.themeClass}`} aria-label={tab.label}>
      <div className="canvas-grid" />
      <div className="canvas-items">
        {tab.items.map((item) => (
          <CollageItem key={item.id} item={item} onClick={onItemClick} />
        ))}
      </div>
    </section>
  );
}
