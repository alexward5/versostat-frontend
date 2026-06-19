import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Fade from "@mui/material/Fade";
import { useTheme } from "@mui/material/styles";

type Props = {
    variant?: "full" | "table";
    /**
     * Controls the Fade `in` prop. Defaults to true (always fades in and stays).
     * Pass a boolean to get a fade-out on hide — useful for the "table" variant
     * where the component stays mounted while animating out.
     */
    show?: boolean;
};

export default function LoadingIndicator({
    variant = "full",
    show = true,
}: Props) {
    const theme = useTheme();

    const isTable = variant === "table";

    return (
        <Fade in={show} timeout={{ enter: 300, exit: 200 }} unmountOnExit>
            <Box
                sx={
                    isTable
                        ? {
                              position: "absolute",
                              inset: 0,
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              zIndex: 1,
                              backgroundColor: theme.darkThemeSurfaceColor_1,
                          }
                        : {
                              // Initial load: fills the area the Layout reserves below the header
                              width: "100%",
                              height: "100%",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                          }
                }
            >
                <CircularProgress
                    sx={{
                        color: theme.themeMainColor,
                    }}
                />
            </Box>
        </Fade>
    );
}
