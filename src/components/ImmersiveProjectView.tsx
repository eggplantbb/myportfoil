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
