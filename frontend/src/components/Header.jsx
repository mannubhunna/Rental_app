import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark sticky-top shadow-lg custom-navbar"
    >
      <div className="container">

        {/* Logo */}

        <NavLink className="navbar-brand fw-bold fs-3 d-flex align-items-center" to="/">
          <i className="bi bi-buildings-fill text-warning me-2"></i>
          MJ Rental
        </NavLink>

        {/* Mobile Toggle */}

        <button
          className="navbar-toggler border-0 shadow-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menu */}

        <div className="collapse navbar-collapse" id="navbar">

          <ul className="navbar-nav ms-auto align-items-lg-center">

            <li className="nav-item mx-lg-2">
              <NavLink className="nav-link" to="/">
                <i className="bi bi-house-door-fill me-2"></i>
                Dashboard
              </NavLink>
            </li>

            <li className="nav-item mx-lg-2">
              <NavLink className="nav-link" to="/properties">
                <i className="bi bi-buildings-fill me-2"></i>
                Properties
              </NavLink>
            </li>

            <li className="nav-item mx-lg-2">
              <NavLink className="nav-link" to="/addpropertymanual">
                <i className="bi bi-plus-circle-fill me-2"></i>
                Add Property
              </NavLink>
            </li>

            <li className="nav-item mx-lg-2">
              <NavLink className="nav-link" to="/demands">
                <i className="bi bi-people-fill me-2"></i>
                Customers
              </NavLink>
            </li>

          </ul>

        </div>

      </div>
    </nav>
  );
}