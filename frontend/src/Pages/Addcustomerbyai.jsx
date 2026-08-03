import { useRef } from "react";
import axios from "axios";

const SERVER = import.meta.env.VITE_SERVER_URL

function Addcustomerbyai() {
  const aidetailsRef = useRef();

  const handleAISubmit = async () => {
    const aidata = aidetailsRef.current.value;

    if (!aidata.trim()) {
      alert("Please enter customer requirements.");
      return;
    }

    try {
      await axios.post(`${SERVER}customer/addcustomer/byai`, {
        prompt: aidata,
      });

      alert("Customer Added Successfully!");
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
        style={{ maxWidth: "850px", width: "100%" }}
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
              👤
            </div>

            <h2 className="fw-bold mt-3">
              AI Customer Finder
            </h2>

            <p className="text-muted">
              Describe the customer's requirements and let AI generate the complete customer profile.
            </p>
          </div>

          {/* Text Area */}
          <div className="mb-4">
            <label className="form-label fw-semibold">
              Customer Requirements
            </label>

            <textarea
              ref={aidetailsRef}
              rows="8"
              className="form-control form-control-lg rounded-3 shadow-sm"
              placeholder={`Example:

Customer Name: Rahul Sharma
Budget: ₹15,000
Location: Mohali
Property Type: 2 BHK
Gender: Male
Members: 3
Profession: Software Engineer
Organisation: Infosys
Furnished: Fully Furnished
Floor: 1st or 2nd
Independent: Yes
Parking: Required`}
            />
          </div>

          {/* Button */}
          <button
            onClick={handleAISubmit}
            className="btn btn-primary btn-lg w-100 rounded-3 shadow"
          >
            ✨ Generate & Save Customer
          </button>

        </div>
      </div>
    </div>
  );
}

export default Addcustomerbyai;