import Fashion from "../models/fashion-model.js";

const validCategories = ['men', 'women', 'kid', 'sport'];
const validSubcategories = ['tshirt', 'top', 'bottom', 'outwear', 'innerwear', 'short', 'hoodie'];

export const fashion = async (req, res) => {
  try {
    const { search, category, subcategory } = req.query;
    const filter = {};

    // Handle direct category/subcategory filters
    if (category) filter.category = category;
    if (subcategory) filter.subcategory = subcategory;

    // Handle search query parsing
    if (search) {
      const searchTerms = search.toLowerCase().split(" ");
      
      // Detect category/subcategory pairs in search
      const detectedCategory = searchTerms.find(term => validCategories.includes(term));
      const detectedSubcategory = searchTerms.find(term => validSubcategories.includes(term));
      
      if (detectedCategory && detectedSubcategory) {
        filter.category = detectedCategory;
        filter.subcategory = detectedSubcategory;
      } else {
        // Fallback to text search
        filter.$or = [
          { name: { $regex: search, $options: "i" } },
          { description: { $regex: search, $options: "i" } }
        ];
      }
    }

    const products = await Fashion.find(filter);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};



export const getFashionById=async(req,res)=>{
    try {
        const fashion=await Fashion.findById(req.params.id);
        if(!fashion)
        {
            return res.status(404).json({message:"Product not found"});
        }
        res.status(200).json(fashion);
    } catch (error) {
        console.error(error);
      res.status(500).json({ error: "Server error" });
    }
}



export default {fashion,getFashionById};