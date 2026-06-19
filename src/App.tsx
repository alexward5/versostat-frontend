import { Helmet } from "react-helmet-async";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./mui-theme";
import { PlayerDataProvider } from "./contexts/PlayersDataContext";
import AppFrame from "./components/Layout/AppFrame";

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Helmet>
                <meta property="og:type" content="website" />
                <meta property="og:title" content="VersoStat" />
                <meta property="og:url" content="https://versostat.com/" />
                <meta
                    property="og:description"
                    content="Fantasy Premier League data table containing xG, xA, xGI, defensive contributions, and more."
                />
            </Helmet>
            <PlayerDataProvider>
                <AppFrame />
            </PlayerDataProvider>
        </ThemeProvider>
    );
}

export default App;
