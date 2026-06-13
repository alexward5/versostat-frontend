import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import { useData } from "../../../../contexts/DataContext";
import { useTheme } from "@mui/material/styles";

type Props = {
    gameweekRange: number[];
    setGameweekRange: React.Dispatch<React.SetStateAction<number[]>>;
};

export default function GameweekSelect(props: Props) {
    const { gameweekRange, setGameweekRange } = props;

    const { players } = useData();
    const numGameweeks = Math.max(
        0,
        ...players.flatMap((p) =>
            p.player_gameweek_data.map((gw) => gw.fpl_round),
        ),
    );

    const allGameweeks = Array.from({ length: numGameweeks }, (_, i) => i + 1);

    const handleStartChange = (value: number) => {
        setGameweekRange([value, gameweekRange[1]]);
    };

    const handleEndChange = (value: number) => {
        setGameweekRange([gameweekRange[0], value]);
    };

    const theme = useTheme();

    return (
        <Box sx={{ width: "100%" }}>
            <Typography
                variant="subtitle1"
                fontWeight={650}
                sx={{ marginBottom: theme.spacing(1.25), lineHeight: 1 }}
            >
                Gameweeks
            </Typography>
            <Box
                sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Select
                    value={gameweekRange[0]}
                    onChange={(e) => handleStartChange(Number(e.target.value))}
                    sx={{ flex: 1 }}
                >
                    {allGameweeks
                        .filter((gw) => gw <= gameweekRange[1])
                        .map((gw) => (
                            <MenuItem key={gw} value={gw}>
                                GW{gw}
                            </MenuItem>
                        ))}
                </Select>
                <Typography
                    variant="subtitle1"
                    fontWeight={"bold"}
                    sx={{ padding: "0px 4px" }}
                >
                    to
                </Typography>
                <Select
                    value={gameweekRange[1]}
                    onChange={(e) => handleEndChange(Number(e.target.value))}
                    sx={{ flex: 1 }}
                >
                    {allGameweeks
                        .filter((gw) => gw >= gameweekRange[0])
                        .map((gw) => (
                            <MenuItem key={gw} value={gw}>
                                GW{gw}
                            </MenuItem>
                        ))}
                </Select>
            </Box>
        </Box>
    );
}
