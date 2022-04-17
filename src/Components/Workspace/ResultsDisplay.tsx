import { Box, Tab, Tabs } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { FC, useEffect, useMemo, useState } from "react";
import { transformMatrixToDatatable } from "../../utils/data";
import { ColumnWidth, ResultsDisplayProps } from "./types";
import {
  Grid,
  Table,
  TableColumnResizing,
  TableHeaderRow,
  PagingPanel,
} from "@devexpress/dx-react-grid-material-ui";
import { IntegratedPaging, PagingState } from "@devexpress/dx-react-grid";
import { ContactSupportOutlined } from "@mui/icons-material";

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

  const [columnWidths, setColumnWidths] = useState<ColumnWidth[]>([]);

  const [hasResultsChanged, setHasResultsChanged] = useState(false);
  const [hasColumnsWidthsChanged, setHasColumnsWidthChanged] = useState(false);
  const [areResultsAndColumnsSynced, setAreResultsAndColumnsSynced] =
    useState(false);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  const resultsSetWithTable = useMemo(
    () => resultsSet.filter((resultSet) => Array.isArray(resultSet)),
    [resultsSet]
  );

  const resultsToShowDataTable = useMemo(
    () => transformMatrixToDatatable(resultsSetWithTable[selectedTab]),
    [resultsSetWithTable]
  );

  useEffect(() => {
    setAreResultsAndColumnsSynced(hasResultsChanged && hasColumnsWidthsChanged);
  }, [hasResultsChanged, hasColumnsWidthsChanged]);

  useEffect(() => {
    setHasResultsChanged(false);
    if (resultsSetWithTable && resultsSetWithTable.length > 0) {
      setHasResultsChanged(true);
    }
  }, [resultsSet]);

  useEffect(() => {
    setColumnWidths([]);
    if (resultsToShowDataTable && resultsToShowDataTable.columns.length > 0) {
      setColumnWidths(
        resultsToShowDataTable.columns.map((column) => ({
          columnName: column.name,
          width: 180,
        }))
      );
    }
  }, [resultsToShowDataTable]);

  useEffect(() => {
    setHasColumnsWidthChanged(columnWidths && columnWidths.length > 0);
  }, [columnWidths]);

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
            {areResultsAndColumnsSynced && (
              <Grid getRowId={(row) => row.id} {...resultsToShowDataTable}>
                <PagingState defaultCurrentPage={0} pageSize={25} />
                <IntegratedPaging />
                <Table />
                <TableColumnResizing defaultColumnWidths={columnWidths} />
                <TableHeaderRow />
                <PagingPanel />
              </Grid>
            )}
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
