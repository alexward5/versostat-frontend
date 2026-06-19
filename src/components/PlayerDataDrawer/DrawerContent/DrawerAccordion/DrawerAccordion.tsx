import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useTheme } from "@mui/material/styles";

type Props = {
    summaryText: string;
    children: React.ReactNode;
};

const BORDER_RADIUS = "4px";

export default function DrawerAccordion({ summaryText, children }: Props) {
    const theme = useTheme();

    return (
        <Accordion
            defaultExpanded
            disableGutters
            elevation={0}
            square
            sx={{
                backgroundColor: theme.darkThemeSurfaceColor_1,
                borderRadius: BORDER_RADIUS,
                "&:before": {
                    display: "none",
                },
            }}
        >
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{
                    height: "46px",
                    minHeight: "unset",
                    margin: 0,
                    padding: theme.spacing(0, 1),
                    borderRadius: BORDER_RADIUS,
                    border: `1px solid ${theme.darkThemeSurfaceColor_4}`,
                    "&:hover": {
                        borderColor: theme.darkThemeSurfaceColor_5,
                    },
                    "&.Mui-expanded": {
                        borderBottomLeftRadius: 0,
                        borderBottomRightRadius: 0,
                    },
                    "& .MuiAccordionSummary-expandIconWrapper": {
                        color: theme.palette.text.primary,
                    },
                }}
            >
                <Typography variant="subtitle1" fontWeight="normal">
                    {summaryText}
                </Typography>
            </AccordionSummary>
            <AccordionDetails
                sx={{
                    padding: 0,
                    backgroundColor: theme.darkThemeSurfaceColor_2,
                    border: `1px solid ${theme.darkThemeSurfaceColor_4}`,
                    borderTop: "none",
                    borderBottomLeftRadius: BORDER_RADIUS,
                    borderBottomRightRadius: BORDER_RADIUS,
                    boxShadow: "inset 0 6px 8px -2px rgba(0, 0, 0, 0.4)",
                }}
            >
                {children}
            </AccordionDetails>
        </Accordion>
    );
}
