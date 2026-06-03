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
  const [wechatOpen, setWechatOpen] = useState(false);

  const activeTab = tabs.find((tab) => tab.id === activeTabId) ?? tabs[0];
  const activeProject = activeProjectId ? projectMap.get(activeProjectId) ?? null : null;

  const handleItemClick = (item: CollageItemData) => {
    const action = item.action;

    if (!action || action.type === 'none') {
      return;
    }

    if (action.type === 'openWechat') {
      setWechatOpen(true);
      return;
    }

    setActiveProjectId(action.projectId);
  };

  return (
    <div className="app-shell">
      {activeProject ? (
        <ImmersiveProjectView project={activeProject} onClose={() => setActiveProjectId(null)} />
      ) : (
        <>
          <TabBar tabs={tabs} activeTabId={activeTabId} onChange={setActiveTabId} />
          <main className="main-stage">
            <CollageCanvas key={activeTab.id} tab={activeTab} onItemClick={handleItemClick} />
          </main>
          <footer className="site-footer">素材和细节样式将在接入 Figma 后精修</footer>
        </>
      )}
      <WechatModal open={wechatOpen} onClose={() => setWechatOpen(false)} />
    </div>
  );
}
