import { API_ENDPOINT } from "../../config/constants";

export const userPrefrences = async () => {
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
