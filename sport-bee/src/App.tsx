import { RouterProvider } from "react-router-dom";
import router from "./routes";
import "./App.css";
import { MatchesProvider } from "./context/matches/context";
import { ArticlesProvider } from "./context/articles/context";
import { SnackbarProvider } from "notistack";

function App() {
  return (
    <div>
      <SnackbarProvider>
        <ArticlesProvider>
          <MatchesProvider>
            <RouterProvider router={router} />
          </MatchesProvider>
        </ArticlesProvider>
      </SnackbarProvider>
    </div>
  );
}

export default App;
