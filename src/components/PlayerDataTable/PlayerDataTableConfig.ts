import { TableConfig } from "../../types/TableColumn";

const tableConfig: TableConfig = {
    columns: [
        {
            id: "rank",
            sticky: true,
            stickyRightBorder: true,
            sx: {
                width: "34px",
                minWidth: "34px",
                textAlign: "center",
                padding: "0px",
            },
            headerConfig: {
                label: "#",
                tooltip: "Rank",
                numeric: true,
                sortable: false,
                sx: {
                    fontSize: "15px",
                    textAlign: "center",
                },
            },
        },
        {
            id: "fplWebName",
            sticky: true,
            stickyRightBorder: true,
            sx: {
                width: "138px",
                minWidth: "138px",
                paddingLeft: "8px",
            },
            headerConfig: {
                label: "Player",
                tooltip: "Player Name",
                numeric: false,
                sx: {
                    paddingLeft: "8px",
                },
            },
        },
        {
            id: "fplTeamName",
            sx: {
                width: "110px",
                minWidth: "110px",
                textAlign: "right",
            },
            headerConfig: {
                label: "Team",
                tooltip: "Team Name",
                numeric: true,
            },
        },
        {
            id: "fplPlayerPosition",
            sx: {
                width: "90px",
                minWidth: "90px",
                textAlign: "right",
            },
            headerConfig: {
                label: "Position",
                tooltip: "Player Position",
                numeric: true,
            },
        },
        {
            id: "fplPlayerCost",
            sx: {
                width: "78px",
                minWidth: "78px",
                textAlign: "right",
            },
            headerConfig: {
                label: "Price",
                tooltip: "Player Price",
                numeric: true,
            },
        },
        {
            id: "sumPoints",
            sx: {
                width: "78px",
                minWidth: "78px",
                textAlign: "right",
            },
            headerConfig: {
                label: "Points",
                tooltip: "FPL Points",
                numeric: true,
            },
        },
        {
            id: "gamesPlayed",
            sx: {
                width: "82px",
                minWidth: "82px",
                textAlign: "right",
            },
            headerConfig: {
                label: "Games",
                tooltip: "Games Played",
                numeric: true,
            },
        },
        {
            id: "sumMinutes",
            sx: {
                width: "90px",
                minWidth: "90px",
                textAlign: "right",
            },
            headerConfig: {
                label: "Minutes",
                tooltip: "Minutes Played",
                numeric: true,
            },
        },
        {
            id: "sumGoals",
            sx: {
                width: "78px",
                minWidth: "78px",
                textAlign: "right",
            },
            headerConfig: {
                label: "Goals",
                tooltip: "Goals Scored",
                numeric: true,
            },
        },
        {
            id: "sumAssists",
            sx: {
                width: "82px",
                minWidth: "82px",
                textAlign: "right",
            },
            headerConfig: {
                label: "Assists",
                tooltip: "Assists",
                numeric: true,
            },
        },
        {
            id: "sumxG",
            sx: {
                width: "78px",
                minWidth: "78px",
                textAlign: "right",
            },
            headerConfig: {
                label: "xG",
                tooltip: "Expected Goals",
                numeric: true,
            },
        },
        {
            id: "sumxA",
            sx: {
                width: "78px",
                minWidth: "78px",
                textAlign: "right",
            },
            headerConfig: {
                label: "xA",
                tooltip: "Expected Assists",
                numeric: true,
            },
        },
        {
            id: "sumxGI",
            sx: {
                width: "78px",
                minWidth: "78px",
                textAlign: "right",
            },
            headerConfig: {
                label: "xGI",
                tooltip: "Expected Goal Involvement",
                numeric: true,
            },
        },
        {
            id: "sumxGAP",
            sx: {
                width: "88px",
                minWidth: "88px",
                textAlign: "right",
            },
            headerConfig: {
                label: "xGAP",
                tooltip: "Expected Goal + Assist Points",
                numeric: true,
            },
        },
        {
            id: "sumShotsOnTarget",
            sx: {
                width: "78px",
                minWidth: "78px",
                textAlign: "right",
            },
            headerConfig: {
                label: "SoT",
                tooltip: "Shots on Target",
                numeric: true,
            },
        },
        {
            id: "sumBigChancesCreated",
            sx: {
                width: "78px",
                minWidth: "78px",
                textAlign: "right",
            },
            headerConfig: {
                label: "BCC",
                tooltip: "Big Chances Created",
                numeric: true,
            },
        },
        {
            id: "sumKeyPasses",
            sx: {
                width: "78px",
                minWidth: "78px",
                textAlign: "right",
            },
            headerConfig: {
                label: "KP",
                tooltip: "Key Passes",
                numeric: true,
            },
        },
        {
            id: "sumDefensiveContributions",
            sx: {
                width: "78px",
                minWidth: "78px",
                textAlign: "right",
            },
            headerConfig: {
                label: "DC",
                tooltip: "Defensive Contributions",
                numeric: true,
            },
        },
        {
            id: "sumBPS",
            sx: {
                width: "78px",
                minWidth: "78px",
                textAlign: "right",
            },
            headerConfig: {
                label: "BPS",
                tooltip: "Bonus Points",
                numeric: true,
            },
        },
        {
            id: "fplSelectedByPercent",
            sx: {
                width: "120px",
                minWidth: "120px",
                textAlign: "right",
                paddingRight: "12px",
            },
            headerConfig: {
                label: "Selected %",
                tooltip: "Selected Percentage",
                numeric: true,
                sx: {
                    paddingRight: "12px",
                },
            },
        },
    ],
};

export default tableConfig;
