import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import DataTable from "../../components/DataTable";
import PermissionMenuStyle from "./index.style";
import PermissionDrawer from "./PermissionDrawer";
import DeleteAlert from "../../components/DeleteAlert";
import api from "../../apis";

const columns = ["Tên quyền", "Đường dẫn", "Phương thức", "Loại", "Hành động"];

const PermissionMenu = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerTitle, setDrawerTitle] = useState("");
  const [permissionRow, setPermissionRow] = useState(null);
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [numOfPages, setNumOfPages] = useState(0);
  const [page, setPage] = useState(0);
  const [offset, setOffset] = useState(0);
  const [permissionList, setPermissionList] = useState([]);

  const limit = 5;

  const handleAddPermission = () => {
    setPermissionRow(null);
    setDrawerTitle("Add permission");
    setIsDrawerOpen(true);
  };

  const getPermission = async () => {
    const payload = {
      offset: offset,
      limit,
    };
    const checkresult = await api.permission.getPermission(payload);
    setNumOfPages(Math.ceil(checkresult.result.permissions.total / limit));
    setPermissionList(checkresult.result.permissions.documents);
  };

  const pageChange = (number) => {
    setPage(number);
    setOffset((number - 1) * limit);
  };

  useEffect(() => {
    getPermission();
  }, [offset]);

  const handleClosePermission = () => {
    setPermissionRow(null);
    setIsDrawerOpen(false);
  };

  const handleUpdatePermission = (row) => {
    setPermissionRow(row);
    setDrawerTitle("Update permission");
    setIsDrawerOpen(true);
  };

  const handleOpenDeleteAlert = () => {
    setDeleteAlert(true);
  };

  const handleCloseDeleteAlert = () => {
    setDeleteAlert(false);
  };

  const ActionButton = ({ row }) => (
    <>
      <EditIcon className="icon" onClick={() => handleUpdatePermission(row)} />
      <DeleteIcon
        className="delete-icon icon"
        onClick={handleOpenDeleteAlert}
      />
    </>
  );

  const permissionWithActions = permissionList.map((permission) => ({
    id: permission.id,
    name: permission.name,
    url: permission.url,
    type: permission.type,
    method: permission.method,
    actions: <ActionButton row={permission} />,
  }));

  return (
    <>
      <DeleteAlert open={deleteAlert} onClose={handleCloseDeleteAlert} />
      <PermissionDrawer
        title={drawerTitle}
        open={isDrawerOpen}
        onClose={handleClosePermission}
        value={permissionRow}
      />
      <PermissionMenuStyle>
        <div className="add-button">
          <Button variant="contained" onClick={handleAddPermission}>
            Tạo quyền
          </Button>
        </div>
        <DataTable
          columns={columns}
          data={permissionWithActions}
          numPage={numOfPages}
          changePage={pageChange}
        />
      </PermissionMenuStyle>
    </>
  );
};

export default PermissionMenu;
