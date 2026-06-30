import { useState } from 'react';
import { CollageCanvas } from './components/CollageCanvas';
import { ImmersiveProjectView } from './components/ImmersiveProjectView';
import { TabBar } from './components/TabBar';
import { WechatModal } from './components/WechatModal';
import { projectMap } from './content/projects';
import { tabs } from './content/tabs';
import type { CollageItemData } from './types';

export default function App() {
  const [activeTabId, setActiveTabId] = useState(tabs[0].id);
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const [detailTransitionOrigin, setDetailTransitionOrigin] = useState<{ x: number; y: number } | null>(null);
  const [detailClosing, setDetailClosing] = useState(false);
  const [wechatOpen, setWechatOpen] = useState(false);

  const activeTab = tabs.find((tab) => tab.id === activeTabId) ?? tabs[0];
  const activeProject = activeProjectId ? projectMap.get(activeProjectId) ?? null : null;

  const handleItemClick = (item: CollageItemData, rect: DOMRect | null) => {
    const action = item.action;

    if (!action || action.type === 'none') {
      return;
    }

    if (action.type === 'openWechat') {
      setWechatOpen(true);
      return;
    }

    if (rect) {
      setDetailTransitionOrigin({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      });
    } else {
      setDetailTransitionOrigin(null);
    }

    setDetailClosing(false);
    setActiveProjectId(action.projectId);
  };

  const handleDetailClose = () => {
    if (detailTransitionOrigin) {
      setDetailClosing(true);
      window.setTimeout(() => {
        setActiveProjectId(null);
        setDetailTransitionOrigin(null);
        setDetailClosing(false);
      }, 520);
      return;
    }

    setActiveProjectId(null);
    setDetailTransitionOrigin(null);
    setDetailClosing(false);
  };

  return (
    <div className={`app-shell ${activeProject ? 'is-detail-mode' : ''}`}>
      {activeProject ? (
        <ImmersiveProjectView
          project={activeProject}
          onClose={handleDetailClose}
          transitionOrigin={detailTransitionOrigin}
          isClosing={detailClosing}
        />
      ) : (
        <>
          <TabBar tabs={tabs} activeTabId={activeTabId} onChange={setActiveTabId} />
          <main className="main-stage">
            <CollageCanvas key={activeTab.id} tab={activeTab} onItemClick={handleItemClick} />
          </main>
          <footer className="site-footer">
            <img src="/assets/footer-made-by.png" alt="made by ChatGPT x Figma" />
          </footer>
        </>
      )}
      <WechatModal open={wechatOpen} onClose={() => setWechatOpen(false)} />
    </div>
  );
}
