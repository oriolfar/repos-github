import React, { useState } from 'react';
import { Box } from '@mui/material';
import RepoList from './RepoList';
import Search from './Search';

const MainPage = () => {
    const [username, setUsername] = useState('');
    const [submittedUsername, setSubmittedUsername] = useState('');

    const handleUsernameChange = (newUsername: string) => {
        setUsername(newUsername);
    };

    const handleSearch = () => {
        setSubmittedUsername(username);
    };

    return (
        <Box padding={10}>
            <Search username={username} onUsernameChange={handleUsernameChange} onSearch={handleSearch} />
            <RepoList username={submittedUsername} />
        </Box>
    );
};

export default MainPage;