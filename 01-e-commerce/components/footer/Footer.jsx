import React from "react";
import styles from "./Footer.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h5>Contact Info</h5>
            <p>
              <strong>Address:</strong> 123 Street Name, City, Australia
            </p>
            <p>
              <strong>Phone:</strong> Toll Free (123) 472-796
            </p>
            <p>
              <strong>Mobile:</strong> +91-9910XXXX
            </p>
            <p>
              <strong>Email:</strong> mail@example.com
            </p>
            <p>
              <strong>WORKING DAYS:</strong> Mon - FRI / 9:30 AM - 6:30 PM
            </p>
          </div>
          <div className="col-md-4">
            <h5>Shop Categories</h5>
            <ul className={styles.list}>
              <li>Jeans</li>
              <li>T-Shirts</li>
              <li>Sports</li>
              <li>Shirts & Tops</li>
              <li>Clogs & Mules</li>
              <li>Sunglasses</li>
              <li>Bags & Wallets</li>
              <li>Sneakers & Athletic</li>
              <li>Electronis</li>
              <li>Furniture</li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5>Popular Tags</h5>
            <p className={styles.tags}>
              Cloths Electronis Furniture Sports Men Wear Women Wear Laptops
              Formal Shirts Topwear Headphones Bottom Wear Bags Sofa Shoes
            </p>
            <h5>Stay informed</h5>
            <p>Enter Your Email</p>
            <form className={styles.subscribeForm}>
              <input
                type="email"
                className="form-control"
                placeholder="Enter your email"
              />
              <button className={`btn ${styles.subscribeBtn}`} type="submit">
                Subscribe
              </button>
            </form>
            <h5>Download our app</h5>
            <div className={styles.socialIcons}>
              <FontAwesomeIcon icon={faFacebook} />
              <FontAwesomeIcon icon={faTwitter} />
              <FontAwesomeIcon icon={faInstagram} />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <p>Copyright © 2021. All right reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
