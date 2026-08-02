import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import {
  Building2,
  Users,
  Home,
  UserRound,
  ArrowRight,
  TrendingUp,
} from "lucide-react";

function AdminDashboard() {
  const navigate = useNavigate();

  // Future me API se aayega
  const totalProperties = 120;

  const totalCustomers = 85;

  return (
    <div className="container-fluid bg-light min-vh-100 py-4">
      <div className="container">
        {/* HEADER */}

        <div className="mb-4">
          <h1 className="fw-bold">Rental Admin Dashboard</h1>

          <p className="text-muted">
            Manage your properties and customers from one place
          </p>
        </div>

        {/* STAT CARDS */}

        <div className="row g-4">
          {/* PROPERTY CARD */}

          <motion.div
            className="col-md-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="card border-0 shadow-sm rounded-4 h-100">
              <div className="card-body p-4">
                <div className="d-flex justify-content-between">
                  <div>
                    <div className="bg-primary bg-opacity-10 p-3 rounded-circle">
                      <Building2 size={35} className="text-primary" />
                    </div>
                  </div>

                  <TrendingUp className="text-success" />
                </div>

                <h6 className="text-muted mt-4">Total Rental Properties</h6>

                <h1 className="fw-bold">{totalProperties}</h1>

                <button
                  onClick={() => navigate("/properties")}
                  className="btn btn-primary w-100 mt-3"
                >
                  Go To Properties
                  <ArrowRight size={18} className="ms-2" />
                </button>
              </div>
            </div>
          </motion.div>

          {/* CUSTOMER CARD */}

          <motion.div
            className="col-md-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="card border-0 shadow-sm rounded-4 h-100">
              <div className="card-body p-4">
                <div className="d-flex justify-content-between">
                  <div>
                    <div className="bg-success bg-opacity-10 p-3 rounded-circle">
                      <Users size={35} className="text-success" />
                    </div>
                  </div>

                  <TrendingUp className="text-success" />
                </div>

                <h6 className="text-muted mt-4">Total Customers</h6>

                <h1 className="fw-bold">{totalCustomers}</h1>

                <button
                  onClick={() => navigate("/demands")}
                  className="btn btn-success w-100 mt-3"
                >
                  Go To Customers
                  <ArrowRight size={18} className="ms-2" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* QUICK ACTION SECTION */}

        <div className="card border-0 shadow-sm rounded-4 mt-5">
          <div className="card-body p-4">
            <h4 className="fw-bold mb-4">Quick Actions</h4>

            <div className="row g-3">
              <div className="col-md-6">
                <button
                  onClick={() => navigate("/properties")}
                  className="btn btn-outline-primary w-100 p-3"
                >
                  <Home size={22} />

                  <span className="ms-2">Manage Properties</span>
                </button>
              </div>

              <div className="col-md-6">
                <button
                  onClick={() => navigate("/customers")}
                  className="btn btn-outline-success w-100 p-3"
                >
                  <UserRound size={22} />

                  <span className="ms-2">Manage Customers</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
