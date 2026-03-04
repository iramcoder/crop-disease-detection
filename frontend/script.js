document.getElementById("detectBtn").addEventListener("click", async function() {

    const fileInput = document.getElementById("imageInput");
    const output = document.getElementById("output");

    if (fileInput.files.length === 0) {
        output.innerHTML = "⚠ Please select an image first.";
        return;
    }

    const formData = new FormData();
    formData.append("image", fileInput.files[0]);

    output.innerHTML = "🔄 Uploading image...";

    try {
        const response = await fetch("http://127.0.0.1:5000/upload", {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        if (data.status === "success") {
            output.innerHTML = `
                ✅ ${data.message} <br>
                📂 Image Name: <strong>${data.filename}</strong>
            `;
        } else {
            output.innerHTML = `❌ ${data.message}`;
        }

    } catch (error) {
        output.innerHTML = "🚫 Server error. Make sure backend is running.";
    }
});