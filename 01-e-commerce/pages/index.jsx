import Category from "@/components/categories/Category";
import Footer from "@/components/footer/Footer";
import { FramerMotion } from "@/components/framer-motion/FramerMotion";
import NavBar from "@/components/navbar/Navbar";

export default function Home() {
  return (
    <>
      <NavBar />
      <FramerMotion />
      <Category />
      <Footer />
    </>
  );
}
