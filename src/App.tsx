import "./App.css";
import NavbarWithDropdown from "./components/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { RaiseAnOrder } from "./pages/RaiseAnOrder";
import { Home } from "./pages/Home";
import Admin from "./pages/Admin";
import Dashboard from "./pages/Dashboard";
import Prices from "./pages/Prices";
// import axios from "axios";
function App() {
  // const getData = () => {
  //   return axios
  //     .get("https://sevenstarbakers.onrender.com/getorders")
  //     .then((res) => {
  //       if (res && res.data && res.data.length > 0) {
  //         return res.data;
  //       }
  //     });
  // }; loader={getData}
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
        <Route path="/admin/setprices" Component={Prices} />
      </Routes>
    </Router>
  );
}

export default App;
