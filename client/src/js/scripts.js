import "../scss/main.scss";

const fields = document.querySelectorAll(".field");
const button = document.querySelector("button");
const error = document.querySelector(".error-message");
const images = document.querySelector(".images");
const noPhotosMessage = document.querySelector(".no-photos");
const spinner = document.querySelector(".lds-ring div");

let searchParams = {
  sol: "",
  camera: "fhaz"
};
let validated = false;
let loaded = false;

function validator() {
  const { sol } = searchParams;
  if (!sol) {
    fields[0].classList.add("active-error");
    error.innerHTML = "This field is required";
    validated = false;
  }
  if (sol > 1000 || Math.sign(sol) === -1) {
    fields[0].classList.add("active-error");
    error.innerHTML = "Sol must be between 0-1000";
    validated = false;
  }
  if (sol && sol < 1000 && Math.sign(sol) !== -1) {
    fields[0].classList.remove("active-error");
    error.innerHTML = "";
    validated = true;
  }
}

function imageCleaner() {
  while (images.hasChildNodes()) {
    images.removeChild(images.firstChild);
  }
}

function renderSpinner() {
  loaded && (spinner.style.display = "none");
  !loaded && (spinner.style.display = "block");
}

async function searchPhotos() {
  validator();
  if (!validated) {
    return;
  }
  imageCleaner();
  noPhotosMessage.style.display = "none";
  loaded = false;
  renderSpinner();
  const { camera, sol } = searchParams;
  const { photos } = await fetch(
    `http://localhost:8080/api/${sol}&${camera}`
  ).then(res => res.json());
  if (!photos.length) {
    loaded = true;
    renderSpinner();
    noPhotosMessage.style.display = "block";
  } else {
    photos.forEach(photo => {
      noPhotosMessage.style.display = "none";
      loaded = true;
      renderSpinner();
      const img = document.createElement("img");
      img.src = photo.img_src;
      images.appendChild(img);
    });
  }
}

function handleInput(e) {
  searchParams[e.target.name] = e.target.value;
  e.type === "input" && validator();
}

fields.forEach(field => field.addEventListener("input", handleInput));
button.addEventListener("click", searchPhotos);

//falta: poner spinner, arreglar que no se mueva cada vez que
//hay un error de input, poner metadata
