const input = document.getElementById("videoInput");
const progress = document.getElementById("progress");
const progressBar = document.getElementById("progressBar");
const result = document.getElementById("result");
const videoLink = document.getElementById("videoLink");

input.addEventListener("change", async () => {
  const file = input.files[0];

  if (!file) return;

  const formData = new FormData();
  formData.append("video", file);

  progress.style.display = "block";

  const xhr = new XMLHttpRequest();

  xhr.open("POST", "/upload", true);

  xhr.upload.onprogress = function (e) {
    if (e.lengthComputable) {
      const percent = (e.loaded / e.total) * 100;
      progressBar.style.width = percent + "%";
    }
  };

  xhr.onload = function () {
    const data = JSON.parse(xhr.responseText);

    result.style.display = "block";
    videoLink.value = data.link;
  };

  xhr.send(formData);
});

function copyLink() {
  videoLink.select();
  document.execCommand("copy");

  alert("Link berhasil disalin!");
}
