import Category from "@/components/categories/Category";
import Footer from "@/components/footer/Footer";
import { FramerMotion } from "@/components/framer-motion/FramerMotion";
import NavBar from "@/components/navbar/Navbar";
import Products from "@/components/products/Products";

export default function Home() {
  return (
    <>
      <NavBar />
      <FramerMotion />
      <Category />
      <Products />
      <Footer />
    </>
  );
}
