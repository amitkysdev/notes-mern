import { useEffect, useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";
import { Button } from "@nextui-org/button";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import axiosInstance from "@/utils/axiosInstance";

export const AcmeLogo = () => {
  return (
    <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
      <path
        clipRule="evenodd"
        d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
};

type User = {
  _id: any;
  name: string;
  email: string;
};

export function NavbarUI() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");

      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error: any) {
      if (error.response.data.error) {
        localStorage.clear();
        navigate("/login");
        toast.error(error.response.data.message);
      }
      navigate("/login");
    }
  };

  useEffect(() => {
    getUserInfo();

    return () => {};
  }, []);

  return (
    <Navbar
      className="dark text-foreground bg-background"
      // onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent>
        {/* <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        /> */}
        <NavbarBrand>
          <p>{userInfo?.name}</p>
          {/* <p className="font-bold text-inherit">ACME</p> */}
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {/* <NavbarItem>
          <Link color="foreground" href="#">
            Features
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link aria-current="page" href="#">
            Customers
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Integrations
          </Link>
        </NavbarItem> */}
      </NavbarContent>
      <NavbarContent justify="end">
        {/* <NavbarItem className="hidden lg:flex">
          <Link href="#">Login</Link>
        </NavbarItem> */}
        <NavbarItem>
          <Button
            as={Link}
            color="danger"
            variant="flat"
            onClick={() => {
              localStorage.clear();
              navigate("/login");
              toast("Logged out", {
                icon: "🥹",
                style: { background: "#1E3A8A", color: "#BFDBFE" },
              });
            }}
          >
            Log out
          </Button>
        </NavbarItem>
      </NavbarContent>
      {/* <NavbarMenu className="dark text-foreground bg-background">
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full"
              color={
                index === 2
                  ? "primary"
                  : index === menuItems.length - 1
                    ? "danger"
                    : "foreground"
              }
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu> */}
    </Navbar>
  );
}
