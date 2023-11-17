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

interface RepositoryListProps {
    username: string;
}

interface Repository {
    id: number;
    name: string;
    language: string;
    stars: number;
}

const RepoList: React.FC<RepositoryListProps> = ({ username }) => {
    const [repositories, setRepositories] = useState<Repository[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showScroll, setShowScroll] = useState(false);

    const checkScrollTop = useCallback(() => {
        if (!showScroll && window.scrollY > 400) {
            setShowScroll(true);
        } else if (showScroll && window.scrollY <= 400) {
            setShowScroll(false);
        }
    }, [showScroll]);

    const scrollTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    useEffect(() => {
        window.addEventListener('scroll', checkScrollTop);
        return () => window.removeEventListener('scroll', checkScrollTop);
    }, [checkScrollTop]);

    useEffect(() => {
        if (username) {
            setLoading(true);
            setError(null);
            githubService.checkUserExists(username)
                .then((exists) => {
                    if (exists) {
                        githubService.getRepos(username)
                            .then((repos: ApiRepository[]) => {
                                const mappedRepos = repos.map((repo: ApiRepository) => ({
                                    id: repo.id,
                                    name: repo.name,
                                    language: repo.language,
                                    stars: repo.stargazers_count,
                                }));
                                setRepositories(mappedRepos);
                                setLoading(false);
                                setError(null);
                            })
                            .catch(() => {
                                setError('Error fetching repositories');
                                setLoading(false);
                            });
                    } else {
                        setError('User not found');
                        setLoading(false);
                    }
                });
        }
    }, [username]);

    if (!username) {
        return <div>Enter a username to search for repositories</div>;
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

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