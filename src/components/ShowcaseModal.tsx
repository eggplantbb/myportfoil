import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';

const wechatId = 'eggplant_bb';

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
  const [copyToast, setCopyToast] = useState<string | null>(null);
  const toastTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (toastTimerRef.current !== null) {
        window.clearTimeout(toastTimerRef.current);
      }
    };
  }, [onClose]);

  const handleCopyWechatId = async () => {
    try {
      await navigator.clipboard.writeText(wechatId);
      setCopyToast('已复制微信号');
    } catch {
      setCopyToast('复制失败，请手动复制');
    }

    if (toastTimerRef.current !== null) {
      window.clearTimeout(toastTimerRef.current);
    }
    toastTimerRef.current = window.setTimeout(() => setCopyToast(null), 1800);
  };

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
              <div className="qr-account-row">
                <span>{wechatId}</span>
                <button
                  type="button"
                  className="qr-copy-button"
                  onClick={handleCopyWechatId}
                  aria-label="复制微信号"
                  title="复制微信号"
                >
                  <span aria-hidden="true">⧉</span>
                </button>
              </div>
            </>
          )}
        </div>
        {copyToast ? (
          <div className="copy-toast" role="status" aria-live="polite">
            {copyToast}
          </div>
        ) : null}
      </section>
    </div>
  );
}
