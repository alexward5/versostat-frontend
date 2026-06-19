import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material/styles";

type Props = {
    onMenuClick: () => void;
};

export default function Header(props: Props) {
    const { onMenuClick } = props;

    const theme = useTheme();

    return (
        <Box
            sx={{
                height: { xs: theme.appBarHeightXs, md: theme.appBarHeightMd },
                display: "flex",
                alignItems: "center",
                paddingLeft: 2,
                background: theme.darkThemeSurfaceColor_1,
                borderBottom: `1px solid ${theme.darkThemeBorderColor}`,
            }}
        >
            <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={onMenuClick}
                sx={{
                    color: theme.palette.secondary.main,
                    display: { md: "none" },
                }}
            >
                <MenuIcon />
            </IconButton>
        </Box>
    );
}
