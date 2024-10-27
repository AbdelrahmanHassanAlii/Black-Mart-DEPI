import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import style from "../../assets/CSS/Admin/AddCategoryForm.module.css";
import { SiNamecheap } from "react-icons/si";
import Swal from "sweetalert2";
import { RiFileCloudLine } from "react-icons/ri";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RxUpdate } from "react-icons/rx";
import { getSpecificCategoryData } from "../../APIs Connections/Admin/Categories/getSpecificCategoryData";
import { updateCategory } from "../../APIs Connections/Admin/Categories/updateCategory";

export default function UpdateCategoryForm() {
  const { id } = useParams();

  const [errors, setErrors] = useState({
    name: "",
    img: "",
    backEndError: "",
  });

  const [category, setCategory] = useState({
    name: "",
    img: null,
  });

  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    const getCategory = async () => {
      try {
        const categoryData = await getSpecificCategoryData(id);

        if (categoryData) {
          setCategory({
            name: categoryData.category.name || "",
            img: categoryData.category.img || null,
          });
          setPreviewImage(categoryData.category.img);
        } else {
          setErrors((prevErrors) => ({
            ...prevErrors,
            backEndError: "Failed to load category data",
          }));
        }
      } catch (error) {
        console.error("Error fetching category:", error);
        setErrors((prevErrors) => ({
          ...prevErrors,
          backEndError: "An error occurred while fetching category data.",
        }));
      }
    };

    getCategory();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      const file = files[0];
      setCategory({
        ...category,
        img: file,
      });
      setPreviewImage(URL.createObjectURL(file));
    } else {
      setCategory({
        ...category,
        [name]: value,
      });
    }
  };

  const validateForm = () => {
    let formIsValid = true;
    let validationErrors = {};

    if (!category.name) {
      validationErrors.name = "Name is required";
      formIsValid = false;
    } else if (/^\d+$/.test(category.name)) {
      validationErrors.name = "Name cannot contain only numbers";
      formIsValid = false;
    }

    if (category.img && typeof category.img === "object") {
      if (!category.img.name.match(/\.(jpg|jpeg|png|gif)$/)) {
        validationErrors.img =
          "Please upload a valid image file (jpg, jpeg, png, gif)";
        formIsValid = false;
      }
    }

    setErrors(validationErrors);
    return formIsValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to update this category?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#299fff",
      cancelButtonColor: "rgb(255, 51, 51)",
      confirmButtonText: "Yes, update it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const formData = new FormData();
        formData.append("name", category.name);
        if (category.img && typeof category.img === "object") {
          formData.append("img", category.img);
        }

        try {
          const response = await updateCategory(id, formData);
          console.log(response);

          toast.success("Category has been updated successfully!", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });

          setPreviewImage(null);
        } catch (error) {
          console.error("Error updating category:", error);

          toast.error("An error occurred while updating the category.", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });

          setErrors((prevErrors) => ({
            ...prevErrors,
            backEndError: "An error occurred while updating the category.",
          }));
        }
      }
    });
  };

  return (
    <div className={style.formContainer}>
      <h2 className={`${style.formTitle}`}>Update Category Form</h2>
      <form onSubmit={handleSubmit}>
        <div className={style.inputContainer}>
          <label htmlFor="name">Name</label>
          <div className={style.inputField}>
            <div className={style.icon}>
              <SiNamecheap className={style.icon} />
            </div>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Enter Category Name"
              onChange={handleChange}
              value={category.name}
            />
          </div>
          {errors.name && <span className={style.error}>{errors.name}</span>}
        </div>

        <div className={style.inputContainer}>
          <label className={style.customUpload} htmlFor="file">
            <div className={style.icon}>
              <RiFileCloudLine className={style.imageIcon} />
            </div>
            <div className={style.text}>
              <p>Upload New Image</p>
            </div>
            <input
              className={style.fileInput}
              type="file"
              id="file"
              name="image"
              onChange={handleChange}
            />
          </label>
          {errors.img && <span className={style.error}>{errors.img}</span>}
        </div>

        {previewImage && (
          <div className={style.previewImage}>
            <img src={previewImage || "/no-image.png"} alt="Image Preview" />
          </div>
        )}

        <button className="add-btn" type="submit">
          Update Category
          <RxUpdate />
        </button>
        {errors.backEndError && (
          <span className={style.error}>{errors.backEndError}</span>
        )}
      </form>

      <ToastContainer />
    </div>
  );
}
