import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import { validateLoginForm } from "../../utils/validation";

export default function Login() {
  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "", rememberMe: false });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateLoginForm(form);
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      login(form);
      showToast("Welcome back! Login successful.");
      navigate("/dashboard");
    } catch (err) {
      showToast(err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-bg"></div>
      <div className="container">
        <div className="row min-vh-100 align-items-center justify-content-center py-5">
          <div className="col-lg-5 col-md-7">
            <div className="auth-card shadow-lg border-0 rounded-4 overflow-hidden">
              <div className="auth-card-header text-center py-4 px-4">
                <div className="auth-logo mb-3">
                  <i className="bi bi-buildings"></i>
                </div>
                <h2 className="fw-bold mb-1">Welcome Back</h2>
                <p className="text-muted mb-0">Sign in to TriCity Rental Admin Panel</p>
              </div>

              <div className="card-body p-4 p-md-5 pt-0">
                <form onSubmit={handleSubmit} noValidate>
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Email Address</label>
                    <div className="input-group">
                      <span className="input-group-text"><i className="bi bi-envelope"></i></span>
                      <input
                        type="email"
                        name="email"
                        className={`form-control ${errors.email ? "is-invalid" : ""}`}
                        placeholder="admin@tricity.com"
                        value={form.email}
                        onChange={handleChange}
                      />
                      {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">Password</label>
                    <div className="input-group">
                      <span className="input-group-text"><i className="bi bi-lock"></i></span>
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        className={`form-control ${errors.password ? "is-invalid" : ""}`}
                        placeholder="Enter your password"
                        value={form.password}
                        onChange={handleChange}
                      />
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        <i className={`bi bi-eye${showPassword ? "-slash" : ""}`}></i>
                      </button>
                      {errors.password && <div className="invalid-feedback d-block">{errors.password}</div>}
                    </div>
                  </div>

                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="rememberMe"
                        id="rememberMe"
                        checked={form.rememberMe}
                        onChange={handleChange}
                      />
                      <label className="form-check-label small" htmlFor="rememberMe">
                        Remember me
                      </label>
                    </div>
                    <a href="#" className="small text-primary text-decoration-none" onClick={(e) => { e.preventDefault(); showToast("Password reset link sent to your email.", "info"); }}>
                      Forgot Password?
                    </a>
                  </div>

                  <button type="submit" className="btn btn-primary btn-lg w-100 mb-3" disabled={loading}>
                    {loading ? (
                      <><span className="spinner-border spinner-border-sm me-2"></span>Signing in...</>
                    ) : (
                      <><i className="bi bi-box-arrow-in-right me-2"></i>Sign In</>
                    )}
                  </button>

                  <p className="text-center text-muted small mb-0">
                    Don't have an account?{" "}
                    <Link to="/signup" className="text-primary fw-semibold text-decoration-none">
                      Create Admin Account
                    </Link>
                  </p>
                </form>

                <div className="mt-4 p-3 bg-light rounded-3 small text-muted">
                  <strong>Demo:</strong> admin@tricity.com / Admin@123
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
