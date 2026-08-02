export default function ConfirmDialog({ show, title, message, onConfirm, onCancel, confirmText = "Confirm", variant = "danger" }) {
  if (!show) return null;

  return (
    <>
      <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-0 shadow-lg rounded-4">
            <div className="modal-header border-0 pb-0">
              <h5 className="modal-title fw-bold">
                <i className={`bi bi-exclamation-circle text-${variant} me-2`}></i>
                {title}
              </h5>
              <button type="button" className="btn-close" onClick={onCancel}></button>
            </div>
            <div className="modal-body text-muted">{message}</div>
            <div className="modal-footer border-0 pt-0">
              <button type="button" className="btn btn-light" onClick={onCancel}>
                Cancel
              </button>
              <button type="button" className={`btn btn-${variant}`} onClick={onConfirm}>
                {confirmText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
