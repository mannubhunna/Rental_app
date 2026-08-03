import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

import {
  MapPin,
  Home,
  Users,
  Briefcase,
  Building,
  Car,
  IndianRupee,
  CheckCircle,
  User,
} from "lucide-react";

const SERVER = import.meta.env.VITE_SERVER_URL

function CustomerDetail() {
  const navigate = useNavigate();

  const { id } = useParams();
  
  const [customer, setCustomer] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getCustomer() {
      try {
        const res = await axios.get(`${SERVER}customer/${id}`);
        
        setCustomer(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }

    getCustomer();
  }, [id]);

  const handleDelete = async () => {
    try {
      console.log("delete ke liye id aagyi",id)
      await axios.delete(`${SERVER}customer/${id}`);

      alert("Customer Deleted Successfully");

      navigate("/demands");
    } catch (err) {
      alert("Server Error");
      console.log(err);
    }
  };

  if (loading) {
    return (
      <div className="container text-center py-5">
        <div className="spinner-border text-primary"></div>
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="container py-5">
        <h2>Customer Not Found</h2>
      </div>
    );
  }

  return (
    <div className="container py-5">
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="card shadow-lg border-0 rounded-4"
      >
        

        <div className="card-body p-4">
          <div className="d-flex justify-content-between flex-wrap">

            <div>
              <h2 className="fw-bold">{customer.Name}</h2>

              <p className="text-muted">
                <MapPin size={18} /> {customer.location}
              </p>
            </div>

            <div>
              <h2 className="text-primary">
                ₹ {customer.budget}
              </h2>
            </div>

          </div>

          <hr />

          <div className="row g-4">

            <div className="col-md-4">
              <div className="border rounded p-3">
                <Home />
                <h6 className="mt-2">Property Type</h6>
                {customer.propertytype}
              </div>
            </div>

            <div className="col-md-4">
              <div className="border rounded p-3">
                <CheckCircle />
                <h6 className="mt-2">Furnished</h6>
                {customer.furnished}
              </div>
            </div>

            <div className="col-md-4">
              <div className="border rounded p-3">
                <User />
                <h6 className="mt-2">Gender</h6>
                {customer.gender}
              </div>
            </div>

            <div className="col-md-4">
              <div className="border rounded p-3">
                <Users />
                <h6 className="mt-2">Members</h6>
                {customer.members}
              </div>
            </div>

            <div className="col-md-4">
              <div className="border rounded p-3">
                <Briefcase />
                <h6 className="mt-2">Profession</h6>
                {customer.profession}
              </div>
            </div>

            <div className="col-md-4">
              <div className="border rounded p-3">
                <Building />
                <h6 className="mt-2">Organisation</h6>
                {customer.organisation}
              </div>
            </div>

            <div className="col-md-4">
              <div className="border rounded p-3">
                <Building />
                <h6 className="mt-2">Floor Preference</h6>
                {customer.floor}
              </div>
            </div>

            <div className="col-md-4">
              <div className="border rounded p-3">
                <Home />
                <h6 className="mt-2">Independent</h6>
                {customer.independent}
              </div>
            </div>

            <div className="col-md-4">
              <div className="border rounded p-3">
                <Car />
                <h6 className="mt-2">Parking</h6>
                {customer.parking}
              </div>
            </div>

          </div>

          <div className="mt-4 d-flex gap-3 flex-wrap">

            <button className="btn btn-primary btn-lg">
              Contact Customer
            </button>

            <button className="btn btn-outline-warning btn-lg">
              Edit Details
            </button>

            <button
              onClick={handleDelete}
              className="btn btn-outline-danger btn-lg"
            >
              Delete Customer
            </button>

          </div>

        </div>
      </motion.div>
    </div>
  );
}

export default CustomerDetail;