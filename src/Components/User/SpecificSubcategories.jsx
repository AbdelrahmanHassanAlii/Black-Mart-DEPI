import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAllSubCategories } from "../../APIs Connections/Shared/Subcategories/getAllSubcategories";
import CategoryCardUser from "./CategoryCardUser";

export default function SpecificSubcategories() {
  const { categoryID } = useParams();

  const [subcategories, setSubcategories] = useState([]);

  // Fetch subcategories based on the categoryID only once or when categoryID changes
  useEffect(() => {
    const getSubcategories = async () => {
      const subcategoriesData = await getAllSubCategories(categoryID);
      const filteredData = subcategoriesData.filter(
        (subcategory) => subcategory.category === categoryID
      );
      setSubcategories(filteredData);
    };
    getSubcategories();
  });

  return (
    <div className="container">
      <div className="cardsContainer" style={{ padding: "100px 0" }}>
        {subcategories.length > 0 ? (
          subcategories.map((subcategory) => (
            <CategoryCardUser key={subcategory._id} category={subcategory} />
          ))
        ) : (
          <p>No subcategories found for this category</p>
        )}
      </div>
    </div>
  );
}
