import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import {
  Container,
  Typography,
  Grid,
  Avatar,
  Button,
  List,
  ListItem,
  ListItemText,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  Snackbar,
  Card,
  CardContent,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import styles from "./ProjectDetails.module.css";
import { v4 as uuidv4 } from "uuid";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Sidebar from "@/components/sidebar/Sidebar";
import Navbar from "@/components/navbar/Navbar";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ProjectDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [comments, setComments] = useState([]);
  const [assignedUsersCount, setAssignedUsersCount] = useState(0);
  const [user, setUser] = useState({});
  const [assignedProjects, setAssignedProjects] = useState(new Set());
  const [openJobsDialog, setOpenJobsDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });
  const commentRefs = useRef({});
  const [expandedComments, setExpandedComments] = useState({});

  useEffect(() => {
    if (id) {
      axios
        .get(`/api/projects`)
        .then((res) => {
          const projectData = res.data.find((p) => p.id === id);
          if (projectData) {
            setProject(projectData);
            setAssignedUsersCount(projectData.members.length);
          }
        })
        .catch((e) => console.log(e));

      axios
        .get("/api/tasks")
        .then((res) =>
          setTasks(res.data.filter((task) => task.projectId === id))
        )
        .catch((e) => console.log(e));

      axios
        .get("/api/comments")
        .then((res) =>
          setComments(res.data.filter((comment) => comment.projectId === id))
        )
        .catch((e) => console.log(e));

      const userData = JSON.parse(localStorage.getItem("user"));
      setUser(userData);
      setAssignedProjects(new Set(userData.jobs.map((job) => job.id)));
    }
  }, [id]);

  const handleAssignProject = (projectId, projectName) => {
    const isAssigned = assignedProjects.has(projectId);
    const updatedJobs = isAssigned
      ? user.jobs.filter((j) => j.id !== projectId)
      : [...user.jobs, { id: projectId, name: projectName }];

    const updatedUser = {
      ...user,
      jobs: updatedJobs,
    };

    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
    setAssignedProjects(new Set(updatedJobs.map((job) => job.id)));

    // Update user data
    axios
      .put("/api/users", updatedUser)
      .then(() => {
        // Fetch the updated project data from the server to ensure consistency
        axios
          .get(`/api/projects`)
          .then((res) => {
            const updatedProjectData = res.data.find((p) => p.id === projectId);

            if (updatedProjectData) {
              const updatedProject = {
                ...updatedProjectData,
                members: isAssigned
                  ? updatedProjectData.members.filter(
                      (member) => member !== user.username
                    )
                  : [...updatedProjectData.members, user.username],
              };

              axios
                .put("/api/projects", updatedProject)
                .then(() => {
                  setAssignedUsersCount(updatedProject.members.length);
                })
                .catch((error) =>
                  console.error("Error updating project:", error)
                );
            }
          })
          .catch((error) =>
            console.error("Error fetching updated project data:", error)
          );
      })
      .catch((error) => console.error("Error updating user data:", error));
  };

  const handleCommentSubmit = () => {
    const commentText = commentRefs.current?.value;

    if (commentText) {
      const comment = {
        id: uuidv4(),
        projectId: id,
        userUsername: user.username,
        text: commentText,
        timestamp: new Date().toISOString(),
      };

      axios
        .post("/api/comments", comment)
        .then((res) => {
          setComments((prevComments) => [...prevComments, comment]);
          commentRefs.current.value = "";
          setSnackbar({
            open: true,
            message: "Comment added successfully",
          });
        })
        .catch((e) => console.log(e));
    }
  };

  const toggleExpandComments = () => {
    setExpandedComments((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleOpenJobsDialog = () => {
    setOpenJobsDialog(true);
  };

  const handleCloseJobsDialog = () => {
    setOpenJobsDialog(false);
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ open: false, message: "" });
  };

  if (!project) return <div>Loading...</div>;

  // Generate random data for the chart
  const chartData = {
    labels: ["Task 1", "Task 2", "Task 3", "Task 4", "Task 5"],
    datasets: [
      {
        label: "Task Completion",
        data: Array.from({ length: 5 }, () => Math.floor(Math.random() * 100)),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <Navbar />
      <Sidebar />
      <Container>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={() => router.push("/main")}
          className={styles.backButton}
        >
          Go Back
        </Button>
        <Grid container spacing={2}>
          {/* Left side: Comments */}
          <Grid item xs={12} md={6} className={styles.leftSide}>
            <Typography variant="h5" className={styles.sectionTitle}>
              Comments
            </Typography>
            <List>
              {comments
                .slice(0, expandedComments[id] ? comments.length : 3)
                .map((comment) => (
                  <ListItem key={comment.id}>
                    <Avatar
                      alt={comment.userUsername}
                      src={`/static/images/avatar/${comment.userUsername}.jpg`}
                    />
                    <ListItemText
                      primary={comment.text}
                      secondary={comment.userUsername}
                    />
                  </ListItem>
                ))}
              {comments.length > 3 && (
                <Button
                  onClick={toggleExpandComments}
                  size="small"
                  color="primary"
                  className={styles.commentButton}
                >
                  {expandedComments[id] ? "Show less" : "Show more"}
                </Button>
              )}
            </List>
            <Grid
              container
              alignItems="center"
              spacing={1}
              className={styles.chatInput}
            >
              <Grid item xs={8}>
                <TextField
                  placeholder="Write a comment..."
                  fullWidth
                  variant="outlined"
                  inputRef={commentRefs}
                />
              </Grid>
              <Grid item xs={4}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleCommentSubmit}
                  fullWidth
                  className={styles.commentButton}
                >
                  Comment
                </Button>
              </Grid>
            </Grid>
          </Grid>

          {/* Right side: Project Details */}
          <Grid item xs={12} md={6} className={styles.rightSide}>
            <Typography variant="h4" className={styles.projectTitle}>
              {project.name}
            </Typography>
            <Card className={styles.projectCard}>
              <CardContent>
                <Typography variant="h6">Description</Typography>
                <Typography>{project.description}</Typography>
                <Typography variant="h6">Details</Typography>
                <Typography>Start Date: {project.startDate}</Typography>
                <Typography>End Date: {project.endDate}</Typography>
                <Typography>Budget: ${project.budget}</Typography>
                <Typography>Status: {project.status}</Typography>
                <Typography>Assigned Users: {assignedUsersCount}</Typography>
                <Button
                  variant="contained"
                  color={
                    assignedProjects.has(project.id) ? "secondary" : "primary"
                  }
                  onClick={() => handleAssignProject(project.id, project.name)}
                >
                  {assignedProjects.has(project.id)
                    ? "Unassign from me"
                    : "Assign to me"}
                </Button>
              </CardContent>
            </Card>
            {/* Replace Project Progress section with chart */}
            <Card className={styles.chartCard}>
              <CardContent>
                <Typography variant="h6">Project Progress</Typography>
                <Bar data={chartData} options={{ responsive: true }} />
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Dialog open={openJobsDialog} onClose={handleCloseJobsDialog}>
          <DialogTitle>Assigned Jobs</DialogTitle>
          <DialogContent>
            <List>
              {user.jobs.map((job) => (
                <ListItem key={job.id}>
                  <ListItemText primary={job.name} />
                </ListItem>
              ))}
            </List>
          </DialogContent>
        </Dialog>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          message={snackbar.message}
        />
      </Container>
    </>
  );
};

export default ProjectDetails;
