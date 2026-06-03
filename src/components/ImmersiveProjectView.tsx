import { figmaAssets } from '../content/figmaAssets';
import type { ProjectDefinition } from '../types';

type ImmersiveProjectViewProps = {
  project: ProjectDefinition;
  onClose: () => void;
};

export function ImmersiveProjectView({ project, onClose }: ImmersiveProjectViewProps) {
  return (
    <section className="immersive-project-view" aria-label={project.title}>
      <header className="immersive-header">
        <button type="button" className="detail-back" onClick={onClose}>
          <img src={figmaAssets.detailBackIcon} alt="" aria-hidden="true" />
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
