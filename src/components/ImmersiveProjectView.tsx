import type { ProjectDefinition } from '../types';

type ImmersiveProjectViewProps = {
  project: ProjectDefinition;
  onClose: () => void;
  transitionOrigin?: { x: number; y: number } | null;
  isClosing?: boolean;
};

export function ImmersiveProjectView({
  project,
  onClose,
  transitionOrigin,
  isClosing = false,
}: ImmersiveProjectViewProps) {
  return (
    <section
      className={`immersive-project-view ${transitionOrigin ? 'immersive-project-view-animated' : ''} ${isClosing ? 'is-closing' : ''}`}
      aria-label={project.title}
      style={
        transitionOrigin
          ? ({
              ['--detail-origin-x' as '--detail-origin-x']: `${transitionOrigin.x}px`,
              ['--detail-origin-y' as '--detail-origin-y']: `${transitionOrigin.y}px`,
            } as React.CSSProperties)
          : undefined
      }
    >
      <header className="immersive-header">
        <button type="button" className="detail-back" onClick={onClose}>
          <img src="/assets/back.png" alt="" aria-hidden="true" />
          <span>返回</span>
        </button>
      </header>

      <div className="immersive-body">
        {project.detail.type === 'image' ? (
          <div className="project-image-stack">
            {project.detail.images.map((image) => (
              <img key={image} src={image} alt={project.title} className="project-detail-image" />
            ))}
          </div>
        ) : project.detail.type === 'video' ? (
          <div className="project-video-stack">
            <h1 className="project-video-title">{project.title}</h1>
            <p className="project-video-summary">{project.summary}</p>
            <video className="project-detail-video" controls playsInline preload="metadata">
              <source src={project.detail.src} type="video/mp4" />
              你的浏览器暂不支持视频播放。
            </video>
          </div>
        ) : (
          <iframe
            className="project-html-frame"
            src={project.detail.src}
            title={project.title}
          />
        )}
      </div>
    </section>
  );
}
