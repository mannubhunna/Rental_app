import { useRef, useState } from "react";
import axios from "axios";

const SERVER = import.meta.env.VITE_SERVER_URL

function AddProperty() {
  
  const [formData, setFormData] = useState({
  propertyName: "",
  budget: "",
  type: "",
  location: "",
  furnished: "",
  availableFor: "",
  floor: "",
  independent: "",
  maintenance: "",
  parking: "",
  description: "",
});

  const handleChange = (e) => {

    const { name, value } = e.target;
    
    setFormData({
        ...formData,
        [name]: value,
      });



  };
const handleSubmit = async (e) => {
  console.log(formData)
  e.preventDefault();

  try {
    const data = {
      propertyName: formData.propertyName,
      budget: formData.budget,
      type: formData.type,
      location: formData.location,
      furnished: formData.furnished,
      availableFor: formData.availableFor,
      floor: formData.floor,
      independent: formData.independent,
      maintenance: formData.maintenance,
      parking: formData.parking,
      description: formData.description,
    };

    const res = await axios.post(
      `${SERVER}/addProperty`,
      data
    );

    alert("Property Added Successfully");


    setFormData({
      propertyName: "",
      budget: "",
      type: "",
      location: "",
      furnished: "",
      availableFor: "",
      floor: "",
      independent: "",
      maintenance: "",
      parking: "",
      description: "",
    });

  } catch (err) {
    console.log(err);
    alert(err?.response?.data?.message || "Something went wrong");
  }
};

  const aidetailsRef=useRef();

  

  return (

    <div className="container py-5">

      <div className="row justify-content-center">

        <div className="col-lg-10">

          <div className="card shadow-lg border-0 rounded-4">

           

            <div className="card-body p-5">

              <h2 className="text-center fw-bold text-primary mb-4">
                🏠 Add New Property
              </h2>

              
  

              <form onSubmit={handleSubmit}>

                <div className="row g-4">

                  <div className="col-md-6">

                    <label className="form-label fw-semibold">
                      Property Name
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      name="propertyName"
                      value={formData.propertyName}
                      onChange={handleChange}
                      placeholder="Enter Property Name"
                    />

                  </div>

                  <div className="col-md-6">

                    <label className="form-label fw-semibold">
                      Rent Budget
                    </label>

                    <input
                      type="number"
                      className="form-control"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      placeholder="Enter Rent"
                    />

                  </div>

                  <div className="col-md-6">

                    <label className="form-label fw-semibold">
                      Property Type
                    </label>

                    <select
                      className="form-select"
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                    >

                      <option value="">Select</option>
                      <option value="1 BHK">1 BHK</option>
                      <option value="2 BHK">2 BHK</option>
                      <option value="3 BHK">3 BHK</option>
                      <option value="Villa">Villa</option>

                    </select>

                  </div>

                  <div className="col-md-6">

                    <label className="form-label fw-semibold">
                      Location
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="Mohali"
                    />

                  </div>

                  <div className="col-md-6">

                    <label className="form-label fw-semibold">
                      Furnished
                    </label>

                    <select
                      className="form-select"
                      name="furnished"
                      value={formData.furnished}
                      onChange={handleChange}
                    >

                      <option value="">Select</option>
                      <option>Fully Furnished</option>
                      <option>Semi Furnished</option>
                      <option>Unfurnished</option>

                    </select>

                  </div>

                  <div className="col-md-6">

                    <label className="form-label fw-semibold">
                      Available For
                    </label>

                    <select
                      className="form-select"
                      name="availableFor"
                      value={formData.availableFor}
                      onChange={handleChange}
                    >

                      <option value="">Select</option>
                      <option>Family</option>
                      <option>Boys</option>
                      <option>Girls</option>
                      <option>Employees Girls</option>
                      <option>Employees Boys</option>
                       <option>Anyone Bachlor</option>

                    </select>

                  </div>

                  <div className="col-md-4">

                    <label className="form-label fw-semibold">
                      Floor
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      name="floor"
                      value={formData.floor}
                      onChange={handleChange}
                    />

                  </div>

                 

                 
                  <div className="col-md-6">

                    <label className="form-label fw-semibold">
                      Independent
                    </label>

                    <select
                      className="form-select"
                      name="independent"
                      value={formData.independent}
                      onChange={handleChange}
                    >

                      <option value="">Select</option>
                      <option>Yes</option>
                      <option>No</option>

                    </select>

                  </div>

                  <div className="col-md-6">

                    <label className="form-label fw-semibold">
                      Parking
                    </label>

                    <select
                      className="form-select"
                      name="parking"
                      value={formData.parking}
                      onChange={handleChange}
                    >

                      <option value="">Select</option>
                      <option>Available</option>
                      <option>Not Available</option>

                    </select>

                  </div>

                  <div className="col-md-6">

                    <label className="form-label fw-semibold">
                      Maintenance
                    </label>

                    <input
                      type="number"
                      className="form-control"
                      name="maintenance"
                      value={formData.maintenance}
                      onChange={handleChange}
                    />

                  </div>

                  

                  <div className="col-12">

                    <label className="form-label fw-semibold">
                      Description
                    </label>

                    <textarea
                      rows="4"
                      className="form-control"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Write full property description..."
                    ></textarea>

                    

                  </div>

                

                  <div className="col-12 mt-3">

                    <button
                      type="submit"
                      className="btn btn-primary btn-lg w-100"
                    >
                      Add Property
                    </button>

                  </div>

                </div>

              </form>

            </div>
            

          </div>

        </div>
        

      </div>

      

    </div>

  );

}

export default AddProperty;
