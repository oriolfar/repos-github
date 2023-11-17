import React from 'react';
import { Button, TextField, Box } from '@mui/material';

interface SearchProps {
    username: string;
    onUsernameChange: (username: string) => void;
    onSearch: () => void;
}

const Search = ({ username, onUsernameChange, onSearch }: SearchProps) => {
    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            padding={2}
            borderRadius={20}
            borderColor="#bfff00"
        >
            <TextField
                variant="outlined"
                placeholder="Enter a github username"
                value={username}
                onChange={e => onUsernameChange(e.target.value)}
                style={{ marginRight: '10px' }}
            />
            <Button variant="contained" color="primary" onClick={onSearch}>
                Search
            </Button>
        </Box>
    );
};

export default Search;