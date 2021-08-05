import axios from "axios";
const API_KEY = '22627688-af3fb051bb8ec0acdb27de44f';
const BASE_URL = 'https://pixabay.com/api';

 
   
    let totalImageShow = 0;
    let perPage = 40;
    let searchQuery = '';

async function  fetchImage(searchQuery, page){
  const images = await axios
  .get(`${BASE_URL}/?key=${API_KEY}&q=${searchQuery}&per_page=${perPage}&page=${page}`);
  console.log("images", images);
  console.log("imagesdata", images.data);
  return images.data;
  
      
    }
    function query (newQuery) {
      console.log("newQuery", newQuery)
      return (searchQuery = newQuery);
    }


export default { fetchImage, query }