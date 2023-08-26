import React, { useState } from "react";
import { Box, Tab, Tabs, Grid } from "@mui/material";
import TabPanel from "../../components/TabPanel";
import CampaignContent from "../CampaignContent";
import TaskContent from "../TaskContent";
import MemberContent from "../MemberContent";
import Sidebar from "../../components/Sidebar";

const CampaignDetail = () => {
  const [activeMenu, setActiveMenu] = useState(1);

  const handleMenuChange = (event, newValue) => {
    setActiveMenu(newValue);
  };

  const tabs = [
    { label: "Thông tin chi tiết", value: 1 },
    { label: "Tasks", value: 2 },
    { label: "Thành viên", value: 3 },
  ];

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
            <TabPanel value={activeMenu} index={1}>
              <CampaignContent />
            </TabPanel>
            <TabPanel value={activeMenu} index={2}>
              <TaskContent />
            </TabPanel>
            <TabPanel value={activeMenu} index={3}>
              <MemberContent />
            </TabPanel>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CampaignDetail;
