import React from "react";
import Sidebar from "../sidebar/Sidebar";
import Body from "../body/Body";
import HeroSection from "../hero-section/HeroSetcion"; // Ensure the import is correct

const Layout = () => {
  return (
    <div className="flex h-screen">
      {/* Fixed Sidebar */}
      <Sidebar className="fixed top-0 left-0 w-1/4 h-full bg-gray-900 text-white" />

      {/* Right Side with Scrolling */}
      <div className="flex-1 ml-1/4 overflow-y-auto">
        {/* Hero Section */}
        <div className="w-full h-screen gradient-background">
          <HeroSection className="w-full h-full" />
        </div>

        {/* Body Section */}
        <div className="w-full gradient-background">
          <Body className="w-full" />
        </div>
      </div>
    </div>
  );
};

export default Layout;
