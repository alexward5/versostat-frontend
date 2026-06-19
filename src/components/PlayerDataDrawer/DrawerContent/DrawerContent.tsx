import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import GameweekSelect from "./GameweekSelect/GameweekSelect";
import PositionSelect from "./PositionSelect/PositionSelect";
import PriceSelect from "./PriceSelect/PriceSelect";
import TeamFilter from "./TeamFilter/TeamFilter";
import Logo from "../../Layout/Logo";
import { useTheme } from "@mui/material/styles";
import { usePlayersData } from "../../../contexts/PlayersDataContext";

type Props = {
    // Renders the logo header (mobile overlay only); the desktop sidebar's logo
    // comes from the Layout, so it passes false to avoid a duplicate
    showLogo?: boolean;
};

export default function DrawerContent({ showLogo = true }: Props) {
    const theme = useTheme();
    const {
        gameweekRange,
        setGameweekRange,
        displayedTeams,
        setDisplayedTeams,
        displayedPositions,
        setDisplayedPositions,
        playerPriceRange,
        setPlayerPriceRange,
    } = usePlayersData();

    return (
        <Box
            sx={{
                display: "flex",
                height: "100%",
                flexDirection: "column",
                backgroundColor: theme.darkThemeSurfaceColor_1,
                // Desktop sidebar is a plain grid cell (no MUI Paper), so set text color here
                color: theme.palette.text.primary,
                // Make the whole drawer scrollable on small screens
                overflowY: { xs: "auto", md: "hidden" },
            }}
        >
            {showLogo && (
                <Toolbar
                    variant="regular"
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        borderBottom: `1px solid ${theme.darkThemeBorderColor}`,
                    }}
                >
                    <Logo />
                </Toolbar>
            )}
            <Stack
                spacing={2}
                sx={{
                    padding: theme.spacing(2, 1.5),
                    // On small screens, make the entire drawer scrollable
                    flexGrow: { xs: 0, md: 1 },
                    overflowY: { xs: "visible", md: "auto" },
                    borderRight: {
                        md: `1px solid ${theme.darkThemeBorderColor}`,
                    },
                }}
            >
                <GameweekSelect
                    gameweekRange={gameweekRange}
                    setGameweekRange={setGameweekRange}
                />
                <PositionSelect
                    selectedList={displayedPositions}
                    setSelectedList={setDisplayedPositions}
                />
                <PriceSelect
                    playerPriceRange={playerPriceRange}
                    setPlayerPriceRange={setPlayerPriceRange}
                />
                <TeamFilter
                    displayedTeams={displayedTeams}
                    setDisplayedTeams={setDisplayedTeams}
                />
            </Stack>
        </Box>
    );
}
