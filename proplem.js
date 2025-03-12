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