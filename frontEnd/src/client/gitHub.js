const fetchGitHub = (maxResults) => (
  new Promise((resolve, reject) => {
    fetchRecentPushedRepo()
      .then(repo => fetchRecentCommits(repo, maxResults))
      .then(commits => resolve(commits))
      .catch(e => reject(e));
  })
);

const fetchRecentPushedRepo = () => (
  new Promise((resolve, reject) => {
    const request = `https://api.github.com/users/vitac123/repos?sort=pushed&per_page=1` // returns an array
    fetch(request, { method: 'GET' })
      .then(res => res.json())
      .then(repos => resolve(parseRepos(repos[0])))
      .catch(e => reject(e));
  })
);

const fetchRecentCommits = (repo, maxResults) => (
  new Promise((resolve, reject) => {
    const request = `https://api.github.com/repos/vitac123/${repo.name}/commits?per_page=${maxResults}`
    fetch(request, { method: 'GET' })
      .then(res => res.json())
      .then(commits => resolve(
        { ...repo, commits: parseCommits(commits) }
      ))
      .catch(e => reject(e));
  })
);

// Helper functions
const parseRepos = (repo) => (
  {
    name: repo.name,
    description: repo.description,
    url: repo.html_url
  }
);

const parseCommits = (commits) => (
  commits.map(commit => {
    return {
      date: commit.commit.author.date,
      message: commit.commit.message,
      url: commit.html_url
    };
  })
);


export default {
  fetchGitHub,
  fetchRecentPushedRepo,
  fetchRecentCommits
};
