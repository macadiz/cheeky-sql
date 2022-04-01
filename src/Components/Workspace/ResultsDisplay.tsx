import {
  Box,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tabs,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { FC, useState } from "react";
import { ResultsDisplayProps } from "./types";

const useStyles = makeStyles({
  nullText: {
    fontStyle: "italic",
  },
  resultsTableContainer: {
    width: "100%",
    maxWidth: "100%",
    overflow: "auto",
  },
});

const ResultsDisplay: FC<ResultsDisplayProps> = ({ resultsSet }) => {
  const classes = useStyles();
  const [selectedTab, setSelectedTab] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  const resultsSetWithTable = resultsSet.filter((resultSet) =>
    Array.isArray(resultSet)
  );

  return (
    <>
      <Tabs value={selectedTab} onChange={handleChange}>
        {resultsSetWithTable.map((_resultSet, index) => {
          return (
            <Tab key={`results-tab-${index}`} label={`Result ${index + 1}`} />
          );
        })}
      </Tabs>
      {resultsSetWithTable.map((currentResult, index) => {
        return currentResult &&
          currentResult.length > 0 &&
          index === selectedTab ? (
          <Box
            key={`result-table-${index}`}
            className={classes.resultsTableContainer}
          >
            <Table>
              <TableHead>
                <TableRow>
                  {currentResult[0].map((cell, columnIndex) => {
                    return (
                      <TableCell
                        component="th"
                        key={`result-table-${index}-results-cell-0-${columnIndex}`}
                      >
                        {cell as string}
                      </TableCell>
                    );
                  })}
                </TableRow>
              </TableHead>
              <TableBody>
                {currentResult.slice(1).map((row, rowIndex) => {
                  return (
                    <TableRow
                      key={`result-table-${index}-results-row-${rowIndex}`}
                    >
                      {row.map((cell, columnIndex) => {
                        return (
                          <TableCell
                            key={`results-cell-${rowIndex}-${columnIndex}`}
                          >
                            {!cell ? (
                              <Typography className={classes.nullText}>
                                NULL
                              </Typography>
                            ) : (
                              (cell as string)
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Box>
        ) : (
          <React.Fragment key={`empty-result-${index}`}></React.Fragment>
        );
      })}
    </>
  );
};

export default ResultsDisplay;
