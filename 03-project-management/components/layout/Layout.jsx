import React from "react";
import Sidebar from "../sidebar/Sidebar";
import HeroSection from "../hero-section/HeroSection"; // Ensure the import is correct

const Layout = () => {
  return (
    <>
      <div className="flex h-screen">
        {/* Fixed Sidebar */}
        <Sidebar />

        {/* Right Side with Scrolling */}
        <div className="flex-1 ml-1/4 overflow-y-auto">
          {/* Hero Section */}
          <div className="w-full h-screen gradient-background">
            <HeroSection className="w-full h-full" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
