export default function StatCard({ icon, label, value, trend, color = "primary", onClick }) {
  return (
    <div
      className={`stat-card stat-card-${color} ${onClick ? "cursor-pointer" : ""}`}
      onClick={onClick}
      role={onClick ? "button" : undefined}
    >
      <div className="d-flex justify-content-between align-items-start">
        <div>
          <p className="stat-label mb-1">{label}</p>
          <h3 className="stat-value mb-0">{value}</h3>
          {trend && (
            <small className={`stat-trend ${trend.positive ? "text-success" : "text-danger"}`}>
              <i className={`bi bi-arrow-${trend.positive ? "up" : "down"}-short`}></i>
              {trend.text}
            </small>
          )}
        </div>
        <div className={`stat-icon bg-${color}-subtle text-${color}`}>
          <i className={`bi bi-${icon}`}></i>
        </div>
      </div>
    </div>
  );
}
