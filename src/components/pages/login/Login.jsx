import React from "react";
const Login = () => {
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
          <form className=" flex flex-col gap-2 w-full h-autoitems-center justify-center text-center ">
            <h2 className="text-2xl font-bold">Welcome Back!</h2>
            <span className="text-sm text-gray-500">
              Enter your credentials to manage your stock.
            </span>
            <label
              htmlFor="usernameoremail"
              className="text-sm font-bold text-left "
            >
              Username or Email:
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
              <div className="text-sm text-blue-500">Forgot Password?</div>
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
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Login;
