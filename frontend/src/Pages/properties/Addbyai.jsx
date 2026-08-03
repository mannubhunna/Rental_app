import { useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const SERVER = import.meta.env.VITE_SERVER_URL

export function Addbyai() {
  const navigate = useNavigate();
  const aidetailsRef = useRef();

  const handleaisubmit = async () => {
    const aidata = aidetailsRef.current.value;

    if (!aidata.trim()) {
      alert("Please enter property details.");
      return;
    }

    try {
      await axios.post(`${SERVER}aiinput`, {
        prompt: aidata,
      });

      alert("Property Uploaded Successfully!");
      aidetailsRef.current.value = "";
    } catch (err) {
      console.log(err);
      alert("Something went wrong!");
    }
  };

  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center py-5"
      style={{
        background:
          "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      }}
    >
      <div
        className="card border-0 shadow-lg rounded-4 p-4"
        style={{ maxWidth: "800px", width: "100%" }}
      >
        <div className="card-body">

          {/* Header */}
          <div className="text-center mb-4">
            <div
              className="bg-primary bg-gradient rounded-circle d-inline-flex align-items-center justify-content-center shadow"
              style={{
                width: "80px",
                height: "80px",
                fontSize: "35px",
              }}
            >
              🤖
            </div>

            <h2 className="fw-bold mt-3">
              AI Property Saver
            </h2>

            <p className="text-muted">
              Describe your property and let AI generate everything for you.
            </p>
          </div>

          {/* Text Area */}
          <div className="mb-4">
            <label className="form-label fw-semibold">
              Property Description
            </label>

            <textarea
              ref={aidetailsRef}
              rows="8"
              className="form-control form-control-lg rounded-3 shadow-sm"
              placeholder="Example:
Luxury 3BHK Apartment
Location: New York
Swimming Pool
Gym
2 Parking Spaces
Near Metro..."
            />
          </div>

          {/* Buttons */}
          <div>

           

            <button
              onClick={handleaisubmit}
              className="btn btn-primary btn-lg flex-fill rounded-3 shadow"
            >
              ✨ Save with AI
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}