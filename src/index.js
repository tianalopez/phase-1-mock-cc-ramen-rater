document.addEventListener('DOMContentLoaded', () => {

// Global variables
const ramenMenu = document.querySelector('#ramen-menu')

//function display ramens in ramen menu
const appendRamen = (ramenObj) => {
  const ramenDiv = document.createElement('img')
  ramenDiv.src = ramenObj.image

  ramenMenu.append(ramenDiv)
}


//fetch function to load ramen
const loadRamen = () => {
  fetch('http://localhost:3000/ramens')
  .then(resp => resp.json())
  .then((ramenArray) => {
    ramenArray.forEach((ramenObj) => appendRamen(ramenObj))})
}


//call functions
loadRamen();
})
