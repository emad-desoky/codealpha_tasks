import React, { useState, useEffect } from "react";
import styles from "./Navbar.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ListAltIcon from "@mui/icons-material/ListAlt";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useRouter } from "next/router";

const Navbar = () => {
  const [cartCount, setCartCount] = useState(0);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/cart")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Cart data fetched successfully:", data);
        const totalItems = data.reduce((sum, item) => sum + item.quantity, 0);
        setCartCount(totalItems);
      })
      .catch((error) => {
        console.error("Error fetching cart data:", error);
      });
  }, []);

  const handleCartClick = (event) => {
    event.preventDefault();
    router.push("/cart");
  };

  return (
    <div className={`${styles.mainNavbar} shadow-sm sticky-top`}>
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
                    onClick={handleCartClick}
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
                      >
                        <ListAltIcon className={styles.dropdownItemIcon} /> My
                        Orders
                      </a>
                    </li>
                    <li>
                      <a
                        className={`${styles.dropdownItem} dropdown-item`}
                        href="#"
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
                      >
                        <ShoppingCartIcon className={styles.dropdownItemIcon} />{" "}
                        My Cart
                      </a>
                    </li>
                    <li>
                      <a
                        className={`${styles.dropdownItem} dropdown-item`}
                        href="#"
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
                <a
                  className={`nav-link active ${styles.navLink}`}
                  aria-current="page"
                  href="#"
                >
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className={`nav-link ${styles.navLink}`} href="#">
                  Shop
                </a>
              </li>
              <li className="nav-item">
                <a className={`nav-link ${styles.navLink}`} href="#">
                  About
                </a>
              </li>
              <li className="nav-item">
                <a className={`nav-link ${styles.navLink}`} href="#">
                  Contact
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
