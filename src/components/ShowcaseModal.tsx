import { Fragment, useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { productModalContent } from '../content/productModals';
import { writingThemes } from '../content/writingThemes';
import type { ProductModalId } from '../types';

const wechatId = 'eggplant_bb';

const renderInlineWritingText = (text: string, keyPrefix: string) => {
  const tokenPattern = /\*\*(.+?)\*\*|<span class="(text-[a-z-]+)">(.+?)<\/span>/g;
  const nodes: JSX.Element[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let index = 0;

  while ((match = tokenPattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(<Fragment key={`${keyPrefix}-text-${index}`}>{text.slice(lastIndex, match.index)}</Fragment>);
      index += 1;
    }

    if (match[1]) {
      nodes.push(<strong key={`${keyPrefix}-bold-${index}`}>{match[1]}</strong>);
    } else if (match[2] && match[3]) {
      nodes.push(
        <span className={match[2]} key={`${keyPrefix}-color-${index}`}>
          {match[3]}
        </span>,
      );
    }

    lastIndex = tokenPattern.lastIndex;
    index += 1;
  }

  if (lastIndex < text.length) {
    nodes.push(<Fragment key={`${keyPrefix}-text-${index}`}>{text.slice(lastIndex)}</Fragment>);
  }

  return nodes;
};

const renderWritingContent = (content: string) =>
  content.split(/\n\s*\n/).map((paragraph, paragraphIndex) => (
    <p key={`paragraph-${paragraphIndex}`}>
      {paragraph.split('\n').map((line, lineIndex) => (
        <Fragment key={`line-${paragraphIndex}-${lineIndex}`}>
          {lineIndex > 0 ? <br /> : null}
          {renderInlineWritingText(line, `line-${paragraphIndex}-${lineIndex}`)}
        </Fragment>
      ))}
    </p>
  ));

type ShowcaseModalProps = {
  title: string;
  variant: 'qr' | 'product';
  productId?: ProductModalId;
  imageSrc?: string;
  centerX?: number | null;
  onClose: () => void;
};

export function ShowcaseModal({
  title,
  variant,
  productId,
  imageSrc,
  centerX,
  onClose,
}: ShowcaseModalProps) {
  const [copyToast, setCopyToast] = useState<string | null>(null);
  const [openThemeId, setOpenThemeId] = useState<string | null>(null);
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

  const toggleTheme = (themeId: string) => {
    setOpenThemeId((current) => (current === themeId ? null : themeId));
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

  const showWritingThemes = variant === 'product' && (productId == null || productId === 'write');

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
          <img src="/assets/close.webp" alt="" aria-hidden="true" />
        </button>
        <div className="showcase-modal-body">
          {showWritingThemes ? (
            <div className="product-modal-content writing-themes-content">
              <h2>一些想法</h2>
              <div className="writing-themes-list">
                {writingThemes.map((theme) => {
                  const isOpen = openThemeId === theme.id;

                  return (
                    <article className={`writing-theme ${isOpen ? 'is-open' : ''}`} key={theme.id}>
                      <button
                        type="button"
                        className="writing-theme-trigger"
                        aria-expanded={isOpen}
                        onClick={() => toggleTheme(theme.id)}
                      >
                        <span>{theme.title}</span>
                        <span
                          className={`writing-theme-icon ${isOpen ? 'is-open' : ''}`}
                          aria-hidden="true"
                        />
                      </button>
                      {isOpen ? <div className="writing-theme-content">{renderWritingContent(theme.content)}</div> : null}
                    </article>
                  );
                })}
              </div>
            </div>
          ) : variant === 'product' ? (
            <div className="product-modal-content">
              {(() => {
                const content = productModalContent[productId!];

                return (
                  <>
                    <h2>{content.title}</h2>
                    <div className="product-modal-media">
                      {content.imageSrc ? (
                        <img className="product-modal-image" src={content.imageSrc} alt={content.title} />
                      ) : (
                        <div className="product-modal-image-placeholder">暂无图片</div>
                      )}
                    </div>
                    <p>{content.body}</p>
                    <div className="product-modal-link-slot">
                      {content.linkHref && content.linkText ? (
                        <a
                          className="product-modal-link"
                          href={content.linkHref}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {content.linkText}
                        </a>
                      ) : null}
                    </div>
                  </>
                );
              })()}
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
