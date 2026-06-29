import { db } from "./firebase.js";

import {
    doc,
    getDoc,
    updateDoc,
    increment
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

const video = document.getElementById("player");

const params = new URLSearchParams(window.location.search);

const id = params.get("id");

if (!id) {

    document.body.innerHTML = "<h2>Video tidak ditemukan.</h2>";

} else {

    loadVideo(id);

}

async function loadVideo(id) {

    const ref = doc(db, "videos", id);

    const snap = await getDoc(ref);

    if (!snap.exists()) {

        document.body.innerHTML = "<h2>Video tidak ditemukan.</h2>";

        return;

    }

    const data = snap.data();

    video.src = data.url;

    // Tambah view
    try {

        await updateDoc(ref, {

            views: increment(1)

        });

    } catch (e) {

        console.log(e);

    }

}
