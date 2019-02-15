document.addEventListener("DOMContentLoaded", () => {
  //Implement Your Code Here
  fetchBurgers()
  delegateEventListenerToButton()
  delegateEventListenerToForm()
})

const burgerMenu = document.querySelector("#burger-menu")
const orderList = document.querySelector("#order-list")
const customBurger = document.querySelector("#custom-burger")

function fetchBurgers(){
  fetch("http://localhost:3000/burgers")
  .then(res => res.json())
  .then(burgers =>
  burgers.forEach(showBurgerOnDom))
}

function showBurgerOnDom(burger){
  burgerMenu.innerHTML += `
  <div class="burger">
    <h3 class="burger_title">${burger.name}</h3>
      <img src=${burger.image}>
      <p class="burger_description">
        ${burger.description}
      </p>
      <button data-id=${burger.id} class="button">Add to Order</button>
  </div>`
}

function delegateEventListenerToButton(){
  burgerMenu.addEventListener("click",addBurgerToOrder)
}

function addBurgerToOrder(event){
  event.preventDefault()
  if (event.target.classList.contains("button")){
    const orderItem = document.createElement("li")
    orderItem.innerHTML = event.target.parentNode.querySelector(".burger_title").textContent
    orderList.append(orderItem)
  }
}

function delegateEventListenerToForm(){
  customBurger.addEventListener("submit", postNewBurger)
}

function postNewBurger(event){
  event.preventDefault()
  let newBurgerName = event.target[0].value
  let newBurgerDescription = event.target[1].value
  let newBurgerImage = event.target[2].value
  fetch("http://localhost:3000/burgers",{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({
      name: newBurgerName,
      description: newBurgerDescription,
      image: newBurgerImage
    })
  })
  .then(res => res.json())
  .then(render)
}

function render(burger){
  showBurgerOnDom(burger)
  orderList.innerHTML += `<li>${burger.name}</li>`
}
