import { NavLink } from "react-router-dom";

const navItems = [
  { path: "/dashboard", icon: "speedometer2", label: "Dashboard" },
  { path: "/properties", icon: "building", label: "All Properties" },
  { path: "/properties/add", icon: "plus-circle", label: "Add Property" },
  { path: "/properties/add-ai", icon: "stars", label: "Add with AI" },
  { path: "/demands", icon: "people", label: "Customer Demands" },
  { path: "/matching", icon: "intersect", label: "Matching" },
];

export default function Sidebar({ collapsed, onClose }) {
  return (
    <>
      {onClose && (
        <div
          className={`sidebar-overlay ${collapsed ? "" : "show"}`}
          onClick={onClose}
        ></div>
      )}
      <aside className={`admin-sidebar ${collapsed ? "collapsed" : ""}`}>
        <div className="sidebar-brand px-4 py-4">
          <div className="d-flex align-items-center gap-2">
            <div className="brand-icon">
              <i className="bi bi-buildings"></i>
            </div>
            <div>
              <h5 className="mb-0 fw-bold text-white">TriCity</h5>
              <small className="text-white-50">Rental Admin</small>
            </div>
          </div>
        </div>

        <nav className="sidebar-nav px-3">
          <small className="text-white-50 text-uppercase px-3 mb-2 d-block" style={{ fontSize: "0.7rem", letterSpacing: "1px" }}>
            Main Menu
          </small>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `sidebar-link ${isActive ? "active" : ""}`
              }
              onClick={onClose}
            >
              <i className={`bi bi-${item.icon}`}></i>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer px-4 py-3 mt-auto">
          <div className="sidebar-footer-card rounded-3 p-3">
            <i className="bi bi-headset text-warning mb-2 d-block"></i>
            <small className="text-white-50 d-block">Need help?</small>
            <small className="text-white fw-semibold">support@tricity.com</small>
          </div>
        </div>
      </aside>
    </>
  );
}
