import type { TabDefinition } from '../types';

type TabBarProps = {
  tabs: TabDefinition[];
  activeTabId: string;
  onChange: (tabId: string) => void;
};

const tabColors: Record<string, string> = {
  'theme-lavender': '#b9a7ff',
  'theme-olive': '#c4cf6f',
  'theme-pink': '#f29bd4',
  'theme-blue': '#b8cff8',
};

function hasChinese(text: string) {
  return /[\u4e00-\u9fff]/.test(text);
}

function getLabelClass(tab: TabDefinition) {
  if (hasChinese(tab.label)) {
    return 'tab-label-cjk';
  }

  if (tab.id === 'hello-world') {
    return 'tab-label-latin';
  }

  return '';
}

function TabShape({ active, color }: { active: boolean; color: string }) {
  const width = active ? 320 : 150;
  const height = active ? 63 : 42;
  const path = active
    ? 'M0 63 L24 16 Q30 0 46 0 H274 Q290 0 296 16 L320 63 Z'
    : 'M0 42 L14 12 Q18 0 30 0 H120 Q132 0 136 12 L150 42 Z';

  return (
    <svg
      className="tab-shape"
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      aria-hidden="true"
    >
      <path d={path} fill={color} />
    </svg>
  );
}

export function TabBar({ tabs, activeTabId, onChange }: TabBarProps) {
  return (
    <nav className="tab-bar" aria-label="栏目切换">
      {tabs.map((tab) => {
        const isActive = tab.id === activeTabId;
        const fillColor = tabColors[tab.themeClass] ?? '#b9a7ff';

        return (
          <button
            key={tab.id}
            type="button"
            className={`tab-pill ${tab.themeClass} ${isActive ? 'is-active' : ''}`}
            onClick={() => onChange(tab.id)}
          >
            <TabShape active={isActive} color={fillColor} />
            <span className={`tab-label ${getLabelClass(tab)}`}>
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
