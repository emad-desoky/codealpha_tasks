import React, { useState, useEffect } from "react";
import styles from "./Navbar.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Script from "next/script";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ListAltIcon from "@mui/icons-material/ListAlt";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useRouter } from "next/router";
import Link from "next/link";

const Navbar = () => {
  const [cartCount, setCartCount] = useState(0);
  const [scrollingUp, setScrollingUp] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Load cart items from localStorage when the component mounts
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const totalItems = storedCart.reduce((sum, item) => sum + item.quantity, 0);
    setCartCount(totalItems);

    const handleScroll = () => {
      const currentScroll =
        window.pageYOffset || document.documentElement.scrollTop;
      setScrollingUp(
        currentScroll <= 0 || currentScroll < window.lastScrollTop
      );
      window.lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleCartClick = (event) => {
    event.preventDefault();
    router.push("/cart");
  };

  const handleClick = (event, link) => {
    if (link === "cart") {
      handleCartClick(event);
    } else {
      event.preventDefault();
    }
  };

  return (
    <div
      className={`${styles.mainNavbar} shadow-sm sticky-top ${
        scrollingUp ? "" : styles.hidden
      }`}
    >
      <Script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"
        strategy="beforeInteractive"
      />
      <div className={styles.topNavbar}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-2 my-auto d-none d-md-block">
              <h5 className={styles.brandName}>Funda Ecom</h5>
            </div>
            <div className="col-md-5 my-auto">
              <form role="search">
                <div className="input-group">
                  <input
                    type="search"
                    placeholder="Search your product"
                    className="form-control"
                  />
                  <button className={`btn ${styles.searchBtn}`} type="submit">
                    <SearchIcon style={{ color: "#fff" }} />
                  </button>
                </div>
              </form>
            </div>
            <div className="col-md-5 my-auto">
              <ul className="nav justify-content-end">
                <li className="nav-item">
                  <a
                    className={`${styles.navLink} nav-link`}
                    href="#"
                    onClick={(e) => handleClick(e, "cart")}
                  >
                    <ShoppingCartIcon className={styles.navIcon} />
                    <span>Cart ({cartCount})</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a className={`${styles.navLink} nav-link`} href="#">
                    <FavoriteBorderIcon className={styles.navIcon} />
                    <span>Wishlist (0)</span>
                  </a>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className={`${styles.navLink} nav-link dropdown-toggle`}
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <PersonOutlineIcon className={styles.navIcon} />
                    <span>Username</span>
                  </a>
                  <ul
                    className={`dropdown-menu ${styles.dropdownMenu}`}
                    aria-labelledby="navbarDropdown"
                  >
                    <li>
                      <a
                        className={`${styles.dropdownItem} dropdown-item`}
                        href="#"
                        onClick={(e) => handleClick(e, "profile")}
                      >
                        <PersonOutlineIcon
                          className={styles.dropdownItemIcon}
                        />{" "}
                        Profile
                      </a>
                    </li>
                    <li>
                      <a
                        className={`${styles.dropdownItem} dropdown-item`}
                        href="#"
                        onClick={(e) => handleClick(e, "orders")}
                      >
                        <ListAltIcon className={styles.dropdownItemIcon} /> My
                        Orders
                      </a>
                    </li>
                    <li>
                      <a
                        className={`${styles.dropdownItem} dropdown-item`}
                        href="#"
                        onClick={(e) => handleClick(e, "wishlist")}
                      >
                        <FavoriteBorderIcon
                          className={styles.dropdownItemIcon}
                        />{" "}
                        My Wishlist
                      </a>
                    </li>
                    <li>
                      <a
                        className={`${styles.dropdownItem} dropdown-item`}
                        href="#"
                        onClick={(e) => handleClick(e, "cart")}
                      >
                        <ShoppingCartIcon className={styles.dropdownItemIcon} />{" "}
                        My Cart
                      </a>
                    </li>
                    <li>
                      <a
                        className={`${styles.dropdownItem} dropdown-item`}
                        href="#"
                        onClick={(e) => handleClick(e, "logout")}
                      >
                        <ExitToAppIcon className={styles.dropdownItemIcon} />{" "}
                        Logout
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <nav className={`navbar navbar-expand-lg ${styles.navbar}`}>
        <div className="container-fluid">
          <a className="navbar-brand d-block d-md-none" href="#">
            Funda Ecom
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul
              className={`navbar-nav me-auto mb-2 mb-lg-0 ${styles.navbarNav}`}
            >
              <li className="nav-item">
                <Link href="/" passHref>
                  <span className={`${styles.navLink} nav-link`}>Home</span>
                </Link>
              </li>
              <li className="nav-item">
                <a
                  className={`${styles.navLink} nav-link`}
                  href="#"
                  onClick={(e) => handleClick(e, "categories")}
                >
                  All Categories
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`${styles.navLink} nav-link`}
                  href="#"
                  onClick={(e) => handleClick(e, "new-arrivals")}
                >
                  New Arrivals
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`${styles.navLink} nav-link`}
                  href="#"
                  onClick={(e) => handleClick(e, "featured-products")}
                >
                  Featured Products
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`${styles.navLink} nav-link`}
                  href="#"
                  onClick={(e) => handleClick(e, "electronics")}
                >
                  Electronics
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`${styles.navLink} nav-link`}
                  href="#"
                  onClick={(e) => handleClick(e, "fashion")}
                >
                  Fashion
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`${styles.navLink} nav-link`}
                  href="#"
                  onClick={(e) => handleClick(e, "home-appliances")}
                >
                  Home Appliances
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`${styles.navLink} nav-link`}
                  href="#"
                  onClick={(e) => handleClick(e, "toys")}
                >
                  Toys
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
