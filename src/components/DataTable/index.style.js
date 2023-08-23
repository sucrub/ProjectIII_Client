import styled from "styled-components";
import { TableContainer } from "@mui/material";

const DataTableStyle = styled(TableContainer)`
  && {
    .bold-text {
      font-weight: bold;
    }
    .uppercase {
      text-transform: uppercase;
    }
    .table {
      margin: 0 auto;
      width: 80vw;
    }
    .pagination {
      display: flex;
      justify-content: center;
      width: 80vw;
      margin: 0 auto;
    }
  }
`;

export default DataTableStyle;
