import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import styles from "./ProjectDialog.module.css"; // Import the CSS module

export default function ProjectDialog({ openDialog, handleCloseDialog }) {
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [status, setStatus] = useState("Pending");
  const [budget, setBudget] = useState(0);
  const [tasksData, setTasksData] = useState([]);
  const [tasks, setTasks] = useState([
    {
      title: "",
      description: "",
      assignedUsers: [],
      dueDate: "",
      status: "Pending",
    },
  ]);
  const [user, setUser] = useState("");
  const [ownerUsername, setOwnerUsername] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUser(user);
    setOwnerUsername(user.username);
    axios
      .get("api/tasks")
      .then((res) => setTasksData(res.data))
      .catch((e) => console.log(e));
  }, []);

  const handleTaskChange = (index, field, value) => {
    const updatedTasks = [...tasks];
    updatedTasks[index][field] = value;
    setTasks(updatedTasks);
  };

  const handleAddTask = () => {
    setTasks([
      ...tasks,
      {
        title: "",
        description: "",
        assignedUsers: [],
        dueDate: "",
        status: "Pending",
      },
    ]);
  };

  const handleSubmit = async () => {
    const projectId = uuidv4(); // Generate a unique ID for the project

    // Create a new project object
    const newProject = {
      id: projectId,
      name: projectName,
      ownerUsername: ownerUsername,
      description: projectDescription,
      startDate,
      endDate,
      status,
      budget,
      tasks: tasks.map((task) => uuidv4()), // Create and use task IDs
    };

    try {
      // Post the project data
      await axios.post("/api/projects", newProject);

      // Post each task data separately
      const taskRequests = tasks.map((task) => {
        const taskId = uuidv4(); // Generate a unique ID for each task
        return axios.post("/api/tasks", {
          id: taskId,
          projectId,
          title: task.title,
          description: task.description,
          assignedToUsername: task.assignedUsers.join(", "), // Assuming you want a string of usernames
          status: task.status,
          dueDate: task.dueDate,
          comments: [], // Initialize with empty comments
        });
      });

      await Promise.all(taskRequests);

      console.log("Project and tasks created successfully");
      handleCloseDialog();
    } catch (error) {
      console.error("Error creating project and tasks:", error);
    }
  };

  return (
    <Dialog
      open={openDialog}
      onClose={handleCloseDialog}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle>Create a Project</DialogTitle>
      <DialogContent className={styles.dialogContent}>
        <TextField
          autoFocus
          margin="dense"
          id="owner-username"
          label="Owner Username"
          type="text"
          fullWidth
          variant="standard"
          value={ownerUsername}
          onChange={(e) => setOwnerUsername(e.target.value)}
        />
        <TextField
          margin="dense"
          id="project-name"
          label="Project Name"
          type="text"
          fullWidth
          variant="standard"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
        />
        <TextField
          margin="dense"
          id="project-description"
          label="Project Description"
          type="text"
          fullWidth
          multiline
          rows={4}
          variant="standard"
          value={projectDescription}
          onChange={(e) => setProjectDescription(e.target.value)}
        />
        <TextField
          margin="dense"
          id="start-date"
          label="Start Date"
          type="date"
          fullWidth
          variant="standard"
          InputLabelProps={{ shrink: true }}
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <TextField
          margin="dense"
          id="end-date"
          label="End Date"
          type="date"
          fullWidth
          variant="standard"
          InputLabelProps={{ shrink: true }}
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <Select
          margin="dense"
          id="status"
          label="Status"
          fullWidth
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <MenuItem value="Pending">Pending</MenuItem>
          <MenuItem value="In Progress">In Progress</MenuItem>
          <MenuItem value="Completed">Completed</MenuItem>
        </Select>
        <TextField
          margin="dense"
          id="budget"
          label="Budget"
          type="number"
          fullWidth
          variant="standard"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
        />
        {tasks.map((task, index) => (
          <div key={index} className={styles.taskContainer}>
            <TextField
              margin="dense"
              id={`task-title-${index}`}
              label={`Task ${index + 1} Title`}
              type="text"
              fullWidth
              variant="standard"
              value={task.title}
              onChange={(e) => handleTaskChange(index, "title", e.target.value)}
            />
            <TextField
              margin="dense"
              id={`task-description-${index}`}
              label={`Task ${index + 1} Description`}
              type="text"
              fullWidth
              multiline
              rows={2}
              variant="standard"
              value={task.description}
              onChange={(e) =>
                handleTaskChange(index, "description", e.target.value)
              }
            />
            <TextField
              margin="dense"
              id={`task-due-date-${index}`}
              label={`Task ${index + 1} Due Date`}
              type="date"
              fullWidth
              variant="standard"
              InputLabelProps={{ shrink: true }}
              value={task.dueDate}
              onChange={(e) =>
                handleTaskChange(index, "dueDate", e.target.value)
              }
            />
            <Select
              margin="dense"
              id={`task-status-${index}`}
              label={`Task ${index + 1} Status`}
              fullWidth
              value={task.status}
              onChange={(e) =>
                handleTaskChange(index, "status", e.target.value)
              }
            >
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="In Progress">In Progress</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
            </Select>
          </div>
        ))}
        <Button onClick={handleAddTask} className={styles.addTaskButton}>
          Add Task
        </Button>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog}>Cancel</Button>
        <Button onClick={handleSubmit} color="primary">
          Create Project
        </Button>
      </DialogActions>
    </Dialog>
  );
}
