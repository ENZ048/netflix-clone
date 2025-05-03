import { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { LogOut, Menu, Search } from "lucide-react";
import { useAuthStore } from "../store/authUser";
import { useContentStore } from "../store/content";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuthStore();

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const { setContentType } = useContentStore();

  return (
    <>
      <header className="navbar">
        <div className="navbar-left">
          <Link to="/">
            <img src="/netflix-logo.png" alt="Netflix Logo" className="logo" />
          </Link>

          <div className="nav-items-desktop">
            <Link
              to="/"
              className="nav-link"
              onClick={() => setContentType("movie")}
            >
              Movies
            </Link>
            <Link
              to="/"
              className="nav-link"
              onClick={() => setContentType("tv")}
            >
              Tv Shows
            </Link>
            <Link to="/" className="nav-link">
              Search History
            </Link>
          </div>
        </div>

        <div className="navbar-right">
          <Link to={"/"}>
            <Search className="icon" />
          </Link>
          <img src={user.image} alt="Avatar" className="avatar" />
          <LogOut className="icon" onClick={logout} />
          <div className="mobile-menu-icon">
            <Menu className="icon" onClick={toggleMobileMenu} />
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="mobile-menu">
            <Link to={"/"} className="mobile-link" onClick={toggleMobileMenu}>
              Movies
            </Link>
            <Link to={"/"} className="mobile-link" onClick={toggleMobileMenu}>
              Tv Shows
            </Link>
            <Link
              to={"/"}
              className="mobile-link"
              onClick={toggleMobileMenu}
            >
              Search History
            </Link>
          </div>
        )}
      </header>
    </>
  );
};
export default Navbar;
