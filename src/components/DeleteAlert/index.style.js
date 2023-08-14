import styled from "styled-components";
import { Dialog } from "@mui/material";

const DeleteAlertStyle = styled(Dialog)`
  && {
    .dialog-title {
      text-align: center;
      height: 6vh;
      margin-bottom: 1%;
    }
    .cancel-icon {
      font-size: 80px;
      color: red;
    }
    .dialog-content {
      width: 20vw;
      margin-top: 3%;
    }
    .content {
      text-align: center;
      font-weight: bold;
    }
    .sub-content {
      text-align: center;
      color: gray;
      margin-top: 2%;
    }
    .dialog-action {
      margin: auto;
    }
    .cancel-button {
      background-color: gray;
    }
  }
`;

export default DeleteAlertStyle;
