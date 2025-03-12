let submitBtn = document.getElementById('submit-btn');
let ProblemsAlert = document.getElementById('alert');
const captureBtn = document.getElementById('capture-btn');
const snapBtn = document.getElementById('snap-btn');
const video = document.getElementById('video-preview');
const canvas = document.getElementById('canvas');
const capturedImage = document.getElementById('captured-image');

let stream;
async function startCamera() {
    try {
        stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });

        video.srcObject = stream;
        video.style.display = "block";
        snapBtn.style.display = "block"; 
    } catch (error) {
        console.warn("فشل فتح الكاميرا:", error);
    }
}

snapBtn.addEventListener('click', () => {
    const context = canvas.getContext('2d');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    capturedImage.src = canvas.toDataURL('image/png');
    capturedImage.style.display = "block";

    stopCamera(); 
});


function stopCamera() {
    if (stream) {
        stream.getTracks().forEach(track => track.stop());
        video.style.display = "none"; 
        snapBtn.style.display = "none"; 
    }
}

captureBtn.addEventListener('click', startCamera);
