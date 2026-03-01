import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
const Login = () => {
  const navigate = useNavigate();

  const [currState, setCurrState] = useState("Sign Up");
  const [username, setUsername] = useState("");
  const [orgname, setOrgname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const action = currState === "Sign Up" ? "register" : "login" ;
  


  
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    try {
      let res;

      if (currState === "Sign Up") {
        res = await axios.post(
          "http://localhost/Inventory_Management/InventoryMGT/backend/login_registration.php",
          {
            action: "register",
            userName: formData.get("fname"),
            orgName: formData.get("orgname"),
            userEmail: formData.get("usernameoremail"),
            password: formData.get("password"),
          },
        );

        if (res.data.status === "success") {
          alert("Registration successful");
          setCurrState("Login"); // switch to login
        }
      } else {
        res = await axios.post(
          "http://localhost/Inventory_Management/InventoryMGT/backend/login_registration.php",
          {
            action: "login",
            userEmail: formData.get("usernameoremail"),
            password: formData.get("password"),
          },
        );

        if (res.data.status === "success") {
          localStorage.setItem("user", JSON.stringify(res.data.user));
          navigate("/dashboard");
        }
      }

      if (res.data.status !== "success") {
        throw new Error(res.data.message);
      }
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    }
  };
  return (
    <div className="login-container">
      <div className="header flex justify-between bg-gray-200 p-4">
        <div className="leftHeader">
          <div className="logo flex">
            <img
              src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
              alt="Logo"
              className="w-10 mr-2"
            />
            <h1 className="text-2xl font-bold items-center">
              Manage Inventory
            </h1>
          </div>
        </div>
        <div className="rightHeader flex text-center items-center">
          <div className=" flex  items-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
              alt="User Logo "
              className="w-4 mr-2"
            />
            <div className="text-sm">Support</div>
          </div>
        </div>
      </div>
      <div className="flex flex-col rounded-lg bg-gray-100 items-center justify-center text-center h-screen p-2">
        <div className="w-100 h-auto ">
          <form
            onSubmit={onSubmitHandler}
            method="POST"
            action="login_registration.php"
            className=" flex flex-col gap-2 w-full h-autoitems-center justify-center text-center "
          >
            {currState === "Sign Up" ? (
              <h2 className="text-2xl font-bold">Create an Account</h2>
            ) : (
              <h2 className="text-2xl font-bold">Welcome Back!</h2>
            )}
            {currState === "Sign Up" ? (
              <span className="text-sm text-gray-500">
                Join the inventory management platform
              </span>
            ) : (
              <span className="text-sm text-gray-500">
                Enter your credentials to manage your stock.
              </span>
            )}
            {currState === "Sign Up" ? (
              <div className="flex flex-col gap-2 w-full h-autoitems-center justify-center text-left">
                <label
                  htmlFor="orgname"
                  className="text-sm font-bold text-left"
                >
                  Full Name:
                </label>
                <input
                  type="text"
                  id="fname"
                  name="fname"
                  placeholder="John Doe"
                  required
                  className="h-10 rounded-md border-2 border-gray-300 w-auto p-2"
                />
                <label
                  htmlFor="orgName"
                  className="text-sm font-bold text-left "
                >
                  Organization Name:
                </label>
                <input
                  type="text"
                  id="orgname"
                  name="orgname"
                  placeholder="Organization Name"
                  required
                  className="h-10 rounded-md border-2 border-gray-300 w-auto p-2"
                />
              </div>
            ) : null}
            <label
              htmlFor="usernameoremail"
              className="text-sm font-bold text-left "
            >
              Email:
            </label>
            <input
              type="text"
              id="usernameoremail"
              name="usernameoremail"
              placeholder="Username or Email"
              required
              className=" h-10 rounded-md border-2 border-gray-300 w-auto p-2"
            />

            <div className="flex items-center justify-between w-full ">
              <label htmlFor="password" className="text-sm font-bold  ">
                Password:
              </label>
              {currState === "Sign Up" ? null : (
                <div className="text-sm text-blue-500 align-left">
                  Forgot Password?
                </div>
              )}
            </div>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              required
              className="h-10 rounded-md border-2 border-gray-300 p-2"
            />
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="rememberme"
                name="rememberme"
                className="w-3 h-auto"
              />
              <label htmlFor="rememberme" className="text-sm ">
                Remember this device for 30 days
              </label>
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              {currState === "Sign Up" ? "Sign Up" : "Sign In"}
            </button>
            <div className="login-forget">
              {currState === "Sign Up" ? (
                <p className="login-toggle ">
                  Already have an account
                  <span
                    onClick={() => setCurrState("Login")}
                    className="text-blue-500 ml-1"
                  >
                    login here
                  </span>
                </p>
              ) : (
                <p className="login-toggle">
                  Create a new account
                  <span
                    onClick={() => setCurrState("Sign Up")}
                    className="text-blue-500 ml-1"
                  >
                    click here
                  </span>
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Login;
