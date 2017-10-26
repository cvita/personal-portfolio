import { url } from './wpLocation';


const fetchPosts = (customPostType, embed = true, postId = '') => (
  new Promise((resolve, reject) => {
    const request = embed ?
      `${url}/${customPostType}?_embed` :
      `${url}/${customPostType}/${postId}`;
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
      projectBackground: post.content.rendered,
      images: post._embedded['wp:featuredmedia'][0].media_details.sizes,
      titlePretty: post.title.rendered
    };
  })
);


export default {
  fetchPosts
};
