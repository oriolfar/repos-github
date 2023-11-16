import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

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
                <IconButton edge="end" color="inherit" onClick={onThemeChange}>
                    {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
                </IconButton>
            </Toolbar>
        </AppBar>
    );
};

export default TopBar;