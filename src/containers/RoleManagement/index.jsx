import React, { useState, useEffect } from "react";
import { Box, Tab, Tabs, Grid } from "@mui/material";
import TabPanel from "../../components/TabPanel";
import RoleMenu from "../RoleMenu";
import PermissionMenu from "../PermissionMenu";
import AdminMenu from "../AdminMenu";
import MANAGE_OPTION from "../../constants/roleManagementOption";
import Sidebar from "../../components/Sidebar";
import api from "../../apis";
import NotFound from "../NotFound";

const EditRole = () => {
  const [activeMenu, setActiveMenu] = useState("rolemenu");
  const [isAdmin, setIsAdmin] = useState(null);

  const getAdminInfo = async () => {
    const result = await api.admin.isAdmin();
    console.log(result.result.result);
    if (result.result.result !== null) setIsAdmin(true);
  };

  const handleMenuChange = (event, newValue) => {
    setActiveMenu(newValue);
  };

  useEffect(() => {
    getAdminInfo();
  }, []);

  const tabs = [
    { label: "Role", value: MANAGE_OPTION.ROLE_MENU },
    { label: "Permission", value: MANAGE_OPTION.PERMISSION_MENU },
    { label: "Admin", value: MANAGE_OPTION.ADMIN_MENU },
  ];

  if (isAdmin !== null && isAdmin)
    return (
      <Grid container>
        <Grid item xs={2} style={{ height: "100vh" }}>
          <Sidebar />
        </Grid>
        <Grid item xs={10}>
          <Grid container direction="column" alignItems="center">
            <Box marginTop={2}>
              <Tabs
                value={activeMenu}
                onChange={handleMenuChange}
                indicatorColor="primary"
                textColor="primary"
                centered
              >
                {tabs.map((tab) => (
                  <Tab label={tab.label} value={tab.value} />
                ))}
              </Tabs>
            </Box>
            <Box marginTop={2}>
              <TabPanel value={activeMenu} index={MANAGE_OPTION.ROLE_MENU}>
                <RoleMenu />
              </TabPanel>
              <TabPanel
                value={activeMenu}
                index={MANAGE_OPTION.PERMISSION_MENU}
              >
                <PermissionMenu />
              </TabPanel>
              <TabPanel value={activeMenu} index={MANAGE_OPTION.ADMIN_MENU}>
                <AdminMenu />
              </TabPanel>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    );
  else if (isAdmin !== null && !isAdmin) return <NotFound />;
};

export default EditRole;
