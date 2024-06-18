import axios from 'axios';

const fetchPosts = async () => {
  const response = await axios.get('https://www.themoviedb.org/');
  return response.data;
}

export default fetchPosts;