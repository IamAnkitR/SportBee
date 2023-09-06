import { Fragment, useEffect, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import Logo from "../../assets/images/Logo.png";
import Preferences from "../../pages/user/Preferences";
import { Link } from "react-router-dom";

type User = string | null;

type MenuItem = {
  name: string;
  href: string;
};

const userNavigation: MenuItem[] = [
  { name: "Sign In", href: "/signin" },
  { name: "Sign Up", href: "/signup" },
];

const signedInUserNavigation: MenuItem[] = [
  { name: "Profile", href: "#" },
  { name: "Sign out", href: "/logout" },
];

const classNames = (...classes: string[]): string =>
  classes.filter(Boolean).join(" ");

type MenuButtonProps = {
  user: User;
  items: MenuItem[];
};

const MenuButton = ({ user, items }: MenuButtonProps) => (
  <Menu as="div" className="relative ml-3">
    <div>
      <Menu.Button
        className={`rounded-full ${
          user
            ? "bg-gray-500 p-1 text-white hover:text-blue-600"
            : "bg-gray-500 px-2 py-1 text-white hover:text-blue-600"
        }`}
      >
        <UserCircleIcon className="h-6 w-6" aria-hidden="true" />
      </Menu.Button>
    </div>
    <Transition
      as={Fragment}
      enter="transition ease-out duration-100"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-75"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
    >
      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        {items.map((item) => (
          <Menu.Item key={item.name}>
            {({ active }) => (
              <a
                href={item.href}
                className={classNames(
                  active ? "bg-gray-100" : "",
                  "block px-4 py-2 text-sm text-gray-700"
                )}
              >
                {item.name}
              </a>
            )}
          </Menu.Item>
        ))}
      </Menu.Items>
    </Transition>
  </Menu>
);

const Appbar = () => {
  const authToken: User = localStorage.getItem("authToken");

  const [user, setUser] = useState<User>(null);

  useEffect(() => {
    if (authToken) {
      setUser(authToken);
    } else {
      setUser(null);
    }
  }, [authToken]);

  return (
    <Disclosure as="nav" className="border-b border-slate-200 bg-slate-500">
      {() => (
        <div className="ml-10 mr-8 max-w-8xl px-2 sm:px-6">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Link to="/">
                  <img
                    className="h-14 w-14 rounded-full"
                    src={Logo}
                    alt="Smarter Tasks"
                  />
                </Link>
              </div>
            </div>

            <div className="hidden md:block">
              <div className="ml-4 flex items-center md:ml-6">
                <div className="flex flex-start">
                  <div className="mr-1">{user && <Preferences />}</div>
                </div>
                {!user && <MenuButton user={user} items={userNavigation} />}
                {user && (
                  <MenuButton user={user} items={signedInUserNavigation} />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </Disclosure>
  );
};

export default Appbar;
