import { useEffect, useState } from "react";
import axios from "axios";
import { Link, NavLink, useNavigate } from "react-router-dom";
import React from "react";
import {
  FiMapPin,
  FiHome,
  FiCheckCircle,
} from "react-icons/fi";
const SERVER = import.meta.env.VITE_SERVER_URL


function PropertyCard() {
  
const navigate = useNavigate();


  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    async function getData() {
      try {
        const res = await axios.get(`${SERVER}/properties`);
      
        setProperties(res.data.data || []);
        
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

        <h5 className="mt-3">Loading Properties...</h5>
      </div>
    );
  }

  return (
     
    <div className="property-grid m-5">
      {properties.map((property) => (
        <Link className="Router-Link" to={`/property/${property._id}`}>
        <div className="property-card" key={property.id}>
          {/* Property Image */}
       //  <div className="property-image-wrapper">
            <img
              src={
                property.propertyimage
                  ? property.propertyimage
                  : `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkIpBg_3jIZonGjztTtcwHrv8J_NsEov2WVUOBi3f0HJVU4M2yigzCEooi&s=10`
              }
              alt={property.propertyName}
              className="property-image"
              loading="lazy"
            />
          </div> 

          {/* Card Content */}
          <div className="property-content">
            <h3 className="property-title">
              {property.propertyName}
            </h3>

            <div className="property-budget">
             ₹ {property.budget} /month
            </div>

            <div className="property-info">
              <div className="info-row">
                <FiHome className="info-icon" />
                <span>{property.availableFor}</span>
              </div>

              <div className="info-row">
                <FiMapPin className="info-icon" />
                <span>{property.location}</span>
              </div>

              <div className="info-row">
                <FiCheckCircle className="info-icon" />
                <span>{property.furnished}</span>
              </div>
            </div>
          </div>
        </div>
        </Link>
      ))}
    </div>
    
  );
}

export default PropertyCard;
