import { Dropdown, Navbar } from "flowbite-react";
import { useNavigate } from "react-router-dom";
// import {img} from '../assets/l'
export default function NavbarWithDropdown() {
  const navigate = useNavigate();

  const handleNavClick = () => {
    navigate("/raiseanorder");
  };
  return (
    <Navbar fluid rounded>
      <Navbar.Brand>
        <img
          alt=""
          className="mr-3 h-6 sm:h-9"
          src={
            "https://res.cloudinary.com/dy1ygjdhm/image/upload/v1695434558/logo_xroum6.png"
          }
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          7 - Stars Bakery
        </span>
      </Navbar.Brand>
      {/* <div className="flex md:order-2">
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link active onClick={handleNavClick}>
          Raise An Order
        </Navbar.Link>
      </Navbar.Collapse> */}
    </Navbar>
  );
}
