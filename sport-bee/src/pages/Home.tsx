import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/images/Logo.png";
import main from "../assets/images/main.jpg";

const Home = () => {
  const authToken = localStorage.getItem("authToken");
  const userData = localStorage.getItem("userData");
  let user, name;
  if (userData) {
    user = JSON.parse(userData);
    name = user.name;
  }

  return (
    <>
      {!authToken ? (
        <div className="static min-h-screen flex-row justify-center bg-gray-100 ">
          <header className="bg-gray-300 h-28">
            <div className="grotesk mb-12 flex items-center justify-between py-4 px-4 sm:mx-0 sm:mb-20 sm:px-0 md:px-6">
              <div className="mt-4 inline-block pb-4 pl-8">
                <Link to="/">
                  <img src={Logo} className="w-16 h-16 rounded-full" alt="" />
                </Link>
              </div>
              <div>
                <h1 className="align-middle text-3xl font-bold text-black">
                  SportsBee
                </h1>
              </div>
              <div className="flex items-center">
                <div className="py-1 text-right xl:inline-block">
                  <a
                    className="mt-2 inline-flex text-lg font-semibold text-gray-800 border-2 border-black rounded-lg px-3 py-2 hover:bg-yellow-500"
                    href="/dashboard"
                  >
                    Continue As A Guest
                  </a>
                </div>
              </div>
            </div>
          </header>
          <main>
            <div className=" flex justify-evenly">
              <div className="rounded-lg overflow-hidden w-6/12">
                <img
                  src={main}
                  className="w-10/12 h-5/12 rounded-full mix-blend-multiply mt-8"
                  alt="Sports images
                "
                />
              </div>

              <div className="">
                <h2 className="text-[2.8em] font-bold  text-black mb-4">
                  Read All About It: Latest Sports News
                </h2>
                <div>
                  <ul className="font-mono text-xl list-disc">
                    <li className="pb-2">
                      Your Gateway to the World of Sports News and Scores
                    </li>
                    <li className="pb-2">Find News That Matters To You</li>
                    <li className="pb-2">
                      Stay Updated with Live Scores and Trending Articles
                    </li>
                    <li className="pb-2">
                      Filter News by Sport and Team Preferences and Find News
                      That Matters to You
                    </li>
                    <li className="pb-2">
                      Stay in the Loop with Live Match Scores, Don't Miss a
                      Beat: Real-Time Match Details
                    </li>
                  </ul>
                </div>

                <div className="text-xl text-center font-semibold mt-10 flex ">
                  <h1 className="text-[1.8em] font-bold text-center text-black m-4 pb-3">
                    Join SportsBee
                  </h1>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-10 h-10 mt-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                    />
                  </svg>
                  <Link to="/signup">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-4 mt-2 rounded">
                      Sign Up
                    </button>
                  </Link>
                </div>
                <div className="text-xl text-center font-semibold mt-10 flex ">
                  <h1 className="text-[1.8em] font-bold text-center text-black m-4 pb-3">
                    Already A User
                  </h1>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-10 h-10 mt-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                    />
                  </svg>
                  <Link to="/signin">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4 mt-2">
                      Sign In
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </main>
        </div>
      ) : (
        <div className="static min-h-screen flex-row justify-center bg-gray-100 ">
          <header className="bg-gray-300 h-28">
            <div className="grotesk mb-12 flex justify-between items-center py-4 px-4 sm:mx-0 sm:mb-20 sm:px-0 md:px-6">
              <div className="mt-4 inline-block pb-4 pl-8">
                <Link to="/">
                  <img src={Logo} className="w-16 h-16 rounded-full" alt="" />
                </Link>
              </div>
              <div>
                <h1 className="align-middle text-3xl font-bold text-black">
                  SportsBee
                </h1>
              </div>
              <div className="flex items-center">
                <div className="py-1 text-right xl:inline-block">
                  <a
                    className="mt-2 inline-flex text-lg font-semibold text-gray-800 border-2 border-black rounded-lg px-3 py-2 hover:bg-yellow-500"
                    href="/account/settings"
                  >
                    Account
                  </a>
                </div>
              </div>
            </div>
          </header>
          <main>
            <div className=" flex justify-evenly">
              <div className="rounded-lg overflow-hidden w-6/12">
                <img
                  src={main}
                  className="w-10/12 h-5/12 rounded-full mix-blend-multiply mt-8"
                  alt="Sports images
              "
                />
              </div>

              <div className="">
                <h1 className="text-[3em] font-bold  text-yellow-400 mb-4">
                  Hello {name}
                </h1>
                <h2 className="text-[2.8em] font-bold  text-black mb-4">
                  Welcome to SportsBee
                </h2>
                <div>
                  <ul className="font-mono text-xl list-disc">
                    <li className="pb-2">
                      Your Gateway to the World of Sports News and Scores
                    </li>
                    <li className="pb-2">Find News That Matters To You</li>
                    <li className="pb-2">
                      Stay Updated with Live Scores and Trending Articles
                    </li>
                    <li className="pb-2">
                      Filter News by Sport and Team Preferences and Find News
                      That Matters to You
                    </li>
                    <li className="pb-2">
                      Stay in the Loop with Live Match Scores, Don't Miss a
                      Beat: Real-Time Match Details
                    </li>
                  </ul>
                </div>
                <div className="text-xl text-center font-semibold mt-10 flex justify-center">
                  <h1 className="text-[1.8em] font-bold text-center text-black m-4">
                    Keep Reading
                  </h1>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-10 h-10 mt-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                    />
                  </svg>
                  <Link to="/">
                    <button className="py-2 px-3 border-2 border-gray-700 hover:bg-gray-400 my-3 mx-2 rounded-xl text-black">
                      Latest News
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </main>
        </div>
      )}
    </>
  );
};

export default Home;
