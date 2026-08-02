import "./app.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import PropertyCard from "./Pages/card";
import PropertyDetails from "./Pages/PropertyDetails";
import { Addbyai } from "./Pages/properties/Addbyai";
import Home from "./Pages/Home";
import Userdemand from "./Pages/Userdemand";
import AddProperty from "./Pages/Addproperty";
import CustomerDetail from "./Pages/CustomerDetails";
import AddCustomer from "./Pages/AddCustomer";
import Addcustomerbyai from "./Pages/Addcustomerbyai";
import AdminDashboard from "./Pages/Home";

export function App() {
  return (
    <>
      <Header />

      <main className="min-vh-100">
        <Routes>
          
          <Route path="/" element={<AdminDashboard/>} />
          <Route path="/properties" element={<PropertyCard />} />

          <Route path="/property/:id" element={<PropertyDetails />} />
           <Route path="/demands" element={<Userdemand/>} />


          <Route path="/addproperty" element={<Addbyai />} />
           <Route path="/addpropertymanual" element={<AddProperty/>} />
          

           <Route path="/customer/:id" element={<CustomerDetail/>} />
           <Route path="/addcustomer/manual" element={<AddCustomer/>} />
           <Route path="/addcustomer/byai" element={<Addcustomerbyai/>} />
        
        </Routes>
      </main>

      <Footer />
    </>
  );
}