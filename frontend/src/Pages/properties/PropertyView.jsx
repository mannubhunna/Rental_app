import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Breadcrumb from "../../components/layout/Breadcrumb";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import StatusBadge from "../../components/common/StatusBadge";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import EmptyState from "../../components/common/EmptyState";
import { fetchProperties, deleteProperty, getImageUrl } from "../../services/api";
import { getDemands, getActivities, logActivity } from "../../services/demandsService";
import { calculateMatch } from "../../utils/matching";
import { useToast } from "../../context/ToastContext";

export default function PropertyView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [showDelete, setShowDelete] = useState(false);
  const [matchingCustomers, setMatchingCustomers] = useState([]);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    loadProperty();
  }, [id]);

  const loadProperty = async () => {
    try {
      const data = await fetchProperties();
      const item = data.find((p) => String(p.id) === String(id));
      setProperty(item || null);

      if (item) {
        const demands = getDemands();
        const matches = demands
          .map((d) => ({ ...d, matchPct: calculateMatch(d, item) }))
          .filter((d) => d.matchPct >= 60)
          .sort((a, b) => b.matchPct - a.matchPct);
        setMatchingCustomers(matches);
      }
      setActivities(getActivities().slice(0, 5));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteProperty(property.id);
      logActivity(`Deleted property: ${property.propertyName}`);
      showToast("Property deleted.");
      navigate("/properties");
    } catch {
      showToast("Failed to delete.", "error");
    }
  };

  const parseAmenities = (amenities) => {
    if (Array.isArray(amenities)) return amenities;
    try { return JSON.parse(amenities); } catch { return []; }
  };

  if (loading) return <LoadingSpinner />;
  if (!property) {
    return (
      <EmptyState
        icon="building-x"
        title="Property Not Found"
        action={<button className="btn btn-primary" onClick={() => navigate("/properties")}>Back to Properties</button>}
      />
    );
  }

  const images = property.image
    ? [getImageUrl(property.image)]
    : ["https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=500&fit=crop"];

  const amenities = parseAmenities(property.amenities);

  const details = [
    { icon: "house-door", label: "Category", value: property.type },
    { icon: "rulers", label: "Area", value: property.area },
    { icon: "building", label: "Floor", value: property.floor },
    { icon: "compass", label: "Facing", value: property.facing },
    { icon: "car-front", label: "Parking", value: property.parking },
    { icon: "cash-stack", label: "Maintenance", value: property.maintenance ? `₹${property.maintenance}` : "—" },
    { icon: "sofa", label: "Furnished", value: property.furnished },
    { icon: "people", label: "Available For", value: property.availableFor },
    { icon: "door-open", label: "Independent", value: property.independent },
    { icon: "shield-check", label: "Deposit", value: property.deposit ? `₹${property.deposit}` : "—" },
  ];

  return (
    <div>
      <Breadcrumb items={[
        { label: "Properties", path: "/properties" },
        { label: property.propertyName },
      ]} />

      <div className="d-flex flex-wrap justify-content-between align-items-start mb-4 gap-3">
        <div>
          <h3 className="fw-bold mb-1">{property.propertyName}</h3>
          <p className="text-muted mb-2"><i className="bi bi-geo-alt me-1"></i>{property.location}</p>
          <StatusBadge status={property.available} />
        </div>
        <div className="d-flex gap-2">
          <button className="btn btn-outline-primary" onClick={() => navigate(`/properties/edit/${property.id}`)}>
            <i className="bi bi-pencil me-2"></i>Edit
          </button>
          <button className="btn btn-outline-danger" onClick={() => setShowDelete(true)}>
            <i className="bi bi-trash me-2"></i>Delete
          </button>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm rounded-4 mb-4 overflow-hidden">
            <img src={images[activeImage]} alt="" className="property-gallery-main" />
            {images.length > 1 && (
              <div className="d-flex gap-2 p-3">
                {images.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt=""
                    className={`property-gallery-thumb rounded-2 ${activeImage === i ? "active" : ""}`}
                    onClick={() => setActiveImage(i)}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="card border-0 shadow-sm rounded-4 mb-4">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="fw-bold mb-0">Property Information</h4>
                <h3 className="text-primary fw-bold mb-0">₹{property.budget}<small className="text-muted fs-6">/month</small></h3>
              </div>
              <div className="row g-3">
                {details.map((d) => (
                  <div key={d.label} className="col-sm-6 col-md-4">
                    <div className="detail-box rounded-3 p-3 h-100">
                      <i className={`bi bi-${d.icon} text-primary mb-2 d-block`}></i>
                      <small className="text-muted d-block">{d.label}</small>
                      <span className="fw-semibold">{d.value || "—"}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="card border-0 shadow-sm rounded-4 mb-4">
            <div className="card-body p-4">
              <h5 className="fw-bold mb-3">Description</h5>
              <p className="text-muted mb-0">{property.description || "No description available."}</p>
            </div>
          </div>

          {amenities.length > 0 && (
            <div className="card border-0 shadow-sm rounded-4 mb-4">
              <div className="card-body p-4">
                <h5 className="fw-bold mb-3">Amenities</h5>
                <div className="d-flex flex-wrap gap-2">
                  {amenities.map((a) => (
                    <span key={a} className="badge bg-primary-subtle text-primary rounded-pill px-3 py-2">
                      <i className="bi bi-check-circle me-1"></i>{a}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="card border-0 shadow-sm rounded-4">
            <div className="card-body p-4 map-placeholder text-center">
              <i className="bi bi-map display-4 text-muted opacity-25 mb-3 d-block"></i>
              <h6 className="text-muted">Map Section</h6>
              {property.mapLink ? (
                <a href={property.mapLink} target="_blank" rel="noreferrer" className="btn btn-outline-primary btn-sm mt-2">
                  <i className="bi bi-geo-alt me-1"></i>View on Google Maps
                </a>
              ) : (
                <p className="text-muted small mb-0">Map integration placeholder</p>
              )}
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card border-0 shadow-sm rounded-4 mb-4">
            <div className="card-body p-4">
              <h5 className="fw-bold mb-3"><i className="bi bi-person-circle me-2 text-info"></i>Owner Details</h5>
              <div className="owner-card d-flex align-items-center gap-3 mb-3">
                <div className="avatar-circle lg">{property.ownerName?.charAt(0) || "O"}</div>
                <div>
                  <h6 className="fw-bold mb-0">{property.ownerName || "Not specified"}</h6>
                  <small className="text-muted">Property Owner</small>
                </div>
              </div>
              {property.ownerContact && (
                <a href={`tel:${property.ownerContact}`} className="btn btn-outline-primary w-100">
                  <i className="bi bi-telephone me-2"></i>{property.ownerContact}
                </a>
              )}
            </div>
          </div>

          <div className="card border-0 shadow-sm rounded-4 mb-4">
            <div className="card-header bg-white border-0 pt-4 px-4">
              <h5 className="fw-bold mb-0">Matching Customers</h5>
            </div>
            <div className="card-body px-4 pb-4">
              {matchingCustomers.length === 0 ? (
                <p className="text-muted small">No matching customers found</p>
              ) : (
                matchingCustomers.slice(0, 5).map((c) => (
                  <div key={c.id} className="match-customer-item d-flex justify-content-between align-items-center py-2 border-bottom">
                    <div>
                      <span className="fw-semibold small d-block">{c.customerName}</span>
                      <small className="text-muted">{c.preferredArea}</small>
                    </div>
                    <StatusBadge status={c.matchPct} type="match" />
                  </div>
                ))
              )}
              {matchingCustomers.length > 0 && (
                <button className="btn btn-sm btn-outline-primary w-100 mt-3" onClick={() => navigate("/matching")}>
                  View All Matches
                </button>
              )}
            </div>
          </div>

          <div className="card border-0 shadow-sm rounded-4">
            <div className="card-header bg-white border-0 pt-4 px-4">
              <h5 className="fw-bold mb-0">Recent Activities</h5>
            </div>
            <div className="card-body px-4 pb-4">
              {activities.length === 0 ? (
                <p className="text-muted small">No activities yet</p>
              ) : (
                <ul className="activity-list list-unstyled mb-0">
                  {activities.map((a) => (
                    <li key={a.id} className="activity-item small">
                      <div className="activity-dot"></div>
                      <div>
                        <p className="mb-0">{a.message}</p>
                        <small className="text-muted">{new Date(a.timestamp).toLocaleString()}</small>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>

      <ConfirmDialog
        show={showDelete}
        title="Delete Property"
        message={`Delete "${property.propertyName}" permanently?`}
        onConfirm={handleDelete}
        onCancel={() => setShowDelete(false)}
      />
    </div>
  );
}
