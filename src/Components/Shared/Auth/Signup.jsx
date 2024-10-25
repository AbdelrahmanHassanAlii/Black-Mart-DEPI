/* eslint-disable react/prop-types */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { signup } from "./../../../APIs Connections/Shared/Auth/signUp";

/* eslint-disable no-unused-vars */
export default function SignUpForm({ handleSignInClick }) {
  const handleChangeToSignIn = () => {
    handleSignInClick();
  };

  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    backEndErrors: "",
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;

    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const checkErrors = () => {
    const { username, email, password, confirmPassword } = userData;
    const errors = {};

    if (!username) {
      errors.username = "User Name is required";
    } else if (/^\d+$/.test(username)) {
      errors.username = "User Name cannot contain only numbers";
    }

    if (!email) {
      errors.email = "Email is required";
    } else if (/^\d+$/.test(email)) {
      errors.email = "Email cannot contain only numbers";
    }

    if (!password) {
      errors.password = "Password is required";
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+]).{8,}$/.test(
        password
      )
    ) {
      errors.password = "Password Not Following The Pattern";
    }

    if (!confirmPassword) {
      errors.confirmPassword = "Confirm Password is required";
    } else if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    return errors;
  };

  const handleEmailRoute = (email) => {
    if (!email.includes("@blackmart.com")) {
      return email + "@blackmart.com";
    }
    return email;
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const formErrors = checkErrors();
    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      const updatedUserData = {
        ...userData,
        email: handleEmailRoute(userData.email),
      };

      try {
        const response = await signup(updatedUserData);

        toast.success("Signup Successful", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          style: { backgroundColor: "#299fff", color: "#fff" },
        });

        setUserData({
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        setErrors({
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
          backEndErrors: "",
        });

        setTimeout(() => {
          handleChangeToSignIn();
        }, 2000);
      } catch (error) {
        if (error.response && error.response.data) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `${error.response.data.message}  Try Another Email`,
            showConfirmButton: true,
            confirmButtonColor: "#299fff",
            confirmButtonText: "Try Again",
          }).then(() => {
            setUserData((prevData) => ({
              ...prevData,
              email: "",
            }));
          });
        } else if (error) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `${error.message}  Try Again Later`,
            showConfirmButton: true,
            confirmButtonColor: "#299fff",
            confirmButtonText: "Try Again",
          }).then(() => {
            setUserData({
              username: "",
              email: "",
              password: "",
              confirmPassword: "",
            });

            setErrors({
              username: "",
              email: "",
              password: "",
              confirmPassword: "",
              backEndErrors: "",
            });
          });
        }
      }
    }
  };

  return (
    <>
      <form action="#" className="sign-up-form" onSubmit={handleFormSubmit}>
        <h2 className="form-title">Sign up</h2>
        <div className="input-field">
          <i className="fas fa-signature"></i>
          <input
            type="text"
            name="username"
            placeholder="User Name"
            onChange={handleChange}
            value={userData.username}
          />
        </div>
        {errors.username && <p className="error">{errors.username}</p>}
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
        <div className="hints">
          <p className="hint">Password must be at least 8 characters</p>
          <p className="hint">
            Contain uppercase, lowercase, numbers and special character
          </p>
        </div>
        {errors.password && <p className="error">{errors.password}</p>}
        <div className="input-field">
          <i className="fas fa-lock"></i>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            onChange={handleChange}
            value={userData.confirmPassword}
          />
        </div>
        {errors.confirmPassword && (
          <p className="error">{errors.confirmPassword}</p>
        )}
        <input type="submit" className="btn" value="Sign up" />
      </form>

      <ToastContainer />
    </>
  );
}
