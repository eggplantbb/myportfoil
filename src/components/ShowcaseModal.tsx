import { useEffect } from 'react';
import type { CSSProperties } from 'react';

type ShowcaseModalProps = {
  title: string;
  variant: 'qr' | 'product';
  body?: string;
  imageSrc?: string;
  linkText?: string;
  linkHref?: string;
  centerX?: number | null;
  onClose: () => void;
};

export function ShowcaseModal({
  title,
  variant,
  body,
  imageSrc,
  linkText,
  linkHref,
  centerX,
  onClose,
}: ShowcaseModalProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const modalStyle: CSSProperties | undefined =
    centerX == null
      ? undefined
      : {
          left: centerX,
          position: 'fixed',
          top: '50%',
          transform: 'translate(-50%, -50%)',
        };

  return (
    <div className="modal-backdrop" role="presentation" onClick={onClose}>
      <section
        className={`showcase-modal ${variant === 'product' ? 'showcase-modal-wide' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        style={modalStyle}
        onClick={(event) => event.stopPropagation()}
      >
        <button type="button" className="showcase-modal-close" onClick={onClose} aria-label="关闭弹窗">
          <img src="/assets/close.png" alt="" aria-hidden="true" />
        </button>
        <div className="showcase-modal-body">
          {variant === 'product' ? (
            <div className="product-modal-content">
              <div className="product-modal-media">
                {imageSrc ? (
                  <img className="product-modal-image" src={imageSrc} alt={title} />
                ) : (
                  <div className="product-modal-image-placeholder" aria-hidden="true">
                    <span>图片占位</span>
                  </div>
                )}
              </div>
              <h2>{title}</h2>
              <p>{body}</p>
              <div className="product-modal-link-slot">
                {linkText && linkHref ? (
                  <a className="product-modal-link" href={linkHref} target="_blank" rel="noreferrer">
                    {linkText}
                  </a>
                ) : linkText ? (
                  <span className="product-modal-note">{linkText}</span>
                ) : null}
              </div>
            </div>
          ) : (
            <>
              <h2>{title}</h2>
              {imageSrc ? (
                <img className="qr-image" src={imageSrc} alt={title} />
              ) : (
                <div className="qr-placeholder">
                  <span>后续替换成你的二维码图片</span>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}
