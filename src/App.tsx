import { useLayoutEffect, useState } from 'react';
import { CollageCanvas } from './components/CollageCanvas';
import { EnvelopeIntro } from './components/EnvelopeIntro';
import { ImmersiveProjectView } from './components/ImmersiveProjectView';
import { ShowcaseModal } from './components/ShowcaseModal';
import { TabBar } from './components/TabBar';
import { productModalContent } from './content/productModals';
import { projectMap } from './content/projects';
import { tabs } from './content/tabs';
import type { CollageItemData, ProductModalId } from './types';

type ActiveModal = { type: 'wechat' } | { type: 'product'; id: ProductModalId } | null;

const HOME_WIDTH = 1280;
const HOME_HEIGHT = 874;
const HOME_MARGIN = 16;

function calculateHomeScale() {
  const viewportWidth = window.visualViewport?.width ?? window.innerWidth;
  const viewportHeight = window.visualViewport?.height ?? window.innerHeight;

  return Math.max(
    0.1,
    Math.min(1, (viewportWidth - HOME_MARGIN * 2) / HOME_WIDTH, (viewportHeight - HOME_MARGIN * 2) / HOME_HEIGHT),
  );
}

export default function App() {
  const [activeTabId, setActiveTabId] = useState(tabs[0].id);
  const [introComplete, setIntroComplete] = useState(false);
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const [detailTransitionOrigin, setDetailTransitionOrigin] = useState<{ x: number; y: number } | null>(null);
  const [detailClosing, setDetailClosing] = useState(false);
  const [activeModal, setActiveModal] = useState<ActiveModal>(null);
  const [modalCenterX, setModalCenterX] = useState<number | null>(null);
  const [homeScale, setHomeScale] = useState(calculateHomeScale);

  useLayoutEffect(() => {
    const updateHomeScale = () => setHomeScale(calculateHomeScale());

    window.addEventListener('resize', updateHomeScale);
    window.visualViewport?.addEventListener('resize', updateHomeScale);
    return () => {
      window.removeEventListener('resize', updateHomeScale);
      window.visualViewport?.removeEventListener('resize', updateHomeScale);
    };
  }, []);

  const activeTab = tabs.find((tab) => tab.id === activeTabId) ?? tabs[0];
  const activeProject = activeProjectId ? projectMap.get(activeProjectId) ?? null : null;
  const activeProductModal = activeModal?.type === 'product' ? productModalContent[activeModal.id] : null;

  const getBookletCenterX = () => {
    const tabBar = document.querySelector('.tab-bar')?.getBoundingClientRect();
    const canvas = document.querySelector('.canvas-shell')?.getBoundingClientRect();

    if (!tabBar && !canvas) {
      return null;
    }

    const left = Math.min(tabBar?.left ?? Number.POSITIVE_INFINITY, canvas?.left ?? Number.POSITIVE_INFINITY);
    const right = Math.max(tabBar?.right ?? Number.NEGATIVE_INFINITY, canvas?.right ?? Number.NEGATIVE_INFINITY);
    return (left + right) / 2;
  };

  const handleItemClick = (item: CollageItemData, rect: DOMRect | null) => {
    const action = item.action;

    if (!action) {
      return;
    }

    if (action.type === 'openWechat') {
      setModalCenterX(getBookletCenterX());
      setActiveModal({ type: 'wechat' });
      return;
    }

    if (action.type === 'openModal') {
      setModalCenterX(getBookletCenterX());
      setActiveModal({ type: 'product', id: action.id });
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

  const closeModal = () => {
    setActiveModal(null);
    setModalCenterX(null);
  };

  return (
    <div className={`app-shell ${activeProject ? 'is-detail-mode' : ''} ${introComplete ? '' : 'is-cover-mode'}`}>
      {introComplete && activeProject ? (
        <ImmersiveProjectView
          project={activeProject}
          onClose={handleDetailClose}
          transitionOrigin={detailTransitionOrigin}
          isClosing={detailClosing}
        />
      ) : introComplete ? (
        <div
          className="home-fit-frame"
          style={{ width: HOME_WIDTH * homeScale, height: HOME_HEIGHT * homeScale }}
        >
          <div className="home-booklet" style={{ transform: `scale(${homeScale})` }}>
            <div className="booklet-header">
              <TabBar tabs={tabs} activeTabId={activeTabId} onChange={setActiveTabId} />
              <img className="booklet-credit" src="/assets/footer-made-by.png" alt="made by ChatGPT x Figma" />
            </div>
            <main className="main-stage">
              <CollageCanvas key={activeTab.id} tab={activeTab} onItemClick={handleItemClick} />
            </main>
          </div>
        </div>
      ) : (
        <EnvelopeIntro onComplete={() => setIntroComplete(true)} />
      )}
      {introComplete && activeModal?.type === 'wechat' ? (
        <ShowcaseModal
          title="微信二维码"
          variant="qr"
          imageSrc="/assets/tiezhi/wechat.JPG"
          centerX={modalCenterX}
          onClose={closeModal}
        />
      ) : null}
      {introComplete && activeModal?.type === 'product' && activeProductModal ? (
        <ShowcaseModal
          variant="product"
          title={activeProductModal.title}
          body={activeProductModal.body}
          imageSrc={activeProductModal.imageSrc}
          linkText={activeProductModal.linkText}
          linkHref={activeProductModal.linkHref}
          centerX={modalCenterX}
          onClose={closeModal}
        />
      ) : null}
    </div>
  );
}
