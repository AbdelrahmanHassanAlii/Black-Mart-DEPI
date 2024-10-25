import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../../APIs Connections/Shared/Auth/login";
import { addItemToLS } from "../../../Functions/addItemToLS";
import { getRole } from "../../../Functions/getRole";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";

export default function SignInForm() {
  const navigate = useNavigate();

  // State to store user inputs and errors
  const [userData, setUserData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    backEndErrors: "",
  });

  // Handle input change
  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Validate inputs
  const validateInputs = () => {
    const { email, password } = userData;
    const validationErrors = {};

    if (!email) validationErrors.email = "Email is required";
    if (!password) validationErrors.password = "Password is required";
    else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+]).{8,}$/.test(
        password
      )
    ) {
      validationErrors.password = "Password Not Following The Pattern";
    }

    return validationErrors;
  };

  // Append domain to email if missing
  const formatEmail = (email) =>
    email.includes("@blackmart.com") ? email : `${email}@blackmart.com`;

  // Handle successful login based on role
  const handleSuccessNavigation = (role) => {
    navigate(role === "admin" ? "/admin/dashboard" : "/");
  };

  // Form submission handler
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const formErrors = validateInputs();
    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      try {
        const response = await login({
          ...userData,
          email: formatEmail(userData.email),
        });
        addItemToLS("loginData", response.data);

        // Show success toast
        toast.success("Login Successful", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
          style: { backgroundColor: "#299fff", color: "#fff" },
        });

        // Clear form and errors
        setUserData({ email: "", password: "" });
        setErrors({ email: "", password: "", backEndErrors: "" });

        // Navigate after toast is displayed
        setTimeout(() => handleSuccessNavigation(getRole()), 2000);
      } catch (error) {
        console.error(error);
        setErrors((prevErrors) => ({
          ...prevErrors,
          backEndErrors: "Invalid email or password",
        }));

        // Show error Swal
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: "Invalid email or password",
          showConfirmButton: false,
          timer: 2000,
        }).then(() => {
          setErrors({ email: "", password: "", backEndErrors: "" });
          setUserData({ email: "", password: "" });
        });
      }
    }
  };

  return (
    <>
      <form className="sign-in-form" onSubmit={handleFormSubmit}>
        <h2 className="form-title">Sign in</h2>

        <div className="input-field email">
          <div className="left">
            <i className="fas fa-envelope"></i>
            <input
              type="text"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              value={userData.email}
            />
          </div>
          <div className="right">@blackmart.com</div>
        </div>
        {errors.email && <p className="error">{errors.email}</p>}

        <div className="input-field">
          <i className="fas fa-lock"></i>
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            value={userData.password}
          />
        </div>
        {errors.password && <p className="error">{errors.password}</p>}
        {errors.backEndErrors && (
          <p className="error">{errors.backEndErrors}</p>
        )}

        <input type="submit" value="Login" className="btn solid" />
      </form>

      <ToastContainer />
    </>
  );
}
