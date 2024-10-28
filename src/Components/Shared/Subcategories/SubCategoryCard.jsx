/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import style from "../../../assets/CSS/Shared/SubcategoryCard.module.css";
import Swal from "sweetalert2";
import { MdDelete } from "react-icons/md";
import { RxUpdate } from "react-icons/rx";
import { deleteSubCategory } from "../../../APIs Connections/Admin/Subcategories/deleteSubcategory";

export default function SubCategoryCard({ subCategory }) {

  const handleDeleteSubCategory = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await deleteSubCategory(id);
          console.log(response);

          Swal.fire({
            title: "Subcategory deleted successfully!",
            icon: "success",
            showConfirmButton: false,
            timer: 2000,
          });
        } catch (error) {
          console.error("Error deleting subcategory:", error);

          Swal.fire(
            "Error!",
            "An error occurred while deleting the subcategory.",
            "error"
          );
        }
      }
    });
  };

  return (
    <>
      <div className={style.subCategoryCard}>
        <Link to={`/admin/subCategories`}>
          <img
            className={style.subCategoryImg}
            src={subCategory.img}
            alt={subCategory.name}
          />
          <p className={style.subCategoryName}>{subCategory.name}</p>
          <div className={style.subCategoryBtns}>
            <Link
              className={style.editBtn}
              to={`/admin/subCategories/update/${subCategory._id}`}
            >
              Update
              <RxUpdate />
            </Link>
            <button
              className={style.deleteBtn}
              onClick={() => handleDeleteSubCategory(subCategory._id)}
            >
              Delete
              <MdDelete />
            </button>
          </div>
        </Link>
      </div>
    </>
  );
}
