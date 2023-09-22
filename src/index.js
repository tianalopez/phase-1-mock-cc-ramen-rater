document.addEventListener('DOMContentLoaded', () => {

// Global variables
const ramenMenu = document.querySelector('#ramen-menu')
const ramenImg = document.querySelector('#ramen-detail > .detail-image')
const ramenName = document.querySelector('#ramen-detail > .name')
const ramenRestaurant = document.querySelector('#ramen-detail .restaurant')
const ramenRating = document.querySelector('#rating-display')
const ramenComment = document.querySelector('#comment-display')
const ramenForm = document.querySelector('#new-ramen')

let currentRamen;

//function to change center image/info with selected ramen
const renderRamen = (ramenObj) => {
  ramenImg.src = ramenObj.image
  ramenName.innerText = ramenObj.name
  ramenRestaurant.innerText = ramenObj.restaurant
  ramenRating.innerText = ramenObj.rating
  ramenComment.innerText = ramenObj.comment
}


//function display ramens in ramen menu
const appendRamen = (ramenObj) => {
  const ramenDiv = document.createElement('img')
  ramenDiv.src = ramenObj.image

  //add event listener to ramenDiv
  ramenDiv.addEventListener('click', () => {
    renderRamen(ramenObj)
  })

  ramenMenu.append(ramenDiv)

  currentRamen = ramenObj;
}


//fetch function to load ramen
const loadRamen = () => {
  fetch('http://localhost:3000/ramens')
  .then(resp => resp.json())
  .then((ramenArray) => {
    ramenArray.forEach((ramenObj) => appendRamen(ramenObj))})
    .catch(error => alert(error))
}

//function to add event listener to form
const formEventListener = () => {
  ramenForm.addEventListener('submit', (event) => {
    event.preventDefault();



  })
}

//call functions
loadRamen();
})
