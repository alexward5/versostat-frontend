import {
    useState,
    useEffect,
    startTransition,
    type Dispatch,
    type SetStateAction,
} from "react";
import { gql } from "../../__generated__/gql";
import { DataProvider } from "../../contexts/DataContext";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import PlayerDataTable from "../PlayerDataTable/PlayerDataTable";
import PlayerDataDrawer from "../PlayerDataDrawer/PlayerDataDrawer";
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";
import { useTheme } from "@mui/material/styles";
import { useQuery } from "@apollo/client";

const GET_PLAYER_DATA = gql(`
    query GetData {
        players {
            fpl_player_id
            fpl_web_name
            fpl_team_name
            fpl_player_position
            fpl_player_cost
            fpl_selected_by_percent
            player_gameweek_data {
                fpl_minutes
                fpl_round
                fpl_total_points
                fpl_goals_scored
                fpl_assists
                fpl_bps
                fpl_clean_sheet
                fpl_defensive_contribution
                fpl_expected_goals
                fpl_expected_assists
                fpl_xgi
                sm_shots_on_target
                sm_big_chances_created
                sm_key_passes
                calc_xgap
            }
        }
        teams {
            name
        }
        events {
            id
            is_current
            finished
        }
    }
`);

type Props = {
    handleDrawerClose: () => void;
    handleDrawerTransitionEnd: () => void;
    mobileOpen: boolean;
};

type DerivedState = {
    playerPriceRange: [string, string];
    displayedTeams: string[];
    gameweekRange: [number, number];
};

export default function PlayerData(props: Props) {
    const { handleDrawerClose, handleDrawerTransitionEnd, mobileOpen } = props;

    const [displayedPositions, setDisplayedPositions] = useState<string[]>([
        "DEF",
        "MID",
        "FWD",
    ]);
    const [derivedState, setDerivedState] = useState<DerivedState | null>(null);

    const { loading, data } = useQuery(GET_PLAYER_DATA);
    useEffect(() => {
        if (!data?.players || !data?.teams || !data?.events) return;

        const playerCosts = data.players.map((p) => p.fpl_player_cost);
        const maxPrice = Math.max(...playerCosts).toFixed(1);
        const minPrice = Math.min(...playerCosts).toFixed(1);
        const teamNames = data.teams.map((team) => team.name);
        const numGameweeks = Math.max(
            0,
            ...data.players.flatMap((p) =>
                p.player_gameweek_data.map((gw) => gw.fpl_round),
            ),
        );

        startTransition(() => {
            setDerivedState({
                playerPriceRange: [String(minPrice), String(maxPrice)],
                displayedTeams: teamNames,
                gameweekRange: [1, numGameweeks],
            });
        });
    }, [data]);

    const theme = useTheme();

    if (loading || !data?.players || !derivedState) return <LoadingIndicator />;

    const {
        playerPriceRange,
        displayedTeams,
        gameweekRange,
    } = derivedState;

    const setDisplayedTeams: Dispatch<SetStateAction<string[]>> = (value) =>
        setDerivedState((prev) =>
            prev
                ? {
                      ...prev,
                      displayedTeams:
                          typeof value === "function"
                              ? value(prev.displayedTeams)
                              : value,
                  }
                : prev,
        );
    const setPlayerPriceRange: Dispatch<SetStateAction<string[]>> = (value) =>
        setDerivedState((prev) =>
            prev
                ? {
                      ...prev,
                      playerPriceRange:
                          typeof value === "function"
                              ? (value(prev.playerPriceRange) as [
                                    string,
                                    string,
                                ])
                              : (value as [string, string]),
                  }
                : prev,
        );
    const setGameweekRange: Dispatch<SetStateAction<number[]>> = (value) =>
        setDerivedState((prev) =>
            prev
                ? {
                      ...prev,
                      gameweekRange:
                          typeof value === "function"
                              ? (value(prev.gameweekRange) as [
                                    number,
                                    number,
                                ])
                              : (value as [number, number]),
                  }
                : prev,
        );

    return (
        <DataProvider value={data}>
            <Fade in={true} timeout={500}>
                <Box
                    sx={{
                        height: {
                            xs: "auto",
                            md: `calc(100% - ${theme.appBarHeightMd})`,
                        },
                        minHeight: {
                            xs: `calc(100vh - ${theme.appBarHeightXs})`,
                            md: "auto",
                        },
                        mt: {
                            xs: 0,
                            md: theme.appBarHeightMd,
                        },
                        width: { md: `calc(100% - ${theme.drawerWidth})` },
                        ml: { md: `${theme.drawerWidth}` },
                    }}
                >
                    <PlayerDataTable
                        displayedPositions={displayedPositions}
                        displayedTeams={displayedTeams}
                        playerPriceRange={playerPriceRange}
                        gameweekRange={gameweekRange}
                    />
                </Box>
            </Fade>
            <PlayerDataDrawer
                mobileOpen={mobileOpen}
                handleDrawerTransitionEnd={handleDrawerTransitionEnd}
                handleDrawerClose={handleDrawerClose}
                displayedPositions={displayedPositions}
                setDisplayedPositions={setDisplayedPositions}
                displayedTeams={displayedTeams}
                setDisplayedTeams={setDisplayedTeams}
                playerPriceRange={playerPriceRange}
                setPlayerPriceRange={setPlayerPriceRange}
                gameweekRange={gameweekRange}
                setGameweekRange={setGameweekRange}
            />
        </DataProvider>
    );
}
