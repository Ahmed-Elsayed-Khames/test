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
const video = document.createElement('video'); // إنشاء عنصر فيديو ديناميكي
document.body.appendChild(video); // إضافته إلى الصفحة

let stream;

// 🔹 الخطوة 1: المحاولة الأولى باستخدام facingMode
async function startCamera() {
    try {
        stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: "environment" }
        });

        video.srcObject = stream;
        video.play();
    } catch (error) {
        console.warn("facingMode failed, trying manual selection...", error);
        selectCameraManually(); // المحاولة الثانية: اختيار الكاميرا يدويًا
    }
}

// 🔹 الخطوة 2: عرض قائمة بالكاميرات ليختار المستخدم الخلفية يدويًا
async function selectCameraManually() {
    try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(device => device.kind === 'videoinput');

        if (videoDevices.length === 0) {
            alert("No cameras found on this device.");
            return;
        }

        // 🛑 إذا كان هناك كاميرا واحدة فقط، استخدمها مباشرة
        if (videoDevices.length === 1) {
            startSelectedCamera(videoDevices[0].deviceId);
            return;
        }

        // ✅ إنشاء قائمة لاختيار الكاميرا
        let select = document.createElement('select');
        select.innerHTML = videoDevices.map((device, index) => 
            `<option value="${device.deviceId}">${device.label || `Camera ${index + 1}`}</option>`
        ).join('');

        let confirmBtn = document.createElement('button');
        confirmBtn.textContent = "Use Selected Camera";
        confirmBtn.addEventListener('click', () => {
            startSelectedCamera(select.value);
        });

        document.body.appendChild(select);
        document.body.appendChild(confirmBtn);
    } catch (error) {
        console.error("Error listing cameras:", error);
        alert("Failed to access camera list.");
    }
}

// 🔹 الخطوة 3: تشغيل الكاميرا التي اختارها المستخدم
async function startSelectedCamera(deviceId) {
    try {
        stream = await navigator.mediaDevices.getUserMedia({
            video: { deviceId: { exact: deviceId } }
        });

        video.srcObject = stream;
        video.play();
    } catch (error) {
        console.error("Error starting selected camera:", error);
        alert("Cannot start the selected camera.");
    }
}

// عند الضغط على زر فتح الكاميرا
captureBtn.addEventListener('click', startCamera);
