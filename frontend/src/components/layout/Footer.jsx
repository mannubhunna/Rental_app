export default function Footer() {
  return (
    <footer className="admin-footer">
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-2">
        <span className="text-muted small">
          © {new Date().getFullYear()} TriCity Rental Management. All rights reserved.
        </span>
        <span className="text-muted small">
          Admin Panel v1.0
        </span>
      </div>
    </footer>
  );
}
