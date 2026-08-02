import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Navbar({ onToggleSidebar, title }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="admin-navbar">
      <div className="d-flex align-items-center gap-3">
        <button
          className="btn btn-link text-dark p-0 sidebar-toggle d-lg-none"
          onClick={onToggleSidebar}
        >
          <i className="bi bi-list fs-4"></i>
        </button>
        <div>
          <h4 className="mb-0 fw-bold navbar-title">{title}</h4>
        </div>
      </div>

      <div className="d-flex align-items-center gap-3">
        <div className="d-none d-md-block">
          <div className="input-group navbar-search">
            <span className="input-group-text bg-light border-0">
              <i className="bi bi-search text-muted"></i>
            </span>
            <input
              type="text"
              className="form-control bg-light border-0"
              placeholder="Quick search..."
            />
          </div>
        </div>

        <button className="btn btn-light btn-icon position-relative">
          <i className="bi bi-bell"></i>
          <span className="notification-dot"></span>
        </button>

        <div className="dropdown">
          <button
            className="btn btn-light d-flex align-items-center gap-2 dropdown-toggle"
            data-bs-toggle="dropdown"
          >
            <div className="avatar-circle">
              {user?.name?.charAt(0)?.toUpperCase() || "A"}
            </div>
            <span className="d-none d-md-inline fw-semibold small">
              {user?.name || "Admin"}
            </span>
          </button>
          <ul className="dropdown-menu dropdown-menu-end shadow border-0 rounded-3">
            <li>
              <span className="dropdown-item-text small text-muted">{user?.email}</span>
            </li>
            <li><hr className="dropdown-divider" /></li>
            <li>
              <button className="dropdown-item" onClick={() => navigate("/dashboard")}>
                <i className="bi bi-speedometer2 me-2"></i> Dashboard
              </button>
            </li>
            <li>
              <button className="dropdown-item text-danger" onClick={handleLogout}>
                <i className="bi bi-box-arrow-right me-2"></i> Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
