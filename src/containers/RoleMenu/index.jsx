import {
  Button,
  Box,
  Typography,
  Grid,
  Paper,
  Tabs,
  Tab,
  Checkbox,
  FormGroup,
  FormControlLabel,
} from "@mui/material";
import {
  DeleteForever as DeleteForeverIcon,
  Save as SaveIcon,
  Add as AddIcon,
} from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import AddRoleModal from "./AddRoleModal";
import TabPanel from "../../components/TabPanel";
import RoleMenuStyle from "./index.style";
import api from "../../apis";
import DeleteAlert from "../../components/DeleteAlert";
import { ToastContainer, toast } from "react-toastify";

const RoleMenu = () => {
  const [roleList, setRoleList] = useState([]);
  const [permissionList, setPermissionList] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [checkedPermissions, setCheckedPermissions] = useState([]);
  const [openAddRole, setOpenAddRole] = useState(false);
  const [activeRole, setActiveRole] = useState("");
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [deleteData, setDeleteData] = useState("");

  const [isChanged, setIsChanged] = useState(false);

  const getAllRole = async () => {
    const result = await api.role.getRole();
    setRoleList(result.result.roles.documents);
    setSearchResult(result.result.roles.documents);
    setActiveRole(result.result.roles.documents[0].id);
    setCheckedPermissions(result.result.roles.documents[0].permission);
  };

  useEffect(() => {
    getAllRole();
  }, []);

  const getAllPermission = async () => {
    const result = await api.permission.getAllPermission();
    setPermissionList(result.result.permissions);
  };

  useEffect(() => {
    getAllPermission();
  }, []);

  const handleCloseDrawer = () => {
    setOpenAddRole(false);
    getAllRole();
  };

  const handleChangeRole = (e, newRole) => {
    setActiveRole(newRole);
    const result = roleList.filter((role) => role.id === newRole);
    setCheckedPermissions(result[0].permission);
  };

  const handlePermissionChange = (e, permissionId) => {
    setCheckedPermissions((prevPermissions) => {
      if (e.target.checked) {
        // Add the permission to the checkedPermissions array
        return [...prevPermissions, permissionId];
      } else {
        // Remove the permission from the checkedPermissions array
        return prevPermissions.filter((id) => id !== permissionId);
      }
    });

    setIsChanged(true); // Always set isChanged to true when permissions change
  };

  const handleSaveChange = async () => {
    const result = roleList.filter((role) => role.id === activeRole)[0];
    console.log(result);
    const data = {
      permission: checkedPermissions,
    };
    console.log(data);
    const apiResult = await api.role.setRole(result.id, data);
    console.log(apiResult);
    getAllRole();
    toast.success("Save successfully");
  };

  const handleOpenDeleteAlert = (data) => {
    setDeleteData(data);
    setDeleteAlert(true);
  };

  const handleCloseDeleteAlert = () => {
    setDeleteAlert(false);
    getAllRole();
  };

  const handleDeleteRole = () => {
    handleOpenDeleteAlert(activeRole);
  };

  return (
    <RoleMenuStyle>
      <ToastContainer theme="colored" />
      <DeleteAlert
        type="role"
        deleteValue={deleteData}
        open={deleteAlert}
        onClose={handleCloseDeleteAlert}
      />
      <Grid
        container
        direction="column"
        className="grid-container"
        alignItems="center"
      >
        <Grid container justifyContent="space-between">
          <Box />
          <Box mr={14}>
            <Button onClick={() => setOpenAddRole(true)} className="btn-create">
              <AddIcon />
              Add role
            </Button>
          </Box>
        </Grid>
        <Grid
          alignContent="center"
          container
          direction="row"
          component={Paper}
          className="grid-content"
        >
          <Grid container direction="column" className="grid-role">
            <Box>
              <Typography
                sx={{ textAlign: "center", color: "#2196f3" }}
                variant="h4"
                className="role-title"
              >
                Role List
              </Typography>
            </Box>
            <Tabs
              indicatorColor="primary"
              textColor="primary"
              onChange={handleChangeRole}
              value={activeRole}
              orientation="vertical"
            >
              {searchResult.map((role) => (
                <Tab key={role.id} value={role.id} label={role.name} />
              ))}
            </Tabs>
          </Grid>
          <Grid className="grid-permission" container alignItems="center">
            {searchResult.map((role) => (
              <TabPanel
                key={role.id}
                value={activeRole}
                index={role.id}
                className="tab-permission"
              >
                <FormGroup>
                  <Grid container direction="row">
                    {permissionList.map((per, idPer) => {
                      let checked = false;
                      role.permission.forEach((element) => {
                        if (per.id === element) {
                          checked = true;
                        }
                      });
                      return idPer % 2 === 0 ? (
                        <Grid className="grid-permissionItem">
                          <FormControlLabel
                            key={idPer}
                            control={
                              <Checkbox
                                defaultChecked={checked}
                                onChange={(e) =>
                                  handlePermissionChange(e, per.id)
                                }
                              />
                            }
                            label={per.name}
                          />
                        </Grid>
                      ) : (
                        <Grid className="grid-permissionItem">
                          <FormControlLabel
                            key={idPer}
                            control={
                              <Checkbox
                                defaultChecked={checked}
                                onChange={(e) =>
                                  handlePermissionChange(e, per.id)
                                }
                              />
                            }
                            label={per.name}
                          />
                        </Grid>
                      );
                    })}
                  </Grid>
                </FormGroup>
              </TabPanel>
            ))}
          </Grid>
        </Grid>

        <Grid mt={2} container justifyContent="space-between">
          <Box />
          <Box>
            <Button onClick={handleSaveChange}>
              <SaveIcon />
              Save
            </Button>
            <Button onClick={handleDeleteRole} className="btn-delete">
              <DeleteForeverIcon />
              Delete role
            </Button>
          </Box>
        </Grid>
      </Grid>
      <AddRoleModal onClose={handleCloseDrawer} open={openAddRole} />
    </RoleMenuStyle>
  );
};

export default RoleMenu;
