import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import UserIcon from '../images/user.png';

const AppNavBar = (props) => {
  let navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const {
    isLoggedIn,
    setIsLoggedIn,
    name = '',
    surname = '',
    setName,
    setSurname,
    email,
    setEmail,
  } = props;

  useEffect(() => {
    console.log('Name:', name);
    console.log('Surname:', surname);
    console.log('Email:', email);
  }, [name, surname, email]);

  const handleLogout = () => {
    try {
      setIsLoggedIn(false);
      setName(null);
      setSurname(null);
      setEmail(null);
      navigate('/');
      toast.success('You are successfully logged out!');
    } catch (error) {
      toast.error('Logout failed. Please try again.');
    }
  };

  return (
    <nav className="bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <div className="max-w-screen-xl mx-auto p-4 flex justify-between items-center">
        <a href="/" className="flex items-center">
          <img
            src="path/to/logo.png"
            className="mr-3 h-6 sm:h-9"
            alt="Members Club"
          />
          <span className="self-center text-3xl font-semibold whitespace-nowrap dark:text-white">
            Member Club
          </span>
        </a>
        <div className="flex items-center md:order-2">
          {isLoggedIn ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center text-sm bg-gray-800 rounded-full focus:outline-none"
                id="user-menu-button"
                aria-expanded={dropdownOpen}
                aria-haspopup="true"
              >
                <span className="sr-only">Open user menu</span>
                <img className="h-8 w-8 rounded-full" src={UserIcon} alt="" />
              </button>
              {dropdownOpen && (
                <div
                  className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu-button"
                >
                  <div className="px-4 py-3" role="none">
                    <p className="text-sm" role="none">
                      {name} {surname}
                    </p>
                    <p
                      className="text-sm font-medium text-gray-900 truncate"
                      role="none"
                    >
                      {email}
                    </p>
                  </div>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                  >
                    Settings
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                  >
                    Your Orders
                  </a>
                  <div className="border-t border-gray-100"></div>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                  >
                    Log out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <a href="/login" className="text-lg text-gray-800 dark:text-white">
              Login
            </a>
          )}
        </div>
        <div className="hidden md:flex space-x-4 md:order-1">
          <a href="/" className="text-lg text-gray-800 dark:text-white">
            Home
          </a>
          <a href="/about" className="text-lg text-gray-800 dark:text-white">
            About
          </a>
          <a href="/services" className="text-lg text-gray-800 dark:text-white">
            Services
          </a>
          <a href="/pricing" className="text-lg text-gray-800 dark:text-white">
            Pricing
          </a>
          <a href="/contact" className="text-lg text-gray-800 dark:text-white">
            Contact
          </a>
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-800 dark:text-white focus:outline-none"
          aria-controls="mobile-menu"
          aria-expanded={mobileMenuOpen}
        >
          <span className="sr-only">Open main menu</span>
          {!mobileMenuOpen ? (
            <svg
              className="block h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          ) : (
            <svg
              className="block h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          )}
        </button>
      </div>
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
            <a href="/" className="block text-lg text-gray-800 dark:text-white">
              Home
            </a>
            <a
              href="/about"
              className="block text-lg text-gray-800 dark:text-white"
            >
              About
            </a>
            <a
              href="/services"
              className="block text-lg text-gray-800 dark:text-white"
            >
              Services
            </a>
            <a
              href="/pricing"
              className="block text-lg text-gray-800 dark:text-white"
            >
              Pricing
            </a>
            <a
              href="/contact"
              className="block text-lg text-gray-800 dark:text-white"
            >
              Contact
            </a>
            {!isLoggedIn && (
              <a
                href="/login"
                className="block text-lg text-gray-800 dark:text-white"
              >
                Login
              </a>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default AppNavBar;
