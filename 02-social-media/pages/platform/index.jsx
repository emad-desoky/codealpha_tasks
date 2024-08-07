import ChatDialog from "@/components/chat/ChatDialog";
import Navbar from "@/components/navbar/Navbar";
import Posts from "@/components/posts/Posts";
import Sidebar from "@/components/sidebar/Sidebar";
import React from "react";

export default function Platform() {
  return (
    <>
      <div className="flex h-screen">
        <Sidebar className="fixed top-0 left-0 w-1/4 h-full bg-gray-900 text-white" />

        <div className="flex-1 ml-1/4 overflow-y-auto">
          <Navbar />
          <Posts />
        </div>
      </div>
      <ChatDialog /> {/* Positioned outside main content */}
    </>
  );
}
