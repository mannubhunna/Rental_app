import { Customer } from "../model/Customer.js";

export async function getCustomers(req, res) {
  try {
    const customers = await Customer.find().sort({ createdAt: -1 });
     
    return res.status(200).json(customers);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
}

export async function addCustomer(req, res) {
  try {
    const customer = await Customer.create({
      Name: req.body.Name,
      budget: req.body.budget,
      location: req.body.location,
      propertytype: req.body.propertytype,
      gender: req.body.gender,
      members: req.body.members,
      profession: req.body.profession,
      organisation: req.body.organisation,
      furnished: req.body.furnished,
      floor: req.body.floor,
      independent: req.body.independent,
      parking: req.body.parking,
      mobile: req.body.mobile,
    });

    return res.status(201).json({
      message: "Customer Added Successfully",
      customer,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
}

export async function getCustomerById(req, res) {
  try {
    
    const customer = await Customer.findById(req.params.id);

    if (!customer) {
      return res.status(404).json({
        message: "Customer not found",
      });
    }

    return res.status(200).json(customer);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
}

export async function updateCustomer(req, res) {
  try {
    const customer = await Customer.findByIdAndUpdate(
      req.params.id,
      {
        Name: req.body.Name,
        budget: req.body.budget,
        location: req.body.location,
        propertytype: req.body.propertytype,
        gender: req.body.gender,
        members: req.body.members,
        profession: req.body.profession,
        organisation: req.body.organisation,
        furnished: req.body.furnished,
        floor: req.body.floor,
        independent: req.body.independent,
        parking: req.body.parking,
        mobile: req.body.mobile,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!customer) {
      return res.status(404).json({
        message: "Customer not found",
      });
    }

    return res.status(200).json({
      message: "Customer Updated Successfully",
      customer,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
}

export async function deleteCustomer(req, res) {
  try {
    const customer = await Customer.findByIdAndDelete(req.params.id);

    if (!customer) {
      return res.status(404).json({
        message: "Customer not found",
      });
    }

    return res.status(200).json({
      message: "Customer Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
}