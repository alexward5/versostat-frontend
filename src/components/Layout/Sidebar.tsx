import Box from "@mui/material/Box";
import DrawerContent from "../PlayerDataDrawer/DrawerContent/DrawerContent";

// Desktop-only sidebar; its logo comes from the AppFrame's logo cell
export default function Sidebar() {
    return (
        <Box
            sx={{
                gridArea: "sidebar",
                display: { xs: "none", md: "block" },
                minHeight: 0,
                overflow: "hidden",
            }}
        >
            <DrawerContent showLogo={false} />
        </Box>
    );
}
