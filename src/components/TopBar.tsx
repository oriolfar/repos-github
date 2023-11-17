import { AppBar, Toolbar, Typography, IconButton, Box } from '@mui/material';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import WbSunnyIcon from '@mui/icons-material/WbSunny';

interface TopBarProps {
    onThemeChange: () => void;
    darkMode: boolean;
}

const TopBar: React.FC<TopBarProps> = ({ onThemeChange, darkMode }) => {
    return (
        <AppBar position="fixed">
            <Toolbar>
                <Typography variant="h6" component="div">
                    Let's find some repos!
                </Typography>
                <Box sx={{ flexGrow: 1 }} />
                <IconButton edge="end" color="inherit" onClick={onThemeChange}>
                    {darkMode ? <WbSunnyIcon /> : <NightsStayIcon />}
                </IconButton>
            </Toolbar>
        </AppBar>
    );
};

export default TopBar;