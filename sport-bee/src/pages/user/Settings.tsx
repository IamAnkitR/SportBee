import React from "react";
import { Link } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import Player from "../../assets/images/Player.png";
import { API_ENDPOINT } from "../../config/constants";

type Inputs = {
  current_password: string;
  new_password: string;
};

const Settings = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const userData = localStorage.getItem("userData");
  let user, name, email;
  if (userData) {
    user = JSON.parse(userData);
    name = user.name;
    email = user.email;
  }

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data);
    const { current_password, new_password } = data;
    const authToken = localStorage.getItem("authToken");
    try {
      const response = await fetch(`${API_ENDPOINT}/user/password`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({ current_password, new_password }),
      });

      // extract the response body as JSON data
      const userData = await response.json();

      console.log(userData);

      if (!response.ok) {
        alert("You Entered Wrong Password");
        throw new Error("Operation failed");
      } else {
        alert("Password Updated Successfully");
      }

      console.log("Updated Password successfully");
    } catch (error) {
      console.error("Sign-in failed:", error);
    }
  };
  return (
    <>
      <div className="static min-h-screen overflow-y-hidden flex-row justify-center bg-gray-300">
        <div className="flex justify-center p-4">
          <Link to="/">
            <button className="py-3 px-3 text-center flex border-2 border-gray-700 hover:bg-gray-400  mx-2 rounded-xl text-black">
              Go Home
            </button>
          </Link>
        </div>

        <div className="flex justify-around">
          <div className="relative top-[-50px]">
            <img
              src={Player}
              alt="Player"
              className="w-10/12 h-4/12 rounded-full mix-blend-multiply "
            />
          </div>
          <div>
            <div className="font-mono p-8">
              <h1 className="text-center font-semibold text-3xl">
                Account Details
              </h1>
              <div className="bg-gray-300 rounded-xl text-2xl flex justify-center text-left">
                <div className="mt-6">
                  <h1>Name : {name}</h1>
                  <h1>Email : {email}</h1>
                </div>
              </div>
            </div>
            <div>
              <div className="text-center font-semibold text-3xl font-mono p-8">
                Upadte Your Password
              </div>
              <div className="border-2 border-black rounded-xl h-[8em] w-[15em] overflow-hidden text-2xl text-center items-center mx-auto p-4">
                <div>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                      <div className="flex mb-2 ">
                        <label
                          htmlFor="current_password"
                          className="font-mono text-xl"
                        >
                          Old Password
                        </label>
                        <input
                          type="text"
                          id="current_password"
                          autoFocus
                          {...register("current_password", { required: true })}
                          className={`bg-gray-400 w-48 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue rounded-lg text-xl${
                            errors.current_password ? "border-red-500" : " "
                          }`}
                        />
                      </div>
                      <div>
                        {errors.current_password && (
                          <span className="text-xl text-red-600">
                            This field is required
                          </span>
                        )}
                      </div>

                      <div className="flex">
                        <label
                          htmlFor="new_password"
                          className="font-mono text-xl"
                        >
                          New Password
                        </label>
                        <input
                          type="text"
                          id="new_password"
                          autoFocus
                          {...register("new_password", { required: true })}
                          className={`bg-gray-400 w-48 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue rounded-lg text-xl ${
                            errors.new_password ? "border-red-500" : " "
                          }`}
                        />
                      </div>
                      <div>
                        {errors.new_password && (
                          <span className="text-xl text-red-600">
                            This field is required
                          </span>
                        )}
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="bg-gray-700 hover:bg-gray-800 text-white font-semibold  px-2 rounded-md focus:outline-none focus:shadow-outline-gray mt-2 "
                    >
                      Save
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
