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

captureBtn.addEventListener('click', async () => {
    try {
        stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: "environment" } 
        });
        video.srcObject = stream;
        video.style.display = 'block';
        snapBtn.style.display = 'block';
        captureBtn.style.display = 'none';
    } catch (error) {
        console.error('Error accessing camera:', error);
        alert('Cannot access the camera.');
    }
});


snapBtn.addEventListener('click', () => {
    const context = canvas.getContext('2d');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob(blob => {
        uploadImage(blob);
    }, 'image/jpeg');

    
    preview.src = canvas.toDataURL('image/jpeg');
    preview.style.display = 'block';


    stream.getTracks().forEach(track => track.stop());
    video.style.display = 'none';
    snapBtn.style.display = 'none';
    captureBtn.style.display = 'block';
});
}
