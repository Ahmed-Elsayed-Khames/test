let submitBtn=document.getElementById('submit-btn');
let ProblemsAlert=document.getElementById('alert');

    // ckeck on ckeckBoxes
submitBtn.addEventListener('click',(event)=>{
    let checkBoxes=document.querySelectorAll('input[type=checkbox]:checked');
    if(checkBoxes.length===0){
        ProblemsAlert.textContent='Choose proplems that happends  '
        ProblemsAlert.style.color='red'
        event.preventDefault()
        window.scrollTo({
            top:0,
            behavior:"smooth"
        })

        
    }else{
        ProblemsAlert.textContent=''
    }

})


// take a photo
const captureBtn = document.getElementById('capture-btn');
const snapBtn = document.getElementById('snap-btn');
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const preview = document.getElementById('preview');

let stream;

// المحاولة الأولى: استخدام facingMode لتحديد الكاميرا الخلفية
async function startCamera() {
    try {
        stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: { exact: "environment" } }
        });

        video.srcObject = stream;
        video.style.display = 'block';
        snapBtn.style.display = 'block';
        captureBtn.style.display = 'none';

    } catch (error) {
        console.warn('facingMode failed, trying deviceId...', error);
        selectBackCamera(); // المحاولة الثانية: البحث عن كاميرا خلفية
    }
}

// المحاولة الثانية: البحث عن الكاميرا الخلفية يدويًا
async function selectBackCamera() {
    try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(device => device.kind === 'videoinput');

        let backCameraId = videoDevices.find(device => device.label.toLowerCase().includes('back'))?.deviceId;

        if (!backCameraId && videoDevices.length > 1) {
            backCameraId = videoDevices[1].deviceId; // المحاولة مع الكاميرا الثانية
        }

        if (!backCameraId) {
            throw new Error("No back camera found");
        }

        stream = await navigator.mediaDevices.getUserMedia({
            video: { deviceId: { exact: backCameraId } }
        });

        video.srcObject = stream;
        video.style.display = 'block';
        snapBtn.style.display = 'block';
        captureBtn.style.display = 'none';

    } catch (error) {
        console.error('Error accessing back camera:', error);
        alert('Cannot access the back camera.');
    }
}

// فتح الكاميرا عند الضغط على الزر
captureBtn.addEventListener('click', startCamera);

// التقاط الصورة
snapBtn.addEventListener('click', () => {
    const context = canvas.getContext('2d');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // تحويل الصورة إلى ملف وإرسالها للخادم
    canvas.toBlob(blob => {
        uploadImage(blob);
    }, 'image/jpeg');

    // عرض الصورة الملتقطة
    preview.src = canvas.toDataURL('image/jpeg');
    preview.style.display = 'block';

    // إيقاف الكاميرا
    stream.getTracks().forEach(track => track.stop());
    video.style.display = 'none';
    snapBtn.style.display = 'none';
    captureBtn.style.display = 'block';
});


