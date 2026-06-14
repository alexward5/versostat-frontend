import {
    useState,
    useEffect,
    useRef,
    startTransition,
    type Dispatch,
    type SetStateAction,
} from "react";
import { gql } from "../../__generated__/gql";
import { NetworkStatus } from "@apollo/client";
import { DataProvider } from "../../contexts/DataContext";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import PlayerDataTable from "../PlayerDataTable/PlayerDataTable";
import PlayerDataDrawer from "../PlayerDataDrawer/PlayerDataDrawer";
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";
import { useTheme } from "@mui/material/styles";
import { useQuery } from "@apollo/client";
import type { GetPlayerDataQuery } from "../../__generated__/graphql";
import { useDelayedLoading } from "../../hooks/useDelayedLoading";

const GET_PLAYER_DATA = gql(`
    query GetPlayerData($gwStart: Int!, $gwEnd: Int!) {
        players {
            fpl_player_id
            fpl_web_name
            fpl_team_name
            fpl_player_position
            fpl_player_cost
            fpl_selected_by_percent
            player_stats(gwStart: $gwStart, gwEnd: $gwEnd) {
                games_played
                sum_minutes
                sum_points
                sum_goals
                sum_assists
                sum_bps
                sum_cleansheets
                sum_defensive_contributions
                sum_xg
                sum_xa
                sum_xgi
                sum_shots_on_target
                sum_big_chances_created
                sum_key_passes
                sum_xgap
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
    const [tableLoading, setTableLoading] = useState(false);

    const { data, networkStatus, refetch } = useQuery(GET_PLAYER_DATA, {
        variables: { gwStart: 1, gwEnd: 38 },
        notifyOnNetworkStatusChange: true,
    });

    // Keep the last successful response so DataProvider always has data to
    // render even while Apollo clears `data` during a refetch with new variables.
    const lastDataRef = useRef<GetPlayerDataQuery | null>(null);
    if (data) lastDataRef.current = data;

    const isInitialLoading = networkStatus === NetworkStatus.loading;
    const showTableLoading = useDelayedLoading(tableLoading, {
        delay: 200,
        minDuration: 500,
    });

    useEffect(() => {
        if (!data?.players || !data?.teams || !data?.events) return;

        setTableLoading(false);

        const playerCosts = data.players.map((p) => p.fpl_player_cost);
        const maxPrice = Math.max(...playerCosts).toFixed(1);
        const minPrice = Math.min(...playerCosts).toFixed(1);
        const teamNames = data.teams.map((team) => team.name);
        const numGameweeks = Math.max(
            0,
            ...data.events
                .filter((e) => e.finished || e.is_current)
                .map((e) => e.id),
        );

        startTransition(() => {
            setDerivedState((prev) =>
                prev
                    ? { ...prev }
                    : {
                          playerPriceRange: [
                              String(minPrice),
                              String(maxPrice),
                          ],
                          displayedTeams: teamNames,
                          gameweekRange: [1, numGameweeks],
                      },
            );
        });
    }, [data]);

    const theme = useTheme();

    if (isInitialLoading || !lastDataRef.current || !derivedState)
        return <LoadingIndicator />;

    const { playerPriceRange, displayedTeams, gameweekRange } = derivedState;

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
    const setGameweekRange: Dispatch<SetStateAction<number[]>> = (value) => {
        const next =
            typeof value === "function"
                ? (value(gameweekRange) as [number, number])
                : (value as [number, number]);
        setTableLoading(true);
        refetch({ gwStart: next[0], gwEnd: next[1] });
        setDerivedState((prev) =>
            prev ? { ...prev, gameweekRange: next } : prev,
        );
    };

    return (
        <DataProvider value={lastDataRef.current!}>
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
                        position: "relative",
                    }}
                >
                    <LoadingIndicator variant="table" show={showTableLoading} />
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
