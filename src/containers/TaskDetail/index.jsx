import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import {
  Grid,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
} from "@mui/material";
import api from "../../apis";
import EditTaskDialog from "./EditTaskDialog";

const TaskDetail = () => {
  const { taskId } = useParams();
  const [taskData, setTaskData] = useState({});
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const getTaskData = async () => {
    const result = await api.task.getTaskById(taskId);
    setTaskData(result.result.task);
  };

  useEffect(() => {
    getTaskData();
  }, []);

  const handleEditClick = () => {
    setIsEditDialogOpen(true);
  };

  const handleCloseEdit = () => {
    setIsEditDialogOpen(false);
    getTaskData();
  };

  return (
    <Grid container>
      <Grid item xs={2} style={{ height: "100vh" }}>
        <Sidebar />
      </Grid>
      <Grid item xs={10}>
        <Grid container direction="column" alignItems="center">
          <Typography variant="h4" gutterBottom>
            Task Detail
          </Typography>
          <Paper
            elevation={3}
            style={{ padding: 16, marginBottom: 16 }}
            sx={{ width: "70vw" }}
          >
            <Typography variant="h6" gutterBottom>
              Task Information
            </Typography>
            <List>
              <ListItem>
                <ListItemText primary={`Name: ${taskData.name}`} />
              </ListItem>
              <ListItem>
                <ListItemText primary={`Details: ${taskData.details}`} />
              </ListItem>
              <ListItem>
                <ListItemText primary={`Deadline: ${taskData.deadline}`} />
              </ListItem>
              <ListItem>
                <ListItemText primary={`Progress: ${taskData.progress}%`} />
              </ListItem>
              <ListItem>
                <ListItemText primary={`Status: ${taskData.status}`} />
              </ListItem>
              <ListItem>
                <ListItemText primary={`User Emails:`} />
                <List>
                  {taskData.userEmails ? (
                    taskData.userEmails.map((email, index) => (
                      <ListItem key={index}>
                        <ListItemText primary={email} />
                      </ListItem>
                    ))
                  ) : (
                    <ListItem>
                      <ListItemText primary="No user emails available." />
                    </ListItem>
                  )}
                </List>
              </ListItem>
            </List>
          </Paper>
          <Button variant="contained" color="primary" onClick={handleEditClick}>
            Edit
          </Button>
          <EditTaskDialog
            open={isEditDialogOpen}
            taskId={taskData.id}
            onClose={handleCloseEdit}
            initialStatus={taskData.status}
            initialProgress={taskData.progress}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default TaskDetail;
