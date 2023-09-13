import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { API_ENDPOINT } from "../../config/constants";
import { Link, useNavigate } from "react-router-dom";

type Inputs = {
  email: string;
  password: string;
};

const SigninForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { email, password } = data;
    try {
      const response = await fetch(`${API_ENDPOINT}/users/sign_in`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      // extract the response body as JSON data
      const userData = await response.json();

      if (!response.ok) {
        throw new Error("Sign-in failed");
      }

      //After successful signin, first we will save the token in localStorage
      localStorage.setItem("authToken", userData.auth_token);
      // Then we'll extract user object and then store it in string format
      localStorage.setItem("userData", JSON.stringify(userData.user));

      // After successful signin, navigate the user to dashboard
      navigate("/account");
    } catch (error) {
      console.error("Sign-in failed:", error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Email:
          </label>
          <input
            type="email"
            id="email"
            autoFocus
            {...register("email", { required: true })}
            className={`w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue ${
              errors.email ? "border-red-500" : " "
            }`}
          />
          {errors.email && <span>This field is required</span>}
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Password:
          </label>
          <input
            type="password"
            id="password"
            autoFocus
            {...register("password", { required: true })}
            className={`w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue ${
              errors.password ? "border-red-500" : " "
            }`}
          />
          {errors.password && <span>This field is required</span>}
        </div>
        <button
          type="submit"
          className="w-full bg-gray-700 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-gray mt-4"
        >
          Sign In
        </button>
      </form>
      <div className="mt-2">
        <div className="flex justify-around">
          <span className="text-xl font-semibold">Create a New Account</span>
          <Link to="/signup">
            <button
              className="bg-gray-700 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-md w-20"
              id="logOut"
            >
              Signup
            </button>
          </Link>
        </div>
        <div className="flex justify-around mt-2">
          <span className="text-xl font-semibold mr-28 pr-5">Go Back</span>
          <Link to="/home">
            <button className="bg-gray-700 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-md w-20">
              Home
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default SigninForm;
