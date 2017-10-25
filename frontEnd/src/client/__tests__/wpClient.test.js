import fetchMock from 'fetch-mock';
import fs from 'fs';
import wpClient from '../wpClient';


const pathToStubData = './src/client/__tests__/stubData';

it('fetches custom post types: `projects` and parses the response', () => {
  fetchMock.get(
    'http://localhost:8888/wp-json/wp/v2/projects?_embed',
    fs.readFileSync(`${pathToStubData}/projectsRes.json`, 'utf8')
  );
  return wpClient.fetchPosts('projects')
    .then(res => {
      expect(res).toBeDefined();
      expect(res).toEqual(JSON.parse(fs.readFileSync(`${pathToStubData}/projectsResParsed.json`), 'utf8'));
      fetchMock.restore();
    });
});



// it('handles errors', () => {
//   fetchMock.get(
//     'http://localhost:8888/wp-json/wp/v2/projects?_embed',
//     fs.readFileSync(`${pathToStubData}/projects.json`, 'utf8')
//   );
//   return wpClient.fetchPosts('projects');
//   .then
// });