import { db } from "./firebase.js";

import {
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

    const form = new FormData();

    form.append("file", file);
    form.append("upload_preset", UPLOAD_PRESET);
    form.append("resource_type", "video");

    const xhr = new XMLHttpRequest();

    xhr.open(
        "POST",
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/video/upload`
    );

    xhr.upload.onprogress = (e) => {

        if (e.lengthComputable) {

            const percent = Math.round((e.loaded / e.total) * 100);

            bar.style.width = percent + "%";

            status.innerHTML = `Uploading... ${percent}%`;

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

            // Buat ID unik
            const id = crypto.randomUUID();

            // Simpan ke Firestore
            await setDoc(doc(db, "videos", id), {

                url: res.secure_url,
                publicId: res.public_id,
                createdAt: Date.now(),
                views: 0

            });

            progress.style.display = "none";
            result.style.display = "block";

            status.innerHTML = "✅ Upload berhasil!";

            // Link menuju halaman watch
            link.value = `${location.origin}/watch.html?id=${id}`;

        } catch (err) {

            console.error(err);

            alert(err.message);

            status.innerHTML = "❌ Gagal menyimpan ke Firestore.";

        }

    };

    xhr.onerror = () => {

        status.innerHTML = "❌ Terjadi kesalahan jaringan.";

    };

    xhr.send(form);

});

copy.onclick = async () => {

    try {

        await navigator.clipboard.writeText(link.value);

        alert("✅ Link berhasil disalin!");

    } catch (err) {

        alert("❌ Gagal menyalin link.");

    }

};
