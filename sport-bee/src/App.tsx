import { RouterProvider } from "react-router-dom";
import router from "./routes";
import "./App.css";
import { MatchesProvider } from "./context/matches/context";
import { ArticlesProvider } from "./context/articles/context";

function App() {
  return (
    <div>
      <ArticlesProvider>
        <MatchesProvider>
          <RouterProvider router={router} />
        </MatchesProvider>
      </ArticlesProvider>
    </div>
  );
}

export default App;
