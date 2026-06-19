import Drawer from "@mui/material/Drawer";
import DrawerContent from "./DrawerContent/DrawerContent";
import { useTheme } from "@mui/material/styles";

type Props = {
    open: boolean;
    onClose: () => void;
    onTransitionEnd: () => void;
};

// Temporary overlay drawer for small screens (the desktop sidebar lives in the
// AppFrame grid). Its content reads filter state from context
export default function MobileDrawer({ open, onClose, onTransitionEnd }: Props) {
    const theme = useTheme();

    return (
        <Drawer
            variant="temporary"
            open={open}
            onClose={onClose}
            SlideProps={{
                onExited: onTransitionEnd,
            }}
            sx={{
                display: { xs: "block", md: "none" },
                "& .MuiDrawer-paper": {
                    boxSizing: "border-box",
                    width: theme.drawerWidth,
                    borderRight: `1px solid ${theme.darkThemeBorderColor}`,
                },
            }}
        >
            <DrawerContent />
        </Drawer>
    );
}
