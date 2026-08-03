import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import React from "react";

const SERVER = import.meta.env.VITE_SERVER_URL
import {
  FiMapPin,
  FiHome,
  FiCheckCircle,
  FiUsers,
  FiBriefcase,
  FiUser,
} from "react-icons/fi";

function CustomerCard() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    async function getData() {
      try {
        const res = await axios.get(`${SERVER}customers`);
        
        setCustomers(res.data || []);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    getData();
  }, []);

  
  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div
          className="spinner-border text-primary"
          style={{ width: "4rem", height: "4rem" }}
        ></div>

        <h5 className="mt-3">Loading Customers...</h5>
      </div>
    );
  }

  return (
    <div className="property-grid m-5">
      {customers.map((customer) => (
        <Link
          className="Router-Link"
          to={`/customer/${customer._id}`}
          key={customer.id}
        >
          <div className="property-card">

            {/* Image */}
            <div className="customer-image-wrapper">
              <img
                src={`https://cdn-icons-png.flaticon.com/512/149/149071.png`}
                alt={customer.Name}
                className="property-image"
              />
            </div>

            {/* Content */}
            <div className="property-content">

              <h3 className="property-title">
                {customer.Name}  <span> ₹ {customer.budget} Bugdet</span>
              </h3>

              <div className="property-info">

                <div className="info-row">
                  <FiHome className="info-icon" />
                  <span>{customer.propertytype}</span>
                </div>

                <div className="info-row">
                  <FiMapPin className="info-icon" />
                  <span>{customer.location}</span>
                </div>

                <div className="info-row">
                  <FiCheckCircle className="info-icon" />
                  <span>{customer.furnished}</span>
                </div>

                <div className="info-row">
                  <FiUser className="info-icon" />
                  <span>{customer.gender}</span>
                </div>

                

              </div>

            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default CustomerCard;