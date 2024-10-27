import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { RiAddLine } from "react-icons/ri";
import { getAllSubCategories } from "../../../APIs Connections/Shared/Subcategories/getAllSubcategories";
import SubCategoryCard from "./SubCategoryCard";

export default function SubCategoriesContainer() {
  const [subCategories, setSubCategories] = useState([]);

  useEffect(() => {
    const getSubCategories = async () => {
      let subCategoriesData = await getAllSubCategories();
      setSubCategories(subCategoriesData);
    };
    getSubCategories();
  }, [subCategories]);
  return (
    <div className="contentContainer">
      <div className="heading">
        <p className="title">Sub Categories</p>
        <Link className="add-btn" to={`/admin/subCategories/add`}>
          Add Sub Category
          <RiAddLine />
        </Link>
      </div>

      <div className="cardsContainer">
        {subCategories.length > 0 ? (
          subCategories.map((subCategory) => (
            <SubCategoryCard key={subCategory._id} subCategory={subCategory} />
          ))
        ) : (
          <p>No sub categories found</p>
        )}
      </div>
    </div>
  );
}
