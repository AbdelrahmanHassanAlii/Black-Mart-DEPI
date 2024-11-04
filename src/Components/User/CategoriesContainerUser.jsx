/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { getAllCategories } from "../../APIs Connections/Shared/Categories/getAllCategories";
import CategoryCardUser from "./CategoryCardUser";
import { getItemFromLS } from "../../Functions/getItemFromLS";
import { searchByName } from "../../Functions/SearchByName";

export default function CategoriesContainerUser() {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCategories, setFilteredCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      const categoriesData = await getAllCategories();
      setCategories(categoriesData);
    };
    getCategories();
  });

  useEffect(() => {
    const storedSearchTerm = getItemFromLS("searchTerm")[0];

    if (storedSearchTerm) {
      setSearchTerm(storedSearchTerm);
    } else {
      setSearchTerm("");
    }
  });

  useEffect(() => {
    if (searchTerm) {
      const results = searchByName(categories, searchTerm);
      setFilteredCategories(results);
    } else {
      setFilteredCategories(categories);
    }
  }, [categories, searchTerm]);

  return (
    <div style={{ margin: "50px 0", padding: "50px 0 0 0" }}>
      <div className="container">
        <div className="content">
          {searchTerm && (
            <p
              className="title"
              style={{ marginBottom: "20px", display: "block" }}
            >
              {`Search results for "${searchTerm}"`}
            </p>
          )}
          <div className="cardsContainer" style={{ marginBottom: "50px" }}>
            {filteredCategories.length > 0 ? (
              filteredCategories.map((category) => (
                <CategoryCardUser key={category._id} category={category} />
              ))
            ) : (
              <p>No categories found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
