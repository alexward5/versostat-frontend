import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import GameweekSelect from "./GameweekSelect/GameweekSelect";
import PositionSelect from "./PositionSelect/PositionSelect";
import PriceSelect from "./PriceSelect/PriceSelect";
import TeamFilter from "./TeamFilter/TeamFilter";
import { useTheme } from "@mui/material/styles";

type Props = {
    gameweekRange: number[];
    setGameweekRange: React.Dispatch<React.SetStateAction<number[]>>;
    displayedTeams: string[];
    setDisplayedTeams: React.Dispatch<React.SetStateAction<string[]>>;
    displayedPositions: string[];
    setDisplayedPositions: React.Dispatch<React.SetStateAction<string[]>>;
    playerPriceRange: string[];
    setPlayerPriceRange: React.Dispatch<React.SetStateAction<string[]>>;
};

export default function DrawerContent(props: Props) {
    const {
        gameweekRange,
        setGameweekRange,
        displayedTeams,
        setDisplayedTeams,
        displayedPositions,
        setDisplayedPositions,
        playerPriceRange,
        setPlayerPriceRange,
    } = props;

    const theme = useTheme();

    return (
        <Box
            sx={{
                display: "flex",
                height: "100vh",
                flexDirection: "column",
                backgroundColor: theme.darkThemeSurfaceColor_1,
                // On small screens, make the entire drawer scrollable
                overflowY: { xs: "auto", md: "hidden" },
            }}
        >
            <Toolbar
                variant="regular"
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    borderBottom: `1px solid ${theme.darkThemeBorderColor}`,
                }}
            >
                <Box
                    component="img"
                    src="/logo-dark.png"
                    alt="Logo"
                    sx={{ height: "38px", width: "auto" }}
                />
            </Toolbar>
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
