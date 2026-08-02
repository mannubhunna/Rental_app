import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../../components/layout/Breadcrumb";
import { addProperty } from "../../services/api";
import { useToast } from "../../context/ToastContext";
import { validatePropertyForm } from "../../utils/validation";
import { logActivity } from "../../services/demandsService";

const AMENITIES_LIST = [
  "WiFi", "AC", "Gym", "Swimming Pool", "Power Backup", "Security",
  "Lift", "Garden", "Club House", "Intercom", "Gas Pipeline", "Water Supply",
];

const emptyForm = {
  propertyName: "",
  type: "",
  budget: "",
  deposit: "",
  area: "",
  bedrooms: "",
  bathrooms: "",
  parking: "",
  floor: "",
  facing: "",
  location: "",
  mapLink: "",
  description: "",
  amenities: [],
  ownerName: "",
  ownerContact: "",
  furnished: "",
  availableFor: "",
  independent: "",
  maintenance: "",
  available: "true",
  image: null,
};

export default function AddPropertyForm({ editData = null }) {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [form, setForm] = useState(editData || emptyForm);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(false);
  const [imagePreviews, setImagePreviews] = useState([]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "images") {
      const fileList = Array.from(files);
      setForm({ ...form, image: fileList[0] || null });
      setImagePreviews(fileList.map((f) => URL.createObjectURL(f)));
    } else {
      setForm({ ...form, [name]: value });
    }
    setErrors({ ...errors, [name]: "" });
  };

  const toggleAmenity = (amenity) => {
    const current = form.amenities || [];
    setForm({
      ...form,
      amenities: current.includes(amenity)
        ? current.filter((a) => a !== amenity)
        : [...current, amenity],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validatePropertyForm(form);
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }
    setPreview(true);
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const data = new FormData();
      Object.keys(form).forEach((key) => {
        if (key === "amenities") {
          data.append(key, JSON.stringify(form.amenities || []));
        } else if (key === "image" && form.image) {
          data.append("image", form.image);
        } else if (key !== "image") {
          data.append(key, form[key] ?? "");
        }
      });

      await addProperty(data);
      logActivity(`Added new property: ${form.propertyName}`);
      showToast("Property added successfully!");
      navigate("/properties");
    } catch (err) {
      showToast(err?.response?.data?.message || "Failed to add property.", "error");
    } finally {
      setLoading(false);
      setPreview(false);
    }
  };

  return (
    <div>
      <Breadcrumb items={[
        { label: "Properties", path: "/properties" },
        { label: editData ? "Edit Property" : "Add Property" },
      ]} />

      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="fw-bold mb-1">{editData ? "Edit Property" : "Add New Property"}</h3>
          <p className="text-muted mb-0">Fill in the property details below</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="row g-4">
          <div className="col-lg-8">
            <div className="card border-0 shadow-sm rounded-4 mb-4">
              <div className="card-header bg-white border-0 pt-4 px-4">
                <h5 className="fw-bold mb-0"><i className="bi bi-info-circle me-2 text-primary"></i>Basic Information</h5>
              </div>
              <div className="card-body px-4 pb-4">
                <div className="row g-3">
                  <div className="col-md-8">
                    <label className="form-label fw-semibold">Property Title *</label>
                    <input type="text" name="propertyName" className={`form-control ${errors.propertyName ? "is-invalid" : ""}`} value={form.propertyName} onChange={handleChange} placeholder="e.g. 2 BHK Luxury Flat" />
                    {errors.propertyName && <div className="invalid-feedback">{errors.propertyName}</div>}
                  </div>
                  <div className="col-md-4">
                    <label className="form-label fw-semibold">Category *</label>
                    <select name="type" className={`form-select ${errors.type ? "is-invalid" : ""}`} value={form.type} onChange={handleChange}>
                      <option value="">Select</option>
                      {["1 BHK", "2 BHK", "3 BHK", "4 BHK", "Villa", "Studio", "Penthouse"].map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                    {errors.type && <div className="invalid-feedback">{errors.type}</div>}
                  </div>
                  <div className="col-md-4">
                    <label className="form-label fw-semibold">Monthly Rent (₹) *</label>
                    <input type="number" name="budget" className={`form-control ${errors.budget ? "is-invalid" : ""}`} value={form.budget} onChange={handleChange} placeholder="18000" />
                    {errors.budget && <div className="invalid-feedback">{errors.budget}</div>}
                  </div>
                  <div className="col-md-4">
                    <label className="form-label fw-semibold">Security Deposit (₹)</label>
                    <input type="number" name="deposit" className="form-control" value={form.deposit} onChange={handleChange} placeholder="36000" />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label fw-semibold">Maintenance (₹)</label>
                    <input type="number" name="maintenance" className="form-control" value={form.maintenance} onChange={handleChange} />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label fw-semibold">Area (sqft)</label>
                    <input type="text" name="area" className="form-control" value={form.area} onChange={handleChange} placeholder="1250" />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label fw-semibold">Bedrooms</label>
                    <input type="text" name="bedrooms" className="form-control" value={form.bedrooms} onChange={handleChange} />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label fw-semibold">Bathrooms</label>
                    <input type="number" name="bathrooms" className="form-control" value={form.bathrooms} onChange={handleChange} />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label fw-semibold">Floor</label>
                    <input type="text" name="floor" className="form-control" value={form.floor} onChange={handleChange} />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label fw-semibold">Facing</label>
                    <select name="facing" className="form-select" value={form.facing} onChange={handleChange}>
                      <option value="">Select</option>
                      {["North", "South", "East", "West", "North-East", "North-West", "South-East", "South-West"].map((f) => (
                        <option key={f} value={f}>{f}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-4">
                    <label className="form-label fw-semibold">Parking</label>
                    <select name="parking" className="form-select" value={form.parking} onChange={handleChange}>
                      <option value="">Select</option>
                      <option value="Available">Available</option>
                      <option value="Not Available">Not Available</option>
                    </select>
                  </div>
                  <div className="col-12">
                    <label className="form-label fw-semibold">Address *</label>
                    <input type="text" name="location" className={`form-control ${errors.location ? "is-invalid" : ""}`} value={form.location} onChange={handleChange} placeholder="Mohali Sector 70, Punjab" />
                    {errors.location && <div className="invalid-feedback">{errors.location}</div>}
                  </div>
                  <div className="col-12">
                    <label className="form-label fw-semibold">Google Map Link</label>
                    <input type="url" name="mapLink" className="form-control" value={form.mapLink} onChange={handleChange} placeholder="https://maps.google.com/..." />
                  </div>
                  <div className="col-12">
                    <label className="form-label fw-semibold">Description</label>
                    <textarea name="description" rows="4" className="form-control" value={form.description} onChange={handleChange} placeholder="Describe the property..."></textarea>
                  </div>
                </div>
              </div>
            </div>

            <div className="card border-0 shadow-sm rounded-4 mb-4">
              <div className="card-header bg-white border-0 pt-4 px-4">
                <h5 className="fw-bold mb-0"><i className="bi bi-star me-2 text-warning"></i>Amenities</h5>
              </div>
              <div className="card-body px-4 pb-4">
                <div className="d-flex flex-wrap gap-2">
                  {AMENITIES_LIST.map((a) => (
                    <button
                      key={a}
                      type="button"
                      className={`btn btn-sm amenity-chip ${(form.amenities || []).includes(a) ? "active" : "btn-outline-secondary"}`}
                      onClick={() => toggleAmenity(a)}
                    >
                      {a}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="card border-0 shadow-sm rounded-4 mb-4">
              <div className="card-header bg-white border-0 pt-4 px-4">
                <h5 className="fw-bold mb-0"><i className="bi bi-person me-2 text-info"></i>Owner Details</h5>
              </div>
              <div className="card-body px-4 pb-4">
                <div className="mb-3">
                  <label className="form-label fw-semibold">Owner Name</label>
                  <input type="text" name="ownerName" className="form-control" value={form.ownerName} onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Owner Contact</label>
                  <input type="tel" name="ownerContact" className="form-control" value={form.ownerContact} onChange={handleChange} placeholder="+91 9876543210" />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Furnished</label>
                  <select name="furnished" className="form-select" value={form.furnished} onChange={handleChange}>
                    <option value="">Select</option>
                    <option>Fully Furnished</option>
                    <option>Semi Furnished</option>
                    <option>Unfurnished</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Available For</label>
                  <select name="availableFor" className="form-select" value={form.availableFor} onChange={handleChange}>
                    <option value="">Select</option>
                    <option>Family</option>
                    <option>Bachelor</option>
                    <option>Girls</option>
                    <option>Employees</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Independent</label>
                  <select name="independent" className="form-select" value={form.independent} onChange={handleChange}>
                    <option value="">Select</option>
                    <option>Yes</option>
                    <option>No</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Availability</label>
                  <select name="available" className="form-select" value={form.available} onChange={handleChange}>
                    <option value="true">Available</option>
                    <option value="false">Occupied</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="card border-0 shadow-sm rounded-4 mb-4">
              <div className="card-header bg-white border-0 pt-4 px-4">
                <h5 className="fw-bold mb-0"><i className="bi bi-images me-2 text-success"></i>Upload Images</h5>
              </div>
              <div className="card-body px-4 pb-4">
                <input type="file" name="images" className="form-control" accept="image/*" multiple onChange={handleChange} />
                {imagePreviews.length > 0 && (
                  <div className="d-flex flex-wrap gap-2 mt-3">
                    {imagePreviews.map((src, i) => (
                      <img key={i} src={src} alt="" className="rounded-3 image-preview-thumb" />
                    ))}
                  </div>
                )}
              </div>
            </div>

            <button type="submit" className="btn btn-primary btn-lg w-100 mb-2">
              <i className="bi bi-eye me-2"></i>Preview & Save
            </button>
            <button type="button" className="btn btn-light w-100" onClick={() => navigate("/properties")}>
              Cancel
            </button>
          </div>
        </div>
      </form>

      {preview && (
        <div className="modal fade show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content border-0 rounded-4">
              <div className="modal-header border-0">
                <h5 className="modal-title fw-bold">Preview Property</h5>
                <button type="button" className="btn-close" onClick={() => setPreview(false)}></button>
              </div>
              <div className="modal-body">
                {imagePreviews[0] && (
                  <img src={imagePreviews[0]} alt="" className="w-100 rounded-3 mb-3" style={{ maxHeight: 250, objectFit: "cover" }} />
                )}
                <h4 className="fw-bold">{form.propertyName}</h4>
                <p className="text-muted"><i className="bi bi-geo-alt me-1"></i>{form.location}</p>
                <div className="d-flex gap-2 mb-3 flex-wrap">
                  <span className="badge bg-primary">{form.type}</span>
                  <span className="badge bg-success">₹{form.budget}/mo</span>
                  {form.deposit && <span className="badge bg-secondary">Deposit: ₹{form.deposit}</span>}
                </div>
                <p>{form.description || "No description provided."}</p>
                {(form.amenities || []).length > 0 && (
                  <div className="d-flex flex-wrap gap-1">
                    {form.amenities.map((a) => <span key={a} className="badge bg-light text-dark border">{a}</span>)}
                  </div>
                )}
              </div>
              <div className="modal-footer border-0">
                <button className="btn btn-light" onClick={() => setPreview(false)}>Edit</button>
                <button className="btn btn-primary" onClick={handleSave} disabled={loading}>
                  {loading ? <><span className="spinner-border spinner-border-sm me-2"></span>Saving...</> : <><i className="bi bi-check-lg me-2"></i>Confirm & Save</>}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
