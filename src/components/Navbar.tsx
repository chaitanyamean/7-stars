import { Navbar } from "flowbite-react";
export default function NavbarWithDropdown() {
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
    </Navbar>
  );
}
