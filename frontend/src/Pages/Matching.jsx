import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../../components/layout/Breadcrumb";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import StatusBadge from "../../components/common/StatusBadge";
import EmptyState from "../../components/common/EmptyState";
import { fetchProperties, getImageUrl } from "../../services/api";
import { getDemands } from "../../services/demandsService";
import { getMatches } from "../../utils/matching";

export default function Matching() {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [demands, setDemands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    perfectOnly: false,
    areaOnly: false,
    budgetOnly: false,
    bedroomsOnly: false,
    amenitiesOnly: false,
    minMatch: 50,
  });

  useEffect(() => {
    Promise.all([fetchProperties(), Promise.resolve(getDemands())]).then(([props, dems]) => {
      setProperties(props);
      setDemands(dems);
      setLoading(false);
    });
  }, []);

  const matches = useMemo(
    () => getMatches(demands, properties, filters),
    [demands, properties, filters]
  );

  const toggleFilter = (key) => {
    setFilters((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const getMatchColor = (pct) => {
    if (pct >= 90) return "match-excellent";
    if (pct >= 75) return "match-good";
    return "match-fair";
  };

  if (loading) return <LoadingSpinner text="Calculating matches..." />;

  return (
    <div>
      <Breadcrumb items={[{ label: "Matching" }]} />

      <div className="mb-4">
        <h3 className="fw-bold mb-1">Property Matching</h3>
        <p className="text-muted mb-0">Automatically matched customer requirements with available properties</p>
      </div>

      <div className="card border-0 shadow-sm rounded-4 mb-4">
        <div className="card-body p-4">
          <h6 className="fw-bold mb-3">Filters</h6>
          <div className="d-flex flex-wrap gap-2">
            {[
              { key: "perfectOnly", label: "Only Perfect Match (90%+)" },
              { key: "areaOnly", label: "Area Match" },
              { key: "budgetOnly", label: "Budget Match" },
              { key: "bedroomsOnly", label: "Bedrooms Match" },
            ].map(({ key, label }) => (
              <button
                key={key}
                className={`btn btn-sm ${filters[key] ? "btn-primary" : "btn-outline-secondary"} rounded-pill`}
                onClick={() => toggleFilter(key)}
              >
                {filters[key] && <i className="bi bi-check me-1"></i>}
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {matches.length === 0 ? (
        <EmptyState
          icon="intersect"
          title="No matches found"
          description="Try adjusting filters or add more properties and customer demands."
        />
      ) : (
        <div className="row g-4">
          {matches.map((match, index) => (
            <div key={`${match.demand.id}-${match.property.id}-${index}`} className="col-md-6 col-xl-4">
              <div className={`card border-0 shadow-sm rounded-4 match-card h-100 ${getMatchColor(match.percentage)}`}>
                <div className="match-percentage-badge">
                  <StatusBadge status={match.percentage} type="match" />
                </div>
                <img
                  src={getImageUrl(match.property.image)}
                  alt=""
                  className="card-img-top match-card-img"
                />
                <div className="card-body p-4">
                  <h5 className="fw-bold mb-1">{match.property.propertyName}</h5>
                  <p className="text-muted small mb-3">
                    <i className="bi bi-geo-alt me-1"></i>{match.property.location}
                  </p>

                  <div className="match-info-row mb-3">
                    <div className="match-info-item">
                      <small className="text-muted d-block">Customer</small>
                      <span className="fw-semibold small">{match.demand.customerName}</span>
                    </div>
                    <div className="match-info-item">
                      <small className="text-muted d-block">Budget</small>
                      <span className="fw-semibold small text-primary">₹{match.demand.budget?.toLocaleString?.() || match.demand.budget}</span>
                    </div>
                    <div className="match-info-item">
                      <small className="text-muted d-block">Rent</small>
                      <span className="fw-semibold small">₹{match.property.budget}</span>
                    </div>
                  </div>

                  <div className="d-flex flex-wrap gap-1 mb-3">
                    {match.areaMatch && <span className="badge bg-light text-success border"><i className="bi bi-geo-alt me-1"></i>Area</span>}
                    {match.budgetMatch && <span className="badge bg-light text-success border"><i className="bi bi-cash me-1"></i>Budget</span>}
                    {match.bedroomsMatch && <span className="badge bg-light text-success border"><i className="bi bi-door-open me-1"></i>Bedrooms</span>}
                  </div>

                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-primary btn-sm flex-grow-1"
                      onClick={() => navigate(`/properties/${match.property.id}`)}
                    >
                      <i className="bi bi-building me-1"></i>View Property
                    </button>
                    <button
                      className="btn btn-outline-secondary btn-sm flex-grow-1"
                      onClick={() => navigate("/demands")}
                    >
                      <i className="bi bi-person me-1"></i>View Customer
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
