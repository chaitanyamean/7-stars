import { useState } from "react";
import "./App.css";
import { Button } from "flowbite-react";
import NavbarWithDropdown from "./components/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { RaiseAnOrder } from "./pages/RaiseAnOrder";
import { Home } from "./pages/Home";
function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <div className="flex">
        <NavbarWithDropdown />
      </div>

      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/raiseanorder" Component={RaiseAnOrder} />
      </Routes>
    </Router>
  );
}

export default App;
