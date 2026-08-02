import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const SERVER = import.meta.env.VITE_SERVER_URL
import {
  MapPin,
  BedDouble,
  Home,
  Car,
  Building,
  IndianRupee,
  CheckCircle,
} from "lucide-react";

function PropertyDetails() {
  const navigate = useNavigate();

  const { id } = useParams();

  const [property, setProperty] = useState(null);

  const [loading, setLoading] = useState(true);

  const [isEdit, setIsEdit] = useState(false);

  const [editData, setEditData] = useState({});

  // GET PROPERTY

  useEffect(() => {
    const getProperty = async () => {
      try {
        const res = await axios.get(`${SERVER}/property/${id}`);

        setProperty(res.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getProperty();
  }, [id]);

  // INPUT CHANGE

  const handleChange = (e) => {
    setEditData({
      ...editData,

      [e.target.name]: e.target.value,
    });
  };

  // UPDATE PROPERTY

  const handleUpdate = async () => {
    try {
      await axios.put(
        `${SERVER}/updateproperty/${id}`,

        editData,
      );

      alert("Property Updated Successfully");

      setProperty(editData);

      setIsEdit(false);
    } catch (error) {
      console.log(error);

      alert("Update Failed");
    }
  };

  // DELETE PROPERTY

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");

    if (!confirmDelete) return;

    try {
      await axios.delete(`${SERVER}/deleteproperty/${id}`);

      alert("Property Deleted Successfully");

      navigate("/properties");
    } catch (error) {
      console.log(error);

      alert("Delete Failed");
    }
  };

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary"></div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="container py-5">
        <h2>Property Not Found</h2>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <motion.div
        initial={{
          opacity: 0,
          y: 30,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="card shadow-lg border-0 rounded-4"
      >
        <div className="card-body p-4">
          <div className="d-flex justify-content-between flex-wrap">
            <div>
              <h2 className="fw-bold">
                {isEdit ? (
                  <input
                    className="form-control"
                    name="propertyName"
                    value={editData.propertyName || ""}
                    onChange={handleChange}
                  />
                ) : (
                  property.propertyName
                )}
              </h2>

              <p className="text-muted">
                <MapPin size={18} />

                {isEdit ? (
                  <input
                    className="form-control mt-2"
                    name="location"
                    value={editData.location || ""}
                    onChange={handleChange}
                  />
                ) : (
                  property.location
                )}
              </p>
            </div>

            <div>
              <h2 className="text-primary">
                {isEdit ? (
                  <input
                    className="form-control"
                    name="budget"
                    value={editData.budget || ""}
                    onChange={handleChange}
                  />
                ) : (
                  `₹ ${property.budget}/Month`
                )}
              </h2>
            </div>
          </div>

          <hr />

          <div className="row g-4">
            <EditCard
              icon={<BedDouble />}
              title="Type"
              name="type"
              value={property.type}
              edit={isEdit}
              editData={editData}
              handleChange={handleChange}
            />

            <EditCard
              icon={<Home />}
              title="Furnished"
              name="furnished"
              value={property.furnished}
              edit={isEdit}
              editData={editData}
              handleChange={handleChange}
            />

            <EditCard
              icon={<CheckCircle />}
              title="Available For"
              name="availableFor"
              value={property.availableFor}
              edit={isEdit}
              editData={editData}
              handleChange={handleChange}
            />

            <EditCard
              icon={<Building />}
              title="Floor"
              name="floor"
              value={property.floor}
              edit={isEdit}
              editData={editData}
              handleChange={handleChange}
            />

            <EditCard
              icon={<Car />}
              title="Parking"
              name="parking"
              value={property.parking}
              edit={isEdit}
              editData={editData}
              handleChange={handleChange}
            />

            <EditCard
              icon={<IndianRupee />}
              title="Maintenance"
              name="maintenance"
              value={property.maintenance}
              edit={isEdit}
              editData={editData}
              handleChange={handleChange}
            />

            <EditCard
              icon={<Home />}
              title="Independent"
              name="independent"
              value={property.independent}
              edit={isEdit}
              editData={editData}
              handleChange={handleChange}
            />
          </div>

          <div className="mt-5">
            <h4>Description</h4>

            {isEdit ? (
              <textarea
                className="form-control"
                name="description"
                value={editData.description || ""}
                onChange={handleChange}
              />
            ) : (
              <p className="text-muted">{property.description}</p>
            )}
          </div>

          <div className="mt-4 d-flex gap-3 flex-wrap">
            {isEdit ? (
              <>
                <button
                  onClick={handleUpdate}
                  className="btn btn-success btn-lg"
                >
                  Save Changes
                </button>

                <button
                  onClick={() => setIsEdit(false)}
                  className="btn btn-secondary btn-lg"
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    setEditData(property);

                    setIsEdit(true);
                  }}
                  className="btn btn-warning btn-lg"
                >
                  Edit Details
                </button>

                <button
                  onClick={handleDelete}
                  className="btn btn-outline-danger btn-lg"
                >
                  Delete Property
                </button>
              </>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function EditCard({
  icon,

  title,

  name,

  value,

  edit,

  editData,

  handleChange,
}) {
  return (
    <div className="col-md-4">
      <div className="border rounded p-3">
        {icon}

        <h6 className="mt-2">{title}</h6>

        {edit ? (
          <input
            className="form-control"
            name={name}
            value={editData[name] || ""}
            onChange={handleChange}
          />
        ) : (
          value || "N/A"
        )}
      </div>
    </div>
  );
}

export default PropertyDetails;
