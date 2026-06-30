import { db } from "./firebase.js";

import {
    doc,
    getDoc,
    updateDoc,
    increment
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

const video = document.getElementById("player");

// Ambil ID dari ?id=... atau /v/...
let id = new URLSearchParams(window.location.search).get("id");

if (!id) {
    const path = window.location.pathname.split("/");
    if (path.length >= 3 && path[1] === "v") {
        id = path[2];
    }
}

if (!id) {
    document.body.innerHTML = "<h2>❌ Video tidak ditemukan.</h2>";
} else {
    loadVideo(id);
}

async function loadVideo(id) {

    try {

        const ref = doc(db, "videos", id);

        const snap = await getDoc(ref);

        if (!snap.exists()) {

            document.body.innerHTML = "<h2>❌ Video tidak ditemukan.</h2>";

            return;

        }

        const data = snap.data();

        console.log(data);
        alert(data.url);

        video.src = data.url;

        video.load();

        try {
            await video.play();
        } catch (e) {}

        await updateDoc(ref, {
            views: increment(1)
        });

    } catch (err) {

        console.error(err);

        document.body.innerHTML = "<h2>❌ Gagal memuat video.</h2>";

    }

}
