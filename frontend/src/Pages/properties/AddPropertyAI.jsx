import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../../components/layout/Breadcrumb";
import { addProperty } from "../../services/api";
import { useToast } from "../../context/ToastContext";
import { logActivity } from "../../services/demandsService";

const EXAMPLE_PROMPT = `2 BHK semi-furnished flat in Mohali Sector 70, 
1250 sqft, east facing, 3rd floor, with parking. 
Rent ₹18,000/month, deposit ₹36,000. 
Available for family. Amenities: WiFi, Lift, Power Backup, Security.
Owner: Rajesh Kumar, Contact: 9876543210.
Near market and park.`;

const mockGenerate = (prompt) => ({
  propertyName: "2 BHK Semi-Furnished Flat",
  type: "2 BHK",
  budget: "18000",
  deposit: "36000",
  area: "1250",
  bedrooms: "2",
  bathrooms: "2",
  parking: "Available",
  floor: "3rd",
  facing: "East",
  location: prompt.includes("Sector 70") ? "Mohali Sector 70" : "Mohali",
  description: prompt.slice(0, 200) || "Beautiful property generated from AI prompt.",
  amenities: ["WiFi", "Lift", "Power Backup", "Security"],
  ownerName: "Rajesh Kumar",
  ownerContact: "9876543210",
  furnished: "Semi Furnished",
  availableFor: "Family",
  independent: "No",
  maintenance: "1500",
  available: "true",
});

export default function AddPropertyAI() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [prompt, setPrompt] = useState("");
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(null);
  const [form, setForm] = useState(null);
  const [saving, setSaving] = useState(false);

  const handleGenerate = () => {
    if (!prompt.trim()) {
      showToast("Please enter a property description.", "error");
      return;
    }
    setGenerating(true);
    setTimeout(() => {
      const data = mockGenerate(prompt);
      setGenerated(data);
      setForm({ ...data });
      setGenerating(false);
      showToast("Property details generated!", "info");
    }, 2000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const data = new FormData();
      Object.keys(form).forEach((key) => {
        if (key === "amenities") data.append(key, JSON.stringify(form.amenities));
        else data.append(key, form[key] ?? "");
      });
      await addProperty(data);
      logActivity(`AI-generated property added: ${form.propertyName}`);
      showToast("Property saved successfully!");
      navigate("/properties");
    } catch {
      showToast("Failed to save property.", "error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <Breadcrumb items={[
        { label: "Properties", path: "/properties" },
        { label: "Add with AI" },
      ]} />

      <div className="mb-4">
        <h3 className="fw-bold mb-1">
          <i className="bi bi-stars text-warning me-2"></i>
          Add Property using AI
        </h3>
        <p className="text-muted mb-0">Describe the property in natural language and let AI generate the details</p>
      </div>

      <div className="row g-4">
        <div className="col-lg-6">
          <div className="card border-0 shadow-sm rounded-4 h-100">
            <div className="card-header bg-white border-0 pt-4 px-4">
              <h5 className="fw-bold mb-0">Property Description</h5>
            </div>
            <div className="card-body px-4 pb-4">
              <textarea
                className="form-control ai-textarea mb-3"
                rows="12"
                placeholder="Describe the property in detail..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              ></textarea>

              <div className="bg-light rounded-3 p-3 mb-4">
                <small className="text-muted fw-semibold d-block mb-2">
                  <i className="bi bi-lightbulb me-1"></i> Example Prompt
                </small>
                <p className="small text-muted mb-2" style={{ whiteSpace: "pre-line" }}>{EXAMPLE_PROMPT}</p>
                <button
                  type="button"
                  className="btn btn-sm btn-outline-primary"
                  onClick={() => setPrompt(EXAMPLE_PROMPT)}
                >
                  Use Example
                </button>
              </div>

              <button
                className="btn btn-primary btn-lg w-100"
                onClick={handleGenerate}
                disabled={generating}
              >
                {generating ? (
                  <div className="d-flex align-items-center justify-content-center gap-3">
                    <div className="ai-loader">
                      <span></span><span></span><span></span>
                    </div>
                    Generating with AI...
                  </div>
                ) : (
                  <><i className="bi bi-magic me-2"></i>Generate Property</>
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="col-lg-6">
          {!generated ? (
            <div className="card border-0 shadow-sm rounded-4 h-100 ai-empty-state">
              <div className="card-body d-flex flex-column align-items-center justify-content-center text-center py-5">
                <div className="ai-icon-circle mb-4">
                  <i className="bi bi-robot"></i>
                </div>
                <h5 className="fw-bold">AI Preview</h5>
                <p className="text-muted">Enter a description and click Generate to see the preview here</p>
              </div>
            </div>
          ) : (
            <div className="card border-0 shadow-sm rounded-4">
              <div className="card-header bg-white border-0 pt-4 px-4 d-flex justify-content-between align-items-center">
                <h5 className="fw-bold mb-0">Generated Preview</h5>
                <span className="badge bg-success-subtle text-success">
                  <i className="bi bi-check-circle me-1"></i>Generated
                </span>
              </div>
              <div className="card-body px-4 pb-4">
                <div className="generated-preview-card rounded-4 p-4 mb-4">
                  <h4 className="fw-bold">{form.propertyName}</h4>
                  <p className="text-muted mb-2"><i className="bi bi-geo-alt me-1"></i>{form.location}</p>
                  <div className="d-flex gap-2 mb-3 flex-wrap">
                    <span className="badge bg-primary">{form.type}</span>
                    <span className="badge bg-success">₹{form.budget}/mo</span>
                  </div>
                </div>

                <h6 className="fw-bold mb-3">Edit Generated Details</h6>
                <div className="row g-3">
                  {[
                    { name: "propertyName", label: "Title" },
                    { name: "type", label: "Category" },
                    { name: "budget", label: "Rent" },
                    { name: "location", label: "Address" },
                    { name: "ownerName", label: "Owner" },
                    { name: "ownerContact", label: "Contact" },
                  ].map(({ name, label }) => (
                    <div key={name} className="col-md-6">
                      <label className="form-label small fw-semibold">{label}</label>
                      <input type="text" name={name} className="form-control form-control-sm" value={form[name] || ""} onChange={handleChange} />
                    </div>
                  ))}
                  <div className="col-12">
                    <label className="form-label small fw-semibold">Description</label>
                    <textarea name="description" rows="3" className="form-control form-control-sm" value={form.description || ""} onChange={handleChange}></textarea>
                  </div>
                </div>

                <button className="btn btn-success btn-lg w-100 mt-4" onClick={handleSave} disabled={saving}>
                  {saving ? (
                    <><span className="spinner-border spinner-border-sm me-2"></span>Saving...</>
                  ) : (
                    <><i className="bi bi-save me-2"></i>Save Property</>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
