import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import {
  CircularProgress,
  Typography,
  List,
  ListItem,
  ListItemText,
  Box,
  Paper,
  Link,
  Grid,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import api from "../../apis";

const tasks = [
  {
    id: 1,
    name: "Task 1",
    progress: 50,
    status: "In Progress",
    deadline: "2023-09-30",
  },
  {
    id: 2,
    name: "Task 2",
    progress: 30,
    status: "Not Started",
    deadline: "2023-10-15",
  },
  // Add more tasks as needed
];

const MyTask = () => {
  const [taskData, setTaskData] = useState([]);

  const getTaskData = async () => {
    const result = await api.task.getMyTask();
    console.log(result.result.tasks);
    setTaskData(result.result.tasks);
  };

  useEffect(() => {
    getTaskData();
  }, []);

  return (
    <Grid container>
      <Grid item xs={2} style={{ height: "100vh" }}>
        <Sidebar />
      </Grid>
      <Grid item xs={10}>
        <Grid container direction="column" alignItems="center">
          <List sx={{ overflowY: "auto", maxHeight: "80vh", marginTop: "1%" }}>
            {taskData.map((task) => (
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
                  <Typography variant="body2" color="primary">
                    <Link
                      href={`/task/${task.id}`}
                      variant="body1"
                      color="primary"
                      underline="none"
                      sx={{ marginRight: "8px" }}
                    >
                      DETAILS
                    </Link>
                  </Typography>
                </Paper>
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default MyTask;
