import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/images/sportbee-logo.png";
import main from "../assets/images/main.jpg";

const Home = () => {
  return (
    <>
      <div className="static min-h-screen flex-row justify-center bg-gray-100 ">
        <header className="bg-gray-300 h-28">
          <div className="grotesk mb-12 flex items-center justify-between py-4 px-4 sm:mx-0 sm:mb-20 sm:px-0 md:px-6">
            <div className="mt-4 inline-block pb-4 pl-8">
              <a
                href="/home"
                className="align-middle w-6 h-8 rouunded-full font-bold text-black"
              >
                <img src={Logo} className="w-16 h-16 rounded-full" alt="" />
              </a>
            </div>
            <div>
              <h1 className="align-middle text-3xl font-bold text-black">
                SportBee
              </h1>
            </div>
            <div className="flex items-center">
              <div className="py-1 text-right xl:inline-block">
                <a
                  className="bg-blue mt-2 inline-flex items-center pr-8 py-3 text-lg font-semibold tracking-tighter text-gray-800"
                  href="/home"
                >
                  Continue as Guest
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
                    Filter News by Sport and Team Preferences and Find News That
                    Matters to You
                  </li>
                  <li className="pb-2">
                    Stay in the Loop with Live Match Scores, Don't Miss a Beat:
                    Real-Time Match Details
                  </li>
                </ul>
              </div>
              <div>
                <h1 className="text-[2.8em] font-bold text-center text-black m-4">
                  Join SportBee Today
                </h1>
              </div>
              <div className="flex flex-col text-xl text-center">
                <Link to="/signup">
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Sign Up
                  </button>
                </Link>
              </div>
              <div className="text-xl text-center font-semibold mt-10">
                <h1 className="text-[1.8em] font-bold text-center text-black m-4">
                  Already A User
                </h1>
                <Link to="/signin">
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Sign In
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Home;
