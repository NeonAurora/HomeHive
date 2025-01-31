import React, { useState, useEffect, useContext } from "react";
import "./Header.css";
import { BiMenuAltRight } from "react-icons/bi";
import OutsideClickHandler from "react-outside-click-handler";
import { Link, NavLink } from "react-router-dom";
import { loginUser } from "../../utils/api";
import { UserContext } from "../../utils/UserContext";

// Utility to get and set cookies
const setCookie = (name, value, days = 7) => {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=${value};${expires};path=/`;
};

const getCookie = (name) => {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  if (match) return match[2];
  return null;
};

const deleteCookie = (name) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

const Header = () => {
  const [menuOpened, setMenuOpened] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  // 1) Access the user context instead of local component state
  const { currentUser, setCurrentUser } = useContext(UserContext);

  // For the login form
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Load user from cookie on mount and update the context
  useEffect(() => {
    const userCookie = getCookie("loggedInUser");
    if (userCookie) {
      try {
        const parsedUser = JSON.parse(decodeURIComponent(userCookie));
        setCurrentUser(parsedUser);
      } catch (err) {
        console.error("Error parsing user cookie:", err);
      }
    }
  }, [setCurrentUser]);

  // Helper to style the mobile menu
  const getMenuStyles = (menuOpen) => {
    if (document.documentElement.clientWidth <= 800) {
      return { right: menuOpen ? "0" : "-100%" };
    }
    return {};
  };

  // Handle login submission
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser({ email, password });
      console.log("Login Success:", data);

      if (data.user) {
        // Update context
        setCurrentUser(data.user);
        // Also store user in a cookie
        setCookie("loggedInUser", encodeURIComponent(JSON.stringify(data.user)));
      }

      setShowLoginModal(false);
    } catch (err) {
      console.error("Login Error:", err);
    }
  };

  // Handle logout: clear user context and remove cookie
  const handleLogout = () => {
    setCurrentUser(null);
    deleteCookie("loggedInUser");
  };

  // Helper to determine button label
  const getButtonLabel = () => {
    if (!currentUser) return "Login";
    if (currentUser.role === "ADMIN") {
      return `${currentUser.name} and he is very powerful`;
    }
    return currentUser.name;
  };

  return (
    <section className="h-wrapper">
      <div className="flexCenter paddings innerWidth h-container">
        <Link to="/">
          <img src="./logo.png" alt="Landers-Logo" width={175} />
        </Link>
        <OutsideClickHandler onOutsideClick={() => setMenuOpened(false)}>
          <div className="flexCenter h-menu" style={getMenuStyles(menuOpened)}>
            <NavLink to="/properties">Properties</NavLink>
            <a href="http://buyyourland.com">Sell</a>
            <NavLink to="/support">Support</NavLink>
            <NavLink to="/About Us">About</NavLink>
            <NavLink to="/Contact Us">Contact</NavLink>

            {/* If user not logged in, show "Login" button; if logged in, show name + logout */}
            {!currentUser ? (
              <button className="button" onClick={() => setShowLoginModal(true)}>
                {getButtonLabel()}
              </button>
            ) : (
              <>
                <button className="button">{getButtonLabel()}</button>
                <button className="button" onClick={handleLogout}>
                  Logout
                </button>
              </>
            )}
          </div>
        </OutsideClickHandler>

        <div className="menu-icon" onClick={() => setMenuOpened((prev) => !prev)}>
          <BiMenuAltRight size={30} />
        </div>
      </div>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="modalOverlay">
          <div className="modalContent">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
              <div>
                <label>Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit">Log In</button>
              <button type="button" onClick={() => setShowLoginModal(false)}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default Header;
