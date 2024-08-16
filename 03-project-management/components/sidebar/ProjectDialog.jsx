import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Snackbar from "@mui/material/Snackbar";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import styles from "./ProjectDialog.module.css"; // Import the CSS module

// Validation schema using Yup
const validationSchema = Yup.object().shape({
  projectName: Yup.string().required("Project name is required"),
  projectDescription: Yup.string().required("Project description is required"),
  startDate: Yup.string().required("Start date is required"),
  endDate: Yup.string().required("End date is required"),
  budget: Yup.number()
    .required("Budget is required")
    .min(100, "Budget must be greater than 99"),
});

export default function ProjectDialog({ openDialog, handleCloseDialog }) {
  const [tasks, setTasks] = useState([
    {
      title: "",
      description: "",
      assignedUsers: [],
      dueDate: "",
      status: "Pending",
    },
  ]);
  const [members, setMembers] = useState([]);
  const [user, setUser] = useState("");
  const [ownerUsername, setOwnerUsername] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

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

  const handleSubmit = async (values, { setSubmitting }) => {
    const projectId = uuidv4(); // Generate a unique ID for the project

    // Create a new project object
    const newProject = {
      id: projectId,
      name: values.projectName,
      ownerUsername: ownerUsername,
      description: values.projectDescription,
      startDate: values.startDate,
      endDate: values.endDate,
      status: values.status,
      budget: values.budget,
      tasks: tasks.map((task) => uuidv4()), // Create and use task IDs
      members: [],
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
      setSnackbarOpen(true); // Open Snackbar on error
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{
        projectName: "",
        projectDescription: "",
        startDate: "",
        endDate: "",
        status: "Pending",
        budget: 0,
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => (
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          fullWidth
          maxWidth="md"
          PaperProps={{ className: styles.dialogPaper }} // Apply custom styles
        >
          <Form>
            <DialogTitle className={styles.dialogTitle}>
              Create a Project
            </DialogTitle>
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
              <Field
                as={TextField}
                margin="dense"
                id="project-name"
                label="Project Name"
                type="text"
                fullWidth
                variant="standard"
                name="projectName"
                value={values.projectName}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.projectName && Boolean(errors.projectName)}
                helperText={touched.projectName && errors.projectName}
              />
              <Field
                as={TextField}
                margin="dense"
                id="project-description"
                label="Project Description"
                type="text"
                fullWidth
                multiline
                rows={4}
                variant="standard"
                name="projectDescription"
                value={values.projectDescription}
                onChange={handleChange}
                onBlur={handleBlur}
                error={
                  touched.projectDescription &&
                  Boolean(errors.projectDescription)
                }
                helperText={
                  touched.projectDescription && errors.projectDescription
                }
              />
              <TextField
                margin="dense"
                id="start-date"
                label="Start Date"
                type="date"
                fullWidth
                variant="standard"
                InputLabelProps={{ shrink: true }}
                name="startDate"
                value={values.startDate}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.startDate && Boolean(errors.startDate)}
                helperText={touched.startDate && errors.startDate}
              />
              <TextField
                margin="dense"
                id="end-date"
                label="End Date"
                type="date"
                fullWidth
                variant="standard"
                InputLabelProps={{ shrink: true }}
                name="endDate"
                value={values.endDate}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.endDate && Boolean(errors.endDate)}
                helperText={touched.endDate && errors.endDate}
              />
              <Field
                as={Select}
                margin="dense"
                id="status"
                label="Status"
                fullWidth
                name="status"
                value={values.status}
                onChange={handleChange}
                onBlur={handleBlur}
                className={styles.selectInput}
              >
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="In Progress">In Progress</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
              </Field>
              <Field
                as={TextField}
                margin="dense"
                id="budget"
                label="Budget"
                type="number"
                fullWidth
                variant="standard"
                name="budget"
                value={values.budget}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.budget && Boolean(errors.budget)}
                helperText={touched.budget && errors.budget}
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
                    onChange={(e) =>
                      handleTaskChange(index, "title", e.target.value)
                    }
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
                  <TextField
                    margin="dense"
                    id={`task-status-${index}`}
                    label={`Task ${index + 1} Status`}
                    type="text"
                    fullWidth
                    variant="standard"
                    value={task.status}
                    onChange={(e) =>
                      handleTaskChange(index, "status", e.target.value)
                    }
                  />
                </div>
              ))}
              <Button onClick={handleAddTask} className={styles.addButton}>
                Add Task
              </Button>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={handleCloseDialog}
                className={styles.cancelButton}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className={styles.createButton}
              >
                Create Project
              </Button>
            </DialogActions>
          </Form>
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={6000}
            onClose={() => setSnackbarOpen(false)}
            message="Please fill in all required fields."
          />
        </Dialog>
      )}
    </Formik>
  );
}
