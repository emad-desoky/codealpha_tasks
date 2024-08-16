import React, { useEffect, useRef, useState } from "react";
import {
  Card,
  Typography,
  TextField,
  Button,
  Grid,
  Container,
  CssBaseline,
  Avatar,
  IconButton,
  Snackbar,
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import styles from "./ProjectCard.module.css";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ListAltIcon from "@mui/icons-material/ListAlt"; // Icon for viewing assigned jobs
import GroupIcon from "@mui/icons-material/Group"; // Icon for showing assigned users count

const ProjectToolCard = () => {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [comments, setComments] = useState([]);
  const [user, setUser] = useState({});
  const [assignedProjects, setAssignedProjects] = useState(new Set());
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });
  const [openJobsDialog, setOpenJobsDialog] = useState(false); // State for jobs dialog
  const commentRefs = useRef({});
  const [expandedComments, setExpandedComments] = useState({});
  const [assignedUsersCount, setAssignedUsersCount] = useState({});

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUser(user);
    setAssignedProjects(new Set(user.jobs.map((job) => job.id))); // Update for job IDs

    axios
      .get("api/projects")
      .then((res) => setProjects(res.data))
      .catch((e) => console.log(e));

    axios
      .get("api/tasks")
      .then((res) => setTasks(res.data))
      .catch((e) => console.log(e));

    axios
      .get("api/comments")
      .then((res) => setComments(res.data))
      .catch((e) => console.log(e));
  }, []);

  const handleCommentSubmit = (projectId) => {
    const commentText = commentRefs.current[projectId]?.value;

    if (commentText) {
      const comment = {
        id: uuidv4(),
        projectId: projectId,
        userUsername: user.username,
        text: commentText,
        timestamp: new Date().toISOString(),
      };

      axios
        .post("api/comments", comment)
        .then((res) => {
          setComments((prevComments) => [...prevComments, comment]);
          commentRefs.current[projectId].value = ""; // Clear the text field after submitting
        })
        .catch((e) => console.log(e));
    }
  };

  const toggleExpandComments = (projectId) => {
    setExpandedComments((prev) => ({
      ...prev,
      [projectId]: !prev[projectId],
    }));
  };

  const handleAssignProject = (projectId, projectName) => {
    const user = JSON.parse(localStorage.getItem("user"));

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

    axios
      .put("api/users", updatedUser)
      .then(() => {
        setSnackbar({
          open: true,
          message: isAssigned
            ? "Project unassigned successfully"
            : "Project assigned successfully",
        });
      })
      .catch((error) => {
        console.error("Error assigning project:", error);
      });
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

  return (
    <>
      <React.Fragment>
        <CssBaseline />
        <Container>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <IconButton onClick={handleOpenJobsDialog}>
                <ListAltIcon />
              </IconButton>
            </Grid>
            {projects.map((p) => (
              <Grid item xs={12} sm={6} md={4} key={p.id}>
                <Card className={styles.projectCard}>
                  <Grid container spacing={2} direction="column">
                    <Grid
                      container
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Grid
                        container
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        {/* Avatar and other elements */}
                        <IconButton
                          className={styles.assignedUsersIcon}
                          onClick={() => handleAssignedUsersClick(p.id)}
                        >
                          <GroupIcon />
                        </IconButton>
                        <Typography variant="body2">
                          {assignedUsersCount[p.id] || 0} Users Assigned
                        </Typography>
                      </Grid>
                      <Grid container alignItems="center" spacing={1}>
                        <Avatar
                          alt={p.ownerUsername}
                          src="/static/images/avatar/1.jpg"
                        />
                        <Typography
                          variant="subtitle2"
                          className={styles.ownerUsername}
                        >
                          {p.ownerUsername}
                        </Typography>
                      </Grid>
                      <IconButton
                        className={styles.assignButton}
                        onClick={() => handleAssignProject(p.id, p.name)}
                      >
                        <AssignmentIcon
                          style={{
                            color: assignedProjects.has(p.id) ? "blue" : "gray",
                            transition: "color 0.3s ease",
                          }}
                        />
                      </IconButton>
                    </Grid>
                    <Typography variant="h5" className={styles.projectTitle}>
                      {p.name}
                    </Typography>
                    <Typography variant="body2" className={styles.projectDates}>
                      Start Date: {new Date(p.startDate).toLocaleDateString()}
                    </Typography>
                    <Typography variant="body2" className={styles.projectDates}>
                      End Date: {new Date(p.endDate).toLocaleDateString()}
                    </Typography>
                    <Typography
                      variant="body2"
                      className={styles.projectDescription}
                    >
                      {p.description}
                    </Typography>
                    <Typography
                      variant="body2"
                      className={styles.projectBudget}
                    >
                      Budget: ${p.budget}
                    </Typography>
                    <Typography
                      variant="body2"
                      className={styles.projectStatus}
                    >
                      Status: {p.status}
                    </Typography>

                    <Typography
                      variant="subtitle1"
                      className={styles.taskHeader}
                    >
                      PROJECT'S TASKS:
                    </Typography>
                    {tasks
                      .filter((t) => t.projectId === p.id)
                      .map((t, i) => (
                        <React.Fragment key={i}>
                          <Typography className={styles.task}>
                            Task {i + 1} Title: {t.title}
                          </Typography>
                          <Typography className={styles.task}>
                            Task Description: {t.description}
                          </Typography>
                        </React.Fragment>
                      ))}
                    <Typography
                      variant="subtitle1"
                      className={styles.commentsHeader}
                    >
                      Comments:
                    </Typography>
                    {comments
                      .filter((c) => c.projectId === p.id)
                      .slice(0, expandedComments[p.id] ? comments.length : 3)
                      .map((c, i) => (
                        <Typography key={i} className={styles.comment}>
                          {c.userUsername}: {c.text}
                        </Typography>
                      ))}
                    {comments.filter((c) => c.projectId === p.id).length >
                      3 && (
                      <Button
                        onClick={() => toggleExpandComments(p.id)}
                        size="small"
                        color="primary"
                        className={styles.commentButton}
                      >
                        {expandedComments[p.id] ? "Show less" : "Show more"}
                      </Button>
                    )}
                    <Grid container alignItems="center" spacing={1}>
                      <Grid item xs={8}>
                        <TextField
                          placeholder="Write a comment..."
                          fullWidth
                          variant="outlined"
                          inputRef={(el) => (commentRefs.current[p.id] = el)}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleCommentSubmit(p.id)}
                          fullWidth
                          className={styles.commentButton}
                        >
                          Comment
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Dialog for displaying assigned jobs */}
          <Dialog
            open={openJobsDialog}
            onClose={handleCloseJobsDialog}
            className={styles.dialog}
          >
            <DialogTitle className={styles.dialogTitle}>
              Assigned Jobs
            </DialogTitle>
            <DialogContent className={styles.dialogContent}>
              <List>
                {user.jobs && Array.isArray(user.jobs) ? (
                  user.jobs.map((job, index) => (
                    <ListItem key={index} className={styles.listItem}>
                      <ListItemText primary={job.name} />
                    </ListItem>
                  ))
                ) : (
                  <ListItem>
                    <ListItemText primary="No assigned jobs" />
                  </ListItem>
                )}
              </List>
            </DialogContent>
          </Dialog>

          <Snackbar
            open={snackbar.open}
            autoHideDuration={3000}
            onClose={handleCloseSnackbar}
            message={snackbar.message}
          />
        </Container>
      </React.Fragment>
    </>
  );
};

export default ProjectToolCard;
