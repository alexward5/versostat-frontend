import {
    createContext,
    useContext,
    useEffect,
    useRef,
    useState,
    startTransition,
    type ReactNode,
    type Dispatch,
    type SetStateAction,
} from "react";
import { gql } from "../__generated__/gql";
import { NetworkStatus, useQuery } from "@apollo/client";
import { DataProvider } from "./DataContext";
import type { GetPlayerDataQuery } from "../__generated__/graphql";

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

type DerivedState = {
    playerPriceRange: [string, string];
    displayedTeams: string[];
    gameweekRange: [number, number];
};

type PlayersDataContextValue = {
    // True until the first response and its derived filters are available
    isInitialLoading: boolean;
    // True while refetching after a gameweek-range change
    isRefetching: boolean;
    displayedPositions: string[];
    setDisplayedPositions: Dispatch<SetStateAction<string[]>>;
    displayedTeams: string[];
    setDisplayedTeams: Dispatch<SetStateAction<string[]>>;
    playerPriceRange: string[];
    setPlayerPriceRange: Dispatch<SetStateAction<string[]>>;
    gameweekRange: number[];
    setGameweekRange: Dispatch<SetStateAction<number[]>>;
};

const PlayersDataContext = createContext<PlayersDataContextValue | undefined>(
    undefined,
);

export function usePlayersData(): PlayersDataContextValue {
    const context = useContext(PlayersDataContext);
    if (!context) {
        throw new Error(
            "usePlayersData must be used within a PlayersDataProvider",
        );
    }
    return context;
}

// Owns the player query, derived filter state, and loading flags. Raw data is
// exposed via DataProvider/useData; filters and loading via usePlayersData
export function PlayerDataProvider({ children }: { children: ReactNode }) {
    const [displayedPositions, setDisplayedPositions] = useState<string[]>([
        "DEF",
        "MID",
        "FWD",
    ]);
    const [derivedState, setDerivedState] = useState<DerivedState | null>(null);

    const { data, networkStatus, refetch } = useQuery(GET_PLAYER_DATA, {
        variables: { gwStart: 1, gwEnd: 38 },
        notifyOnNetworkStatusChange: true,
    });

    // Keep the last successful response so consumers always have data to render
    // even while Apollo clears `data` during a refetch with new variables
    const lastDataRef = useRef<GetPlayerDataQuery | null>(null);
    if (data) lastDataRef.current = data;

    const isRefetching = networkStatus === NetworkStatus.setVariables;
    const isInitialLoading =
        networkStatus === NetworkStatus.loading ||
        !lastDataRef.current ||
        !derivedState;

    useEffect(() => {
        if (!data?.players || !data?.teams || !data?.events) return;

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
        const current = derivedState?.gameweekRange ?? [1, 38];
        const next =
            typeof value === "function"
                ? (value(current) as [number, number])
                : (value as [number, number]);
        refetch({ gwStart: next[0], gwEnd: next[1] });
        setDerivedState((prev) =>
            prev ? { ...prev, gameweekRange: next } : prev,
        );
    };

    const value: PlayersDataContextValue = {
        isInitialLoading,
        isRefetching,
        displayedPositions,
        setDisplayedPositions,
        // Filters fall back to placeholders before data loads; consumers that
        // read them are only rendered once `isInitialLoading` is false
        displayedTeams: derivedState?.displayedTeams ?? [],
        setDisplayedTeams,
        playerPriceRange: derivedState?.playerPriceRange ?? ["0", "0"],
        setPlayerPriceRange,
        gameweekRange: derivedState?.gameweekRange ?? [1, 38],
        setGameweekRange,
    };

    return (
        <PlayersDataContext.Provider value={value}>
            {lastDataRef.current ? (
                <DataProvider value={lastDataRef.current}>
                    {children}
                </DataProvider>
            ) : (
                children
            )}
        </PlayersDataContext.Provider>
    );
}
