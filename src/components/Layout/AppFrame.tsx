import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import Header from "./Header";
import Logo from "./Logo";
import Sidebar from "./Sidebar";
import MainContent from "./MainContent";
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";
import MobileDrawer from "../PlayerDataDrawer/MobileDrawer";
import { usePlayersData } from "../../contexts/PlayersDataContext";
import { useMobileNav } from "./useMobileNav";

// App frame: a CSS grid sizes the logo/header/sidebar/main regions so no
// component hard-codes the app bar height or drawer width. The persistent
// chrome (logo, header, sidebar) stays put while `main` swaps table views
export default function AppFrame() {
    const theme = useTheme();
    const { isInitialLoading } = usePlayersData();
    const nav = useMobileNav();

    // On desktop, only `main` scrolls. On mobile, the page scrolls and the header sticks
    return (
        <Box
            sx={{
                display: "grid",
                height: { md: "100vh" },
                minHeight: { xs: "100vh" },
                gridTemplateColumns: {
                    xs: "1fr",
                    md: `${theme.drawerWidth} 1fr`,
                },
                gridTemplateRows: {
                    xs: "auto 1fr",
                    md: `${theme.appBarHeightMd} 1fr`,
                },
                gridTemplateAreas: {
                    xs: '"header" "main"',
                    md: '"logo header" "sidebar main"',
                },
            }}
        >
            <Box
                sx={{
                    gridArea: "logo",
                    display: { xs: "none", md: "flex" },
                    justifyContent: "center",
                    alignItems: "center",
                    borderBottom: `1px solid ${theme.darkThemeBorderColor}`,
                }}
            >
                <Logo />
            </Box>

            <Box
                sx={{
                    gridArea: "header",
                    position: { xs: "sticky", md: "static" },
                    top: 0,
                    zIndex: theme.zIndex.appBar,
                }}
            >
                <Header onMenuClick={nav.toggle} />
            </Box>

            {isInitialLoading ? (
                // Centered spinner filling the body row (all columns, below the header)
                <Box sx={{ gridColumn: "1 / -1", gridRow: 2 }}>
                    <LoadingIndicator />
                </Box>
            ) : (
                <>
                    <Sidebar />
                    <MainContent />
                    <MobileDrawer
                        open={nav.open}
                        onClose={nav.close}
                        onTransitionEnd={nav.onTransitionEnd}
                    />
                </>
            )}
        </Box>
    );
}
