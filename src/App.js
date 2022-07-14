import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="h-screen m-h-screen">
      <Navbar />
      <Outlet />
    </div>
  );
}

export default App;
