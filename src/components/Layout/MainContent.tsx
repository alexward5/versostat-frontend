import Box from "@mui/material/Box";
import PlayerDataTable from "../PlayerDataTable/PlayerDataTable";

// Main cell holding the active data table. `minWidth: 0` keeps the table's
// horizontal scroll inside this cell instead of stretching the page on mobile
export default function MainContent() {
    return (
        <Box
            sx={{
                gridArea: "main",
                position: "relative",
                minHeight: 0,
                minWidth: 0,
                overflow: { xs: "visible", md: "hidden" },
            }}
        >
            <PlayerDataTable />
        </Box>
    );
}
