import "./App.css";
import NavbarWithDropdown from "./components/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { RaiseAnOrder } from "./pages/RaiseAnOrder";
import { Home } from "./pages/Home";
import Admin from "./pages/Admin";
import Dashboard from "./pages/Dashboard";
function App() {
  return (
    <Router>
      <div className="flex">
        <NavbarWithDropdown />
      </div>

      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/raiseanorder" Component={RaiseAnOrder} />
        <Route path="/admin" Component={Admin} />
        <Route path="/admin/dashboard" Component={Dashboard} />
      </Routes>
    </Router>
  );
}

export default App;
