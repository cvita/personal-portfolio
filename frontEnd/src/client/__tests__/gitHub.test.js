import fetchMock from 'fetch-mock';
import fs from 'fs';
import gitHub from '../gitHub';


const pathToStubData = './src/client/__tests__/stubData';

it('fetches most recently pushed GitHub repo and parses the response', () => {
  fetchMock.get(
    `https://api.github.com/users/vitac123/repos?sort=pushed&per_page=3`,
    fs.readFileSync(`${pathToStubData}/gitHubReposRes.json`, 'utf8')
  );

  return gitHub.fetchRecentPushedRepos()
    .then(res => {
      expect(res).toBeDefined();
      expect(res).toEqual(JSON.parse(fs.readFileSync(`${pathToStubData}/gitHubReposResParsed.json`), 'utf8'));
      fetchMock.restore();
    });
});

it('fetches recent GitHub commits for a given repo and parses the response', () => {
  const stubRepoInfo = JSON.parse(fs.readFileSync(`${pathToStubData}/gitHubReposResParsed.json`), 'utf8');
  
  fetchMock.get(
    `https://api.github.com/repos/vitac123/${stubRepoInfo}/commits?per_page=5`,
    fs.readFileSync(`${pathToStubData}/gitHubCommitsRes.json`, 'utf8')
  );

  return gitHub.fetchRecentCommits(stubRepoInfo, 5)
    .then(res => {
      expect(res).toBeDefined();
      // expect(res).toEqual(JSON.parse(fs.readFileSync(`${pathToStubData}/gitHubCommitsResParsed.json`), 'utf8'));
      fetchMock.restore();
    });
});
