import axios from 'axios';

const GITHUB_API_URL = 'https://api.github.com';

const githubService = {
    getRepos: async (username: string) => {
        const response = await axios.get(`${GITHUB_API_URL}/users/${username}/repos`, {
            headers: {
                Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`
            }
        });

        console.log('This is the response', response.data);
        return response.data;
    }
};

export default githubService;