import { useEffect, useState, Fragment } from "react";
import { API_ENDPOINT } from "../../config/constants";
import { Dialog, Transition } from "@headlessui/react";

interface MatchData {
  id: number;
  isRunning: boolean;
  name: string;
  location: string;
  startsAt: string;
  endsAt: string;
  score: Record<string, string>;
  teams: { id: number; name: string }[];
  sportName: string;
  playingTeam: number;
  story: string;
}

const MatchDetails: React.FC<{ id: number }> = ({ id }) => {
  const [matchData, setMatchData] = useState<MatchData | null>(null); // State to store match data
  const [isModalOpen, setIsModalOpen] = useState(false);

  //defining the modal behaviour
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Function to fetch the user preferences
  const matchDetail = async () => {
    const authToken = localStorage.getItem("authToken");
    try {
      const response = await fetch(`${API_ENDPOINT}/matches/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch match details");
      }

      const data = await response.json();
      setMatchData(data);
    } catch (error) {
      console.error("Error fetching match details", error);
    }
  };

  useEffect(() => {
    matchDetail();
  }, [id]);

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className="rounded-lg px-2 py-1 text-sm font-medium bg-gray-700 text-white hover:text-blue-60"
      >
        Read More
      </button>
      <div className="p-4 m-2 absolute ">
        <Transition appear show={isModalOpen} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 z-50 overflow-y-full backdrop-blur-sm"
            onClose={closeModal}
          >
            <div className="flex items-center justify-center p-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-9/12 transform overflow-hidden bg-gray-900  text-white p-6 text-left shadow-xl transition-all rounded-lg">
                  {matchData && (
                    <>
                      <div className="text-center font-bold text-gray-400">
                        <Dialog.Title
                          as="h3"
                          className="text-2xl font-bold leading-6 p-4 m-1"
                        >
                          {matchData.name}
                        </Dialog.Title>

                        <p>
                          <span className="text-gray-100 pr-2">Location: </span>
                          {matchData.location}
                        </p>

                        <p>
                          <span className="text-gray-100 pr-2">
                            {" "}
                            Starts At:{" "}
                          </span>

                          {new Date(matchData.startsAt).toLocaleString("en-CA")}
                        </p>

                        <p>
                          <span className="text-gray-100 pr-2"> Ends At:</span>{" "}
                          {new Date(matchData.endsAt).toLocaleString("en-CA")}
                        </p>

                        <p>
                          <span className="text-gray-100 pr-2">Sport: </span>
                          {matchData.sportName}
                        </p>
                        <div className="mt-4 flex flex-row justify-center text-red-500 text-xl">
                          <h4 className=" font-semibold mr-4 ">Score:</h4>
                          <ul className="flex gap-4">
                            {Object.entries(matchData.score).map(
                              ([team, score]) => (
                                <li key={team}>
                                  {team}: {score}
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      </div>
                      <div className="mt-4">{matchData.story}</div>

                      <div className="flex justify-center gap-2 mt-4">
                        <button
                          className="bg-red-500 p-1 pl-2 pr-2 border-2 border-black"
                          onClick={closeModal}
                        >
                          Close
                        </button>
                      </div>
                    </>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition>
      </div>
    </>
  );
};

export default MatchDetails;
