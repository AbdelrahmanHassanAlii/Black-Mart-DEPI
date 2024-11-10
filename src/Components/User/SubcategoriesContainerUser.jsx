/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { getItemFromLS } from "../../Functions/getItemFromLS";
import { searchByName } from "../../Functions/SearchByName";
import { getAllSubCategories } from '../../APIs Connections/Shared/Subcategories/getAllSubcategories';
import CategoryCardUser from "./CategoryCardUser";
export default function SubcategoriesContainerUser() {
  const [subcategories, setSubcategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSubategories, setFilteredSubcategories] = useState([]);

  useEffect(() => {
    const getSubcategories = async () => {
      const subcategoriesData = await getAllSubCategories();
      setSubcategories(subcategoriesData);
    };
    getSubcategories();
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
      const results = searchByName(subcategories, searchTerm);
      setFilteredSubcategories(results);
    } else {
      setFilteredSubcategories(subcategories);
    }
  }, [subcategories, searchTerm]);

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
            {filteredSubategories.length > 0 ? (
              filteredSubategories.map((sub) => (
                <CategoryCardUser key={sub._id} category={sub} path={`/subcategories/${sub._id}/products`} />
              ))
            ) : (
              <p>No subcategories found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}