import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/images/Logo.png";

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
        <div className="static min-h-screen flex-row justify-center bg-white ">
          <header className="bg-[#96B6C5] h-28">
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
                <div className="mt-40 ml-20 animate-bounce">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="30em"
                    viewBox="0 0 512 512"
                  >
                    <path d="M511.8 267.4c-26.1 8.7-53.4 13.8-81 15.1c9.2-105.3-31.5-204.2-103.2-272.4C434.1 41.1 512 139.5 512 256c0 3.8-.1 7.6-.2 11.4zm-3.9 34.7c-5.8 32-17.6 62-34.2 88.7c-97.5 48.5-217.7 42.6-311.9-24.5c23.7-36.2 55.4-67.7 94.5-91.8c79.9 43.2 170.1 50.8 251.6 27.6zm-236-55.5c-2.5-90.9-41.1-172.7-101.9-231.7C196.8 5.2 225.8 0 256 0c2.7 0 5.3 0 7.9 .1c90.8 60.2 145.7 167.2 134.7 282.3c-43.1-2.4-86.4-14.1-126.8-35.9zM138 28.8c20.6 18.3 38.7 39.4 53.7 62.6C95.9 136.1 30.6 220.8 7.3 316.9C2.5 297.4 0 277 0 256C0 157.2 56 71.5 138 28.8zm69.6 90.5c19.5 38.6 31 81.9 32.3 127.7C162.5 294.6 110.9 368.9 90.2 451C66 430.4 45.6 405.4 30.4 377.2c6.7-108.7 71.9-209.9 177.1-257.9zM256 512c-50.7 0-98-14.7-137.8-40.2c5.6-27 14.8-53.1 27.4-77.7C232.2 454.6 338.1 468.8 433 441c-46 44-108.3 71-177 71z" />
                  </svg>
                </div>
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
                <div className="mt-40 ml-20 animate-bounce">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="30em"
                    viewBox="0 0 512 512"
                  >
                    <path d="M511.8 267.4c-26.1 8.7-53.4 13.8-81 15.1c9.2-105.3-31.5-204.2-103.2-272.4C434.1 41.1 512 139.5 512 256c0 3.8-.1 7.6-.2 11.4zm-3.9 34.7c-5.8 32-17.6 62-34.2 88.7c-97.5 48.5-217.7 42.6-311.9-24.5c23.7-36.2 55.4-67.7 94.5-91.8c79.9 43.2 170.1 50.8 251.6 27.6zm-236-55.5c-2.5-90.9-41.1-172.7-101.9-231.7C196.8 5.2 225.8 0 256 0c2.7 0 5.3 0 7.9 .1c90.8 60.2 145.7 167.2 134.7 282.3c-43.1-2.4-86.4-14.1-126.8-35.9zM138 28.8c20.6 18.3 38.7 39.4 53.7 62.6C95.9 136.1 30.6 220.8 7.3 316.9C2.5 297.4 0 277 0 256C0 157.2 56 71.5 138 28.8zm69.6 90.5c19.5 38.6 31 81.9 32.3 127.7C162.5 294.6 110.9 368.9 90.2 451C66 430.4 45.6 405.4 30.4 377.2c6.7-108.7 71.9-209.9 177.1-257.9zM256 512c-50.7 0-98-14.7-137.8-40.2c5.6-27 14.8-53.1 27.4-77.7C232.2 454.6 338.1 468.8 433 441c-46 44-108.3 71-177 71z" />
                  </svg>
                </div>
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
