import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_ENDPOINT } from "../../config/constants";

const Preferences = () => {
  const [selectedPreferences, setSelectedPreferences] = useState({
    basketball: false,
    americanFootball: false,
    Rugby: false,
    fieldHockey: false,
    tableTennis: false,
    cricket: false,
  });

  const handleCheckboxChange = (event) => {
    const sport = event.target.name;
    setSelectedPreferences((prevSelectedPreferences) => ({
      ...prevSelectedPreferences,
      [sport]: event.target.checked,
    }));
  };

  const userPrefrences = async () => {
    const authToken = localStorage.getItem("authToken");
    try {
      const response = await fetch(`${API_ENDPOINT}/user/preferences`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to save preferences");
      }

      const responseData = await response.json();
      console.log("User Preferences are:", responseData);
    } catch (error) {
      console.error("Error saving preferences:", error);
    }
  };
  useEffect(() => {
    userPrefrences();
  }, [selectedPreferences]);

  const handleSave = async () => {
    const authToken = localStorage.getItem("authToken");
    try {
      const response = await fetch(`${API_ENDPOINT}/user/preferences`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          preferences: selectedPreferences,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save preferences");
      }

      const responseData = await response.json();
      console.log("User Preferences are:", responseData);
    } catch (error) {
      console.error("Error saving preferences:", error);
    }
  };

  return (
    <>
      <div className="bg-gray-200 p-4 m-2 absolute right-0 w-80">
        <div>
          <h3 className="font-bold text-xl pb-4">
            Choose Your Favorite Sports
          </h3>
        </div>
        {Object.keys(selectedPreferences).map((sport) => (
          <div key={sport}>
            <input
              type="checkbox"
              name={sport}
              id={sport}
              checked={selectedPreferences[sport]}
              onChange={handleCheckboxChange}
            />
            {sport}
          </div>
        ))}
        <div className="flex justify-center gap-2">
          <button
            className="bg-red-500 p-1 pl-2 pr-2 border-2 border-black"
            onClick={handleSave}
          >
            Save
          </button>
          <Link to={`../`}>
            <button className="bg-red-500 p-1 pl-2 pr-2 border-2 border-black">
              Cancel
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Preferences;
