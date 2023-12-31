import React, { useState } from "react";
import { API_ENDPOINT } from "../../config/constants";
import { Link, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

const SignupForm: React.FC = () => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch(`${API_ENDPOINT}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: userName,
          email: userEmail,
          password: userPassword,
        }),
      });
      //extract the response body as JSON data
      const data = await response.json();

      console.log(data);

      if (!response.ok) {
        throw new Error("Sign-up failed");
        enqueueSnackbar("Sign-up failed", { variant: "error" });
      }
      enqueueSnackbar("Sign-up Successful", { variant: "success" });

      // set the token in localStorage
      localStorage.setItem("authToken", data.auth_token);

      // set the userData in localStorage in form of String
      localStorage.setItem("userData", JSON.stringify(data.user));

      // redirect user to dasboard after signup
      navigate("/dashboard");
    } catch (error) {
      console.error("Sign-up failed:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label className="block text-gray-700 font-semibold mb-2">
          Your Name:
        </label>
        <input
          type="text"
          name="userName"
          id="userName"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
        />
      </div>
      <div>
        <label className="block text-gray-700 font-semibold mb-2">Email:</label>
        <input
          type="email"
          name="userEmail"
          id="userEmail"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
          className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
          required
        />
      </div>
      <div>
        <label className="block text-gray-700 font-semibold mb-2">
          Password:
        </label>
        <input
          type="password"
          name="userPassword"
          id="userPassword"
          value={userPassword}
          onChange={(e) => setUserPassword(e.target.value)}
          className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-gray-700 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-gray mt-4"
      >
        Sign up
      </button>
      <div className="mt-2">
        <div className="flex justify-around">
          <span className="text-xl font-semibold">Already Have An Account</span>
          <Link to="/signin">
            <button
              className="bg-gray-700 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-md w-20"
              id="logOut"
            >
              SignIn
            </button>
          </Link>
        </div>
        <div className="flex justify-around mt-2">
          <span className="text-xl font-semibold mr-28 pr-10">Go Back</span>
          <Link to="/home">
            <button className="bg-gray-700 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-md w-20">
              Home
            </button>
          </Link>
        </div>
      </div>
    </form>
  );
};

export default SignupForm;
