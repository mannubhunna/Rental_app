export default function ErrorState({ message = "Something went wrong", onRetry }) {
  return (
    <div className="text-center py-5">
      <i className="bi bi-exclamation-triangle display-4 text-danger opacity-75 mb-3 d-block"></i>
      <h5 className="fw-semibold">{message}</h5>
      {onRetry && (
        <button className="btn btn-outline-primary mt-3" onClick={onRetry}>
          <i className="bi bi-arrow-clockwise me-2"></i>
          Try Again
        </button>
      )}
    </div>
  );
}
