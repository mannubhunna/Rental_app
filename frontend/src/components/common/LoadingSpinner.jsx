export default function LoadingSpinner({ size = "md", text = "Loading..." }) {
  const sizeClass = size === "sm" ? "spinner-border-sm" : size === "lg" ? "" : "";
  const dim = size === "lg" ? { width: "3rem", height: "3rem" } : {};

  return (
    <div className="text-center py-4">
      <div className={`spinner-border text-primary ${sizeClass}`} style={dim} role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      {text && <p className="text-muted mt-3 mb-0 small">{text}</p>}
    </div>
  );
}
