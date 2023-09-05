import styled from "styled-components";

const RoleMenuStyle = styled.div`
  .grid-container {
    width: 75vw;
    margin-right: auto;
    margin-left: auto;
  }
  .search-box {
    width: 50%;
  }
  .grid-content {
    width: 100%;
    margin-top: 15px;
    padding-top: 2px;
    height: 70%;
    display: flex;
    justify-content: space-between;
  }
  .grid-role {
    width: 30%;
    margin-top: 2%;
    margin-bottom: 2%;
    border-right: 1px;
    overflow-y: scroll;
  }
  .role-title {
    padding: 10px;
  }
  .grid-permission {
    width: 50%;
    margin-right: auto;
    margin-left: auto;
    overflow-y: scroll;
  }
  .grid-permissionItem {
    width: 50%;
  }
  .tab-permission {
    width: 100%;
  }
  .btn-delete {
    color: red;
  }
  .btn-create {
    color: white;
    background-color: #1976d2;
    width: 200%;
    margin: 5px auto 10px auto;
  }
  .btn-create:hover {
    cursor: pointer;
    background-color: #757ce8;
  }
`;

export default RoleMenuStyle;
