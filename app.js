import Render from "./Render.js";

let data = [];
let loadedItems = 0;
let cardsQuery = document.querySelector("#cards");
let app = new Render();
let overlayActive = false;
cardsQuery.innerHTML = "";

const setData = (fetchedData) => {
  data = fetchedData;
  loadItemsHandler();
};

const hideLoadMoreButton = () => {
  if (loadedItems + 1 >= data.length) {
    document.querySelector("#load-more").className = "hidden";
  }
};

const loadItemsHandler = () => {
  let stopAt = loadedItems + 4;
  for (loadedItems; loadedItems < stopAt; loadedItems++) {
    if (data[loadedItems] != undefined) {
      cardsQuery.innerHTML += app.renderCard(data[loadedItems], loadedItems);
    }
  }
  hideLoadMoreButton();
};

fetch("./data.json")
  .then((response) => response.json())
  .then((data) => setData(data));

const toggleOverlay = () => {
  let overlay = document.querySelector("#overlay");
  overlay.className == "hidden"
    ? (overlay.className = "")
    : (overlay.className = "hidden");

  overlayActive = !overlayActive;
};

document.addEventListener("click", (e) => {
  if (e.target.id == "load-more") {
    loadItemsHandler();
  }

  if (e.target.className == "like") {
    let id = e.target.attributes.itemId.value;
    app.toggleLike(id, data[id], overlayActive);
  }

  if (e.target.className == "card-image") {
    let id = e.target.parentElement.attributes["card-id"].value;
    app.renderOverlay(data[id], id);
    toggleOverlay();
  }

  if (e.target.id == "overlay") {
    toggleOverlay();
  }
});
