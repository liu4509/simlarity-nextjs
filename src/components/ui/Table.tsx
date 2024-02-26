"use client";

import { FC } from "react";
import {
  DataGrid,
  GridColumnHeaderParams,
  type GridColDef,
} from "@mui/x-data-grid";
import { ApiRequest } from "@prisma/client";
import { createTheme, ThemeProvider } from "@mui/material";
import { useTheme } from "next-themes";

const columnsDraft: GridColDef[] = [
  {
    // 列数
    field: "col1",
    headerName: "API key used",
    width: 400,
    renderHeader(params) {
      return (
        <strong className="font-semibold">{params.colDef.headerName} 🔑</strong>
      );
    },
  },
  // 路径
  { field: "col2", headerName: "Path", width: 250 },
  // 时间间隔
  { field: "col3", headerName: "Recency", width: 250 },
  // 持续时间
  { field: "col4", headerName: "Duration", width: 150 },
  // 状态
  { field: "col5", headerName: "Status", width: 150 },
];

const columns = columnsDraft.map((col) => {
  if (col.field === "col1") {
    return col;
  }

  return {
    ...col,
    renderHeader(params: GridColumnHeaderParams<any, any, any>) {
      return (
        <strong className="font-semibold">{params.colDef.headerName}</strong>
      );
    },
  };
});

type ModifiedRequestType<K extends keyof ApiRequest> = Omit<ApiRequest, K> & {
  timestamp: string;
};

interface TableProps {
  userRequests: ModifiedRequestType<"timestamp">[];
}

const Table: FC<TableProps> = ({ userRequests }) => {
  const { theme: applicationTheme } = useTheme();

  const darktheme = createTheme({
    palette: {
      mode: applicationTheme === "light" ? "light" : "dark",
    },
  });

  // 行数据
  const rows = userRequests.map((req) => ({
    id: req.id,
    col1: req.usedApiKey,
    col2: req.path,
    col3: `${req.timestamp} ago`,
    col4: `${req.duration} ms`,
    col5: req.status,
  }));

  return (
    <ThemeProvider theme={darktheme}>
      <DataGrid
        style={{
          background: applicationTheme === "light" ? "white" : "#152238",
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
        autoHeight
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        columns={columns}
        rows={rows}
      />
    </ThemeProvider>
  );
};

export default Table;
