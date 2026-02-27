import { RouterProvider } from "react-router-dom";
import { router } from "./routes/index.route";

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
