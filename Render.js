export default class Render {
  constructor() {
    this.likedItemsID = [];
  }

  dateConversion(date) {
    date = new Date(date);
    let result = date.toLocaleString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
    return result;
  }

  renderCard(data, id) {
    let html = `
    <div class="card" card-id="${id}">
    <!-- Card top -->
    <div class="card-top">
      <div class="posted-by-info">
        <img src="${data["profile_image"]}" alt="" />
        <span>
          <a href="${data["source_link"]}" target="_blank">${data.name}</a>
          <p>${this.dateConversion(data.date)}</p>
        </span>
      </div>
      <img src="${
        data["source_type"] == "facebook"
          ? "facebook.svg"
          : "instagram-logo.svg"
      }" alt="" />
    </div>

    <!-- Card image  -->
    <img class="card-image" src="${data.image}" alt="" />

    <p>${data.caption}</p>

    <div class="like-action">

      <img src="heart.svg" class="like" itemId="${id}" alt="" />
      <p>${data.likes}</p>
    </div>
  </div>`;

    return html;
  }

  renderOverlay(data, id) {
    let elementLiked = this.likedItemsID.includes(id);
    let html = `
    <div id="overlay-card" overlay-card-id="${id}">
    <div id="overlay-image">
      <img src="${data.image}" alt="" />
    </div>
    <div id="overlay-info">
      <div class="card-top">
        <div class="posted-by-info">
          <img src="${data["profile_image"]}" alt="" />
          <span>
          <a href="${data["source_link"]}" target="_blank">${data.name}</a>
            <p>${data.date}</p>
          </span>
        </div>
        <img src="${
          data["source_type"] == "facebook"
            ? "facebook.svg"
            : "instagram-logo.svg"
        }" alt="" />
      </div>

      <p>${data.caption}</p>

      <div class="like-action overlay-action">
      <img src="heart${
        !elementLiked ? "" : "-liked"
      }.svg" class="like" itemId="${id}" alt="" />
      <p>${!elementLiked ? data.likes : parseInt(data.likes) + 1}</p>
      </div>
    </div>
  </div>
    `;
    document.querySelector("#overlay").innerHTML = html;
  }

  toggleLike(id, itemData, overlayActive) {
    let element = document.querySelector(`div[card-id="${id}"]`).children[3];
    let toUnlike = this.likedItemsID.includes(id);
    let html = `
    <img src="heart${
      toUnlike ? "" : "-liked"
    }.svg" class="like" itemId="${id}" alt="" />
    <p>${toUnlike ? itemData.likes : parseInt(itemData.likes) + 1}</p>`;

    toUnlike
      ? (this.likedItemsID = this.likedItemsID.filter((item) => item != id))
      : this.likedItemsID.push(id);

    overlayActive
      ? (document.querySelector(".overlay-action").innerHTML = html)
      : "";
    element.innerHTML = html;
  }
}
