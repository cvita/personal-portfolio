const fetchGitHub = (maxResults) => (
  new Promise((resolve, reject) => {
    fetchRecentPushedRepos()
      .then(repos => {
        Promise.all(repos.map(repo => fetchRecentCommits(repo, maxResults)))
          .then(commits => resolve(sortByDate(commits).slice(0, maxResults)));
      })
      .catch(e => reject(e));
  })
);

const fetchRecentPushedRepos = () => (
  new Promise((resolve, reject) => {
    const request = `https://api.github.com/users/vitac123/repos?sort=pushed&per_page=3` // returns an array
    fetch(request, { method: 'GET' })
      .then(res => res.json())
      .then(repos => resolve(repos.map(repo => repo.name))) // Array of repo names
      .catch(e => reject(e));
  })
);

const fetchRecentCommits = (repo, maxResults) => (
  new Promise((resolve, reject) => {
    const request = `https://api.github.com/repos/vitac123/${repo}/commits?per_page=${maxResults}`
    fetch(request, { method: 'GET' })
      .then(res => res.json())
      .then(commits => resolve(parseCommits(commits, repo)))
      .catch(e => reject(e));
  })
);

// Helper functions
const parseCommits = (commits, repo) => (
  commits.map(commit => {
    return {
      repo,
      date: new Date(commit.commit.author.date).getTime(),
      message: commit.commit.message,
      url: commit.html_url
    };
  })
);

const sortByDate = commits => {
  const commitsFlattened = commits.reduce((prev, curr) => prev.concat(curr));
  return commitsFlattened.sort((a, b) => b.date - a.date);
};


export default {
  fetchGitHub,
  fetchRecentPushedRepos,
  fetchRecentCommits
};
