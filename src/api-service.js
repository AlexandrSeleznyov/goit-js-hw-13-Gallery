const API_KEY = '22627688-af3fb051bb8ec0acdb27de44f';
const BASE_URL = 'https://pixabay.com/api';

 
   
    let totalImageShow = 0;
    let perPage = 40;
    let searchQuery = '';

async function  fetchImage(searchQuery, page){
  const response = await fetch (`${BASE_URL}/?key=${API_KEY}&q=${searchQuery}&per_page=${perPage}&page=${page}`);
  const images = await response.json();
       return images;
  
      
    }
    function query (newQuery) {
      console.log("newQuery", newQuery)
      return (searchQuery = newQuery);
    }


export default { fetchImage, query }