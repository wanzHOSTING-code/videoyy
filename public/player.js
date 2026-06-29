const params = new URLSearchParams(window.location.search);

const url = params.get("url");

const player = document.getElementById("player");

if (url) {
    player.src = decodeURIComponent(url);
} else {
    document.body.innerHTML = `
        <h2 style="text-align:center;margin-top:50px;">
            Video tidak ditemukan.
        </h2>
    `;
}
