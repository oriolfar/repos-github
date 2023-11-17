import axios from 'axios';

const GITHUB_API_URL = 'https://api.github.com';

interface GithubError extends Error {
    response?: {
        status: number;
    };
}

const githubService = {
    getRepos: async (username: string) => {
        const response = await axios.get(`${GITHUB_API_URL}/users/${username}/repos`, {
            headers: {
                Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`
            }
        });

        console.log('This is the response', response.data);
        return response.data;
    },

    checkUserExists: async (username: string) => {
        try {
            await axios.get(`${GITHUB_API_URL}/users/${username}`, {
                headers: {
                    Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`
                }
            });
            return true;
        } catch (error) {
            const githubError = error as GithubError;
            if (githubError.response && githubError.response.status === 404) {
                return false;
            } else {
                throw error;
            }
        }
    }
};

export default githubService;