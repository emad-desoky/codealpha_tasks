import Body from "@/components/body/Body";
import Sidebar from "@/components/sidebar/Sidebar";
import React from "react";

export default function Platform() {
  return (
    <>
      <div className="flex h-screen">
        {/* Fixed Sidebar */}
        <Sidebar className="fixed top-0 left-0 w-1/4 h-full bg-gray-900 text-white" />

        {/* Right Side with Scrolling */}
        <div className="flex-1 ml-1/4 overflow-y-auto">
          {/* Hero Section */}
          <div className="w-full h-screen gradient-background">
            <Body className="w-full h-full" />
          </div>
        </div>
      </div>
    </>
  );
}
