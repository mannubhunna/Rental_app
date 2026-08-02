import React, { useState } from "react";
import axios from "axios";

const SERVER = import.meta.env.VITE_SERVER_URL

const AddCustomer = () => {
  const [customer, setCustomer] = useState({
    Name: "",
    budget: "",
    location: "",
    propertytype: "",
    gender: "",
    members: "",
    profession: "",
    organisation: "",
    furnished: "",
    floor: "",
    independent: "",
    parking: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setCustomer((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${SERVER}/addcustomer`,
        customer
      );

      alert(res.data.message);

      setCustomer({
        Name: "",
        budget: "",
        location: "",
        propertytype: "",
        gender: "",
        members: "",
        profession: "",
        organisation: "",
        furnished: "",
        floor: "",
        independent: "",
        parking: "",
      });
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">

          <div className="card shadow-lg border-0 rounded-4">

            <div className="card-header bg-primary text-white text-center py-3 rounded-top-4">
              <h3 className="mb-0">Add Customer</h3>
            </div>

            <div className="card-body p-4">

              <form onSubmit={handleSubmit}>

                <div className="row">

                  <div className="col-md-6 mb-3">
                    <label className="form-label">Customer Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="Name"
                      value={customer.Name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">Budget</label>
                    <input
                      type="text"
                      className="form-control"
                      name="budget"
                      value={customer.budget}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">Preferred Location</label>
                    <input
                      type="text"
                      className="form-control"
                      name="location"
                      value={customer.location}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">Property Type</label>
                    <select
                      className="form-select"
                      name="propertytype"
                      value={customer.propertytype}
                      onChange={handleChange}
                    >
                      <option value="">Select</option>
                      <option>1 RK</option>
                      <option>1 BHK</option>
                      <option>2 BHK</option>
                      <option>3 BHK</option>
                      <option>PG</option>
                      <option>Shop</option>
                      <option>Office</option>
                    </select>
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">Gender</label>
                    <select
                      className="form-select"
                      name="gender"
                      value={customer.gender}
                      onChange={handleChange}
                    >
                      <option value="">Select</option>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Family</option>
                    </select>
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">Members</label>
                    <input
                      type="number"
                      className="form-control"
                      name="members"
                      value={customer.members}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">Profession</label>
                    <input
                      type="text"
                      className="form-control"
                      name="profession"
                      value={customer.profession}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">Organisation</label>
                    <input
                      type="text"
                      className="form-control"
                      name="organisation"
                      value={customer.organisation}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">Furnished</label>
                    <select
                      className="form-select"
                      name="furnished"
                      value={customer.furnished}
                      onChange={handleChange}
                    >
                      <option value="">Select</option>
                      <option>Fully Furnished</option>
                      <option>Semi Furnished</option>
                      <option>Unfurnished</option>
                    </select>
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">Floor</label>
                    <input
                      type="text"
                      className="form-control"
                      name="floor"
                      value={customer.floor}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">Independent</label>
                    <select
                      className="form-select"
                      name="independent"
                      value={customer.independent}
                      onChange={handleChange}
                    >
                      <option value="">Select</option>
                      <option>Yes</option>
                      <option>No</option>
                    </select>
                  </div>

                  <div className="col-md-6 mb-4">
                    <label className="form-label">Parking</label>
                    <select
                      className="form-select"
                      name="parking"
                      value={customer.parking}
                      onChange={handleChange}
                    >
                      <option value="">Select</option>
                      <option>Available</option>
                      <option>Not Available</option>
                    </select>
                  </div>

                </div>

                <div className="text-center">
                  <button
                    type="submit"
                    className="btn btn-primary px-5 py-2"
                  >
                    Add Customer
                  </button>
                </div>

              </form>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default AddCustomer;