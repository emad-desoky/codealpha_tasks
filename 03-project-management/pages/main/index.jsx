import Navbar from "@/components/navbar/Navbar";
import ProjectCard from "@/components/projects/ProjectToolCard";
import Sidebar from "@/components/sidebar/Sidebar";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Main() {
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]); // Changed from posts to projects
  const [comments, setComments] = useState([]);
  const [refetch, setRefetch] = useState(false);

  useEffect(() => {
    axios
      .get("/api/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err));
  }, [refetch]);

  useEffect(() => {
    axios
      .get("/api/projects")
      .then((res) => setProjects(res.data)) // Updated to projects
      .catch((err) => console.log(err));
  }, [refetch]);

  useEffect(() => {
    axios
      .get("/api/comments")
      .then((res) => setComments(res.data))
      .catch((err) => console.log(err));
  }, [refetch]);

  return (
    <div className="flex h-screen">
      <Sidebar
        setRefetch={setRefetch}
        className="fixed top-0 left-0 w-1/4 h-full bg-gray-900 text-white"
      />
      <div className="flex-1 ml-1/4 overflow-y-auto">
        <Navbar />
        <ProjectCard
          projects={projects} // Updated to projects
          users={users}
          comments={comments}
          setRefetch={setRefetch}
        />
      </div>
    </div>
  );
}
