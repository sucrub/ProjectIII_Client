import styled from "styled-components";
import { Drawer } from "@mui/material";

const PermissionDrawerStyle = styled(Drawer)`
  && {
    .drawer {
      width: 25vw;
    }
    .title {
      font-weight: bold;
      text-align: center;
      margin-top: 25vh;
    }
    .text-field {
      width: 15vw;
      margin-left: auto;
      margin-right: auto;
      margin-top: 4%;
    }
    .submit-button {
      margin-top: 4%;
      width: 20%;
      margin-left: auto;
      margin-right: auto;
    }
  }
`;

export default PermissionDrawerStyle;
