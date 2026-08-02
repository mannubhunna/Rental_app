import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Breadcrumb from "../../components/layout/Breadcrumb";
import StatCard from "../../components/common/StatCard";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import { fetchProperties, getImageUrl } from "../../services/api";
import { getDemands, getActivities, getMatchedCount } from "../../services/demandsService";

export default function Dashboard() {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [demands, setDemands] = useState([]);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const data = await fetchProperties();
      setProperties(data);
      setDemands(getDemands());
      setActivities(getActivities());
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const total = properties.length;
  const available = properties.filter((p) => p.available === "true" || p.available === true).length;
  const occupied = total - available;
  const matched = getMatchedCount(getDemands(), properties);
  const recent = [...properties].reverse().slice(0, 5);

  const quickActions = [
    { icon: "plus-circle", label: "Add Property", path: "/properties/add", color: "primary" },
    { icon: "stars", label: "AI Generator", path: "/properties/add-ai", color: "warning" },
    { icon: "people", label: "View Demands", path: "/demands", color: "info" },
    { icon: "intersect", label: "Matching", path: "/matching", color: "success" },
  ];

  if (loading) return <LoadingSpinner text="Loading dashboard..." />;

  return (
    <div>
      <Breadcrumb items={[{ label: "Dashboard" }]} />

      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-3">
        <div>
          <h3 className="fw-bold mb-1">Dashboard Overview</h3>
          <p className="text-muted mb-0">Welcome back! Here's what's happening today.</p>
        </div>
        <button className="btn btn-primary" onClick={() => navigate("/properties/add")}>
          <i className="bi bi-plus-lg me-2"></i>Add Property
        </button>
      </div>

      <div className="row g-4 mb-4">
        <div className="col-sm-6 col-xl-3">
          <StatCard icon="building" label="Total Properties" value={total} color="primary" onClick={() => navigate("/properties")} />
        </div>
        <div className="col-sm-6 col-xl-3">
          <StatCard icon="check-circle" label="Available" value={available} color="success" onClick={() => navigate("/properties")} />
        </div>
        <div className="col-sm-6 col-xl-3">
          <StatCard icon="x-circle" label="Occupied" value={occupied} color="danger" />
        </div>
        <div className="col-sm-6 col-xl-3">
          <StatCard icon="people" label="Customer Demands" value={demands.length} color="info" onClick={() => navigate("/demands")} />
        </div>
      </div>

      <div className="row g-4 mb-4">
        <div className="col-md-4">
          <div className="card border-0 shadow-sm rounded-4 h-100">
            <div className="card-body text-center py-4">
              <div className="match-circle mx-auto mb-3">
                <span className="fw-bold fs-4">{matched}</span>
              </div>
              <h5 className="fw-bold">Matched Properties</h5>
              <p className="text-muted small mb-3">Properties matching customer requirements</p>
              <Link to="/matching" className="btn btn-outline-primary btn-sm">View Matches</Link>
            </div>
          </div>
        </div>

        <div className="col-md-8">
          <div className="card border-0 shadow-sm rounded-4 h-100">
            <div className="card-header bg-white border-0 pt-4 px-4">
              <h5 className="fw-bold mb-0">Quick Actions</h5>
            </div>
            <div className="card-body px-4 pb-4">
              <div className="row g-3">
                {quickActions.map((action) => (
                  <div key={action.path} className="col-6 col-md-3">
                    <button
                      className={`quick-action-btn w-100 text-${action.color}`}
                      onClick={() => navigate(action.path)}
                    >
                      <i className={`bi bi-${action.icon} fs-4 d-block mb-2`}></i>
                      <span className="small fw-semibold">{action.label}</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-lg-7">
          <div className="card border-0 shadow-sm rounded-4">
            <div className="card-header bg-white border-0 d-flex justify-content-between align-items-center pt-4 px-4">
              <h5 className="fw-bold mb-0">Recent Properties</h5>
              <Link to="/properties" className="btn btn-sm btn-outline-primary">View All</Link>
            </div>
            <div className="card-body px-4 pb-4">
              {recent.length === 0 ? (
                <p className="text-muted text-center py-4">No properties yet</p>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover align-middle mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>Property</th>
                        <th>Location</th>
                        <th>Rent</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recent.map((p) => (
                        <tr key={p.id} style={{ cursor: "pointer" }} onClick={() => navigate(`/properties/${p.id}`)}>
                          <td>
                            <div className="d-flex align-items-center gap-2">
                              <img src={getImageUrl(p.image)} alt="" className="rounded table-thumb" />
                              <span className="fw-semibold">{p.propertyName}</span>
                            </div>
                          </td>
                          <td className="text-muted small">{p.location}</td>
                          <td className="fw-semibold text-primary">₹{p.budget}</td>
                          <td>
                            <span className={`badge ${p.available === "true" || p.available === true ? "bg-success-subtle text-success" : "bg-danger-subtle text-danger"} rounded-pill`}>
                              {p.available === "true" || p.available === true ? "Available" : "Occupied"}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="col-lg-5">
          <div className="card border-0 shadow-sm rounded-4 mb-4">
            <div className="card-header bg-white border-0 pt-4 px-4">
              <h5 className="fw-bold mb-0">Recent Activities</h5>
            </div>
            <div className="card-body px-4 pb-4">
              {activities.length === 0 ? (
                <p className="text-muted small">No recent activities</p>
              ) : (
                <ul className="activity-list list-unstyled mb-0">
                  {activities.slice(0, 6).map((a) => (
                    <li key={a.id} className="activity-item">
                      <div className="activity-dot"></div>
                      <div>
                        <p className="mb-0 small">{a.message}</p>
                        <small className="text-muted">{new Date(a.timestamp).toLocaleString()}</small>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="card border-0 shadow-sm rounded-4 chart-placeholder">
            <div className="card-body text-center py-5">
              <i className="bi bi-bar-chart-line display-4 text-muted opacity-25 mb-3 d-block"></i>
              <h6 className="text-muted fw-semibold">Analytics Chart</h6>
              <p className="text-muted small mb-0">Revenue & occupancy trends — coming soon</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
