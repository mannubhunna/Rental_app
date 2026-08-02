import { useEffect, useMemo, useState } from "react";
import Breadcrumb from "../../components/layout/Breadcrumb";
import SearchBar from "../../components/common/SearchBar";
import Pagination from "../../components/common/Pagination";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import EmptyState from "../../components/common/EmptyState";
import { getDemands, addDemand, updateDemand, deleteDemand } from "../../services/demandsService";
import { useToast } from "../../context/ToastContext";

const PAGE_SIZE = 8;
const emptyDemand = {
  customerName: "", phone: "", preferredArea: "", budget: "",
  bedrooms: "", bathrooms: 1, familyType: "Family",
  parking: false, pets: false, additionalRequirements: "", status: "Active",
};

export default function CustomerDemands() {
  const { showToast } = useToast();
  const [demands, setDemands] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState(emptyDemand);
  const [deleteTarget, setDeleteTarget] = useState(null);

  useEffect(() => { setDemands(getDemands()); }, []);

  const filtered = useMemo(() => {
    let result = [...demands];
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (d) =>
          d.customerName.toLowerCase().includes(q) ||
          d.preferredArea.toLowerCase().includes(q) ||
          d.phone.includes(q)
      );
    }
    if (statusFilter) result = result.filter((d) => d.status === statusFilter);
    return result;
  }, [demands, search, statusFilter]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const openAdd = () => { setEditItem(null); setForm(emptyDemand); setShowModal(true); };
  const openEdit = (item) => { setEditItem(item); setForm({ ...item }); setShowModal(true); };

  const handleSave = () => {
    if (!form.customerName || !form.phone) {
      showToast("Name and phone are required.", "error");
      return;
    }
    if (editItem) {
      updateDemand(editItem.id, form);
      setDemands(getDemands());
      showToast("Demand updated.");
    } else {
      addDemand(form);
      setDemands(getDemands());
      showToast("Demand added.");
    }
    setShowModal(false);
  };

  const handleDelete = () => {
    deleteDemand(deleteTarget.id);
    setDemands(getDemands());
    showToast("Demand deleted.");
    setDeleteTarget(null);
  };

  return (
    <div>
      <Breadcrumb items={[{ label: "Customer Demands" }]} />

      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-3">
        <div>
          <h3 className="fw-bold mb-1">Customer Demands</h3>
          <p className="text-muted mb-0">{filtered.length} active customer requirements</p>
        </div>
        <button className="btn btn-primary" onClick={openAdd}>
          <i className="bi bi-plus-lg me-2"></i>Add Demand
        </button>
      </div>

      <div className="card border-0 shadow-sm rounded-4 mb-4">
        <div className="card-body p-4">
          <div className="row g-3">
            <div className="col-md-6">
              <SearchBar value={search} onChange={(v) => { setSearch(v); setPage(1); }} placeholder="Search by name, area, phone..." />
            </div>
            <div className="col-md-3">
              <select className="form-select" value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}>
                <option value="">All Status</option>
                <option value="Active">Active</option>
                <option value="Pending">Pending</option>
                <option value="Closed">Closed</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="card border-0 shadow-sm rounded-4">
        <div className="card-body p-0">
          {paginated.length === 0 ? (
            <EmptyState icon="people" title="No demands found" description="Add customer requirements to start matching." action={<button className="btn btn-primary" onClick={openAdd}>Add Demand</button>} />
          ) : (
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead>
                  <tr>
                    <th>Customer</th>
                    <th>Phone</th>
                    <th>Area</th>
                    <th>Budget</th>
                    <th>Bedrooms</th>
                    <th>Type</th>
                    <th>Parking</th>
                    <th>Pets</th>
                    <th>Status</th>
                    <th className="text-end">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginated.map((d) => (
                    <tr key={d.id}>
                      <td className="fw-semibold">{d.customerName}</td>
                      <td className="small">{d.phone}</td>
                      <td className="small text-muted">{d.preferredArea}</td>
                      <td className="fw-semibold text-primary">₹{d.budget?.toLocaleString?.() || d.budget}</td>
                      <td>{d.bedrooms}</td>
                      <td><span className="badge bg-light text-dark border">{d.familyType}</span></td>
                      <td>{d.parking ? <i className="bi bi-check-circle text-success"></i> : <i className="bi bi-x-circle text-muted"></i>}</td>
                      <td>{d.pets ? <i className="bi bi-check-circle text-success"></i> : <i className="bi bi-x-circle text-muted"></i>}</td>
                      <td>
                        <span className={`badge rounded-pill ${d.status === "Active" ? "bg-success-subtle text-success" : d.status === "Pending" ? "bg-warning-subtle text-warning" : "bg-secondary-subtle text-secondary"}`}>
                          {d.status}
                        </span>
                      </td>
                      <td className="text-end">
                        <div className="btn-group btn-group-sm">
                          <button className="btn btn-outline-secondary" onClick={() => openEdit(d)}><i className="bi bi-pencil"></i></button>
                          <button className="btn btn-outline-danger" onClick={() => setDeleteTarget(d)}><i className="bi bi-trash"></i></button>
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

      {showModal && (
        <div className="modal fade show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content border-0 rounded-4">
              <div className="modal-header border-0">
                <h5 className="modal-title fw-bold">{editItem ? "Edit Demand" : "Add Customer Demand"}</h5>
                <button className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Customer Name *</label>
                    <input className="form-control" value={form.customerName} onChange={(e) => setForm({ ...form, customerName: e.target.value })} />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Phone *</label>
                    <input className="form-control" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Preferred Area</label>
                    <input className="form-control" value={form.preferredArea} onChange={(e) => setForm({ ...form, preferredArea: e.target.value })} />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Budget (₹)</label>
                    <input type="number" className="form-control" value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })} />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label fw-semibold">Bedrooms</label>
                    <select className="form-select" value={form.bedrooms} onChange={(e) => setForm({ ...form, bedrooms: e.target.value })}>
                      {["1 BHK", "2 BHK", "3 BHK", "4 BHK"].map((b) => <option key={b} value={b}>{b}</option>)}
                    </select>
                  </div>
                  <div className="col-md-4">
                    <label className="form-label fw-semibold">Bathrooms</label>
                    <input type="number" className="form-control" value={form.bathrooms} onChange={(e) => setForm({ ...form, bathrooms: e.target.value })} />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label fw-semibold">Family / Bachelor</label>
                    <select className="form-select" value={form.familyType} onChange={(e) => setForm({ ...form, familyType: e.target.value })}>
                      <option>Family</option><option>Bachelor</option>
                    </select>
                  </div>
                  <div className="col-md-4">
                    <div className="form-check mt-4">
                      <input className="form-check-input" type="checkbox" checked={form.parking} onChange={(e) => setForm({ ...form, parking: e.target.checked })} id="parking" />
                      <label className="form-check-label" htmlFor="parking">Parking Required</label>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-check mt-4">
                      <input className="form-check-input" type="checkbox" checked={form.pets} onChange={(e) => setForm({ ...form, pets: e.target.checked })} id="pets" />
                      <label className="form-check-label" htmlFor="pets">Pets Allowed</label>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <label className="form-label fw-semibold">Status</label>
                    <select className="form-select" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
                      <option>Active</option><option>Pending</option><option>Closed</option>
                    </select>
                  </div>
                  <div className="col-12">
                    <label className="form-label fw-semibold">Additional Requirements</label>
                    <textarea className="form-control" rows="3" value={form.additionalRequirements} onChange={(e) => setForm({ ...form, additionalRequirements: e.target.value })}></textarea>
                  </div>
                </div>
              </div>
              <div className="modal-footer border-0">
                <button className="btn btn-light" onClick={() => setShowModal(false)}>Cancel</button>
                <button className="btn btn-primary" onClick={handleSave}>Save</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <ConfirmDialog show={!!deleteTarget} title="Delete Demand" message={`Delete demand from ${deleteTarget?.customerName}?`} onConfirm={handleDelete} onCancel={() => setDeleteTarget(null)} />
    </div>
  );
}
