import { useState, forwardRef, memo } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import EnhancedTableHead from "./EnhancedTableHead/EnhancedTableHead";
import EmptyTableRow from "./EmptyTableRow/EmptyTableRow";
import tableConfig from "../PlayerDataTableConfig";
import { createRowCells } from "./tableCellFactory";

import type DisplayedData from "../../../types/DisplayedData";

type Order = "asc" | "desc";

type Props = {
    rows: DisplayedData[];
    page: number;
    rowsPerPage: number;
    order: Order;
    orderBy: keyof DisplayedData;
    onRequestSort: (
        event: React.MouseEvent<unknown>,
        property: keyof DisplayedData,
    ) => void;
};

// Use forwardRef to pass ref of TableContainer to the parent component
// so that we can scroll to the top of the table when user changes page
const EnhancedTable = memo(forwardRef<HTMLDivElement, Props>((props, ref) => {
    const { rows, page, rowsPerPage, order, orderBy, onRequestSort } = props;

    const [selected, setSelected] = useState<readonly string[]>([]);

    const handleSelectAllClick = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        if (event.target.checked) {
            const newSelected = rows.map((n: DisplayedData) => n.fplPlayerId);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (_: React.MouseEvent<unknown>, id: string) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected: readonly string[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        setSelected(newSelected);
    };

    const visibleRows = rows.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
    );

    // Calculate empty rows needed to fill the page
    const emptyRows = Math.max(0, rowsPerPage - visibleRows.length);

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

    return (
        <TableContainer
            sx={{
                flex: { xs: "none", md: 1 },
                overflow: { xs: "visible", md: "auto" },
            }}
            ref={ref}
        >
            <Table
                stickyHeader={!isSmallScreen}
                sx={{ minWidth: 750 }}
                aria-labelledby="tableTitle"
                size={"small"}
            >
                <EnhancedTableHead
                    numSelected={selected.length}
                    order={order}
                    orderBy={orderBy}
                    onSelectAllClick={handleSelectAllClick}
                    onRequestSort={onRequestSort}
                    rowCount={rows.length}
                    columns={tableConfig.columns}
                />
                <TableBody>
                    {visibleRows.map((row, index) => {
                        const isItemSelected = selected.includes(
                            row.fplPlayerId,
                        );
                        const rowId = `enhanced-table-row-${index}`;

                        return (
                            <TableRow
                                onClick={(event) =>
                                    handleClick(event, row.fplPlayerId)
                                }
                                aria-checked={isItemSelected}
                                tabIndex={-1}
                                key={row.fplPlayerId}
                                selected={false}
                                sx={{
                                    backgroundColor:
                                        index % 2 === 0
                                            ? theme.darkThemeSurfaceColor_2
                                            : theme.darkThemeSurfaceColor_3,
                                }}
                            >
                                {createRowCells(
                                    row,
                                    tableConfig.columns,
                                    rowId,
                                    orderBy,
                                    theme,
                                )}
                            </TableRow>
                        );
                    })}
                    {isSmallScreen && emptyRows > 0 &&
                        Array.from({ length: emptyRows }).map((_, index) => (
                            <EmptyTableRow
                                key={`empty-${index}`}
                                columns={tableConfig.columns}
                            />
                        ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}));

export default EnhancedTable;
