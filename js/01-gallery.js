import { galleryItems } from "./gallery-items.js";
// Change code below this line

console.log(galleryItems);

const galleryContainer = document.querySelector(".gallery");
galleryContainer.addEventListener("click", onImageClick);

const galleryMarkup = createGalleryMarkup(galleryItems);
galleryContainer.insertAdjacentHTML("beforeend", galleryMarkup);
let modal;

function createGalleryMarkup(items) {
  const markup = items.map(({ preview, original, description }) => {
    return `
        <li class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li> `;
  });
  return markup.join("");
}

function onImageClick(evt) {
  if (!evt.target.classList.contains("gallery__image")) {
    return;
  }

  evt.preventDefault();
  const cardImageLink = evt.target.dataset.source;
  const currentImage = galleryItems.find(
    ({ original }) => original === cardImageLink
  );

  modal = basicLightbox.create(`
    <div class="modal">
  <img src="${currentImage.original}" width = "1000" alt="${currentImage.description}">
    </div>
`);

  modal.show();
  window.addEventListener("keydown", onEscPress);
}

function onEscPress(evt) {
  if (evt.code === "Escape") {
    modal.close();
    window.removeEventListener("keydown", onEscPress);
  }
}
