import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Chip,
} from "@mui/material";
import api from "../../apis";

const AddTaskDialog = ({ open, onClose, onAddTask, campaignId }) => {
  const [task, setTask] = useState({
    name: "",
    progress: 0,
    status: "",
    deadline: "",
    details: "",
    campaignId,
    member: [],
  });

  const [email, setEmail] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleAddEmail = () => {
    if (email.trim() !== "") {
      setTask((prevTask) => ({
        ...prevTask,
        member: [...prevTask.member, email],
      }));
      setEmail("");
    }
  };

  const handleAddTask = async () => {
    onAddTask(task);
    setTask({
      name: "",
      progress: 0,
      status: "",
      deadline: "",
      details: "",
      campaignId,
      member: [],
    });
    setEmail("");
    const result = await api.task.addTask(task);
    console.log(result);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Task</DialogTitle>
      <DialogContent>
        <TextField
          name="name"
          label="Name"
          fullWidth
          margin="normal"
          value={task.name}
          onChange={handleChange}
        />
        <TextField
          name="progress"
          label="Progress"
          type="number"
          fullWidth
          margin="normal"
          value={task.progress}
          onChange={handleChange}
        />
        <TextField
          name="status"
          label="Status"
          fullWidth
          margin="normal"
          value={task.status}
          onChange={handleChange}
        />
        <TextField
          name="deadline"
          label="Deadline"
          type="date"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          value={task.deadline}
          onChange={handleChange}
        />
        <TextField
          name="details"
          label="Details"
          multiline
          fullWidth
          margin="normal"
          value={task.details}
          onChange={handleChange}
        />

        {/* Email input field */}
        <TextField
          name="email"
          label="Email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Button variant="contained" color="primary" onClick={handleAddTask}>
          Add Task
        </Button>
        {/* Button to add email to members */}
        <Button variant="contained" color="primary" onClick={handleAddEmail}>
          Add Email
        </Button>

        {/* Display added emails as chips */}
        {task.member.map((mem, index) => (
          <Chip
            key={index}
            label={mem}
            onDelete={() => {
              setTask((prevTask) => ({
                ...prevTask,
                member: prevTask.member.filter((_, i) => i !== index),
              }));
            }}
            style={{ margin: "4px" }}
          />
        ))}
      </DialogContent>
    </Dialog>
  );
};

export default AddTaskDialog;
