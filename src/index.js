import './sass/main.scss';
import Notiflix from "notiflix";
import card from "./partials/card.hbs";
import API from "./api-service";
import SimpleLightbox from "simplelightbox";
import axios from "axios";

const lightbox = new SimpleLightbox('.gallery a');
lightbox.on('show.simplelightbox', function (e) {
    e.preventDefault();
    gallery.next()
  });


const galleryList = document.querySelector(".gallery");
const loadMore = document.querySelector(".load");
const searchForm = document.querySelector(".search-form");

searchForm.addEventListener("submit", formSubmit);
loadMore.addEventListener("click", loadMoreImage)

let page = 1;
loadMore.classList.add("is-hidden");

let dateState = [];
let totalImage = 0;
function formSubmit(e){
    e.preventDefault();
    page = 1;
    const form = e.currentTarget;
    const searchQuery = form.elements.query.value;
    API.query = searchQuery;
   
  if (searchQuery.trim() != ""){
    API.fetchImage(API.query,page)
    .then( data => {
        dateState = [...data.hits];
        totalImage = dateState.length;
        console.log("totalImage первый раз", totalImage);
        console.log("data.totalHits первый раз ", data.totalHits);
        if ((data.hits.length > 0) ) {
        Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`)};
        if (totalImage < data.totalHits){
        loadMore.classList.remove("is-hidden")};
        if (data.hits.length === 0) {
            loadMore.classList.add("is-hidden");
            Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
          }
        renderCard(dateState);
        lightbox.refresh();
        return searchQuery;
    } 
    )
    .catch(error => console.log(error))
    .finally(()=> form.reset());
       
}
}
function loadMoreImage(e){
    
  
    ++page;
    console.log("API.query", API.query);
    API.fetchImage(API.query,page)
    .then( data => {
        dateState = [...dateState, ...data.hits];
        totalImage = dateState.length;
        console.log("totalImage", totalImage);
        console.log("data.totalHits", data.totalHits);
        if (totalImage >= data.totalHits){
            loadMore.classList.add("is-hidden");
            Notiflix.Notify.failure("We're sorry, but you've reached the end of search results");
        }
          
    renderCard(dateState);
    lightbox.refresh();
})

}
   
    function renderCard(result) {
        console.log(result);
        galleryList.innerHTML = card(result);
            
    }

    

    