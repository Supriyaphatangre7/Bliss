import Buy from "../models/buy-model.js";

export const buyOrder = async (req, res) => {
  try {
    const { name, mobile, address, payment } = req.body;
    const productId = req.params.id; 

   

   
    const newBuyOrder = new Buy({
      name,
      mobile,
      productId, // Using productId from URL
    
      address,
      payment,
      
    });

    // Save to database
    const savedOrder = await newBuyOrder.save();

    res.status(201).json({ message: "Order placed successfully", order: savedOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

export default buyOrder;
