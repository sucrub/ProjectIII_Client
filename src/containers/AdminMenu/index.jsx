import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";
import AdminMenuStyle from "./index.style";
import DataTable from "../../components/DataTable";
import AdminDrawer from "./AdminDrawer";
import DeleteAlert from "../../components/DeleteAlert";
import api from "../../apis";

const admins = [
  {
    id: "13h1k2lh3kl",
    email: "bachpx.vbee@gmail.com",
    role: "SERVER ADMIN",
  },
  {
    id: "1h32k21h323k",
    email: "bachspham@gmail.com",
    role: "SERVER ADMIN",
  },
  {
    id: "l1k2j32l1k3",
    email: "bachspham1@gmail.com",
    role: "SERVER ADMIN",
  },
];

const columns = ["ID", "Email", "Phân quyền", "Hành động"];

const AdminMenu = () => {
  const [adminDrawer, setAdminDrawer] = useState(false);
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [numOfPages, setNumOfPages] = useState(0);
  const [page, setPage] = useState(0);
  const [offset, setOffset] = useState(0);
  const [adminList, setAdminList] = useState([]);
  const [deleteRow, setDeleteRow] = useState("");

  const limit = 5;

  const getAdmin = async () => {
    const payload = {
      offset: offset,
      limit,
    };
    const checkresult = await api.admin.getAdmin(payload);
    setNumOfPages(Math.ceil(checkresult.result.admins.total / limit));
    setAdminList(checkresult.result.admins.data);
  };

  const pageChange = (number) => {
    setPage(number);
    setOffset((number - 1) * limit);
  };

  useEffect(() => {
    getAdmin();
  }, [offset]);

  const handleOpenAdminDrawer = () => {
    setAdminDrawer(true);
  };

  const handleCloseAdminDrawer = () => {
    setAdminDrawer(false);
    getAdmin();
  };

  const handleOpenDeleteAlert = (row) => {
    setDeleteRow(row);
    setDeleteAlert(true);
  };

  const handleCloseDeleteAlert = () => {
    setDeleteAlert(false);
    getAdmin();
  };

  const ActionButton = ({ row }) => (
    <DeleteIcon
      className="delete-icon icon"
      onClick={() => handleOpenDeleteAlert(row.id)}
    />
  );

  const adminWithActions = adminList.map((admin) => ({
    ...admin,
    role: "SERVER ADMIN",
    actions: <ActionButton row={admin} />,
  }));

  return (
    <AdminMenuStyle>
      <DeleteAlert
        type="admin"
        deleteValue={deleteRow}
        open={deleteAlert}
        onClose={handleCloseDeleteAlert}
      />
      <AdminDrawer open={adminDrawer} onClose={handleCloseAdminDrawer} />
      <div className="add-button">
        <Button variant="contained" onClick={handleOpenAdminDrawer}>
          Thêm admin
        </Button>
      </div>
      <DataTable
        isShowId
        columns={columns}
        data={adminWithActions}
        changePage={pageChange}
        numPage={numOfPages}
      />
    </AdminMenuStyle>
  );
};

export default AdminMenu;
