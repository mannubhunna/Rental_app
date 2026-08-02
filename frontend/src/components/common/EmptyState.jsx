export default function EmptyState({ icon = "inbox", title = "No data found", description, action }) {
  return (
    <div className="text-center py-5">
      <div className="empty-state-icon mb-3">
        <i className={`bi bi-${icon} display-4 text-muted opacity-50`}></i>
      </div>
      <h5 className="fw-semibold text-secondary">{title}</h5>
      {description && <p className="text-muted mb-4">{description}</p>}
      {action}
    </div>
  );
}
