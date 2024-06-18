import fetchPosts from '../api'; // Correctly import the default export

export const getPosts = () => async (dispatch) => {
  try {
    const data = await fetchPosts();
    dispatch({ type: 'FETCH_ALL', payload: data });
  } catch (error) {
    console.error('Error fetching posts:', error);
  }
};

// Other actions can be defined similarly