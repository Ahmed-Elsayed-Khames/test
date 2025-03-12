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
 const fileInput = document.getElementById('file-input');
        const captureBtn = document.getElementById('capture-btn');

        captureBtn.addEventListener('click', () => {
            fileInput.click(); 
        });

        fileInput.addEventListener('change', (event) => {
            const file = event.target.files[0];

            if (file) {
                uploadImage(file); 
            }
        });

        function uploadImage(file) {
            const formData = new FormData();
            formData.append('photo', file);

            fetch('upload.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.text())
            .then(result => {
                console.log('Upload successful:', result);
                alert('Photo uploaded successfully!');
            })
            .catch(error => {
                console.error('Upload error:', error);
                alert('Failed to upload the photo.');
            });
        }
