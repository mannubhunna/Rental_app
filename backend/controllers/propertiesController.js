import { Inventory } from "../model/Inventory.js";






export async function properties(req,res) {
 
    try{
      const newdata= await Inventory.find();
   return res.status(200).json({message:"Property Details Recived Sucessfuly",data:newdata})
    }
    catch(error){
      console.log(error)
       return res.status(500).json({message:"Server Error"})
    }
}


export async function propertyById(req,res) {
 
    try{
      const id  = req.params.id;
     

      const newdata= await Inventory.findById(id)
   return res.status(200).json({message:"Property Details Recived Sucessfuly",data:newdata})
    }
    catch(error){
      console.log(error)
       return res.status(500).json({message:"Server Error"})
    }
}



export async function addProperty (req, res) {
  try {
    const property = await Inventory.create({
      propertyName: req.body.propertyName,
      budget: req.body.budget,
      type: req.body.type,
      location: req.body.location,
      furnished: req.body.furnished,
      availableFor: req.body.availableFor,
      floor: req.body.floor,
      independent: req.body.independent,
      maintenance: req.body.maintenance,
      parking: req.body.parking,
      description: req.body.description,
    });

    res.status(201).json({
      success: true,
      message: "Property added successfully",
      data: property,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};




export async function deleteproperty(req, res) {
  try {
    const { id } = req.params;

    const property = await Inventory.findByIdAndDelete(id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Property deleted successfully",
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
}



export async function updateproperty(req, res) {
  try {
    const { id } = req.params;

    const property = await Inventory.findByIdAndUpdate(
      id,
      {
        propertyName: req.body.propertyName,
        budget: req.body.budget,
        type: req.body.type,
        location: req.body.location,
        furnished: req.body.furnished,
        availableFor: req.body.availableFor,
        floor: req.body.floor,
        independent: req.body.independent,
        maintenance: req.body.maintenance,
        parking: req.body.parking,
        description: req.body.description,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!property) {
      return res.status(404).json({
        message: "Property not found",
      });
    }

    return res.status(200).json({
      message: "Property updated successfully",
      property,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server Error",
    });
  }
}