import Box from "@mui/material/Box";
import TableCell from "@mui/material/TableCell";
import TableSortLabel from "@mui/material/TableSortLabel";
import Tooltip from "@mui/material/Tooltip";
import { visuallyHidden } from "@mui/utils";

const headerTooltipSlotProps = {
    popper: {
        popperOptions: {
            strategy: "fixed" as const,
        },
    },
};
import type DisplayedData from "../../../types/DisplayedData";
import type { ColumnConfig } from "../../../types/TableColumn";

// Helper to convert width string to number
const parsePx = (value: string): number => {
    const match = value.match(/^(\d+)\s*px$/);
    return match ? parseInt(match[1], 10) : 0;
};

const getTeamLogoMapping = (teamName: string): string => {
    const map: Record<string, string> = {
        Arsenal: "Arsenal-FC-logo.png",
        "Aston Villa": "Aston-Villa-FC-logo.png",
        Bournemouth: "AFC-Bournemouth-logo.png",
        Brentford: "Brentford-FC-logo.png",
        Brighton: "Brighton-Hove-Albion-logo.png",
        Burnley: "Burnley-FC-logo-1.png",
        Chelsea: "Chelsea-FC-logo.png",
        "Crystal Palace": "Crystal-Palace-FC-logo.png",
        Everton: "Everton-FC-logo.png",
        Fulham: "Fulham-FC-logo.png",
        Leeds: "Leeds-United-FC-logo.png",
        "Leeds United": "Leeds-United-FC-logo.png",
        Liverpool: "Liverpool-FC-logo.png",
        "Man City": "Manchester-City-FC-logo.png",
        "Man Utd": "Manchester-United-FC-logo.png",
        "Manchester City": "Manchester-City-FC-logo.png",
        "Manchester Utd": "Manchester-United-FC-logo.png",
        Newcastle: "Newcastle-United-logo.png",
        "Newcastle Utd": "Newcastle-United-logo.png",
        "Nott'm Forest": "Nottingham-Forest-FC-logo.png",
        "Nott'ham Forest": "Nottingham-Forest-FC-logo.png",
        "Nottingham Forest": "Nottingham-Forest-FC-logo.png",
        Sunderland: "Sunderland-logo.png",
        Spurs: "Tottenham-Hotspur-logo.png",
        Tottenham: "Tottenham-Hotspur-logo.png",
        "West Ham": "West-Ham-United-FC-logo.png",
        Wolves: "Wolverhampton-Wanderers-logo.png",
    };

    const filename = map[teamName] || "Premier-League-Logo.png";
    return `/team-crests/${filename}`;
};

const getStickyStyle = (
    column: ColumnConfig,
    left: number,
    isLastSticky: boolean,
    theme: any,
    isHeader: boolean = false,
    additionalSx: any = {},
) => {
    const isSticky = column.sticky ?? false;
    // Use explicit config if present, otherwise fallback to "last sticky column" logic
    const hasRightBorder = column.stickyRightBorder ?? isLastSticky ?? false;

    // Default padding for cells (matches header default)
    const defaultPadding = {
        paddingLeft: "4px",
        paddingRight: "4px",
    };

    if (!isSticky) {
        return {
            ...defaultPadding,
            ...column.sx,
            ...additionalSx,
        };
    }

    return {
        position: "sticky",
        left,
        // Set border using gradient (needed for sticky cells)
        ...(hasRightBorder && {
            "&::after": {
                content: '""',
                position: "absolute",
                top: 0,
                right: 0,
                bottom: 0,
                width: "1px",
                backgroundColor: theme.darkThemeBorderColor,
                pointerEvents: "none",
            },
        }),
        backgroundColor: isHeader ? theme.darkThemeSurfaceColor_1 : "inherit",
        zIndex: {
            xs: 1,
            md: theme.zIndex.appBar + (isHeader ? 2 : 1),
        },
        ...defaultPadding,
        ...column.sx,
        ...additionalSx,
    };
};

export const createRowCells = (
    row: DisplayedData,
    columns: ColumnConfig[],
    rowId: string,
    orderColumn: string,
    theme: any,
) => {
    let stickyLeft = 0;
    const stickyColumns = columns.filter((c) => c.sticky);
    const lastStickyId = stickyColumns[stickyColumns.length - 1]?.id;

    return columns.map((column, columnIndex) => {
        const cellValue = row[column.id as keyof DisplayedData];
        const cellId = columnIndex === 0 ? rowId : undefined;
        const isSelectedColumn = column.id === orderColumn;
        const isLastSticky = column.id === lastStickyId;
        const isSticky = column.sticky ?? false;

        const currentLeft = stickyLeft;
        if (isSticky) {
            stickyLeft += parsePx(column.sx.width);
        }

        const additionalSx = isSelectedColumn
            ? { fontWeight: theme.typography.fontWeightBold }
            : {};

        const sx = getStickyStyle(
            column,
            currentLeft,
            isLastSticky,
            theme,
            false,
            additionalSx,
        );

        return (
            <TableCell
                key={column.id}
                component={isSticky ? "th" : "td"}
                id={cellId}
                scope={isSticky ? "row" : undefined}
                padding="none"
                sx={sx}
            >
                {column.id === "fplWebName" ? (
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <img
                            src={getTeamLogoMapping(row.fplTeamName)}
                            alt={row.fplTeamName}
                            style={{
                                width: "22px",
                                height: "22px",
                                marginRight: "5px",
                            }}
                        />
                        {cellValue}
                    </Box>
                ) : (
                    cellValue
                )}
            </TableCell>
        );
    });
};

