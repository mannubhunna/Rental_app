export default function LoadingSkeleton({ rows = 5, type = "table" }) {
  if (type === "card") {
    return (
      <div className="row g-4">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="col-md-6 col-lg-4">
            <div className="card border-0 shadow-sm">
              <div className="placeholder-glow">
                <span className="placeholder col-12 rounded-top" style={{ height: 180, display: "block" }}></span>
                <div className="card-body">
                  <span className="placeholder col-8 mb-2"></span>
                  <span className="placeholder col-6 mb-2"></span>
                  <span className="placeholder col-4"></span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="placeholder-glow">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="d-flex gap-3 mb-3 align-items-center">
          <span className="placeholder rounded" style={{ width: 48, height: 48 }}></span>
          <div className="flex-grow-1">
            <span className="placeholder col-7 mb-1 d-block"></span>
            <span className="placeholder col-4"></span>
          </div>
        </div>
      ))}
    </div>
  );
}
