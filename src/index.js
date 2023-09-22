document.addEventListener('DOMContentLoaded', () => {

// Global variables
const ramenMenu = document.querySelector('#ramen-menu')
const ramenImg = document.querySelector('#ramen-detail > .detail-image')
const ramenName = document.querySelector('#ramen-detail > .name')
const ramenRestaurant = document.querySelector('#ramen-detail .restaurant')
const ramenRating = document.querySelector('#rating-display')
const ramenComment = document.querySelector('#comment-display')
const ramenForm = document.querySelector('#new-ramen')
const updateForm = document.querySelector('#edit-ramen')



let currentRamen;
let currentId;

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
  //see the first ramen when the page loads
  if (ramenObj.id === 1) {
    renderRamen(ramenObj)
    currentId = 1
  }

  const ramenDiv = document.createElement('img')
  ramenDiv.src = ramenObj.image

  //add event listener to ramenDiv
  ramenDiv.addEventListener('click', () => {
    renderRamen(ramenObj)
    currentId = ramenObj.id
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

//function to add event listener to form and post new info
const formEventListener = () => {
  ramenForm.addEventListener('submit', (event) => {
    event.preventDefault();

    let nameInput = event.target["new-name"].value
    let restaurantInput = event.target["new-restaurant"].value
    let imageInput = event.target["new-image"].value
    let ratingInput = event.target["new-rating"].value
    let commentInput = event.target["new-comment"].value

    let newRamenObj = {"name": nameInput, "restaurant": restaurantInput, "image": imageInput, "rating": ratingInput, "comment": commentInput}

    // appendRamen(newRamenObj);

    fetch('http://localhost:3000/ramens', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(newRamenObj)
    })
    .then(resp => resp.json())
    .then(ramenObj => appendRamen(ramenObj))
    .catch(error => alert(error))

    ramenForm.reset();
  })
}

//function to update the rating and comment of existing form
const updateRamen = () => {
  updateForm.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log('clicked')
    let ratingInput = event.target["update-new-rating"].value
    let commentInput = event.target["update-new-comment"].value

    let newRamenObj = {"rating": ratingInput, "comment": commentInput}
    ramenRating.innerText = ratingInput;
    ramenComment.innerText = commentInput;

    fetch(`http://localhost:3000/ramens/${currentId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(newRamenObj)
    })
    .then(resp => resp.json())
    .then(data => console.log(data))
    .catch(error => alert(error))

    updateForm.reset()
  })
}

//call functions
loadRamen();
formEventListener();
updateRamen();
})