export const createHeaderCells = (
    columns: ColumnConfig[],
    order: "asc" | "desc",
    orderBy: string,
    onRequestSort: (
        event: React.MouseEvent<unknown>,
        property: keyof DisplayedData,
    ) => void,
    theme: any,
    isSmallScreen: boolean,
) => {
    let stickyLeft = 0;
    const stickyColumns = columns.filter((c) => c.sticky);
    const lastStickyId = stickyColumns[stickyColumns.length - 1]?.id;

    const createSortHandler =
        (property: keyof DisplayedData) =>
        (event: React.MouseEvent<unknown>) => {
            onRequestSort(event, property);
        };

    return columns.map((column) => {
        const { headerConfig, id, sticky, sx } = column;
        const isSticky = sticky ?? false;
        const currentLeft = stickyLeft;

        if (isSticky) {
            stickyLeft += parsePx(column.sx.width);
        }

        const isLastSticky = id === lastStickyId;

        const headCell = {
            id: id as keyof DisplayedData,
            label: headerConfig.label,
            numeric: headerConfig.numeric,
        };

        const stickyStyle = isSticky
            ? getStickyStyle(column, currentLeft, isLastSticky, theme, true)
            : {};

        // Additional header specific styles
        const isVerticalSticky = !isSmallScreen;
        const baseZIndex = theme.zIndex.appBar;

        const headerSx = {
            // Default header styles
            paddingLeft: "4px",
            paddingRight: "4px",
            backgroundColor: theme.darkThemeSurfaceColor_1,
            paddingTop: 0,
            paddingBottom: 0,
            whiteSpace: "nowrap",
            fontWeight: theme.typography.fontWeightBold,

            // Base styles (overrides)
            ...sx,
            ...(headerConfig.sx || {}),

            // Sticky behavior (Horizontal AND/OR Vertical)
            position: isVerticalSticky || isSticky ? "sticky" : "relative",
            top: isVerticalSticky || isSticky ? 0 : undefined,

            // If horizontal sticky, add sticky styles from helper
            ...(isSticky ? stickyStyle : {}),

            zIndex: isVerticalSticky
                ? isSticky
                    ? baseZIndex + 2
                    : baseZIndex + 1
                : isSticky
                  ? 2
                  : undefined,
        };

        // Set border using gradient (needed for sticky cells)
        if (isSticky) {
            headerSx["&::after"] = {
                content: '""',
                position: "absolute",
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
                background: [
                    `linear-gradient(to left, ${theme.darkThemeBorderColor} 1px, transparent 1px)`,
                    `linear-gradient(to top, ${theme.darkThemeBorderColor} 1px, transparent 1px)`,
                ].join(", "),
                backgroundPosition: "right, bottom",
                backgroundSize: "1px 100%, 100% 1px",
                backgroundRepeat: "no-repeat",
                pointerEvents: "none",
            };
        } else {
            headerSx["&::after"] = {
                bottom: 0,
                left: 0,
                right: 0,
                height: "1px",
                backgroundColor: theme.darkThemeBorderColor,
                pointerEvents: "none",
                content: '""',
                position: "absolute",
            };
        }

        const isSortable = headerConfig.sortable !== false;

        if (!isSortable) {
            headerSx.cursor = "default";
            headerSx.userSelect = "none";
        }

        return (
            <TableCell
                key={headCell.id}
                align={headCell.numeric ? "right" : "left"}
                sortDirection={orderBy === headCell.id ? order : false}
                sx={headerSx}
            >
                {isSortable ? (
                    <TableSortLabel
                        active={orderBy === headCell.id}
                        direction={orderBy === headCell.id ? order : "desc"}
                        onClick={createSortHandler(headCell.id)}
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            height: "38px",
                            "&:hover": {
                                color: theme.themeMainTextColor,
                            },
                            "&.Mui-active .MuiTableSortLabel-icon": {
                                color: theme.themeMainColor,
                                marginRight: "2px",
                            },
                            "& .MuiTableSortLabel-icon": {
                                marginRight: "2px",
                            },
                        }}
                    >
                        <Tooltip
                            title={headerConfig.tooltip}
                            placement="top"
                            arrow
                            slotProps={headerTooltipSlotProps}
                        >
                            <span>{headCell.label}</span>
                        </Tooltip>
                        {orderBy === headCell.id ? (
                            <Box component="span" sx={visuallyHidden}>
                                {order === "asc"
                                    ? "sorted ascending"
                                    : "sorted descending"}
                            </Box>
                        ) : null}
                    </TableSortLabel>
                ) : (
                    <Tooltip
                        title={headerConfig.tooltip}
                        placement="top"
                        arrow
                        slotProps={headerTooltipSlotProps}
                    >
                        <span>{headCell.label}</span>
                    </Tooltip>
                )}
            </TableCell>
        );
    });
};
