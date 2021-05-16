const inputElement = document.getElementById("input");
const mediaPlayer = document.getElementById("myVideo");




inputElement.addEventListener("change", handleMedia, false);

function handleMedia() {
  const media = this.files[0];
  const mediaURL = window.URL.createObjectURL(media);
  mediaPlayer.src = mediaURL;
}



