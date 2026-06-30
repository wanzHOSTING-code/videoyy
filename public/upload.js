import { db } from "./firebase.js";

import {
    collection,
    doc,
    setDoc
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

const fileInput = document.getElementById("video");
const progress = document.querySelector(".progress");
const bar = document.getElementById("bar");
const status = document.getElementById("status");
const result = document.getElementById("result");
const link = document.getElementById("link");
const copy = document.getElementById("copy");

// Cloudinary
const CLOUD_NAME = "dpymglm1v";
const UPLOAD_PRESET = "videoyy";

fileInput.addEventListener("change", () => {

    const file = fileInput.files[0];

    if (!file) return;

    progress.style.display = "block";
    result.style.display = "none";
    bar.style.width = "0%";
    status.innerHTML = "Menyiapkan upload...";

    const data = new FormData();

    data.append("file", file);
    data.append("upload_preset", UPLOAD_PRESET);
    data.append("resource_type", "video");

    const xhr = new XMLHttpRequest();

    xhr.open(
        "POST",
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/video/upload`
    );

    xhr.upload.onprogress = (e) => {

        if (e.lengthComputable) {

            const percent = (e.loaded / e.total) * 100;

            bar.style.width = percent + "%";

            status.innerHTML =
                "Uploading... " + Math.round(percent) + "%";

        }

    };

    xhr.onload = async () => {

        if (xhr.status !== 200) {

            status.innerHTML = "❌ Upload gagal.";

            return;

        }

        const res = JSON.parse(xhr.responseText);

        if (!res.secure_url) {

            status.innerHTML = "❌ Upload gagal.";

            return;

        }

        try {

            // Buat dokumen baru dengan ID otomatis Firestore
            const ref = doc(collection(db, "videos"));

            await setDoc(ref, {

                url: res.secure_url,
                publicId: res.public_id,
                createdAt: Date.now(),
                views: 0

            });

            progress.style.display = "none";

            status.innerHTML = "✅ Upload berhasil!";

            result.style.display = "block";

            // Link pendek
            link.value = `${location.origin}/v/${ref.id}`;

        } catch (err) {

            console.error(err);

            status.innerHTML = "❌ Gagal menyimpan ke Firestore.";

        }

    };

    xhr.onerror = () => {

        status.innerHTML = "❌ Terjadi kesalahan jaringan.";

    };

    xhr.send(data);

});

copy.onclick = async () => {

    try {

        await navigator.clipboard.writeText(link.value);

        alert("✅ Link berhasil disalin!");

    } catch {

        alert("❌ Gagal menyalin link.");

    }

};
