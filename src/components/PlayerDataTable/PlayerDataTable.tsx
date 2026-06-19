import { useState, useRef, useMemo, useEffect } from "react";
import { orderBy } from "natural-orderby";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import EnhancedTable from "./EnhancedTable/EnhancedTable";
import EnhancedTablePagination from "./EnhancedTable/EnhancedTablePagination/EnhancedTablePagination";
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";

import type DisplayedData from "../../types/DisplayedData";
import { useData } from "../../contexts/DataContext";
import { usePlayersData } from "../../contexts/PlayersDataContext";

export default function PlayerDataTable() {
    const {
        isRefetching,
        displayedPositions,
        displayedTeams,
        playerPriceRange,
        gameweekRange,
    } = usePlayersData();

    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(50);
    const [order, setOrder] = useState<"asc" | "desc">("desc");
    const [orderColumn, setOrderBy] =
        useState<keyof DisplayedData>("sumPoints");

    const tableRef = useRef<HTMLDivElement>(null);
    const scrollToTop = () => {
        tableRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    };

    useEffect(() => {
        setPage(0);
        scrollToTop();
    }, [displayedPositions, displayedTeams, playerPriceRange, gameweekRange]);

    const { players } = useData();
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

    const handleRequestSort = (
        _event: React.MouseEvent<unknown>,
        property: keyof DisplayedData,
    ) => {
        const isDesc = orderColumn === property && order === "desc";
        setOrder(isDesc ? "asc" : "desc");
        setOrderBy(property);
    };

    // Filter by position and map server-aggregated stats to DisplayedData shape
    const positionFilteredData = useMemo(() => {
        return players
            .filter((player) =>
                displayedPositions.includes(player.fpl_player_position),
            )
            .map((player) => {
                const playerStats = player.player_stats;
                return {
                    rank: 0,
                    fplPlayerId: player.fpl_player_id,
                    fplWebName: player.fpl_web_name,
                    fplTeamName: player.fpl_team_name,
                    fplPlayerPosition: player.fpl_player_position,
                    fplPlayerCost: player.fpl_player_cost.toFixed(1),
                    fplSelectedByPercent:
                        player.fpl_selected_by_percent.toFixed(1),
                    gamesPlayed: playerStats.games_played,
                    sumMinutes: playerStats.sum_minutes,
                    sumxG: playerStats.sum_xg.toFixed(1),
                    sumxA: playerStats.sum_xa.toFixed(1),
                    sumxGI: playerStats.sum_xgi.toFixed(1),
                    sumxGAP: playerStats.sum_xgap.toFixed(1),
                    sumShotsOnTarget: playerStats.sum_shots_on_target,
                    sumBigChancesCreated: playerStats.sum_big_chances_created,
                    sumKeyPasses: playerStats.sum_key_passes,
                    sumPoints: playerStats.sum_points,
                    sumGoals: playerStats.sum_goals,
                    sumAssists: playerStats.sum_assists,
                    sumDefensiveContributions:
                        playerStats.sum_defensive_contributions,
                    sumBPS: playerStats.sum_bps,
                    sumCleansheets: playerStats.sum_cleansheets,
                };
            });
    }, [players, displayedPositions]);

    // Sort and Rank
    const rankedData = useMemo(() => {
        const sorted = orderBy(positionFilteredData, [orderColumn], order);
        return sorted.map((item, index) => ({
            ...item,
            rank: index + 1,
        }));
    }, [positionFilteredData, order, orderColumn]);

    // Filter by Team and Price
    const displayedData = useMemo(() => {
        return rankedData.filter((player) => {
            const isDisplayedTeam = displayedTeams.includes(player.fplTeamName);
            const cost = parseFloat(player.fplPlayerCost);
            const min = parseFloat(
                playerPriceRange[0] ? playerPriceRange[0] : "0",
            );
            const max = parseFloat(
                playerPriceRange[1] ? playerPriceRange[1] : "999",
            );
            const isDisplayedPrice = cost >= min && cost <= max;
            return isDisplayedTeam && isDisplayedPrice;
        });
    }, [rankedData, displayedTeams, playerPriceRange]);

    return (
        <Box sx={{ height: { xs: "auto", md: "100%" } }}>
            <LoadingIndicator variant="table" show={isRefetching} />
            <Fade
                in={!isRefetching}
                timeout={{ enter: 300, exit: 200 }}
                unmountOnExit
            >
                <Box
                    sx={{
                        width: "100%",
                        height: { xs: "auto", md: "100%" },
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    {isSmallScreen ? (
                        <Box
                            sx={{
                                overflowX: "auto",
                                overflowY: "visible",
                                width: "100%",
                                overscrollBehaviorX: "none",
                                overscrollBehaviorY: "none",
                            }}
                            onWheel={(e) => {
                                if (
                                    e.deltaY !== 0 &&
                                    Math.abs(e.deltaY) > Math.abs(e.deltaX)
                                ) {
                                    window.scrollBy({
                                        top: e.deltaY,
                                        behavior: "auto",
                                    });
                                }
                            }}
                        >
                            <EnhancedTable
                                ref={tableRef}
                                rows={displayedData}
                                page={page}
                                rowsPerPage={rowsPerPage}
                                order={order}
                                orderBy={orderColumn}
                                onRequestSort={handleRequestSort}
                            />
                        </Box>
                    ) : (
                        <EnhancedTable
                            ref={tableRef}
                            rows={displayedData}
                            page={page}
                            rowsPerPage={rowsPerPage}
                            order={order}
                            orderBy={orderColumn}
                            onRequestSort={handleRequestSort}
                        />
                    )}
                    <EnhancedTablePagination
                        rows={displayedData}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        setPage={setPage}
                        setRowsPerPage={setRowsPerPage}
                        scrollToTop={scrollToTop}
                    />
                </Box>
            </Fade>
        </Box>
    );
}
