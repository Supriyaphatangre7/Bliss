import { Link } from "react-router-dom";

const SubCategories = ({ currentCategory }) => {
  const subcategories = {
    men: ["tshirt", "top", "bottom", "outwear", "innerwear", "short"],
    women: ["tshirt", "top", "bottom", "outwear", "innerwear", "short"],
    kid: ["tshirt", "top", "bottom", "outwear", "innerwear", "hoodie"],
    sport: ["tshirt", "top", "bottom", "outwear", "short"]
  };

  return (
    <div className="flex justify-center mb-8 gap-4 flex-wrap">
      {subcategories[currentCategory]?.map((sub) => (
        <Link
          key={sub}
          to={`/shop?category=${currentCategory}&subcategory=${sub}`}
          className="px-6 py-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors capitalize"
        >
          {sub}
        </Link>
      ))}
    </div>
  );
};

export default SubCategories;