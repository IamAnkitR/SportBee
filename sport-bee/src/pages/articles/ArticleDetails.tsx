import { useEffect, useState, Fragment } from "react";
import { API_ENDPOINT } from "../../config/constants";
import { Dialog, Transition } from "@headlessui/react";

interface ArticleData {
  id: number;
  title: string;
  summary: string;
  thumbnail: string;
  sport: {
    id: number;
    name: string;
  };
  date: string;
  content: string;
  teams: { id: number; name: string }[];
}

const ArticleDetails: React.FC<{ id: number }> = ({ id }) => {
  const [articleData, setArticleData] = useState<ArticleData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const fetchArticleDetails = async () => {
    setIsLoading(true);
    const authToken = localStorage.getItem("authToken");
    try {
      const response = await fetch(`${API_ENDPOINT}/articles/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch article details");
      }

      const data = await response.json();
      setArticleData(data);
      setError(null);
    } catch (error) {
      console.error("Error fetching article details", error);
      setError("Error fetching article details");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchArticleDetails();
  }, [id]);

  return (
    <>
      <div className="relative">
        {isLoading && <div>Loading...</div>}
        {error && <div>Error: {error}</div>}
        {articleData && (
          <>
            <div>
              <img
                className="max-h-56 object-cover w-full"
                src={articleData.thumbnail}
                alt={articleData.title}
              />
            </div>
            <h2 className="text-xl font-semibold">{articleData.title}</h2>
            <p className="text-gray-500">
              {" "}
              {new Date(articleData.date).toLocaleString("en-CA", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </p>
            <p className="text-gray-700 text-lg font-medium">
              {articleData.summary}
            </p>
            <p className="text-gray-700">
              {articleData.content.slice(0, 150) + "..."}
            </p>
            <div>
              <button
                type="button"
                onClick={openModal}
                className="rounded-md px-1 text-md bg-gray-700 text-white hover:text-blue-60"
              >
                Read More
              </button>
            </div>
          </>
        )}
      </div>

      <div className="p-4 m-2 absolute">
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
                <Dialog.Panel className="w-9/12 transform overflow-hidden bg-gray-900 text-white p-6 text-left shadow-xl transition-all rounded-lg">
                  {articleData && (
                    <>
                      <div className="text-center font-bold text-gray-400">
                        <Dialog.Title
                          as="h3"
                          className="text-2xl font-bold leading-6 p-4 m-1"
                        >
                          {articleData.title}
                        </Dialog.Title>

                        <p>
                          <span className="text-gray-100 pr-2">Date: </span>
                          {new Date(articleData.date).toLocaleString("en-CA", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </p>

                        <p>
                          <span className="text-gray-100 pr-2">Sport: </span>
                          {articleData.sport.name}
                        </p>

                        <div className="mt-4 text-gray-700">
                          {articleData.content}
                        </div>
                      </div>

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

export default ArticleDetails;
