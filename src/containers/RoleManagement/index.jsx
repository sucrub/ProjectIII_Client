import React, { useState } from "react";
import { Box, Tab, Tabs } from "@mui/material";
import TabPanel from "../../components/TabPanel";
import RoleMenu from "../RoleMenu";
import PermissionMenu from "../PermissionMenu";
import AdminMenu from "../AdminMenu";
import MANAGE_OPTION from "../../constants/roleManagementOption";

const EditRole = () => {
  const [activeMenu, setActiveMenu] = useState("rolemenu");

  const handleMenuChange = (event, newValue) => {
    setActiveMenu(newValue);
  };

  const tabs = [
    { label: "Quản lý vai trò", value: MANAGE_OPTION.ROLE_MENU },
    { label: "Quản lý quyền", value: MANAGE_OPTION.PERMISSION_MENU },
    { label: "Phân quyền admin", value: MANAGE_OPTION.ADMIN_MENU },
  ];

  return (
    <>
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
        <TabPanel value={activeMenu} index={MANAGE_OPTION.PERMISSION_MENU}>
          <PermissionMenu />
        </TabPanel>
        <TabPanel value={activeMenu} index={MANAGE_OPTION.ADMIN_MENU}>
          <AdminMenu />
        </TabPanel>
      </Box>
    </>
  );
};

export default EditRole;
