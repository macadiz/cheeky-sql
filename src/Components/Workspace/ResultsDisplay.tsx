import { Box, Tab, Tabs } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { FC, useMemo, useState } from "react";
import { transformMatrixToDatatable } from "../../utils/data";
import { ResultsDisplayProps } from "./types";
import {
  Grid,
  Table,
  TableColumnResizing,
  TableHeaderRow,
  PagingPanel,
} from "@devexpress/dx-react-grid-material-ui";
import { IntegratedPaging, PagingState } from "@devexpress/dx-react-grid";

const useStyles = makeStyles({
  nullText: {
    fontStyle: "italic",
  },
  resultsTableContainer: {
    height: "calc(100% - 200px)",
    "& .Table-table, .Layout-root, .TableContainer-root": {
      width: "100%",
      maxWidth: "100%",
      overflow: "auto",
      height: "100%",
    },
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

  const resultsToShowDataTable = useMemo(
    () => transformMatrixToDatatable(resultsSetWithTable[selectedTab]),
    [resultsSetWithTable]
  );

  const columnWidths = useMemo(
    () =>
      resultsToShowDataTable.columns.map((column) => ({
        columnName: column.name,
        width: 180,
      })),
    [resultsToShowDataTable]
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
            <Grid getRowId={(row) => row.id} {...resultsToShowDataTable}>
              <PagingState defaultCurrentPage={0} pageSize={25} />
              <IntegratedPaging />
              <Table />
              <TableColumnResizing defaultColumnWidths={columnWidths} />
              <TableHeaderRow />
              <PagingPanel />
            </Grid>
          </Box>
        ) : (
          <React.Fragment key={`empty-result-${index}`}></React.Fragment>
        );
      })}
    </>
  );
};

const MemoResultsDisplay = React.memo(ResultsDisplay);

export default MemoResultsDisplay;
