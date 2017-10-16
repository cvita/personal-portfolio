const fetchProjects = () => (
  new Promise((resolve, reject) => {
    const request = window.location.origin.indexOf('localhost') === -1 ?
      'https://chrisvita.com/wordpress/wp-json/wp/v2/projects?_embed' :
      'http://localhost:8888/wp-json/wp/v2/projects?_embed';
    fetch(request, { method: 'GET' })
      .then(res => res.json())
      .then(projects => resolve(projects.map(project => parseProjectsResponse(project))))
      .catch(e => reject(e));
  })
);

// Helper functions
const parseProjectsResponse = project => ({
  ...project.acf,
  images: project._embedded['wp:featuredmedia'][0].media_details.sizes,
  titlePretty: project.title.rendered
});


export default {
  fetchProjects
};
