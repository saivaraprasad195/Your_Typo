import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import { useTheme } from "../Context/ThemeContext";

const UserDataTable = ({ data }) => {
  const { theme } = useTheme();

  const cellStyle = {
    color: theme.textColor,
    textAlign: "center",
  };

  return (
    <div className="table">
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={cellStyle}>WPM</TableCell>
              <TableCell style={cellStyle}>Accuracy</TableCell>
              <TableCell style={cellStyle}>Characters</TableCell>
              <TableCell style={cellStyle}>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((i, index) => {
              return (
                <TableRow key={index}>
                  <TableCell style={cellStyle}>{i.wpm}</TableCell>
                  <TableCell style={cellStyle}>{i.accuracy}</TableCell>
                  <TableCell style={cellStyle}>{i.characters}</TableCell>
                  <TableCell style={cellStyle}>
                    {i.timeStamp.toDate().toLocaleString()}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default UserDataTable;
