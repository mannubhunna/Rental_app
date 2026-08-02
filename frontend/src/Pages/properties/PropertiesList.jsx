import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../../components/layout/Breadcrumb";
import SearchBar from "../../components/common/SearchBar";
import Pagination from "../../components/common/Pagination";
import StatusBadge from "../../components/common/StatusBadge";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import EmptyState from "../../components/common/EmptyState";
import ErrorState from "../../components/common/ErrorState";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import { fetchProperties, deleteProperty, getImageUrl } from "../../services/api";
import { useToast } from "../../context/ToastContext";
import { logActivity } from "../../services/demandsService";

const PAGE_SIZE = 8;

export default function PropertiesList() {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [page, setPage] = useState(1);
  const [deleteTarget, setDeleteTarget] = useState(null);

  useEffect(() => {
    loadProperties();
  }, []);

  const loadProperties = async () => {
    setLoading(true);
    setError(false);
    try {
      const data = await fetchProperties();
      setProperties(data);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const categories = useMemo(
    () => [...new Set(properties.map((p) => p.type).filter(Boolean))],
    [properties]
  );

  const filtered = useMemo(() => {
    let result = [...properties];

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.propertyName?.toLowerCase().includes(q) ||
          p.location?.toLowerCase().includes(q) ||
          p.type?.toLowerCase().includes(q) ||
          p.ownerName?.toLowerCase?.().includes(q)
      );
    }

    if (categoryFilter) result = result.filter((p) => p.type === categoryFilter);

    if (statusFilter === "available")
      result = result.filter((p) => p.available === "true" || p.available === true);
    if (statusFilter === "occupied")
      result = result.filter((p) => p.available !== "true" && p.available !== true);

    if (sortBy === "rent-asc") result.sort((a, b) => Number(a.budget) - Number(b.budget));
    else if (sortBy === "rent-desc") result.sort((a, b) => Number(b.budget) - Number(a.budget));
    else if (sortBy === "name") result.sort((a, b) => a.propertyName.localeCompare(b.propertyName));
    else result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return result;
  }, [properties, search, categoryFilter, statusFilter, sortBy]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await deleteProperty(deleteTarget.id);
      setProperties((prev) => prev.filter((p) => p.id !== deleteTarget.id));
      logActivity(`Deleted property: ${deleteTarget.propertyName}`);
      showToast("Property deleted successfully.");
    } catch {
      showToast("Failed to delete property.", "error");
    } finally {
      setDeleteTarget(null);
    }
  };

  if (loading) return <LoadingSpinner text="Loading properties..." />;
  if (error) return <ErrorState onRetry={loadProperties} />;

  return (
    <div>
      <Breadcrumb items={[{ label: "Properties" }]} />

      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-3">
        <div>
          <h3 className="fw-bold mb-1">All Available Properties</h3>
          <p className="text-muted mb-0">{filtered.length} properties found</p>
        </div>
        <button className="btn btn-primary" onClick={() => navigate("/properties/add")}>
          <i className="bi bi-plus-lg me-2"></i>Add Property
        </button>
      </div>

      <div className="card border-0 shadow-sm rounded-4 mb-4">
        <div className="card-body p-4">
          <div className="row g-3 align-items-end">
            <div className="col-lg-4">
              <SearchBar value={search} onChange={(v) => { setSearch(v); setPage(1); }} placeholder="Search by title, address, owner..." />
            </div>
            <div className="col-md-3 col-lg-2">
              <select className="form-select" value={categoryFilter} onChange={(e) => { setCategoryFilter(e.target.value); setPage(1); }}>
                <option value="">All Categories</option>
                {categories.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="col-md-3 col-lg-2">
              <select className="form-select" value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}>
                <option value="">All Status</option>
                <option value="available">Available</option>
                <option value="occupied">Occupied</option>
              </select>
            </div>
            <div className="col-md-3 col-lg-2">
              <select className="form-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="newest">Newest First</option>
                <option value="rent-asc">Rent: Low to High</option>
                <option value="rent-desc">Rent: High to Low</option>
                <option value="name">Name A-Z</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="card border-0 shadow-sm rounded-4">
        <div className="card-body p-0">
          {paginated.length === 0 ? (
            <EmptyState
              icon="building"
              title="No properties found"
              description="Try adjusting your filters or add a new property."
              action={
                <button className="btn btn-primary" onClick={() => navigate("/properties/add")}>
                  <i className="bi bi-plus-lg me-2"></i>Add Property
                </button>
              }
            />
          ) : (
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0 properties-table">
                <thead>
                  <tr>
                    <th>Property</th>
                    <th>Rent</th>
                    <th>Address</th>
                    <th>Owner</th>
                    <th>Category</th>
                    <th>Status</th>
                    <th className="text-end">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginated.map((p) => (
                    <tr key={p.id}>
                      <td>
                        <div className="d-flex align-items-center gap-3">
                          <img src={getImageUrl(p.image)} alt="" className="rounded-3 table-thumb-lg" />
                          <span className="fw-semibold">{p.propertyName}</span>
                        </div>
                      </td>
                      <td className="fw-bold text-primary">₹{p.budget}</td>
                      <td className="text-muted small" style={{ maxWidth: 180 }}>{p.location}</td>
                      <td className="small">{p.ownerName || "—"}</td>
                      <td><span className="badge bg-primary-subtle text-primary rounded-pill">{p.type}</span></td>
                      <td><StatusBadge status={p.available} /></td>
                      <td className="text-end">
                        <div className="btn-group btn-group-sm">
                          <button className="btn btn-outline-primary" title="View" onClick={() => navigate(`/properties/${p.id}`)}>
                            <i className="bi bi-eye"></i>
                          </button>
                          <button className="btn btn-outline-secondary" title="Edit" onClick={() => navigate(`/properties/edit/${p.id}`)}>
                            <i className="bi bi-pencil"></i>
                          </button>
                          <button className="btn btn-outline-danger" title="Delete" onClick={() => setDeleteTarget(p)}>
                            <i className="bi bi-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />

      <ConfirmDialog
        show={!!deleteTarget}
        title="Delete Property"
        message={`Are you sure you want to delete "${deleteTarget?.propertyName}"? This action cannot be undone.`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
        confirmText="Delete"
      />
    </div>
  );
}
