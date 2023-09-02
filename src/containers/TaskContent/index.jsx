import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  CircularProgress,
  Typography,
  List,
  ListItem,
  ListItemText,
  Box,
  Paper,
  Link,
  Button,
  CssBaseline,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import AddTaskDialog from "./AddTaskDialog";
import api from "../../apis";
import DeleteAlert from "../../components/DeleteAlert";

const TaskList = () => {
  const { campaignId } = useParams();
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [deleteData, setDeleteData] = useState("");

  const [openDialog, setOpenDialog] = useState(false);
  const [tasks, setTasks] = useState([]);

  const getTaskByCampaignId = async () => {
    const result = await api.task.getTaskByCampaign(campaignId);
    console.log(result.result.tasks);
    setTasks(result.result.tasks);
  };

  useEffect(() => {
    getTaskByCampaignId();
  }, []);

  const handleAddTask = (newTask) => {
    // Add the new task to the tasks array
    setTasks([...tasks, { id: tasks.length + 1, ...newTask }]);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    getTaskByCampaignId();
  };

  const handleOpenDeleteAlert = (data) => {
    setDeleteData(data);
    setDeleteAlert(true);
  };

  const handleCloseDeleteAlert = () => {
    setDeleteAlert(false);
    getTaskByCampaignId();
  };

  const handleDeleteClick = (taskId) => {
    handleOpenDeleteAlert(taskId);
  };

  return (
    <div>
      <DeleteAlert
        type="task"
        deleteValue={deleteData}
        open={deleteAlert}
        onClose={handleCloseDeleteAlert}
      />
      <CssBaseline />
      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpenDialog(true)}
        sx={{ float: "right", margin: "16px", zIndex: 1 }}
      >
        Add Task
      </Button>
      <List sx={{ overflowY: "auto", maxHeight: "80vh" }}>
        {tasks.map((task) => (
          <ListItem key={task.id}>
            <Paper
              elevation={3}
              style={{
                padding: "16px",
                display: "flex",
                justifyContent: "space-between", // Align items in a row
                alignItems: "center", // Center vertically
                width: "60vw",
              }}
            >
              <Box display="flex" alignItems="center">
                <Box mr={4}>
                  <CircularProgress
                    variant="determinate"
                    value={task.progress}
                    size={40} // Adjust the size as needed
                    color="success"
                  />
                </Box>
                <ListItemText
                  primary={task.name}
                  secondary={
                    <React.Fragment>
                      <Typography variant="body2" color="textSecondary">
                        Status: {task.status}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Deadline: {task.deadline}
                      </Typography>
                    </React.Fragment>
                  }
                />
              </Box>
              <Box>
                <Link
                  href={`/task/${task.id}`}
                  variant="body1"
                  color="primary"
                  underline="none"
                  sx={{ marginRight: "8px" }}
                >
                  DETAILS
                </Link>
                <Button
                  variant="outlined"
                  color="error"
                  size="small"
                  startIcon={<Delete />}
                  onClick={() => handleDeleteClick(task.id)}
                >
                  Delete
                </Button>
              </Box>
            </Paper>
          </ListItem>
        ))}
      </List>
      <AddTaskDialog
        open={openDialog}
        onClose={handleCloseDialog}
        onAddTask={handleAddTask}
        campaignId={campaignId}
      />
    </div>
  );
};

export default TaskList;
