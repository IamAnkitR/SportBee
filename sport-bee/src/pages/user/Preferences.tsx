import React, { useState, Fragment, useEffect } from "react";
import { Formik, Form } from "formik";
import { API_ENDPOINT } from "../../config/constants";
import { useNavigate } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";
import "../../App.css";

interface Sport {
  id: number;
  name: string;
}

interface Team {
  id: number;
  name: string;
  plays: string;
}

const Preferences = () => {
  const navigate = useNavigate();

  const [sportsData, setSportsData] = useState<Sport[]>([]);
  const [teamsData, setTeamsData] = useState<Team[]>([]);

  const fetchSports = async () => {
    try {
      const response = await fetch(`${API_ENDPOINT}/sports`);
      if (!response.ok) {
        throw new Error("Failed to fetch sports");
      }
      const data = await response.json();
      setSportsData(data.sports); // Update state variable with the sports array
    } catch (error) {
      console.log("Error fetching sports:", error);
    }
  };

  const fetchTeams = async () => {
    try {
      const response = await fetch(`${API_ENDPOINT}/teams`);
      if (!response.ok) {
        throw new Error("Failed to fetch teams");
      }
      const data = await response.json();
      setTeamsData(data); // Update state variable with the teams array
    } catch (error) {
      console.log("Error fetching teams:", error);
    }
  };

  useEffect(() => {
    fetchSports();
    fetchTeams();
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSports, setSelectedSports] = useState<Sport[]>([]);
  const [selectedTeams, setSelectedTeams] = useState<Team[]>([]);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSportCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value, checked } = event.target;

    // Find the sport with the matching name
    const selectedSport = sportsData.find((sport) => sport.name === value);

    if (checked && selectedSport) {
      setSelectedSports((prevSports) => [...prevSports, selectedSport]);
    } else {
      setSelectedSports((prevSports) =>
        prevSports.filter((sport) => sport.name !== value)
      );
    }
  };

  const handleTeamCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value, checked } = event.target;

    const selectedTeam = teamsData.find((team) => team.name === value);

    if (checked && selectedTeam) {
      setSelectedTeams((prevTeams) => [...prevTeams, selectedTeam]);
    } else {
      setSelectedTeams((prevTeams) =>
        prevTeams.filter((team) => team.name !== value)
      );
    }
  };

  const handleSubmit = async () => {
    console.log(selectedSports, selectedTeams);
    const values = {
      preferences: {
        sportPreferences: selectedSports.map((sport) => ({
          id: sport.id,
          name: sport.name,
        })),
        teamPreferences: selectedTeams.map((team) => ({
          id: team.id,
          name: team.name,
          plays: team.plays,
        })),
      },
    };

    const authToken = localStorage.getItem("authToken");
    try {
      console.log(values);
      const response = await fetch(`${API_ENDPOINT}/user/preferences`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Failed to save preferences");
      }

      const responseData = await response.json();
      console.log("User Preferences are:", responseData);
    } catch (error) {
      console.error("Error saving preferences:", error);
    }

    navigate("../");
    window.location.reload();
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsModalOpen(true)}
        className="rounded-full bg-gray-500 px-2 py-1 text-sm font-medium text-white hover:text-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        id="newProjectBtn"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      </button>
      <div className="p-4 m-2 absolute right-0">
        <Transition appear show={isModalOpen} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 z-50 overflow-y-auto backdrop-blur-sm flex justify-center w-screen h-[80vh] mt-16"
            onClose={closeModal}
          >
            <Formik
              initialValues={{
                preferences: {
                  sportPreferences: [],
                  teamPreferences: [],
                },
              }}
              onSubmit={handleSubmit}
            >
              <Form>
                <Dialog.Panel className="transform overflow-hidden bg-[#F1F6F9]  p-6 text-left align-middle shadow-xl transition-all rounded-lg">
                  <Dialog.Title
                    as="h3"
                    className="text-xl font-bold leading-6 text-gray-900 p-2 text-center"
                  >
                    Select Your Preferences
                    <hr />
                  </Dialog.Title>
                  {/* Sports Section */}
                  <div>
                    <h1 className="text-center text-xl py-3 font-semibold">
                      Sports
                    </h1>
                    <hr />
                    <div className="grid grid-cols-3 gap-2">
                      {sportsData.map((sport) => (
                        <label key={sport.id}>
                          <input
                            type="checkbox"
                            name="sportPreferences"
                            value={sport.name}
                            onChange={handleSportCheckboxChange}
                          />
                          {sport.name}
                        </label>
                      ))}
                    </div>
                  </div>
                  {/* Teams Section */}
                  <div>
                    <h1 className="text-center text-xl py-3 font-semibold">
                      Teams
                    </h1>
                    <hr />
                    <div className="grid grid-cols-4 gap-2">
                      {teamsData.map((team) => (
                        <label key={team.id}>
                          <input
                            type="checkbox"
                            name="teamPreferences"
                            value={team.name}
                            onChange={handleTeamCheckboxChange}
                          />
                          {team.name}
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-center gap-2 mt-5">
                    <button
                      className="bg-red-500 px-3 py-2 mr-2 border-2 border-black"
                      type="submit"
                    >
                      Save
                    </button>
                    <button
                      className="bg-red-500 px-3 py-2 border-2 border-black"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Form>
            </Formik>
          </Dialog>
        </Transition>
      </div>
    </>
  );
};

export default Preferences;
