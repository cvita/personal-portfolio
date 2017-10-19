const fetchPosts = (customPostType) => (
  new Promise((resolve, reject) => {
    const request = window.location.origin.indexOf('localhost') === -1 ?
      `https://chrisvita.com/wordpress/wp-json/wp/v2/${customPostType}?_embed` :
      `http://localhost:8888/wp-json/wp/v2/${customPostType}?_embed`;
    fetch(request, { method: 'GET' })
      .then(res => res.json())
      .then(posts => resolve(parsePostsResponse(posts)))
      .catch(e => reject(e));
  })
);

// Helper functions
const parsePostsResponse = (wpPosts) => (
  wpPosts.map(post => {
    return {
      ...post.acf,
      images: post._embedded['wp:featuredmedia'][0].media_details.sizes,
      titlePretty: post.title.rendered
    };
  })
);


export default {
  fetchPosts
};
