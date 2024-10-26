import { useState, useEffect } from "react";
// import CategoryCard from "./CategoryCard";
import { Link } from "react-router-dom";
import { RiAddLargeLine } from "react-icons/ri";
import { getAllCategories } from "../../../APIs Connections/Shared/Categories/getAllCategories";
import CategoryCard from "./CategoryCard";

export default function CategoriesContainer() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const categoriesData = await getAllCategories();
        setCategories(categoriesData);

        console.log("Categories:", categoriesData);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    getCategories();
  }, []);

  return (
    <div className="contentContainer">
      <div className="heading">
        <p className="title">Categories</p>
        <Link className="add-btn" to={`/admin/categories/add`}>
          {" "}
          Add Category
          <RiAddLargeLine />
        </Link>
      </div>
      {categories.length > 0 ? (
        <div className="cardsContainer">
          {categories.map((category, index) => (
            <CategoryCard
              key={index}
              image={category.img}
              name={category.name}
              id={category._id}
            />
          ))}
        </div>
      ) : (
        <p>No categories found.</p>
      )}
    </div>
  );
}
