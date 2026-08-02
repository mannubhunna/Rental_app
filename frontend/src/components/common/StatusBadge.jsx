export default function StatusBadge({ status, type = "availability" }) {
  const configs = {
    availability: {
      true: { label: "Available", class: "bg-success-subtle text-success" },
      false: { label: "Occupied", class: "bg-danger-subtle text-danger" },
      Active: { label: "Active", class: "bg-success-subtle text-success" },
      Pending: { label: "Pending", class: "bg-warning-subtle text-warning" },
      Closed: { label: "Closed", class: "bg-secondary-subtle text-secondary" },
    },
    match: {
      high: { label: "Excellent Match", class: "bg-success" },
      medium: { label: "Good Match", class: "bg-primary" },
      low: { label: "Fair Match", class: "bg-warning text-dark" },
    },
  };

  let config;
  if (type === "match") {
    const pct = typeof status === "number" ? status : 0;
    config = pct >= 90 ? configs.match.high : pct >= 75 ? configs.match.medium : configs.match.low;
    return (
      <span className={`badge ${config.class} rounded-pill px-3`}>
        {pct}% Match
      </span>
    );
  }

  const key = status === "true" || status === true ? "true" : status === "false" || status === false ? "false" : status;
  config = configs.availability[key] || { label: String(status), class: "bg-secondary" };

  return (
    <span className={`badge ${config.class} rounded-pill px-3`}>
      {config.label}
    </span>
  );
}
