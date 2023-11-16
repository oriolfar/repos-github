import React, { useEffect, useState, useCallback } from 'react';
import githubService from '../services/githubServices';
import { Card, CardContent, Typography, Box, Fab } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import StarIcon from '@mui/icons-material/Star';

interface ApiRepository {
    id: number;
    name: string;
    language: string;
    stargazers_count: number;
    // Define only the fields you need
}

interface Repository {
    id: number;
    name: string;
    language: string;
    stars: number;
}

const RepoList = () => {
    const [repositories, setRepositories] = useState<Repository[]>([]);

    useEffect(() => {
        githubService.getRepos('visionmedia').then((repos: ApiRepository[]) => {
            const mappedRepos = repos.map((repo: ApiRepository) => ({
                id: repo.id,
                name: repo.name,
                language: repo.language,
                stars: repo.stargazers_count,
            }));
            setRepositories(mappedRepos);
        });
    }, []);

    const [showScroll, setShowScroll] = useState(false);

    const checkScrollTop = useCallback(() => {
        if (!showScroll && window.scrollY > 400) {
            setShowScroll(true);
        } else if (showScroll && window.scrollY <= 400) {
            setShowScroll(false);
        }
    }, [showScroll]);

    useEffect(() => {
        window.addEventListener('scroll', checkScrollTop);
        return () => window.removeEventListener('scroll', checkScrollTop);
    }, [checkScrollTop]);

    const scrollTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    useEffect(() => {
        window.addEventListener('scroll', checkScrollTop);
        return () => window.removeEventListener('scroll', checkScrollTop);
    }, []);

    return (
        <div>
            <Box display="flex" flexDirection="column" alignItems="center">
                {repositories.map((repo) => (
                    <Card key={repo.id} sx={{ backgroundColor: '#bfff00', marginBottom: 2, boxShadow: 'none', borderRadius: 2, width: '100%', maxWidth: 600 }}>
                        <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <Typography variant="h5" component="div" color="text.secondary">
                                {repo.name}
                            </Typography>
                            <Box display="flex" justifyContent="space-between" alignItems="center">
                                <Typography variant="body2" color="text.disabled">
                                    {repo.language || 'Not specific language found'}
                                </Typography>
                                <Box display="flex" alignItems="center">
                                    <StarIcon sx={{ color: 'text.disabled', marginTop: -0.5, marginRight: 0.5 }} />
                                    <Typography variant="body2" color="text.disabled">
                                        {repo.stars}
                                    </Typography>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                ))}
            </Box>
            {showScroll &&
                <Fab color="primary" size="small" onClick={scrollTop} style={{ position: 'fixed', bottom: '5vh', right: '5vh' }}>
                    <ArrowUpwardIcon />
                </Fab>
            }
        </div>

    );
};

export default RepoList;