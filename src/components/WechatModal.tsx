type WechatModalProps = {
  open: boolean;
  onClose: () => void;
};

export function WechatModal({ open, onClose }: WechatModalProps) {
  if (!open) {
    return null;
  }

  return (
    <div className="modal-backdrop" role="presentation" onClick={onClose}>
      <section
        className="wechat-modal"
        role="dialog"
        aria-modal="true"
        aria-label="微信二维码"
        onClick={(event) => event.stopPropagation()}
      >
        <button type="button" className="wechat-close" onClick={onClose} aria-label="关闭弹窗">
          X
        </button>
        <div className="wechat-modal-body">
          <h2>微信二维码</h2>
          <div className="qr-placeholder">
            <span>后续替换成你的二维码图片</span>
          </div>
        </div>
      </section>
    </div>
  );
}
